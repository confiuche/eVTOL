//import User from "../model/UserModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { obtainTokenFromHeader } from "../utils/obtaintokenfromheader.js";
import Location from "../model/locationModel.js"
import AppError from "../utils/AppErr.js";


export const createLocationCtr = async (req, res, next) => {
    const { location } = req.body;
    try {
        const isLocatationExist = await Location.findOne({location});
        if(isLocatationExist){
            return next(AppError("Location already exist",409));
        }

        const locate = await Location.create({
            location,
            user: req.userAuth
        })

        res.json({
            status:"SUCCESS",
            data:locate
        })
    } catch (error) {
        next(AppError(error.message))
    }
}