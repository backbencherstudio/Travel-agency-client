import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserDashboardSidebar from './UserDashboardSidebar';
import Footer from '../../Shared/Footer';
import Navbar from '../../Shared/Navbar';
import bgImg from '../../assets/user-dashboard/images/dashboardbg.png'

const UserDashboardLayout = () => {
   const [sidebarOpen,setSidebarOpen]=useState(false);
  return (
    <div>

    <div >
      
      <div className="bg-[#F0F4F9]">
        <div className= " bg-cover bg-no-repeat bg-center  pt-32 pb-44" style={{ backgroundImage: `url(${bgImg})` }}>
             <div className=' max-w-[1200px] mx-auto flex flex-col items-center justify-center  '>
              <h2 className=' font-bold text-white text-6xl '>Dashboard</h2>
              <p className=' max-w-[500px] text-center text-white text-lg mt-2'>Discover the world from the comfort of a cruise, where every destination becomes a luxurious escape and every journey an unforgettable experience.</p>
             </div>
        </div>
        <div className="max-w-[1200px] mx-auto flex     gap-6  py-20 ">
         
            {/* Sidebar: Fixed position */}
            <div className=' w-1/4  '>
               
            <UserDashboardSidebar />
           
            </div>
            {/* Content Area: scrollable */}
            <div className=" flex-1">
              <Outlet />
            </div>
          </div>
          <div className=' bg-[#061D35]'>

            <Footer/>
          </div>
        </div>
      </div>
         
    </div>
     
  );
};

export default UserDashboardLayout;
