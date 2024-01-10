
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const getToken = async (user) => {
   const token = await jwt.sign({id: user._id}, process.env.SECRET_KEY)
   return token;
}