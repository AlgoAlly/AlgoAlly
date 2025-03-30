import 'react';
import Progress from '../components/Progress';
import Navbar from '../components/Navbar';
import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Button from '../components/Button';
import InGameChatroom from '../components/InGameChatroom';

const Profile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const countries = [
    'Canada',
    'United States',
    'China',
    'India',
    'Russia',
    'South Korea',
    'Singapore',
    'Prefer not to share',
  ];
  const [selectedCountry, setSelectedCountry] = useState('Select Country');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const submit = () => {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      username === '' ||
      selectedCountry === 'Select Country'
    ) {
      alert('Please fill in all fields');
      return;
    }

    alert('submission successful!');
  };

  return (
    <div className="min-h-screen bg-[#191A23]">
      <Navbar />
      <div className="mx-auto mt-10 flex max-w-5xl rounded-xl border border-zinc-400 bg-[#1f2136] p-6">
        <div className="space-y-10">
          <h1 className="text-[36px] font-bold text-[#D2D3E0]">
            Edit Account Details
          </h1>
          <h2 className="text-[20px] font-medium text-[#D2D3E0]">
            First & Last Name
          </h2>
          <h3 className="text-[20px] font-medium text-[#D2D3E0]">Email</h3>
          <h4 className="text-[20px] font-medium text-[#D2D3E0]">Username</h4>
          <h6 className="text-[20px] font-medium text-[#D2D3E0]">Country</h6>
        </div>

        <div className="ml-10 w-fit pt-23">
          <div className="flex flex-col space-y-6.5">
            <div className="flex space-x-6">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="placeholder-text-secondary w-64 rounded-lg border border-[#393A4B] bg-[#151621] p-2 text-white caret-white placeholder:text-[15px] focus:border-[#393A4B] focus:shadow-[0_0_0_2px_black] focus:outline-none focus:placeholder:opacity-0"
              />

              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="placeholder-text-secondary w-64 rounded-lg border border-[#393A4B] bg-[#151621] p-2 text-white caret-white placeholder:text-[15px] focus:border-[#393A4B] focus:shadow-[0_0_0_2px_black] focus:outline-none focus:placeholder:opacity-0"
              />
            </div>

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="placeholder-text-secondary w-134 rounded-lg border border-[#393A4B] bg-[#151621] p-2 text-white caret-white placeholder:text-[15px] focus:border-[#393A4B] focus:shadow-[0_0_0_2px_black] focus:outline-none focus:placeholder:opacity-0"
            />

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="placeholder-text-secondary w-134 rounded-lg border border-[#393A4B] bg-[#151621] p-2 text-white caret-white placeholder:text-[15px] focus:border-[#393A4B] focus:shadow-[0_0_0_2px_black] focus:outline-none focus:placeholder:opacity-0"
            />

            <div className="relative w-72" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="placeholder-text-secondary flex w-70 cursor-pointer items-center justify-between rounded-lg border border-[#393A4B] bg-[#151621] p-2 pl-3 text-left text-[15px] caret-white focus:border-[#393A4B] focus:shadow-[0_0_0_2px_black] focus:outline-none focus:placeholder:opacity-0"
              >
                <span className="text-secondary">{selectedCountry}</span>
                {
                  <ChevronDownIcon
                    className={`ml-2 h-5 w-5 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                  />
                }
              </button>
              {isOpen && (
                <ul className="text-secondary absolute mt-2 w-full rounded-lg border border-[#393A4B] bg-[#151621]">
                  {countries.map((country, index) => (
                    <li
                      key={index}
                      className="text-secondary cursor-pointer p-2 hover:bg-gray-700"
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsOpen(false);
                      }}
                    >
                      {country}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Button
              className="w-fit cursor-pointer rounded-lg px-7 py-3.5 text-[20px] font-bold"
              variant="primary"
              onClick={() => submit()}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto w-fit pt-10">
        <Progress />
      </div>
      {/* <div className="fixed right-40 bottom-0 z-50">
        <InGameChatroom />
      </div> */}
    </div>
  );
};

export default Profile;
