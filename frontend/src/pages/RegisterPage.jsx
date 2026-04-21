// this is the register page where users can create a new account
import { useState } from 'react';
import PropTypes from 'prop-types';
import './RegisterPage.css';

function RegisterPage({ onRegisterSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // error message to show if register fails
  const [error, setError] = useState('');

  // this function runs when the user clicks the register button
  function handleSubmit(e) {
    // prevent the page from refreshing
    e.preventDefault();

    // send the name email and password to the backend
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.message === 'account created successfully') {
          // account was created, send to the login page
          onRegisterSuccess();
        } else {
          // show the error message if register failed
          setError(data.message);
        }
      });
  }

  return (
    <div className="register-page">
      <h2>Register</h2>

      {error && <p className="error-message" role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={function (e) {
              setName(e.target.value);
            }}
          />
        </div>

        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={function (e) {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={function (e) {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{' '}
        <button
          onClick={function () {
            onRegisterSuccess('login');
          }}
        >
          Login here
        </button>
      </p>
    </div>
  );
}

RegisterPage.propTypes = {
  onRegisterSuccess: PropTypes.func,
};

export default RegisterPage;
