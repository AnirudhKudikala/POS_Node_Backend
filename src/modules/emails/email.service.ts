import nodemailer from "nodemailer";
import { SendEmailRequest } from "./email.types";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

export const sendEmail = async (
    request: SendEmailRequest
) => {

    await transporter.sendMail({

        from: process.env.EMAIL_USER,

        to: request.to,

        subject: request.subject,

        text: request.text,

        html: request.html,

        attachments: request.attachment
            ? [
                  {
                      filename:
                          request.attachment.filename,
                      content:
                          request.attachment.content,
                  },
              ]
            : [],
    });
};