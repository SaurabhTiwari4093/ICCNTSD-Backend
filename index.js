import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import mongoose from 'mongoose';

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

import cors from 'cors';
app.use(cors());

app.use(express.json());

app.use(express.static("client"));

// Contact API
import contactRouter from './routes/contact.js';
app.use('/api/contact', contactRouter);

// Abstract submission API
import abstractSubmissionRouter from './routes/abstractSubmission.js';
app.use('/api/abstractSubmission', abstractSubmissionRouter);

// Registration API
import registrationRouter from './routes/registration.js';
app.use('/api/registration', registrationRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})