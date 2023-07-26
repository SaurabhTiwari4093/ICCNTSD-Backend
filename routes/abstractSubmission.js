import express from "express"
const router = express.Router()
import AbstractSubmission from "../model/abstractSubmission.js";

//Get
router.get('/', async (req, res) => {
    try {
        const abstractSubmission = await AbstractSubmission.find()
        res.status(200).json({
            status: 200,
            length: abstractSubmission.length,
            abstractSubmission: abstractSubmission
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
            const fileName = file.fieldname + "_" + Date.now() + "." + ext;
            cb(null, fileName);
        }
    })
});

router.post('/', upload.single('abstractFile'), async (req, res) => {
    try {
        const abstractFileUrl = req.file.location;
        const abstractSubmission = new AbstractSubmission({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            title: req.body.title,
            grantNumber:req.body.grantNumber,
            abstractFile: abstractFileUrl
        })
        const newAbstractSubmission = await abstractSubmission.save();
        res.status(200).json({
            status: 200,
            abstractSubmission: newAbstractSubmission
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