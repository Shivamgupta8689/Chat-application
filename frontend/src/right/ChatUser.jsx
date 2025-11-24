import React from 'react'
import useConversation from '../statemanage/Useconversation.js'
import { useSocketContext } from '../context/SocketContext.jsx';

const ChatUser = () => {
  const {selectedConversation} = useConversation();
  const {onlineUsers} = useSocketContext();

  const defaultPic = "https://img.daisyui.com/images/profile/demo/gordon@192.webp";

  const getOnlineUserStatus = (userId)=>{
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  }

  return (
    <>
     <div className='pl-5 pt-5 h-[12vh] pb-3 flex space-x-4 bg-gray-900 hover:bg-gray-600 duration-300'>
        
        <div className='avatar online'>
            <div className="w-14 rounded-full">
              <img 
                src={selectedConversation?.profilePic || defaultPic} 
                alt="profile"
              />
            </div>
        </div>

        <div>
          <h1 className='text-xl'>{selectedConversation.name}</h1>
          <span className='text-sm'>
            {getOnlineUserStatus(selectedConversation._id)}
          </span>
        </div>

     </div>
    </>
  )
}

export default ChatUser
