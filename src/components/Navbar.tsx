import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Logo from '../public/logo.svg?react';
import { sendAuthenticatedRequest } from '../util/util';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Play', path: '/game' },
    { name: 'Problems', path: '/problems' },
    { name: 'Profile', path: '/profile' },
  ];

  const logout = () => {
    // revoke the current refresh token
    const host = import.meta.env.VITE_USER_API_HOST || 'http://100.86.210.52';
    const port = import.meta.env.VITE_USER_API_PORT || '14010';

    console.log('logging out');
    sendAuthenticatedRequest(
      `${host}:${port}/logout`,
      'POST',
      localStorage.getItem('username')
        ? { username: localStorage.getItem('username') }
        : null
    );

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');

    // remove the accessToken cookie
  };

  return (
    <header className="border-border-primary sticky top-0 z-20 h-fit w-full items-center justify-between space-x-[161px] border-b p-4">
      <nav className="flex w-full flex-row items-center justify-between">
        <div className="flex items-center space-x-6">
          <Logo className="h-10 w-10" fill="var(--color-text-primary)" />
          {links.map(({ name, path }, i) => (
            <a
              key={i}
              href={path}
              className="text-primary hover:text-primary-hover text-[18px] hover:font-bold"
            >
              {name}
            </a>
          ))}
        </div>
        <div className="flex flex-row items-center space-x-4">
          {localStorage.getItem('isLoggedIn') != 'true' ? (
            <>
              <Button
                className="h-10"
                variant="primary"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
              <Button
                className="h-10"
                variant="primary"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              <div className="text-primary text-[18px]">
                {`Welcome, ${localStorage.getItem('username')}`}
              </div>
              {/* <a href="/" className="h-10" onClick={() => logout()}> */}
              <Button className="h-10" variant="primary" onClick={logout}>
                Logout
              </Button>
              {/* </a> */}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
