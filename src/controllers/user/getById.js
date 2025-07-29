import User from '../../models/User.js';

const getById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).select('-password');
    res.status(200).json({ user });
};

export default getById;