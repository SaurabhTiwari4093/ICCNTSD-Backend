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
    title: {
        type: String,
    },
    abstractFile: {
        type: String,
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

export default mongoose.model('AbstractSubmission', abstractSubmissionSchema)