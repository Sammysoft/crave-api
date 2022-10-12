import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstname: {
        type: String
    }, lastname: {type: String},
    username:{type: String},
    email: {type: String},
    password:{type:String},
    phone_number:{type:String},
    date_of_birth:{type:String}
})

const User = mongoose.model("User", UserSchema)
export default User;