import express from "express"
import {createSong, getMysongs, getArtistSongs,getSongsByName } from "../components/song.js"
import passport from "passport"

const router = express.Router() 

router.post('/create', passport.authenticate("jwt", {session: false}) ,createSong )
router.get('/get/mySongs', passport.authenticate("jwt", {session: false}), getMysongs)

// get all songs published by artist 
router.get('/get/artist/:artistId', passport.authenticate("jwt", {session: false}), getArtistSongs)
// get song by name
router.get('/get/:songName', passport.authenticate("jwt", {session: false}), getSongsByName)

export default router