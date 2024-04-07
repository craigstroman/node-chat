import React from 'react';
import './ChatBody.scss';

interface IMessage {
  id: string;
  name: string;
  text: string;
}

interface ISocket {
  socket: any;
  messages: IMessage[];
  typingStatus: any;
  lastMessageRef: any;
}

export const ChatBody: React.FC<ISocket> = ({ socket, messages, typingStatus, lastMessageRef }) => {
  return (
    <div className="chat-body">
      <div className="chat-body__header">
        <h2>Hangout with Colleagues</h2>
        <button type="button" className="chat-body__header-leave-btn">
          LEAVE CHAT
        </button>
      </div>
      <div className="chat-body__messages">
        {messages &&
          messages.length >= 1 &&
          messages.map((message) =>
            message.name === localStorage.getItem('userName') ? (
              <div className="chat-body__message-chats" key={message.id}>
                <p className="chat-body__message-sender">You</p>
                <p className="chat-body__message-text">{message.text}</p>
              </div>
            ) : (
              <div className="chat-body__message-chats" key={message.id}>
                <p className="chat-body__message-sender">{message.name}</p>
                <p className="chat-body__message-text">{message.text}</p>
              </div>
            ),
          )}
      </div>
      <div className="chat-body__message-status">
        <p>{typingStatus}</p>
      </div>
      <div ref={lastMessageRef} />
    </div>
  );
};
