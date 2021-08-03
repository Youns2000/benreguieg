const express = require('express');
const passport = require("passport");
const jwt = require("jsonwebtoken");
var mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const User = require('../models/user');
const router = require('express').Router();
// const mailgun = require("mailgun-js");


router.post("/login", (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.send("Wrong email or password")
        }
        if (!user.actived) {
            res.send("Your account is not activated")
            return;
        }
        req.login(user, () => {
            const body = { _id: user.id, email: user.email }

            const token = jwt.sign({ user: body }, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJzdWIiOiIxMjM0NTY3ODkw", { expiresIn: '10800s' })
            return res.json({ token })
        })
    })(req, res, next)
})

module.exports = router;