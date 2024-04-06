import React from 'react';

interface ISocket {
  socket: any;
}

export const ChatBar: React.FC<ISocket> = ({ socket }) => {
  return <div className="content"></div>;
};
