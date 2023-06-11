import User from "../model/userModel.js"
import AppError from "../utils/AppErr.js"
import bcrypt from 'bcrypt'

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
        res.json({
            status:"SUCCESS",
            data:"Login successfully"
        })
    } catch (error) {
        next(AppError(error.message))
    }
}