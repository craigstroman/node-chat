import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatBody.scss';

interface IMessage {
  id: string;
  username: string;
  text: string;
  socketId: string;
  createdAt: string;
  updatedAt: string;
}

interface ISocket {
  messages: IMessage[];
  lastMessageRef: any;
  socket: any;
}

export const ChatBody: React.FC<ISocket> = ({ socket, messages, lastMessageRef }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    socket.current.emit('leaveChat', {
      socketID: socket.current.id,
    });
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <div className="chat-body">
      <div className="chat-body__header">
        <h2>Hangout with Colleagues</h2>
        <button type="button" className="chat-body__header-leave-btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </div>
      <div className="chat-body__messages">
        {messages &&
          messages.length >= 1 &&
          messages.map((message) => (
            <div className="chat-body__message-chats" key={`${message.socketId}-${message.createdAt}`}>
              <p className="chat-body__message-sender">{message.username}</p>
              <p className="chat-body__message-text">{message.text}</p>
            </div>
          ))}
      </div>
      <div ref={lastMessageRef} />
    </div>
  );
};
