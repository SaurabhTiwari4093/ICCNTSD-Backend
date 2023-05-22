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

import multer from "multer"
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "client/uploads/abstractSubmission");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});
const upload = multer({ storage: multerStorage });


router.post('/', upload.single('abstractFile'), async (req, res) => {
    try {
        const abstractFileUrl = "https://www.iccntsd.in/uploads/abstractSubmission/"+req.file.filename;
        const abstractSubmission = new AbstractSubmission({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            title: req.body.title,
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