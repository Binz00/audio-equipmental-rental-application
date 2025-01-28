import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "customer"
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },    
    address: {
        type: String,
        required: true
    }, 
    phone: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://images.app.goo.gl/AzyP7Dox3fhgBRut8"

    }
    
});

const User = mongoose.model("User", userSchema);

export default User;