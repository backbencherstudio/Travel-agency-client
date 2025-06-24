import React from 'react'
import OrangeMessageIcon from '../../assets/user-dashboard/icons/OrangeMessageIcon'

const ReservationDetail = () => {
  return (
    <div className=' bg-white py-12 px-8 rounded-2xl'> 
       <div className=' flex justify-between'>
        <h2 className=' text-2xl font-semibold'>Reservation Detail</h2>
        <button className=' text-[#EB5B2A] text-xs border border-[#EB5B2A] p-2 rounded-[4px] flex gap-1'>
          <OrangeMessageIcon/>
          Message host </button>
       </div>

       <div className=' border border-[#EAECF0] rounded-lg p-4 mt-8'>
              <div className=' flex'>
                <div className=' w-[50%]'>
                    <h3 className=' text-base font-semibold'>Collection Point Information</h3>
                    <ul className=' space-y-5 mt-7'>
                        <li ><p className=' text-[#475467] text-sm  '>Host Name <span className=' text-[#111827] font-medium'>Ralph Edwards</span></p></li>
                        <li><p className=' text-[#475467] text-sm'>Package <span className=' text-[#111827] font-medium'>Sacred Temples of Bali</span></p></li>
                        <li><p className=' text-[#475467] text-sm'>Office Time <span className=' text-[#111827] font-medium'>900 AM - 5:00 PM</span></p></li>
                        <li><p className=' text-[#475467] text-sm'>Phone <span className=' text-[#111827] font-medium'>+880 1234 567890</span></p></li>
                        <li><p className=' text-[#475467] text-sm'>Address <span className=' text-[#111827] font-medium'>123 Pickup Street, City, Country</span></p></li>
                        <li><p className=' text-[#475467] text-sm'>Booking Date <span className=' text-[#111827] font-medium'>11  April 2025</span></p></li>
                        <li><p className=' text-[#475467] text-sm'>Guests <span className=' text-[#111827] font-medium'>1</span></p></li>
                         
                    </ul>
                </div>
                <div className=' w-[50%]'>
                    <h3 className=' text-base font-semibold'>Reservation Information</h3>
                    <ul className=' space-y-5 mt-7'>
                        <li ><p className=' text-[#475467] text-sm  '>Package<span className=' text-[#111827] font-medium'>Sacred Temples of Bali </span></p></li>
                        <li><p className=' text-[#475467] text-sm'>Tour Category <span className=' text-[#111827] font-medium'>N/A</span></p></li>
                        <li><p className=' text-[#475467] text-sm'>Geofencing <span className=' text-[#111827] font-medium'>11  April 2025</span></p></li>
                        <li><p className=' text-[#475467] text-sm'>Package Duration (Days) <span className=' text-[#111827] font-medium'>1 Day</span></p></li>
                        <li><p className=' text-[#475467] text-sm'>Extra Service <span className=' text-[#111827] font-medium'>Travel Insurance,
Room Upgrade</span></p></li>
                        <li><p className=' text-[#475467] text-sm'>Total Amount <span className=' text-[#111827] font-medium'>$2500</span></p></li>
                        <li><p className=' text-[#475467] text-sm'>Total Status <span className=' text-[#111827] font-medium'>Unpaid</span></p></li>
                         
                    </ul>
                </div>
                 
              </div>
                  <div className=' mt-6'> 
   
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17311.871070798563!2d116.3962993035123!3d39.9115107565616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35f05296e7142cb9%3A0xb9625620af0fa98a!2sBeijing%2C%20China!5e0!3m2!1sen!2sbd!4v1750754820985!5m2!1sen!2sbd" width="100%" height="200"  style={{border:0 , borderRadius:'16px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
       <div className=' flex justify-end '>
        <button className=' bg-[#E7ECF2] py-2 px-4 rounded-md text-[#3B82F6] mt-6'>Back</button>
       </div>
       </div>
       </div>

   
    </div>
  )
}

export default ReservationDetail