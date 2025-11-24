import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import UseSendMessage from '../context/UseSendMessage.js';

const Type = () => {
  const {loading, sendMessage} = UseSendMessage();
  const [message, setMessage] = useState("")
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (!message.trim()) return; 
    await sendMessage(message);
    setMessage("");
  }
  return (
    <>
   
      <form onSubmit={handleSubmit}>
      <div className=' flex space-x-3 h-[10vh] items-center bg-gray-800 '>
        <div className='w-[80%] mx-4 '>
          <input 
            type="text" 
            value={message}
            onChange={(e)=>{
              setMessage(e.target.value)
            }}
            placeholder="Type here"
            className='border-[1px] border-gray-700 bg-slate-900 rounded-lg flex items-center w-full px-3 py-3 grow outline-none'
          />
        </div>
        <button type="submit" disabled={loading}  className='text-3xl text-blue-500 hover:text-blue-600 disabled:opacity-50'>
          <IoSend />
        </button>
      </div>
      </form>
    </>
  )
}

export default Type
