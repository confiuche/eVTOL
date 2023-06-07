import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true, "firstname is required"],
    },
    lastname:{
        type:String,
        rquired:[true,"lastname is required"],
    },
    phoneNumber:{
        type:String,
    },
    profilephoto:{
        type:String
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },isBlocked:{
        type:Boolean
    }
    
},
{
    timestamps:true,
    toJSON:{virtuals:true}
}
);

const User = mongoose.model("User", userSchema);
export default User;