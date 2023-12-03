import mongoose, {mongo} from "mongoose"

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stroke: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

export const WorkoutModel = mongoose.model("workouts", WorkoutSchema)
