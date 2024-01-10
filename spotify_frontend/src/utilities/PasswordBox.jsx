import React from 'react'

const PasswordBox = ({label, placeholder, value, setValue}) => {
  return (
    <div className="inputField flex flex-col m-3 space-y-2 w-full">
      <label  id={label} className='font-semibold'>{label}</label>
      <input for={label} type='password' placeholder={placeholder} className='border border-gray-300 rounded p-2 outline-none'
      value={value}
      onChange={(e)=> {
        setValue(e.target.value)
      }}/>
    </div>
  )
}

export default PasswordBox