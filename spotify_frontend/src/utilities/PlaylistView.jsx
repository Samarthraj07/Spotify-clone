import React from 'react'
import PlaylistCard from './PlaylistCard'

const PlaylistView = ({playlistName, cardData}) => {
     
  return (
    <div className='text-white text-lg font-semibold w-full mb-5 p-3'>
        <div className="name p-2">{playlistName}</div>
       


        <div className="cards flex justify-start items-center">890- 
        {
            cardData.map((item)=>{
                return <PlaylistCard name={item.name} 
                descryption={item.descryption} 
                imgUrl={item.imgUrl}/>
            })
        }
       
        </div>
    </div>
  )
}

export default PlaylistView