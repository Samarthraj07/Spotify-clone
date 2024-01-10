import express from "express"
import {login, signUp} from "../components/auth.js"

const router = express.Router()
// auth routes 
router.post('/register', signUp)
router.post('/login', login)


export default  router; 