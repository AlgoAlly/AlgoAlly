import { useState, useRef, useEffect } from "react";
// import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Button from './Button';

const Inputs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const countries = [
    "Canada",
    "United States",
    "China",
    "India",
    "Russia",
    "South Korea",
    "Singapore",
    "Prefer not to share",
  ];
  const [selectedCountry, setSelectedCountry] = useState("Select Country");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const submit = () => {
    if (firstName === '' || lastName === '' || email === '' || username === '' || selectedCountry === "Select Country") {
      alert('Please fill in all fields');
      return;
    }

    alert('submission successful!');
  };

  return (
    <div>
    <div className="absolute top-54.5 left-80">
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        className="w-64 p-2 border border-[#393A4B] rounded-lg placeholder-text-secondary placeholder:text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] text-white caret-white focus:shadow-[0_0_0_2px_black]"      />
    </div>
    <div className="absolute top-54.5 left-150">
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        className="w-64 p-2 border border-[#393A4B] rounded-lg placeholder-text-secondary placeholder:text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] text-white caret-white focus:shadow-[0_0_0_2px_black]"      />
    </div>
    <div className="absolute top-72 left-80">
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-134 p-2 border border-[#393A4B] rounded-lg placeholder-text-secondary placeholder:text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] text-white caret-white focus:shadow-[0_0_0_2px_black]"      />
    </div>
    <div className="absolute top-91.5 left-80">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-134 p-2 border border-[#393A4B] rounded-lg placeholder-text-secondary placeholder:text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] text-white caret-white focus:shadow-[0_0_0_2px_black]"      />
    </div>
    <div className="absolute top-108 left-80" ref={dropdownRef}>
    <button 
  onClick={() => setIsOpen((prev) => !prev)}
  className="w-70 p-2 border border-[#393A4B] text-left pl-3 rounded-lg placeholder-text-secondary text-[15px] focus:placeholder:opacity-0 focus:outline-none bg-[#151621] focus:border-[#393A4B] caret-white focus:shadow-[0_0_0_2px_black] cursor-pointer flex justify-between items-center"
>
  <span className="text-secondary">{selectedCountry}</span>
  {/* <ChevronDownIcon
    className={`w-5 h-5 text-white ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
  /> */}

        </button>
        {isOpen && (
          <ul className="absolute w-full mt-2 bg-[#151621] border border-[#393A4B] rounded-lg text-secondary">
            {countries.map((country, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-700 cursor-pointer text-secondary"
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
      <div className="absolute top-130 left-20">
      <Button
          className="px-7 py-3.5 font-bold text-[20px] rounded-lg cursor-pointer" 
          variant="primary"
          onClick={() => submit()}
        >
          Confirm
        </Button>
      </div>
</div>
    
  );
};

export default Inputs;