import User from "../models/User.js"
import bcrypt from "bcrypt"
import { getToken } from "../utils/helper.js";

export const signUp = async (req, res) => {
    try {
        const {email, password, firstname, lastname} = req.body;
        //check if the user already exists
        const user = await User.findOne({email: email})
        if(user) {
            return res.status(403).json({error: "User already exist!"})
        }
        
        // hashing password 
        const hashedPassword = await bcrypt.hash(password, 10)
        // creating newUser 
        const userData = {
            email,
            password: hashedPassword,
            firstname,
            lastname
        }
        const newUser = await User.create(userData)  
        const token = await getToken(newUser)

        const returnToUser = {...newUser.toJSON(), token}
        delete(returnToUser.password);
        return res.status(200).json(returnToUser)

    } catch (error) {
        res.status(400).json(error.message)
    }
}
// login 
export const login = async (req, res) => {
    // get email password from request 
    try {
        
        const {email, password} = req.body;
        
        const user = await User.findOne({email: email})
        if(!user) {
            return res.status(403).json("Check ypur email or password!")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.status(403).json(" ypur email or password!")
        }
        const token = await getToken(user.email, user)
        const returnToUser = {...user.toJSON(), token}
        delete(returnToUser.password);
        return res.status(200).json(returnToUser)


    } catch (error) {
        res.status(400).json(error.message)
    }
}