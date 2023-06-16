import User from "../model/userModel.js"
import AppError from "../utils/AppErr.js"
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js';
import { obtainTokenFromHeader } from "../utils/obtainTokenFromHeader.js";
import { isLogin } from "../middlewears/isLogin.js";
import jwt from 'jsonwebtoken'
import sendEmail from "../utils/emailUtils.js";

export const createUserCtr = async(req,res,next) => {
    const { firstname, lastname, phoneNumber, profilephoto, email, password } = req.body;
    try {
        //check if user has been registered before
        const foundUser = await User.findOne({email});

        if(foundUser){
            return next(AppError(`user with this email:${email} already exist`,409))
        }else{
            //hash password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt);
            const user = await User.create({
                firstname,
                lastname,
                phoneNumber,
                email,
                password:hashPassword,
            })

        res.json({
            status:"SUCCESS",
            data: user
        })
    }

    } catch (error) {
        next(AppError(error.message))
    }
}


//Login user
export const userLoginCtr = async(req,res,next) => {
    const {email, password} = req.body;
    try {
        //check if email already register
        const isUserFound = await User.findOne({email})
        if(!isUserFound){
            return next(AppError("Wrong login details",401))
        }

        //get password
        const isPasswordFound = await bcrypt.compare(password,isUserFound.password)
        if(!isPasswordFound){
            return next(AppError("Wrong login details",401))
        }

        res.json({
            status:"SUCCESS",
            data:{
                firstname:isUserFound.firstname,
                lastname:isUserFound.lastname,
                email:isUserFound.email,
                token:generateToken(isUserFound._id)
            }
        })
    } catch (error) {
        next(AppError(error.message))
    }
}


//upload profile photo
export const profilePhotoUploadCtrl = async(req, res, next) =>{
  try {
      //find the user whose is uploading profile
      const userProfileToBeUpdated = await User.findById(req.userAuth);
      if(!userProfileToBeUpdated){
          res.json({
              status:"error",
              message:"User not found"
          })
      }

      //check if user is blocked
      if(userProfileToBeUpdated.isBlocked){
          return res.json({
              status:"error",
              message:"Access denied because your account is presently blocked"
          })
      }

      console.log(req.file);
      if(req.file){
          await User.findByIdAndUpdate(req.userAuth,{
              $set:{
                  profilephoto:req.file.path
              },
          },{
              new:true
          }
              );
              res.json({
                  status:"success",
                  data:"profile image uploaded successfully"
              })
      }


      
  } catch (error) {
      res.json(error.message)
  }
}



export const profileCtr = async (req, res, next) =>{
    //userid = req.params.id
    //console.log(userid);
    
    try {
        const token = obtainTokenFromHeader(req)
        const foundUser = await User.findById(req.userAuth)
        if(!foundUser){
            return next(AppError("No user associated with that id",404))
        }

        res.json({
            status:"SUCCESS",
            data:foundUser
        })
    } catch (error) {
        next(AppError(error.message))
    }
}


//FORGET PASSWORD
export const forgetPasswordCtr = async(req, res, next) => {
    try {
      const {email} = req.body;
      //check if email is valid
      const user = await User.findOne({email});
      if(!user){
        return next(AppError(`user with ${email} does not exist`,404))
      }

      //generate a reset token
      const resetToken = jwt.sign({userId: user._id}, process.env.JWT_KEY,{
        expiresIn:'1h'
      })

      //set the  reset token and its expiration on the user obj

      user.resetToken = resetToken;
      user.reseTokenExpiration = Date.now() + 3600000;
      
      user.save()
      //send password reset email
      const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
      const html = `<h3>RESET PASSWORD</h3><br/> Below is the link to reset your password<br>This link only valid for 1 hour, please do not share with anyone<hr/><br/>click <strong><a href='${resetUrl}'>here</a></strong> to reset your password</p><p>Having any issue? kindly contact our support team</p>`
      await sendEmail(user.email,'Reset Your Password', html);

      //console.log(resetUrl);

      res.status(200).json({
        status:"success",
        message:`Password reset sent successfully to your email ${user.email}` 
      });

    } catch (error) {
      next(AppError(error.message))
    } 
  }



  //RESET PASSWORD
  export const resetPasswordCtr = async(req, res, next) => {
    try {
      const {resetToken,password} =req.body;
      //find the user with token
      const user = await User.findOne({
        resetToken,
        reseTokenExpiration: {$gt: Date.now()},
      })

      if(!user){
        return next(AppError('Invalid or the link expired', 400))
      }

      //hash
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password,salt);

      //Update user obj
      user.password = hashPassword;
      user.resetToken = undefined;
      user.reseTokenExpiration = undefined

      await user.save();

      res.status(200).json({
        status:"success",
        message:"Your password reset successfully"
      });

      const html = `<h3>success</h3><br/> <p>Your password changed successfully</p>`
      await sendEmail(user.email,'Password Message', html);

    } catch (error) {
      next(AppError(error.message))
    }
  }


  //password setting
  export const passwordSettingCtr = async (req,res,next) => {
    const {oldPassword, newPassword} = req.body;
    try {
      const user = await User.findById(req.userAuth)
    
    if(!user){
      next(AppError("Access Denied", 403));
    }
  
    //get password
    //check if the password when logged in is equal to the password the provided
    const isPasswordFound = await bcrypt.compare(oldPassword,user.password);

      if(!isPasswordFound){
        next(AppError("Incorrect password",403));
      }
      //hash the newpassword
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword,salt);
      
      //Now update the new password
      const updatePassword = await User.findByIdAndUpdate(user._id,{
        password: hashPassword,
      });
      if(!updatePassword){
        next(AppError("Password not updated",403))
      }

    res.json({
      status: "success",
      data: "Password updated successfully"
    })

    const html = `<h3>success</h3><br/> <p>Your password changed successfully</p>`
    await sendEmail(user.email,'Password Message', html);

    } catch (error) {
      next(AppError(error.message))
    }
  }


  //display all user by Admin
  export const displayUserByAdminCtr = async (req, res, next) => {
    try {
      const user = await User.find({})

      res.json({
        status:"SUCCESS",
        data:user
      })
    } catch (error) {
      next(AppError(error.message))
    }
  }

