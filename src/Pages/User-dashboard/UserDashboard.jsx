import React from "react";
import CrossIcon from "../../assets/user-dashboard/icons/OrangeCross";
import IconFilter from "../../assets/user-dashboard/icons/IconFilter";
import IconSearch from "../../assets/user-dashboard/icons/IconSearch";
import UserDashboardTable from "../../Components/userDashboard/UserDashboardTable";
import { FaEdit, FaSearch } from 'react-icons/fa'
 

const UserDashboard = () => {
  const overview = [
    {
      title: "Tour Complete",
      number: "84",
    },
    {
      title: "Tour Canceled",
      number: "21",
    },
    {
      title: "Upcoming",
      number: "56",
    },
  ];



  return (
    <div>
    <div className="  overflow-y-auto  bg-white py-12 px-8 rounded-2xl">
      <h2 className=" text-3xl text-[#101828] font-semibold">
        Welcome back, Olivia
      </h2>
      <p className=" text-[#475467] text-base">Track, manage your tour.</p>
      <div className=" flex my-8 gap-6">
        {overview.map((item, index) => (
          <div
            className=" space-y-6 border border-[#EAECF0] p-6 flex-1 rounded-xl  "
            style={{ boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)" }}
          >
            <p className=" text-[#101828] text-base font-semibold">
              {item.title}
            </p>
            <h1 className=" text-[#101828] text-4xl font-semibold">
              {item.number}
            </h1>
          </div>
        ))}
      </div>
      <div className=" flex justify-between items-center">
        <div className=" flex gap-3">
          <div className=" flex items-center gap-1   border border-[#D0D5DD] py-[10px] px-[14px] rounded-lg ">
            <p className=" text-[#344054] font-semibold text-sm">All</p>
            <CrossIcon />
          </div>
          <div className=" flex items-center gap-1   border border-[#D0D5DD] py-[10px] px-[14px] rounded-lg  ">
            <IconFilter />
            <p className=" text-[#344054] font-semibold text-sm">
              More filters
            </p>
          </div>
        </div>

         <div className='relative md:col-span-1'>
                    <input
                      type='text'
                      placeholder='Search...'
                      className='py-[10px] pl-10 border border-zinc-300 rounded-lg focus:outline-none focus:border-orange-400 w-full lg:w-[100%]'
                      
                    />
                    <FaSearch className='absolute top-4 left-4 text-zinc-400' />
                  </div>
      </div>
     <UserDashboardTable/>
    </div>
    {/* ===================================================================================================================== */}
   
    </div>
  );
};

export default UserDashboard;
