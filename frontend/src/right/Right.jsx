import React, { useEffect } from 'react'
import ChatUser from './ChatUser'
import Messages from './Messages'
import Type from './Type'
import useConversation from '../statemanage/Useconversation.js'
import { useAuth } from '../context/Authprovider.jsx'

const Right = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null); // cleanup on unmount
  }, [setSelectedConversation]);

  return (
    <div className=' w-full bg-slate-800 text-gray-500'>
    <div>
      {!selectedConversation ? (
        <Nochat />
      ) : (
        <>
          <ChatUser />
          <div
            className='py-1 flex-scroll overflow-y-auto'
            style={{ maxHeight: "calc(100vh - 8vh)" }}
          >
            <Messages />
          </div>
          <Type />
        </>
      )}
      </div>
    </div>
  )
}

const Nochat = () => {
  const {authUser} = useAuth();

  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <h1 className='text-center text-lg font-bold'>No conversation selected</h1>
      <p className='text-gray-400'>Select a conversation to start chatting</p>
      {authUser?.user?.name && (
        <p className='mt-2 text-green-400'>Welcome, {authUser.user.name}!</p>
      )}
    </div>
  )
}

export default Right;
