import React, { useEffect, useState } from 'react'
import LoggedInContainer from '../containers/LoggedInContainer'
import { makeAuthenticatedGETRequest } from '../utils/serverHelper'
import {useNavigate } from 'react-router-dom'

const Library = () => {
    
    const [myPlaylist, setMyPlaylist] = useState([])
    useEffect(() => {
        
        const getData = async() => {
            const response = await makeAuthenticatedGETRequest("/playlist/get/my/:me");
            setMyPlaylist(response.data)

        }
       getData()
    }, []
    )

  return (
    <LoggedInContainer currentActiveScreen={"library"}>
        <div className='p-4 text-lg text-white font-semibold'>Your playlists</div>
        <div className='grid grid-cols-5 gap-4'> 
         {
            myPlaylist.map(item =>{
                return <Card  key={JSON.stringify(item)} title={item.name} imgUrl={item.thumbnail}
                playlistId= {item._id}/>
            })
         }
        </div>

    </LoggedInContainer>
  )
}

const Card = ({title, description, imgUrl, playlistId}) => {
    const navigate = useNavigate()
    return (
        <div className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer" onClick={() => {
            navigate("/playlist/" + playlistId);
        }}>
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md" src={imgUrl} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    );
};

export default Library