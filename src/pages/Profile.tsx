import 'react';
import Navbar from '../components/Navbar';
import Inputs from '../components/Inputs';

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#191A23]">
      <Navbar></Navbar>

      <div>
        <h1 className="absolute top-25 left-20 text-[36px] font-bold text-[#D2D3E0]">
          Account
        </h1>
        <h2 className="absolute top-55 left-20 text-[20px] font-medium text-[#D2D3E0]">
          First & Last Name
        </h2>
        <h3 className="absolute top-73 left-20 text-[20px] font-medium text-[#D2D3E0]">
          Email
        </h3>
        <h4 className="absolute top-91 left-20 text-[20px] font-medium text-[#D2D3E0]">
          Username
        </h4>
        <h5 className="absolute top-97.5 left-20 text-[12px] font-medium text-[#858699]">
          You can change this later
        </h5>
        <h6 className="absolute top-109 left-20 text-[20px] font-medium text-[#D2D3E0]">
          Country
        </h6>
      </div>

      <Inputs></Inputs>
    </div>
  );
};

export default Profile;
