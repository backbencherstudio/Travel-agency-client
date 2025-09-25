import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import profileImg from '../../assets/user-dashboard/images/Avatar.png';
import DashboardIcns from '../../assets/user-dashboard/icons/DashboardIcns';
import TourManagementIcon from '../../assets/user-dashboard/icons/TourManagementIcon';
import WishlistIcon from '../../assets/user-dashboard/icons/WishlishtIcon';
import OfferIcon from '../../assets/user-dashboard/icons/OfferIcon';
import ProfileIcon from '../../assets/user-dashboard/icons/ProfileIcon';
import LogoutIcon from '../../assets/user-dashboard/icons/LogoutIcon';
import { AuthContext } from '~/Context/AuthProvider/AuthProvider';
import { useContext } from 'react';


const UserDashboardSidebar = () => {
  const location = useLocation();
    const { user, loading, fetchUserInfo } = useContext(AuthContext);

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

  //   useEffect(() => {
  //   if (user) {
  //     setValue('name', user?.name);
  //     setValue('email', user?.email);
  //     setValue('phone_number', user?.phone_number);
  //     setValue('address', user?.address);
  //     setValue('gender', user?.gender);
  //     setValue('date_of_birth', moment(user?.date_of_birth).format('YYYY-MM-DD'));
  //     setAvatar(user?.avatar_url);
  //   }
  // }, [user])

  return (
    <div>
      <div className="pt-12 pb-6 bg-white rounded-xl">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <img src={user?.avatar_url} alt="Profile" className='rounded-full'/>
        </div>
        <div className="text-center my-4">
          <h2 className="text-[#101828] text-2xl font-semibold capitalize">{user?.name}</h2>
          <p className="text-base text-[#475467]">{user?.email}</p>
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
