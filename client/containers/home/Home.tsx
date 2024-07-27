import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './home.scss';

interface IHome {
  socket: any;
}

export const Home: React.FC<IHome> = ({ socket }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const handleUsernameChange = (e) => {
    e.preventDefault();
    const { value, classList } = e.target;
    if (value) {
      setUsername(value);
      setUsernameError('');
      classList.remove('error');
    } else {
      setUsername('');
      setUsernameError('Username is required.');
      classList.add('error');
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const { value, classList } = e.target;
    if (value) {
      setPassword(value);
      setPasswordError('');
      classList.remove('error');
    } else {
      setPassword('');
      setPasswordError('Password is required.');
      classList.add('error');
    }
  };

  const handleShowPassword = (e) => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length >= 1 && password.length >= 1) {
      const headers = {
        'Content-Type': 'application/json',
      };
      const result: AxiosResponse | any = await axios
        .post(
          '/login',
          {
            username,
            password,
          },
          { headers },
        )
        .catch((err) => {
          setError('Invalid username or password.');
        });

      if (result && result.status === 200 && error === '') {
        localStorage.setItem('userName', username);
        socket.current.emit('user:join', { user: username, password, socketId: socket.current.id });
        navigate('/chat');
        setUsernameError('');
        setPasswordError('');
        setError('');
      } else {
        setError('Invalid username or password.');
      }
    } else {
      if (!username.length) {
        setUsernameError('Username is required.');
      }

      if (!password.length) {
        setUsernameError('Password is required.');
      }
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h2>Sign in to Open Chat</h2>
      <div className="form-container">
        <div className="form-row">
          <input
            type="text"
            className="input"
            name="username"
            id="username"
            value={username}
            onChange={(e) => handleUsernameChange(e)}
            placeholder=""
          />
          <label htmlFor="username" className="floating-label">
            Username:
          </label>
          <div className="input-error">{usernameError && usernameError}</div>
        </div>
        <div className="form-row">
          <input
            type={visible ? 'text' : 'password'}
            className="input"
            name="password"
            id="password"
            value={password}
            placeholder=""
            onChange={(e) => handlePasswordChange(e)}
          />
          <p className="toggle-password" onClick={handleShowPassword}>
            {visible ? 'Hide' : 'Show'}
          </p>
          <label htmlFor="password" className="floating-label">
            Password:
          </label>
          <div className="input-error">{passwordError && passwordError}</div>
        </div>
        <div className="form-row">
          <div className="input-error">{error && error}</div>
        </div>
      </div>
      <div className="button-container">
        <button type="submit" className="input-button">
          Log In
        </button>
      </div>
      <div className="text">
        Don't have an account?&nbsp;
        <Link to="/register">Create One</Link>
      </div>
    </form>
  );
};
