import RecoveryToken from "../../models/RecoveryToken.js";
import User from "../../models/User.js"

const checkToken = async (req, res, next) => {

    try {
        const { email, token } = req.body;

        if (!email || !token) {
            return res.status(400).json({ error: "campos faltantes" });
        }

        if (!/^\d{6}$/.test(token)) {
            return res.status(400).json({
                error: "El token debe tener 6 dígitos"
            });
        }

        // Verificar que el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "unauthorized" });
        }

        const BDToken = await RecoveryToken.findOne({
            userId: user.id,
            email: email,
            used: false
        })
        if (!BDToken) {
            return res.status(401).json({ error: "unauthorized" });
        }
        const validToken = await BDToken.isValid();
        if (!validToken) {
            return res.status(401).json({ error: "unauthorized" });
        }


        const correct = await BDToken.compareToken(token);

        if (!correct) {
            await BDToken.incrementAttempts()
            return res.status(401).json({ error: "unauthorized" });
        }
        req.user = { _id: user.id }
        req.recoveryToken = BDToken;
        next();

    } catch (error) {
        console.error("Error en createToken:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export default checkToken;