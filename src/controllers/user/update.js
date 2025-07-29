import User from '../../models/User.js';

const updateUser = async (req, res) => {
    const id = req.params.id;
    const updatedFields = req.body;
    const user = await User.findByIdAndUpdate(id, updatedFields, { new: true });
    res.status(200).json({ user });
};

export default updateUser;