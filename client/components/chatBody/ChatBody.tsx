import React from 'react';

interface ISocket {
  socket: any;
  messages: string[];
  typingStatus: any;
  lastMessageRef: any;
}

export const ChatBody: React.FC<ISocket> = ({ socket, messages, typingStatus, lastMessageRef }) => {
  return <div className="content"></div>;
};
