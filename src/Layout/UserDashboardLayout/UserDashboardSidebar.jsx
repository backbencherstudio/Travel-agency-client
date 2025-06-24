import React, { useState } from 'react';
import profileImg from '../../assets/user-dashboard/images/Avatar.png'
import DashboardIcns from '../../assets/user-dashboard/icons/DashboardIcns';
import { Link } from 'react-router-dom';
 import TourManagementIcon from '../../assets/user-dashboard/icons/TourManagementIcon';
 import WishlistIcon from '../../assets/user-dashboard/icons/WishlishtIcon';
 import OfferIcon from '../../assets/user-dashboard/icons/OfferIcon';
import ProfileIcon from '../../assets/user-dashboard/icons/ProfileIcon';
import LogoutIcon from '../../assets/user-dashboard/icons/LogoutIcon';
  
 
 

const UserDashboardSidebar = () => {
 


const navItems=[
  {
    label: 'Dashboard',
    path:'/user-dashboard',
    icon:<DashboardIcns/>
  },
  {
    label: 'Tour Management',
    path:'/user-dashboard/tour-management',
    icon: < TourManagementIcon/>
  },
  {
    label: 'Wishlists',
    path:'/user-dashboard/wishlist',
    icon:< WishlistIcon />
  },
  {
    label: 'Dashboard',
    path:'/user-dashboard/offer',
    icon:< OfferIcon/>
  },
  {
    label: ' My Profile',
    path:'/user-dashboard/profile',
    icon:< ProfileIcon/>
  },
  {
    label: 'Logout',
    path:'/user-dashboard',
    icon:<LogoutIcon/>
  },
  
]

  return (
    <div>

    <div className='pt-12 pb-6 bg-white rounded-xl '>
      <div>
        <div className='flex flex-col items-center'>
          <img src={profileImg} alt=""   />
        </div>
        <div className=' text-center'>
          <h2 className=' text-[#101828] text-2xl font-semibold'>Olivia Rhye</h2>
          <p className=' text-base text-[#475467]'>olivia@untitledui.com</p>
        </div>

        <div className=' mt-4  '>
        {
          navItems.map((item,index)=>(
            
                  <Link to={item.path} >
                   <div className='  flex items-center gap-2 p-2'>
                    <div className=' p-[10px] border border-[#EAECF0] rounded-[8px] '>
                    {item.icon}

                    </div>
                    <h2 className=' text-sm font-medium'>{item.label}</h2>
                    </div> 
                  </Link>
          ))
        }
        </div>
      </div>
 
    </div>
    </div>
  );
};

export default UserDashboardSidebar;
