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
router.post('/', async (req, res) => {
    try {
        const abstractSubmission = new AbstractSubmission({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            subject: req.body.subject,
            message: req.body.message
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