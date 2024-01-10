import express from "express"
import {addSongToPlaylist, createPlaylist,getMyPlaylists,getPlaylist, getPlaylistByArtist } from "../components/playlist.js"
import passport from "passport";

const router = express.Router()

//create playlist;
router.post('/create', passport.authenticate('jwt', {session: false}), createPlaylist)
//get playlist by id
router.get('/get/:playlistId', passport.authenticate('jwt', {session: false}), getPlaylist)
//get all playlist by artist
router.get('/get/artist/:artistId', passport.authenticate("jwt", {session:false}),getPlaylistByArtist)
// get all playlists created user 
router.get('/get/my/:me', passport.authenticate("jwt", {session:false}), getMyPlaylists)
//add song to playlist
router.post('/add/song', passport.authenticate("jwt", {session:false}), addSongToPlaylist)
export default  router; 