import React, { useEffect, useRef } from "react";
import Message from "./Message";
import UseGetMessage from "../context/UseGetMessage.js";
import Loading from "../components/Loading.jsx";
import useGetSocketMessage from "../context/useGetSocketMessage.jsx";
import useConversation from "../statemanage/Useconversation.js";

const Messages = () => {
  const { messages: apiMessages, loading } = UseGetMessage();
  const { messages, setMessages } = useConversation();
  useGetSocketMessage();
  const lastMessageRef = useRef();

  // 1️⃣ Load API messages into store on first load
  useEffect(() => {
    if (Array.isArray(apiMessages)) {
      setMessages(apiMessages);
    }
  }, [apiMessages, setMessages]);

  // 2️⃣ Scroll to last message when messages change
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  if (loading) {
    return <Loading />;
  }

  // Always render from store
  const messageList = Array.isArray(messages) ? messages : [];

  return (
    <div className="" style={{ height: "calc(100vh - 22vh)" }}>
      {messageList.length > 0 ? (
        messageList.map((message, index) => (
          <div key={message._id || index} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
  <p className="text-center font-sans text-white text-2xl animate-bounce">
    👋 Hey there!
  </p>
</div>

      )}
    </div>
  );
};

export default Messages;
