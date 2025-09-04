import NodeMailer from 'nodemailer'
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

export const sendMail = async (mailInfo) => {
    // Configurar el transportador (transporter)
    console.log(process.env.EMAIL_SERVICE, process.env.EMAIL_SENDER_ADDRESS, process.env.EMAIL_SENDER_APPLICATION_PASSWORD, mailInfo);
/*
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
        from: process.env.EMAIL_SENDER_ADDRESS,
        to: "juanescs08@gmail.com",//mailInfo.to,
        subject: mailInfo.subject,
        html: mailInfo.html
    });
    console.log(result);*/

    const transporter = NodeMailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_SENDER_ADDRESS,
            pass: process.env.EMAIL_SENDER_APPLICATION_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_SENDER_ADDRESS, // Dirección del remitente
        to: mailInfo.to, // Dirección del destinatario
        subject: mailInfo.subject, // Asunto del correo
        //text: 'Hola, este es un correo enviado desde Node.js usando Nodemailer.', // Texto del correo
        html: mailInfo.html
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado con éxito:', info.response);
        }
    });
}


