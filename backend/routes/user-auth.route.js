// EXTERNAL MODULES
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookie_parser = require("cookie-parser");

// INTERNAL MODULES
const { UserModel } = require("../models/user-auth.model");

// ENVIRONMENT VARIABLES
const SECRET_KEY = process.env.SECRET_KEY;

const userRouter = express.Router();


userRouter.get("/", async (req, res) => {
    res.json({ "msg": "Accessing user-auth route" });
})

// REGISTER ENDPOINT
userRouter.post("/register", async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const checkExists = await UserModel.findOne({ email });
        if (!checkExists) {
            try {
                bcrypt.hash(password, 2, async (err, hash) => {
                    if (hash) {
                        const user = await new UserModel({ fullName, email, password: hash });
                        await user.save();
                        res.status(201).json({ "msg": `${fullName} has been registered successfully!!` });
                    }
                    else {
                        console.log("Error");
                        res.status(500).json({ "msg": "Error in hashing password", "error": err.message });
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
        else {
            res.status(409).json({ "msg": "user already exists" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": "Internal Server Error", "error": error.message });
    }
})

// LOGIN ENDPOINT
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkExists = await UserModel.findOne({ email });
        if (checkExists) {
            bcrypt.compare(password, checkExists.password, async (err, result) => {
                if (result) {
                    const normal_token = jwt.sign({ userID: checkExists._id }, SECRET_KEY, { expiresIn: "1h" });
                    const refresh_token = jwt.sign({ userID: checkExists._id }, SECRET_KEY, { expiresIn: "7d" });
                    res.cookie("normal_token", normal_token).cookie("refresh_token", refresh_token);
                    res.status(200).json({ "msg": "Logged in successfully", "normal_token": normal_token, "refresh_token": refresh_token })
                }
                else {
                    res.status(401).json({ "msg": "Invalid credentials" });
                }
            });
        }
        else {
            res.status(404).json({ "msg": "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "msg": "Internal Server Error", "error": error.message });
    }
})

module.exports = {
    userRouter
}
