import React from 'react'

const PlaylistCard = ({name, descryption, imgUrl}) => {
  return (
    <div className='w-1/6 h-ful p-4 bg-black bg-opacity-30 rounded-lg mx-3'>
        <div className='py-4'>
            <img className="w-full rounded" src={imgUrl} alt="" />
        </div>
        <div className='name text-white text-sm font-semibold py-2'>{name}</div>
        <div className='description text-gray-500 text-xs'>{descryption}</div>
    </div>
  )
}

export default PlaylistCard