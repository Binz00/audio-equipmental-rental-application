import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    
    email:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true
    },
    isApproved:{
        type: Boolean,
        default: false
    },
    profilePicture:{
        type: String,
        default: "https://images.app.goo.gl/AzyP7Dox3fhgBRut8"    
    }
})

const Review= mongoose.model("Review",reviewSchema);
export default Review;