import express from "express"
import {WorkoutModel} from "../models/Workouts.js";
import {verifyToken} from "./users.js";

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const stroke = req.query.stroke
        const distance = req.query.distance
        const response = await WorkoutModel.find({stroke, distance})
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

router.get("/:userID", verifyToken, async (req, res) => {
    try {
        const userID = req.params.userID
        const workouts = await WorkoutModel.find({userOwner: userID})
        res.json(workouts)
    } catch (err) {
        res.json(err)
    }
})

router.post("/", verifyToken, async (req, res) => {
    const workout = new WorkoutModel(req.body)

    try {
        const response = await workout.save()
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

router.get("/edit/:workoutID", verifyToken,async (req, res) => {
    const workoutID = req.params.workoutID
    try {
        const response = await WorkoutModel.findById(workoutID)
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

router.put("/:workoutID", verifyToken, async (req, res) => {
    const workoutID = req.params.workoutID
    try {
        const response = await WorkoutModel.findByIdAndUpdate(workoutID, req.body, {new: true})
        res.json(response)
    } catch (err) {
        res.json(err)
    }
})

router.delete("/:workoutID", verifyToken,async (req, res) => {
    const workoutID = req.params.workoutID
    try {
        await WorkoutModel.findByIdAndDelete(workoutID)
        res.json({message: "Workout deleted"})
    } catch (err) {
        res.json(err)
    }
})

export {router as workoutRouter}
