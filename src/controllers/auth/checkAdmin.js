
const checkAdmin = async (req, res, next) => {
    //console.log(req.user);
    if (req.user.userType !== "admin") {
        return res.status(401).json({ message: 'unauthorized' });
    }
    next();
};

export default checkAdmin; 