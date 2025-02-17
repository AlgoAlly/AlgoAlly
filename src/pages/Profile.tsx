import "react";
import Inputs from '../components/Inputs'
import Progress from '../components/progress'

const Profile = () => {
  return <div className='bg-[#191A23] min-h-screen'>
    <div className="border border-zinc-400 p-6 rounded-xl bg-[#1f2136] mx-auto max-w-5xl flex mt-10">

      <div className="space-y-10">
            <h1 className="text-[#D2D3E0] text-[36px] font-bold">Account</h1>
            <h2  className="text-[#D2D3E0] text-[20px] font-medium">First & Last Name</h2>
            <h3  className="text-[#D2D3E0] text-[20px] font-medium">Email</h3>
            <h4  className="text-[#D2D3E0] text-[20px] font-medium">Username</h4>
            <h6  className="text-[#D2D3E0] text-[20px] font-medium">Country</h6>
        </div>
        
    

        <div className="w-fit ml-10 pt-23">
    <Inputs />
  </div>
</div>
<div className="w-fit mx-auto pt-20">
      <Progress />
      </div>
    </div>
}

export default Profile;
