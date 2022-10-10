const express = require('express');
const db = require('../models/index');
const User = db.users;

const validateUser = async (req, res, next) => {
    try {
        const username = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (username) {
            return res.status(409).json({ message: 'username already taken' });
        }

        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (emailcheck) {
            return res.status(409).json({ message: 'Email already taken' });
        }

        next();
    } catch (error) {}
};

module.exports = {
    validateUser,
};
