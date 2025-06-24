import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import UserDashboardSidebar from './UserDashboardSidebar';
import Footer from '../../Shared/Footer';
import Navbar from '../../Shared/Navbar';

const UserDashboardLayout = () => {
   const [sidebarOpen,setSidebarOpen]=useState(false);
  return (
    <div>

    <div >
      
      <div className="bg-[#F0F4F9]  ">
        <div className=' bg-red-200 h-[400px]'>

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
        </div>
      </div>
         
    </div>
     
  );
};

export default UserDashboardLayout;
