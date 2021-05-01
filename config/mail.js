import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "teslamatb@gmail.com",
        pass: process.env.pass
    }
});

export default transporter;