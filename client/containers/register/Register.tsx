import React, { useState } from 'react';
import './register.scss';
import { error } from 'console';

export const Register: React.FC = () => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [formError, setFormError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = async (email: string) => {
    return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

const validateForm = () => {
  const errors = {};

  if (!formData.firstName.length) {
    errors['firstName'] = 'First name is required.';
    const firstNameInput: HTMLElement = document.getElementById('firstName') as HTMLElement;
    firstNameInput.classList.add('error');
  }

  if (!formData.lastName.length) {
    errors['lastName'] = 'Last name is required.';
    const lastNameInput: HTMLElement = document.getElementById('lastName') as HTMLElement;
    lastNameInput.classList.add('error');
  }

  if (!formData.email.length) {
    errors['email'] = 'Email is required.';
    const  emailInput: HTMLElement = document.getElementById('email') as HTMLElement;
    emailInput.classList.add('error');
  }

  if (!formData.username.length) {
    errors['username'] = 'Username is required.';
    const usernameInput: HTMLElement = document.getElementById('username') as HTMLElement;
    usernameInput.classList.add('error');
  }

  if (!formData.password.length) {
    errors['password'] = 'Password is required.';
   const passwordInput: HTMLElement = document.getElementById('password') as HTMLElement;
    passwordInput.classList.add('error');
  }

  if (!formData.confirmPassword.length) {
    errors['confirmPassword'] = 'Confirm password is required.';
    const confirmPasswordInput: HTMLElement = document.getElementById('confirmPassword') as HTMLElement;  
    confirmPasswordInput.classList.add('error');
  }

  if (Object.keys(errors).length >= 1) {
    setFormError({
      firstName: errors['firstName'] || '',
      lastName: errors['lastName'] || '',
      email: errors['email'] || '',
      username: errors['username'] || '',
      password: errors['password'] || '',
      confirmPassword: errors['confirmPassword'] || '',
    });

    return false;
  } else {
    setFormError({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    })
    return true;
  }
}

  const handleInputChange = (e) => {
    const { name, value, classList } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setFormError((prevFormErrorData) => ({
      ...prevFormErrorData,
      [name]: '',
    }));
    classList.remove('error');

    if (name === 'firstName' && !value.length) {
      setFormError((prevFormErrorData) => ({
        ...prevFormErrorData,
        firstName: 'First name is required.',
      }));
      classList.add('error');
    }

    if (name === 'lastName' && !value.length) {
      setFormError((prevFormErrorData) => ({
        ...prevFormErrorData,
        lastName: 'Last name is required.',
      }));
      classList.add('error');
    }

    if (name === 'email' && !value.length) {
      setFormError((prevFormErrorData) => ({
        ...prevFormErrorData,
        email: 'Email is required.',
      }));
      classList.add('error');
    }

    if (name === 'username' && !value.length) {
      setFormError((prevFormErrorData) => ({
        ...prevFormErrorData,
        username: 'Username is required.',
      }));
      classList.add('error');
    }

    if (name === 'password' && !value.length) {
      setFormError((prevFormErrorData) => ({
        ...prevFormErrorData,
        password: 'Password is required.',
      }));
      classList.add('error');
    }

    if (name === 'confirmPassword' && !value.length) {
      setFormError((prevFormErrorData) => ({
        ...prevFormErrorData,
        confirmPassword: 'Confirm password is required.',
      }));
      classList.add('error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form is valid');
    }
  };

  const handleShowPassword = (e) => {
    if (visiblePassword) {
      setVisiblePassword(false);
    } else {
      setVisiblePassword(true);
    }
  };

  const handleShowConfirmPassword = (e) => {
    if (visibleConfirmPassword) {
      setVisibleConfirmPassword(false);
    } else {
      setVisibleConfirmPassword(true);
    }
  };

  return (
    <div className="container">
      <h2>Register to Chat</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-container">
          <div className="form-row">
            <input
              type="text"
              className="input"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange(e)}
              placeholder=""
            />
            <label htmlFor="firstName" className="floating-label">
              First Name*
            </label>
            <div className="input-error">{formError.firstName && formError.firstName}</div>
          </div>
          <div className="form-row">
            <input
              type="text"
              className="input"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange(e)}
              placeholder=""
            />
            <label htmlFor="lastName" className="floating-label">
              Last Name*
            </label>
            <div className="input-error">{formError.lastName && formError.lastName}</div>
          </div>
          <div className="form-row">
            <input
              type="email"
              className="input"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e)}
              placeholder=""
            />
            <label htmlFor="email" className="floating-label">
              Email*
            </label>
            <div className="input-error">{formError.email && formError.email}</div>
          </div>
          <div className="form-row">
            <input
              type="text"
              className="input"
              name="username"
              id="username"
              value={formData.username}
              onChange={(e) => handleInputChange(e)}
              placeholder=""
            />
            <label htmlFor="username" className="floating-label">
              Username*
            </label>
            <div className="input-error">{formError.username && formError.username}</div>
          </div>
          <div className="form-row">
            <input
              type={visiblePassword ? 'text' : 'password'}
              className="input"
              name="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleInputChange(e)}
              placeholder=""
            />
            <p className="toggle-password" onClick={handleShowPassword}>
              {visiblePassword ? 'Hide' : 'Show'}
            </p>
            <label htmlFor="password" className="floating-label">
              Password*
            </label>
            <div className="input-error">{formError.password && formError.password}</div>
          </div>
          <div className="form-row">
            <input
              type={visibleConfirmPassword ? 'text' : 'password'}
              className="input"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange(e)}
              placeholder=""
            />
            <label htmlFor="confirmPassword" className="floating-label">
              Confirm Password*
            </label>
            <p className="toggle-password" onClick={handleShowConfirmPassword}>
              {visibleConfirmPassword ? 'Hide' : 'Show'}
            </p>
            <div className="input-error">{formError.confirmPassword && formError.confirmPassword}</div>
          </div>
        </div>
        <div className="button-container">
          <button type="submit" name="submit" className="input-button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
