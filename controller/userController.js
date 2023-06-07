import AppError from "../utils/AppErr.js"

export const createUserCtr = async(req,res) => {
    try {
        res.json({
            status:"success",
            data:"account created successfully"
        })
    } catch (error) {
        next(AppError(error.message))
    }
}