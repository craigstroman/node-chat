import React, { useState, useEffect } from 'react';
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
  const [usernameError, setUsernameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleUsernameChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value) {
      setUsername(value);
      setUsernameError('');
    } else {
      setUsername('');
      setUsernameError('Username is required.');
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    if (value) {
      setPassword(value);
      setPasswordError('');
    } else {
      setPassword('');
      setPasswordError('Password is required.');
    }
  };

  const handleShowPassword = (e) => {
    const { checked } = e.target;

    if (checked) {
      setType('text');
    } else {
      setType('password');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length >= 1 && password.length >= 1) {
      localStorage.setItem('userName', username);
      socket.current.emit('user:join', { user: username, password, socketID: socket.current.id });
      navigate('/chat');
      setUsernameError('');
      setPasswordError('');
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
        </div>
        <div className="form-row">
          <input
            type={type}
            className="input"
            name="password"
            id="password"
            value={password}
            placeholder=""
            onChange={(e) => handlePasswordChange(e)}
          />
          <label htmlFor="password" className="floating-label">
            Password:
          </label>
        </div>

        <div className="form-row">
          <label htmlFor="showPassword" className="show-password-label">
            Show Password
          </label>
          <input
            type="checkbox"
            name="showPassword"
            id="showPassword"
            onChange={(e) => handleShowPassword(e)}
            placeholder=""
          />
        </div>

        <div className="input-error">
          {usernameError ||
            (passwordError && (
              <React.Fragment>
                <div>{usernameError}</div>
                <div>{passwordError}</div>
              </React.Fragment>
            ))}
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
