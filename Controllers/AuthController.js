const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Verificar si el usuario ya existe
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists', success: false });
        }
        
        // Crear el nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();
        
        // Generar el token JWT
        const jwtToken = jwt.sign(
            { email: newUser.email, _id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Enviar respuesta de éxito con el token JWT
        res.status(201).json({ 
            message: 'User created successfully',
            success: true,
            jwtToken,
            email,
            name: newUser.name
        });

    } catch (err) {
        res.status(500).json({ 
            message: 'Internal server error',
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed: email or password is incorrect';
        
        // Verificar si el usuario existe
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Comparar las contraseñas
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        // Generar el token JWT
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Enviar respuesta de éxito con el token JWT
        res.status(200).json({ 
            message: 'Login Success',
            success: true,
            jwtToken,
            email,
            name: user.name
        });

    } catch (err) {
        res.status(500).json({ 
            message: 'Internal server error',
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};

