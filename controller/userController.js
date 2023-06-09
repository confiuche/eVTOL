import User from "../model/userModel.js"
import AppError from "../utils/AppErr.js"

export const createUserCtr = async(req,res,next) => {
    const { firstname, lastname, phoneNumber, email, password } = req.body;
    try {
        //check if user has been registered before
        const foundUser = await User.findOne({email});

        if(foundUser){
            return next(AppError(`user with this email:${email} already exist`,409))
        }else{
            const user = await User.create({
                firstname,
                lastname,
                phoneNumber,
                email,
                password
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