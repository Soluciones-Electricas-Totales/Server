import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/passport.js';

const login = async (req, res) => {
    const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({
        userId: req.user._id,
        token: token
    });
};

export default login; 