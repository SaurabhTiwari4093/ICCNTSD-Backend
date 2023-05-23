import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    presentDesignation: {
        type: String,
    },
    nameOfInstitute: {
        type: String,
    },
    titleOfAbstract: {
        type: String,
    },
    modeOfPresentation: {
        type: String,
    },
    correspondenceAddress:{
        type: String,
    },
    mobileNo:{
        type:String,
    },
    emailAddress:{
        type:String,
    },
    nameOfAccountholder:{
        type:String,
    },
    accountNo:{
        type:String,
    },
    nameAndAddressOfBankBranch:{
        type:String,
    },
    IFSCcode:{
        type:String,
    },
    amountPaid:{
        type:String,
    },
    transactionIDno:{
        type:String,
    },
    dateOfTransaction:{
        type:String,
    },
    paymentReceipt:{
        type:String,
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

export default mongoose.model('Registration', registrationSchema)