import User from '../../models/User.js';

const deleteUser = async (req, res) => {

    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await user.anonymize();

    res.status(200).json({ success: true });
};

export default deleteUser;