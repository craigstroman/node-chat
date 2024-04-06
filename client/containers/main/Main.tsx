import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import * as io from 'socket.io-client';
import { Home } from '../home/Home';
import { Chat } from '../chat/Chat';
import './main.scss';

const socket = io.connect('http://localhost:5000');

const Main: React.FC = () => {
  return (
    <div className="content">
      <header>
        <div className="title">
          <h1>Welcome to the page</h1>
        </div>
      </header>
      <BrowserRouter>
        <main>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home socket={socket} />} />
              <Route path="/chat" element={<Chat socket={socket} />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default Main;
