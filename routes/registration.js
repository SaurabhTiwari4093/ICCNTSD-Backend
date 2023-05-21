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
            registration: registration,
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
        const checkUserAlreadyRegistered = await Registration.findOne({ email: req.body.email })
        if (checkUserAlreadyRegistered === null) {
            const registration = new Registration({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                subject: req.body.subject,
                message: req.body.message
            })
            const newRegistration = await registration.save();
            res.status(200).json({
                status: 200,
                registration: newRegistration
            })
        }
        else{
            res.status(409).json({
                status: 409,
                message: "Email already exist"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            status: 500,
            message: err.message
        })
    }
})

export default router