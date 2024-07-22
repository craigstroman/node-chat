import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './home.scss';

interface IHome {
  socket: any;
}

// TODO: Finish making new login page with password
// TODO: Create create account page
// TODO: Create endpoint for creating an account and it be normal endpoint

export const Home: React.FC<IHome> = ({ socket }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [type, setType] = useState<string>('password');
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
      console.log('inside here: ');
      console.log('username: ', username);
      console.log('password: ', password);
      // TODO: Figure out why this request doesn't work when I type valid user but invalid password. Trying to show error for invalid password.
      // Try adding headers and content type to get axios post working
      const result = await axios.post('/login', {
        username,
        password,
      });
      console.log('result: ', result);
      if (result.status === 200) {
        localStorage.setItem('userName', username);
        socket.current.emit('user:join', { user: username, password, socketId: socket.current.id });
        navigate('/chat');
        setUsernameError('');
        setPasswordError('');
        setError('');
      } else {
        setError('Invalid username or password.');
        console.log('inside here: ');
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
