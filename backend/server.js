import express from 'express'
import 'dotenv/config'
// import all routes from "workouts.js"
import workoutRoutes from './routes/workouts.js'
// import mongoose
import mongoose from 'mongoose'
// import cors
import cors from 'cors'

// express app
const app = express()

// set cors
app.use(cors())

// set middleware
app.use(express.json())
app.use((req, res, next) => { // this function will fire on EVERY REQUEST

    // have to be set at the end in order to move to the next middleware
    next()
})

// using all routes imported (workoutRoutes) || set routes handler
// .use grabs all routes attached in routes/workouts.js and uses/attaches them on the app
// when using "/api/workout" it means, when a request is made to this path, then it will use workoutRoutes routes provided
app.use('/api/workouts', workoutRoutes)

// connect to database
mongoose.connect(process.env.MONGODB_URL)
    // it takes some times to connect so we pass .then to fire a function when it is done
    .then(() => {
        // listen for a request
        // now we only listen to this request once we are connected to the database
        app.listen(process.env.PORT, () => {
            console.log('Database connected and Server started !!!');
        })
    })
    // set a .catch to catch any error if there is one
    .catch((err) => {
        console.log(err)
    })

