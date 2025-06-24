import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import profileImg from '../../assets/user-dashboard/images/Avatar.png';
import DashboardIcns from '../../assets/user-dashboard/icons/DashboardIcns';
import TourManagementIcon from '../../assets/user-dashboard/icons/TourManagementIcon';
import WishlistIcon from '../../assets/user-dashboard/icons/WishlishtIcon';
import OfferIcon from '../../assets/user-dashboard/icons/OfferIcon';
import ProfileIcon from '../../assets/user-dashboard/icons/ProfileIcon';
import LogoutIcon from '../../assets/user-dashboard/icons/LogoutIcon';

const UserDashboardSidebar = () => {
  const location = useLocation();

  // Central active checker function
  const getActive = (path) => {
    if (path === '/user-dashboard/tour-management') {
      return location.pathname.startsWith('/user-dashboard/tour-management');
    }
    return location.pathname === path;
  };

  // Sidebar nav items (clean, no isActive here)
  const navItems = [
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: (active) => <DashboardIcns isActive={active} />,
    },
    {
      label: 'Tour Management',
      path: '/user-dashboard/tour-management',
      icon: (active) => <TourManagementIcon isActive={active} />,
    },
    {
      label: 'Wishlists',
      path: '/user-dashboard/wishlist',
      icon: (active) => <WishlistIcon isActive={active} />,
    },
    {
      label: 'Offer and Gift',
      path: '/user-dashboard/offer',
      icon: (active) => <OfferIcon isActive={active} />,
    },
    {
      label: 'My Profile',
      path: '/user-dashboard/profile',
      icon: (active) => <ProfileIcon isActive={active} />,
    },
    {
      label: 'Logout',
      path: '/',
      icon: (active) => <LogoutIcon isActive={active} />,
    },
  ];

  return (
    <div>
      <div className="pt-12 pb-6 bg-white rounded-xl">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <img src={profileImg} alt="Profile" />
        </div>
        <div className="text-center my-4">
          <h2 className="text-[#101828] text-2xl font-semibold">Olivia Rhye</h2>
          <p className="text-base text-[#475467]">olivia@untitledui.com</p>
        </div>

        {/* Navigation Items */}
        <div>
          {navItems.map((item, index) => {
            const active = getActive(item.path);

            return (
              <NavLink to={item.path} key={index} replace>
                <div
                  className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                    active ? 'bg-[#F9FAFB]' : 'hover:bg-[#F9FAFB]'
                  }`}
                >
                  <div
                    className={`p-[10px] border border-[#EAECF0] rounded-[8px] ${
                      active ? 'bg-[#EB5B2A]' : ''
                    }`}
                  >
                    {item.icon(active)}
                  </div>
                  <h2
                    className={`text-sm font-medium ${
                      active ? 'text-[#EB5B2A]' : 'text-[#101828]'
                    }`}
                  >
                    {item.label}
                  </h2>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardSidebar;
