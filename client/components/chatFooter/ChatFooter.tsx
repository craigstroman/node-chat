import React, { useState } from 'react';
import './ChatFooter.scss';

interface ISocket {
  socket: any;
}

export const ChatFooter: React.FC<ISocket> = ({ socket }) => {
  const [message, setMessage] = useState<string>('');
  const handleTyping = () => socket.current.emit('typing', `${localStorage.getItem('userName')} is typing`);

  const handleMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.current.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: socket.current.id,
        socketID: socket.current.id,
      });
    }
    setMessage('');
  };

  return (
    <div className="chat-footer">
      <form onSubmit={handleMessage}>
        <input
          type="text"
          placeholder="Write a message"
          className="chat-footer__message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button type="submit" className="chat-footer__message-button">
          Send
        </button>
      </form>
    </div>
  );
};
