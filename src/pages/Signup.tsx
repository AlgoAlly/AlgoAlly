import 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signup = async () => {
    if (username === '' || password === '') {
      alert('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    try {
      const host = import.meta.env.VITE_USER_API_HOST || 'http://localhost';
      const port = import.meta.env.VITE_USER_API_PORT || '14010';

      const response = await axios.post(
        `${host}:${port}/user/create`,
        {
          username: username,
          password: password,
          email: username,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          validateStatus: (_status) => {
            return true;
          },
        }
      );

      if (response.status !== 200) {
        // highlight the input fields red
        setUsername('');
        setPassword('');
        alert(response.data);
        document.querySelectorAll('input').forEach((input) => {
          input.style.outlineColor = 'red';
        });
        return;
      }

      const loginResponse = await axios.post(
        `${host}:${port}/login`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (loginResponse.status !== 200) {
        // highlight the input fields red
        setUsername('');
        setPassword('');
        document.querySelectorAll('input').forEach((input) => {
          input.style.outlineColor = 'red';
        });
        return;
      }

      localStorage.setItem('accessToken', loginResponse.data.accessToken);
      localStorage.setItem('refreshToken', loginResponse.data.refreshToken);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', loginResponse.data.userId);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/');

      // authenticate the user
    } catch (error) {
      console.error('Error during signup:', error);
      document.querySelectorAll('input').forEach((input) => {
        input.style.outlineColor = 'red';
      });
    }
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
      {/* Container for signup menu */}
      <div className="flex flex-col items-center">
        <div className="relative flex h-full w-full flex-col items-center justify-center">
          <h1 className="mb-6 text-4xl font-bold">Signup to AlgoAlly</h1>
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
          {/* Signup/submit button, will send request to signup */}
          <Button
            className="mt-11 h-10 w-full"
            variant="secondary"
            onClick={() => signup()}
          >
            Signup
          </Button>
          <p className="text-s mt-2">
            Already have an account?{' '}
            <a href="/login" className="text-primary font-bold">
              Login now
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
