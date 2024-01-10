import React, { useState } from 'react'
import InputBox from '../utilities/InputBox'
import {makeAuthenticatedPOSTRequest} from '../utils/serverHelper'

const CreatePlaylist = ({closeModal}) => {

  const [playlistName, setPlaylistName] = useState("")
  const [thumbnail, setThumbnail] = useState("")

  const createPlaylist = async () => {
    const data = {name: playlistName, thumbnail: thumbnail, songs:[]}
    const response = await makeAuthenticatedPOSTRequest("/playlist/create", data)
    
    if(response._id) {
      closeModal()
    }
    
  }
  return (
    <div className='absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center' onClick={closeModal}>
      <div className='bg-app-black w-1/3 rounded-md p-4'
      onClick={(e)=>{
        e.stopPropagation()
      }}>
        <div className='font-semibold text-lg mb-5 text-white'>Create Playlist</div>
        <div className='space-y-6 flex flex-col items-center'>
          <InputBox label="Name"
          lableColor="text-white"
          placeholder="Playlist name"
          value={playlistName}
          setValue={setPlaylistName}/>
          
          <InputBox label="thumbnail"
          lableColor="text-white"
          placeholder="thumbnail"
          value={thumbnail}
          setValue={setThumbnail}/>
          <div className='bg-gray-100 rounded p-2 flex justify-center items-center font font-semibold w-1/4 cursor-pointer hover:bg-white' 
          onClick={createPlaylist}>Create</div>
        </div>
      </div>
    </div>
  )
}

export default CreatePlaylist