import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true,
        private: true
    },
    likedSongs: {
        type: Array,
        required: []
    }
})

const User = mongoose.model("User", userSchema);

export default User