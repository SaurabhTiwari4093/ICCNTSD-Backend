import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

export default mongoose.model('Registration', registrationSchema)