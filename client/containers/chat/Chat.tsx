import React, { useEffect, useState, useRef } from 'react';
import { ChatBar } from '../../components/chatBar/ChatBar';
import { ChatBody } from '../../components/chatBody/ChatBody';
import { ChatFooter } from '../../components/chatFooter/ChatFooter';

interface ISocket {
  socket: any;
}

export const Chat: React.FC<ISocket> = ({ socket }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [typingStatus, setTypingStatus] = useState<string>('');
  const lastMessageRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
          socket={socket}
        />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};
