import React, { useContext, useEffect, useState } from "react";
import { Message } from "./Message";
import { ChatContext } from "./../context/ChatContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const getMessages = () => {
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        console.log("This method is called");
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unsub();
      };
    };
    data.chatId && getMessages();
  }, [data.chatId]);

  console.log(messages);

  return (
    <div className="messages">
      {messages.map((msg) => (
        <Message message={msg} key={msg.id} />
      ))}
    </div>
  );
};
