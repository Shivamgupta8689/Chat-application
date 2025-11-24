import React from 'react'

const Message = ({message}) => {
  const authUser = JSON.parse(localStorage.getItem("messenger"));
  const itsme = message.senderId === authUser.user._id;
  const chatName = itsme ? "chat-end" : "chat-start";
  const chatColor = itsme ? "bg-blue-400" : "bg-black";
  const createdAt = new Date(message.createdAt)
  const formattedTime = createdAt.toLocaleTimeString([],{
    hour: '2-digit',
    minute: '2-digit'
  })


  return (
    <>
        <div className=' p-4'>
      <div className={`chat ${chatName}`}>
  <div className={`chat-bubble text-white ${chatColor}`}>{typeof message === "string" ? message : message?.message}</div>
  <div className="chat-footer text-xs">{formattedTime}</div>
</div>
    </div>
    </>
  )
}

export default Message
