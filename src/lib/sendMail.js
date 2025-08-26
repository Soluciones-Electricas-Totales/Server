import NodeMailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();

export const sendMail = (mailInfo) => {
    // Configurar el transportador (transporter)
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


