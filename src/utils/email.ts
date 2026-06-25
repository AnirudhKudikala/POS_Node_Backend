import nodemailer from 'nodemailer';

console.log(process.env.EMAIL);
console.log(process.env.EMAIL_APP_PASSWORD);

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});