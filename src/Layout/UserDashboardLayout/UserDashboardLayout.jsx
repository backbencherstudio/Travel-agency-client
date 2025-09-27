import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserDashboardSidebar from "./UserDashboardSidebar";
import Footer from "../../Shared/Footer";
import Navbar from "../../Shared/Navbar";
import bgImg from "../../assets/user-dashboard/images/dashboardbg.png";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const UserDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageTitle,setPageTitle] = useState('');
  const path = useLocation();

  useEffect(()=>{
    console.log(path);
    const pathList = path?.pathname?.split("/");
    const lastPart = pathList?.[pathList?.length - 1];
    setPageTitle(lastPart);
  },[path])

  return (
    <div className="bg-[#F0F4F9] min-h-screen">
      {/* Top section */}
      <div
        className="bg-cover bg-no-repeat bg-center pt-32 pb-44"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center">
          <h2 className="font-bold text-white text-6xl">Dashboard</h2>
          <p className="max-w-[500px] text-center text-white text-lg mt-2">
            Discover the world from the comfort of a cruise, where every
            destination becomes a luxurious escape and every journey an
            unforgettable experience.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1200px] mx-auto px-6 py-20 space-y-5">
        {/* Header bar */}
        <div className="w-full bg-white lg:translate-y-[90px] lg:opacity-0 lg:h-0 duration-300 p-4 rounded-xl flex items-center justify-between">
          <div className="capitalize">{pageTitle?.split('-')?.join(' ')}</div>
          <div
            className="bg-gray-100 text-gray-700 p-2 text-xl rounded-sm cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </div>
        </div>

        <div className={`flex items-stretch lg:gap-6 h-full min-h-[690px] relative`}>
          {/* Sidebar */}
            <div
              className={`absolute lg:static z-[2] h-full lg:w-[214px] backdrop-blur-sm shadow-md  transition-all duration-300 ${
                sidebarOpen ? "translate-x-0 inset-0" : "-translate-x-[234px] lg:translate-x-0"
              } rounded-2xl`}
              onClick={()=>setSidebarOpen(false)}
            >
              <UserDashboardSidebar />
            </div>

          {/* Outlet Content */}
          <div className="flex-1 transition-all duration-300 max-w-[985px] w-full min-w-full overflow-x-auto">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Footer section */}
      <div className="bg-[#061D35]">
        <Footer />
      </div>
    </div>
  );
};

export default UserDashboardLayout;
