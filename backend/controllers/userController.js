import userModel from "../models/userModel.js"

// login
export const loginUser = async (req, res) => {
    res.json({ mssg: 'user login' })
}
// signup
export const signupUser = async (req, res) => {
    res.json({ mssg: 'user sign up' })
}
