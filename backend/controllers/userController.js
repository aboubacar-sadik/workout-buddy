import userModel from "../models/userModel.js"

// login
export const loginUser = async (req, res) => {
    res.json({ mssg: 'user login' })
}
// signup
export const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.User.signup(email, password)

        res.status(200).json({ email, user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
