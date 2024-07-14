import React, { useState, useEffect } from 'react';
import './ChatBar.scss';

interface ISocket {
  socket: any;
}

interface IUser {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
  socketId: string;
}

export const ChatBar: React.FC<ISocket> = ({ socket }) => {
  const [users, setUsers] = useState<IUser[] | null>(null);

  useEffect(() => {
    socket.current.on('newUserResponse', (data) => {
      setUsers(data);
    });
  }, [socket, users]);

  return (
    <div className="chat-sidebar">
      <h2>Open Chat</h2>
      <div className="chat-sidebar__content">
        <div className="chat-sidebar__header">
          <h4>Active Users</h4>
        </div>
        <div className="chat-sidebar__users">
          {users && users.length >= 1 && users.map((user) => <p key={user.socketId}>{user.username}</p>)}
        </div>
      </div>
    </div>
  );
};
