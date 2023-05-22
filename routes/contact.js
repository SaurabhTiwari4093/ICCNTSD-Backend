import express from "express"
const router = express.Router()
import Contact from "../model/contact.js";

//Get
router.get('/', async (req, res) => {
    try {
        const contact = await Contact.find()
        res.status(200).json({
            status: 200,
            length: contact.length,
            contact: contact
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
import multer from "multer";
const upload = multer({ dest: "client/uploads/abstractSubmission" });

router.post('/', upload.none(), async (req, res) => {
    try {
        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            subject: req.body.subject,
            message: req.body.message
        })
        const newContact = await contact.save();
        res.status(200).json({
            status: 200,
            contact: newContact
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