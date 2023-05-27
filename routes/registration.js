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
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
        secretAccessKey: 'TQpM5APN1GZXSuaoWMzmmG+0SzQ+QIGjJipsOUEa',
        accessKeyId: 'AKIAZJ2NPFB7NICVVINQ',
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "iccntsd",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        contentDisposition: "inline",
        key: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1];
            const fileName = file.fieldname + "_" + Date.now() +"."+ext;
            cb(null, fileName);
        }
    })
});

router.post('/', upload.single('paymentFile'), async (req, res) => {
    try {
        const paymentFileUrl = req.file.location;
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