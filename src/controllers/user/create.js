import User from "../../models/User.js"

const createUser = async (req, res) => {
    const { email, nombre, apellido, password } = req.body;
    console.log(email);

    const user = await User.create({
        email,
        nombre,
        apellido,
        password
    });

    // Don't send password in response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ user: userResponse });
};

export default createUser;