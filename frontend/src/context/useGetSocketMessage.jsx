import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext.jsx'
import useConversation from '../statemanage/Useconversation.js';
import sound from "../assets/notification.mp3"

const useGetSocketMessage = () => {
    const {socket} = useSocketContext();
    const {messages, setMessages} = useConversation();

    useEffect(()=>{
        socket.on("newMessage", (newMessage)=>{
            const notification = new Audio(sound);
            notification.play().catch((err) => console.warn("Audio play blocked:", err));
            setMessages((prev) => [...prev, newMessage]);
            // setMessages([...messages, newMessage]);
        })
        return ()=> socket.off("newMessage")
    },[socket, setMessages])
}

export default useGetSocketMessage
