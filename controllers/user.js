// const models = require('../models/index');
const bcrypt = require("bcrypt");
const db = require("../models/index");
const jwt = require("jsonwebtoken");

const User = db.users;

const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const data = {
            userName,
            email,
            password: await bcrypt.hash(password, 10),
        };

        const user = await User.create(data);

        return res.status(201).json({message:"User created successfully", "user":user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occured while processing your request"});
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: {email : email} });

        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                
                var response = {
                    loginToken : token
                }
                return res.status(201).json({message:"Login successful", data:response});
            } else {
                return res.status(401).json({message:"Authentication failed"});
            }
        } else {
            return res.status(401).json({message:"Authentication failed"});
        }
    } catch (error) {
        console.log(error);
    }
        return res.status(500).json({message:"An error occurred while processing your request"});
    
};

module.exports = {
    signup,
    login,
};

// module.exports = async (req, res) => {
//     try {

//         const data = req.body;

//         const existingEmail = await models.users.findOne({ where: { email: data.email } })
//         if (existingEmail)
//             return res.json({ 'Error': "Email already taken" });

//         const user = await models.users.create(data);

//         return res.json(user);
//     } catch (err) {
//         return res.json(err)
//     }
// }