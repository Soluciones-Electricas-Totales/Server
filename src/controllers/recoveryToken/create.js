import { sendMail } from "../../lib/sendMail.js";
import RecoveryToken from "../../models/RecoveryToken.js";
import User from "../../models/User.js"
import getHTMLBodySendToken from "./createMailHTML.js";

const createRecoveryToken = async (req, res) => {

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email es requerido" });
        }

        // Verificar que el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Invalidar tokens previos del usuario
        await RecoveryToken.updateMany(
            { email, used: false },
            { used: true }
        );

        const token = Math.floor(100000 + Math.random() * 900000).toString();

        // Crear nuevo token
        const recoveryToken = new RecoveryToken({
            userId: user._id,
            email: user.email,
            token
        });
        console.log(recoveryToken);

        const response = await recoveryToken.save();
        console.log(response);

        await sendMail({
            to: email,
            subject: "Recuperacion de contraseña",
            html: getHTMLBodySendToken({ token: token })
        });

        res.json({
            success: true,
            message: "Código de recuperación generado y enviado",
            //userId: user._id,
            expiresAt: recoveryToken.expiresAt,
            note: "El código fue enviado al email registrado"
        });

    } catch (error) {
        console.error("Error en createToken:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export default createRecoveryToken;