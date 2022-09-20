const express = require("express");
const db = require('../models/index');
const User = db.users;

const saveUser = async (req, res, next) => {
    try {
        console.log(req.body)
        const username = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (username) {
            return res.status(409).send("username already taken");
        }

        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (emailcheck) {
            return res.status(409).send("Authentication failed");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    saveUser,
};