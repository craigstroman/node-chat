import React from 'react';

interface ISocket {
  socket: any;
}

export const ChatFooter: React.FC<ISocket> = ({ socket }) => {
  return <div className="content"></div>;
};
