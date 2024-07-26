import React, { useEffect, useState, useRef } from 'react';
import { ChatBar } from '../../components/chatBar/ChatBar';
import { ChatBody } from '../../components/chatBody/ChatBody';
import { ChatFooter } from '../../components/chatFooter/ChatFooter';
import './Chat.scss';

interface ISocket {
  socket: any;
}

interface IMessage {
  id: string;
  username: string;
  text: string;
  socketId: string;
  createdAt: string;
  updatedAt: string;
}

export const Chat: React.FC<ISocket> = ({ socket }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [typingStatus, setTypingStatus] = useState<string>('');
  const lastMessageRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    const setReceivedMessages = (data) => {
      setMessages([...messages, ...data]);
    };

    socket.current.on('messageResponse', setReceivedMessages);
  }, [socket, messages]);

  useEffect(() => {
    socket.current.on('typingResponse', (data) => {
      if (data) {
        setTypingStatus(data);
      } else {
        console.log('User is no longer typing');
      }
    });
  }, [socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody socket={socket} messages={messages} lastMessageRef={lastMessageRef} />
        <div className="chat__footer">
          <ChatFooter socket={socket} typingStatus={typingStatus} />
        </div>
      </div>
    </div>
  );
};
