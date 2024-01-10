import React from 'react'

const TextWithHover = ({displayText, active}) => {
  return (
    <div className=' cursor-pointer px-4 flex items-center'>
         <div className={`${active? "text-white": "text-gray-400"} text-lg font-semibold hover:text-white`}>{displayText}</div>
    </div>
  )
}


export default TextWithHover