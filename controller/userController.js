import User from "../model/userModel.js"
import AppError from "../utils/AppErr.js"
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js';
import { obtainTokenFromHeader } from "../utils/obtainTokenFromHeader.js";
import { isLogin } from "../middlewears/isLogin.js";

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