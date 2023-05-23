import express from "express"
const router = express.Router()
import Registration from "../model/registration.js";

//Get
router.get('/', async (req, res) => {
    try {
        const registration = await Registration.find()
        res.status(200).json({
            status: 200,
            length: registration.length,
            registration: registration
        })
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
})

//POST

import multer from "multer"
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "client/uploads/paymentReceipt");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});
const upload = multer({ storage: multerStorage });


router.post('/', upload.single('paymentFile'), async (req, res) => {
    try {
        const paymentFileUrl = "https://www.iccntsd.in/uploads/paymentReceipt/"+req.file.filename;
        const registration = new Registration({
            name:req.body.name,
            presentDesignation:req.body.presentDesignation,
            nameOfInstitute:req.body.nameOfInstitute,
            titleOfAbstract: req.body.titleOfAbstract,
            modeOfPresentation:req.body.modeOfPresentation,
            correspondenceAddress:req.body.correspondenceAddress,
            mobileNo:req.body.mobileNo,
            emailAddress:req.body.emailAddress,
            nameOfAccountholder:req.body.nameOfAccountholder,
            accountNo:req.body.accountNo,
            nameAndAddressOfBankBranch:req.body.nameAndAddressOfBankBranch,
            IFSCcode:req.body.IFSCcode,
            amountPaid:req.body.amountPaid,
            transactionIDno:req.body.transactionIDno,
            dateOfTransaction:req.body.dateOfTransaction,
            paymentReceipt:paymentFileUrl,
        })
        const newRegistration = await registration.save();
        res.status(200).json({
            status: 200,
            registration: newRegistration
        })
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
})

export default router