import dotenv from "dotenv"
dotenv.config()

import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import {UserModel} from "../models/Users.js";

const router = express.Router()

router.post("/register", async (req, res) => {
    const {username, password} = req.body
    const user = await UserModel.findOne({username})

    if (user) {
        return res.status(401).json({error: "User already exists"})
    }

    if (username === "" || password === "") {
        return res.status(401).json({error: "Fields cannot be empty"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new UserModel({
        username,
        password: hashedPassword
    })
    await newUser.save()

    res.json({message: "User registered successfully"})
})

router.post("/login", async (req, res) => {
    const {username, password} = req.body
    const user = await UserModel.findOne({username})

    if (!user) {
        return res.status(401).json({error: "User doesn't exist"})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({error: "Incorrect password"})
    }

    const token = jwt.sign({id: user._id}, process.env.SECRET)
    res.json({token, userID: user._id})
})

export {router as userRouter}

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, process.env.SECRET, (err) => {
            if (err) return res.sendStatus(401)
            next()
        })
    } else {
        res.sendStatus(401)
    }
};
