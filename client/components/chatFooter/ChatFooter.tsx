import React, { useState } from 'react';
import './ChatFooter.scss';

interface IFooter {
  typingStatus: any;
  socket: any;
}

// TODO: Keep on trying to figure out how to send a message when the user stops typing
export const ChatFooter: React.FC<IFooter> = ({ socket, typingStatus }) => {
  const [message, setMessage] = useState<string>('');

  const timeOutFunction = () => {
    socket.current.emit('typing', {
      status: '',
      user: localStorage.getItem('userName'),
    });
  };
  let timeout;
  const handleTyping = (e) => {
    const { value } = e.target;
    if (value) {
      socket.current.emit('typing', {
        status: 'typing',
        user: localStorage.getItem('userName'),
      });
    }
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeOutFunction();
    }, 1500);
  };

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
      <div className="chat-footer__typing-text">{typingStatus}</div>
      <form onSubmit={handleMessage}>
        <input
          type="text"
          placeholder="Write a message"
          className="chat-footer__message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => handleTyping(e)}
        />
        <button type="submit" className="chat-footer__message-button">
          Send
        </button>
      </form>
    </div>
  );
};
