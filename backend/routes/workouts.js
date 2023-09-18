const express = require('express')
const { GetWorkout, createWorkout, deleteWorkout, getAllWorkouts, updateWorkout } = require("../controllers/workoutController.js");


// create instance of router
const router = express.Router()

// attach a handler to router
router.get('/', getAllWorkouts)

// GET a single workout
router.get('/:id', GetWorkout)

// POST a new workout || create a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

// export the router
module.exports = router 