import User from '../../models/User.js';

const updateUserPassword = async (req, res) => {
    const { newPassword } = req.body;

    const isValidPassword = (input) => {
        return typeof input === 'string' &&
            input.length >= 6 &&
            input.length <= 100;
    }

    if (!isValidPassword(newPassword)) {
        return res.status(400).json({ error: "contraseña invalida" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    user.password = newPassword;
    await user.save();

    if (req.recoveryToken) {
        const result = await req.recoveryToken.markAsUsed();
    }

    res.status(200).json({ success: true });
};

export default updateUserPassword;