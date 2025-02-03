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

    alert('Login successful!');
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
    </>
  );
};

export default Login;
