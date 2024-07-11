import React, { useRef } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import * as io from 'socket.io-client';
import { Home } from '../home/Home';
import { Chat } from '../chat/Chat';
import './main.scss';

const socket = io.connect(`http://localhost:${process.env.port}`);

const Main: React.FC = () => {
  const socketRef = useRef(socket);
  return (
    <div className="content">
      <BrowserRouter>
        <main>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home socket={socketRef} />} />
              <Route path="/chat" element={<Chat socket={socketRef} />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default Main;
