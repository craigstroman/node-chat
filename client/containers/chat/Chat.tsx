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
    // TODO: Try and figure out why messageResponse is not getting new messages
    // TODO: Try and figure out why I'm not getting the emit response from the server
    console.log('socket.current: ', socket.current);
    console.log('socket.current.id: ', socket.current.id);
    socket.current.on('messageResponse', (data) => {
      console.log('messageResponse: ');
      console.log('data: ', data);
      setMessages([...messages, ...data]);
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.current.on('typingResponse', (data) => setTypingStatus(data));
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
          socket={socket}
          messages={messages}
          typingStatus={typingStatus}
          lastMessageRef={lastMessageRef}
        />
        <div className="chat__footer">
          <ChatFooter socket={socket} />
        </div>
      </div>
    </div>
  );
};
