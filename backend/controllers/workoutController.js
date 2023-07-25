// import the workout model created in "../models/workoutModel.js" with mongoose
import mongoose from 'mongoose'
import Workouts from '../models/workoutModel.js'

// get all workouts
export async function getAllWorkouts(req, res) {
    const workouts = await Workouts.find({})

    res.status(200).json(workouts)
}

// get a single workout
export async function GetWorkout(req, res) {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'No such workout !!!' })
    }

    const workout = await Workouts.findById(id)

    if (!workout) {
        // we put the "return" to not let the function cary one and fire the rest of the code
        return res.status(404).json({ error: 'No such workout !' })
    }

    res.status(200).json(workout)
}

// create new a workout
export async function createWorkout(req, res) {
    ///// because of middleware in server.js "app.use(expres.json())", 
    ///// all request body that comes along with the request will be passed onto the "req" object, so we can use it. 
    ///// EX: when we send a title, excerpt, slug from a form, 
    ///// all the values can be accessible with => const { title, excerpt, slug } = req.body
    const { title, reps, load } = req.body

    // customizing the error
    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields.', emptyFields })
    }

    // because there migth be an error, we use try and catch, to catch this error and do something with it
    try {
        // because this is an async function, we make the top level function async
        // object inside "create()" represents the new document we want to create
        const workout = await Workouts.create({ title, reps, load })

        // send a 200 status to annonce everything is ok
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a workout

export async function deleteWorkout(req, res) {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'No such workout !!!' })
    }

    const workout = await Workouts.findByIdAndDelete(id)

    if (!workout) {
        return res.status(400).json({ error: 'No such workout !' })
    }

    res.status(200).json(workout)
}

// update a workout

export async function updateWorkout(req, res) {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: 'No such workout !!' })
    }

    const workout = await Workouts.findByIdAndUpdate(id, {
        ...req.body,
    })

    if (!workout) {
        return res.status(400).json({ error: "No such workout !!!" })
    }

    res.status(200).json(workout)
}