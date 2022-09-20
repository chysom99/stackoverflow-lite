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

        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);

            return res.status(201).send(user);
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);

                var response = {
                    email : user.email
                }
                return res.status(201).send(response);
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
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