
import Playlist from "../models/Playlist.js"
import Song from "../models/Song.js";

export const createPlaylist = async (req, res) => {
    try {
        const currentUser = req.user;
        const {name, thumbnail, songs} = req.body;
        
        if (!name || !thumbnail || !songs) {
            return res.status(301).json({err:"Insufficient Data"})
        }
        const playlistData = {
            name,
            thumbnail,
            songs,
            owner: currentUser._id,
            collaborators: []
        }
        const playlist = await Playlist.create(playlistData)
        return res.status(200).json(playlist)


    } catch (error) {
        res.status(403).json(error.message)
    }
}

export const getPlaylist = async (req, res) => {
    try {
       const playlistId = req.params.playlistId;
       
       const playlist = await Playlist.findOne({_id: playlistId}).populate({
        path: "songs",
        populate: {
            path: "artist"
        }
       })
       if(!playlist) {
        return res.status(301).json({err: "Playlist not found"})
       }
       return res.status(200).json(playlist)
       
    } catch (error) {
        res.status(403).json(error.message)
    }
}


export const getMyPlaylists = async (req, res) => {
    try {
        const artistId = req.user._id;
        console.log(artistId);

        const playlists = await Playlist.find({owner: artistId}).populate(
            "owner"
        );
        return res.status(200).json({data: playlists});
    } catch (error) {
 
        res.status(400).json(error.message)
    }
}
export const getPlaylistByArtist = async (req, res) => {
    try {
        const artistId = req.params.artistId;
        const playlists = await Playlist.find({owner:artistId})

        if(!playlists) {
            return res.status(301).json({err: "No playlist by this artist"})
        }
        return res.status(200).json({data:playlists})
    } catch (error) {
        res.status(403).json(error.message)
    }
}

export const addSongToPlaylist = async (req, res) => {
    try {
        const currentUser = req.user;
        const {playlistId, songId} = req.body;

        //getplaylist
        const playlist = await Playlist.findOne({_id: playlistId});
        if (!playlist) {
            return res.status(304).json({err:"Playlist does not exist!"})
        }
        // check if user is allowed to edit the playlist
        if ( !playlist.owner.equals(currentUser._id) && playlist.collaborators.includes() != currentUser._id) {
            return res.status(400).json({err:"Not allowed"})
        }
        //check if the song exists
        const validSong = await Song.find({_id:songId})
        if(!validSong) {
         res.status(304).json({err:"Song Does not Exists"})
        }

        playlist.songs.push(songId)
        await playlist.save()
        return res.status(200).json(playlist)
    } catch (error) {
        res.status(403).json(error.message)
    }
}

