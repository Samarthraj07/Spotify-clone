import React from 'react'

const InputBox = ({label, placeholder,value, setValue, lableColor}) => {
  return (
    <div className="inputField flex flex-col m-2 my-3 space-y-2 w-full">
      <label  id={label} className={`font-semibold ${lableColor}`}>{label}</label>
      <input for={label} type='text' placeholder={placeholder} className='border border-gray-300 rounded p-2 outline-none'
      value={value}
      onChange={(e)=> {
        setValue(e.target.value)
      }}
      />
    </div>
  )
}

export default InputBox