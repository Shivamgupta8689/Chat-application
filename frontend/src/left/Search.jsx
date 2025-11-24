import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import GetAllUser from '../context/GetAllUser.jsx';
import useConversation from '../statemanage/Useconversation.js';
import toast from 'react-hot-toast';

const Search = () => {
  const [search, setSearch] = useState("")
  const [allUsers] = GetAllUser()
  const {setSelectedConversation} = useConversation()
  return (
    <div className=' px-3 py-3'>
      <form onSubmit={(e)=>{
        e.preventDefault();
        if(!search) return;
        const conversation = allUsers.find((user)=>{
          return user.name.toLowerCase().includes(search.toLowerCase())
        })
        if(conversation){
          setSelectedConversation(conversation);
          setSearch("")
        }else{
          toast.error("User not Found")
        }
      }}>
      <div className=' flex space-x-3'>
      <label className=" border-[1px] border-gray-700 bg-slate-900 rounded-lg input w-[80%]">
  <input className=' outline-none text-gray-500' type="search" required placeholder="Search" value={search} onChange={(e)=> setSearch(e.target.value)} />
      </label>
      <button className=' text-white'>
  <IoSearch className=' text-5xl p-2 hover:bg-gray-600 rounded-full duration-300'/>
      </button>
      </div>
      </form>
    </div>
  )
}

export default Search
