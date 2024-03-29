import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Home } from '../home/Home';

const Main: React.FC = () => {
  return (
    <div className="content">
      <BrowserRouter>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Main;
