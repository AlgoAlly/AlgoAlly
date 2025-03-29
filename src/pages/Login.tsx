import 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = () => {
    if (username === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    // send API request to login
    // get login host and port from environment variables
    const host = import.meta.env.VITE_USER_API_HOST || 'http://127.0.0.1';
    const port = import.meta.env.VITE_USER_API_PORT || '14010';
    const url = `${host}:${port}/login`;
    const data = {
      username: username,
      password: password,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          // get the JWT and place it in local storage
          response.json().then((data) => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('username', username);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/');
          });
        } else {
          // highlight the input fields red
          setUsername('');
          setPassword('');
          // alert('Invalid username or password');
          document.querySelectorAll('input').forEach((input) => {
            input.style.outlineColor = 'red';
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        document.querySelectorAll('input').forEach((input) => {
          input.style.outlineColor = 'red';
        });
      });
  };

  return (
    <>
      {/* Go Back Button -> redirect to / */}
      <Button
        className="text-s absolute top-4 right-4 py-3!"
        variant="primary"
        onClick={() => navigate('/')}
      >
        Go Back →
      </Button>
      {/* Container for login menu */}
      <div className="flex flex-col items-center">
        <div className="relative flex h-full w-full flex-col items-center justify-center">
          <h1 className="mb-6 text-4xl font-bold">Login to AlgoAlly</h1>
          <div className="flex w-full flex-col">
            {/* Username input field */}
            <label className="text-input-label mb-1.5 pl-1 text-sm">
              Username
            </label>
            <Input
              className="mb-4"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col">
            {/* Password input field */}
            <label className="text-input-label mb-1.5 pl-1 text-sm">
              Password
            </label>
            <Input
              type="password"
              placeholder="Password (min 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Login/submit button, will send request to login */}
          <Button
            className="mt-11 h-10 w-full"
            variant="secondary"
            onClick={() => login()}
          >
            Login
          </Button>
          <p className="text-s mt-2">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary font-bold">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
