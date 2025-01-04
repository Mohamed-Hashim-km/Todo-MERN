import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
   
    
})


//====================== for decrept password/===============/
userSchema.methods.matchPassword=async function (enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)
}

const User=mongoose.model("User",userSchema)
export default User;