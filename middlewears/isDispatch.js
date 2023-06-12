import User from "../model/userModel.js";
import { obtainTokenFromHeader } from "../utils/obtainTokenFromHeader.js";
import { verifyToken } from "../utils/verifytoken.js";

export const isDispatch = async (req, res, next) => {
  //get token header
  const token = obtainTokenFromHeader(req);
  //verify

  const userDeCoded = verifyToken(token);

  req.userAuth = userDeCoded.id;

  //find the user from database
  const user = await User.findById(userDeCoded.id);
  //check if the user is an Dispatch

  if (user.isDispatch) {
    return next();
  } else {
    return res.json({
      status: "error",
      message: "Access Denied",
    });
  }
};