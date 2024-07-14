import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.scss';

interface IHome {
  socket: any;
}

export const Home: React.FC<IHome> = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.length >= 1) {
      localStorage.setItem('userName', userName);
      socket.current.emit('user:join', { user: userName, socketID: socket.current.id });
      navigate('/chat');
      setError('');
    }
    setError('Username is required.');
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target.value.length >= 1) {
      setUserName(e.target.value);
      setError('');
    }
    setError('Username is required.');
  };

  useEffect(() => {
    if (userName) {
      setError('');
    }
  }, [userName]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h2>Sign in to Open Chat</h2>
      <div className="input-container">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={userName}
          onChange={(e) => handleInputChange(e)}
        />
        <div className="input-error">{error && error}</div>
      </div>
      <div className="button-container">
        <button type="submit" className="input-button">
          Log In
        </button>
      </div>
    </form>
  );
};
