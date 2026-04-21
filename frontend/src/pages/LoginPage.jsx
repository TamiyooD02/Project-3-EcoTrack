// this is the login page where users can sign in to their account
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import PropTypes from 'prop-types';
import './LoginPage.css';

function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // get the setUser function from the user context
  const { setUser } = useUser();

  // this function runs when the user clicks the login button
  function handleSubmit(e) {
    // prevent the page from refreshing
    e.preventDefault();

    // send the email and password to the backend
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.user) {
          // save the user to the global context
          setUser(data.user);
          // tell the parent that login was successful
          onLoginSuccess();
        } else {
          // show the error message if login failed
          setError(data.message);
        }
      });
  }

  return (
    <div className="login-page">
      <h2>Login</h2>

      {error && <p className="error-message" role="alert">{error}</p>}

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>

      <p>
        No account with Us?
        <button
          onClick={function () {
            onLoginSuccess('register');
          }}
        >
          Register here
        </button>
      </p>
    </div>
  );
}

LoginPage.propTypes = {
  onLoginSuccess: PropTypes.func,
};

export default LoginPage;
