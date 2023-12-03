import dotenv from "dotenv"
dotenv.config()

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import {userRouter} from "./routes/users.js"
import {workoutRouter} from "./routes/workouts.js";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/auth", userRouter)
app.use("/workouts", workoutRouter)

mongoose.connect(process.env.MONGODB_URL)

app.listen(process.env.PORT, () => console.log("SERVER STARTED!"))
