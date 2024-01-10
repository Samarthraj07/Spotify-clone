import passport from "passport";
import Song from "../models/Song.js"
import User from "../models/User.js";

export const createSong = async (req, res) => {
    try {
        const {name, thumbnail, track} = req.body;

        if (!name || !thumbnail || !track) {
            return res.status(301).json("Please fill all the require details about the song you are creating")
        }
        
        const artist = req.user._id
        const songDetails = {name, thumbnail, track, artist};
        const createdSong = await Song.create(songDetails)
        return res.status(200).json(createdSong)
    } catch (error) {
        res.status(401).json(error.message)
    }
}

export const getMysongs = async (req, res) => {
    try {
        const currentUser = req.user;

        const songs = await Song.find({artist: req.user._id}).populate("artist")
        return res.status(200).json({data: songs})
    } catch (error) {
        
    }
}

export const getArtistSongs = async (req, res) => {
    try {
       const {artistId} = req.params;
       console.log(typeof(artistId));
       const isvalidArtist = await User.findOne({_id: artistId});
       console.log(isvalidArtist)
       if (!isvalidArtist) {
        return res.status(403).json("Artist does not exist!")
       }
       
       const songs = await Song.find({artist: artistId})
       return res.status(200).json({data: songs})
    } catch (error) {
        res.status(403).json(error.message)
    }
}

export const getSongsByName = async (req, res) => {
    try {
        const {songName} = req.params;
       
        
        const songs = await Song.find({name: songName}).populate("artist")
        return res.status(200).json({data: songs})
     } catch (error) {
         res.status(403).json(error.message)
     }
}

