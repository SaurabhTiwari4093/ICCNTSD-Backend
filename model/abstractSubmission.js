import mongoose from "mongoose";

const abstractSubmissionSchema = new mongoose.Schema({
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

export default mongoose.model('AbstractSubmission', abstractSubmissionSchema)