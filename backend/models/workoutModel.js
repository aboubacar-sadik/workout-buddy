import mongoose from "mongoose";

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true }) // "timestamps" assigns a createdAt property to the document

const workoutModel = mongoose.model('Workout', workoutSchema, 'workouts')

export default workoutModel