import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 128, // Adjusted to a more reasonable maximum length
        required: true,
    },
    role:{
        type: String,
        required: true,
        default: 'user',
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;