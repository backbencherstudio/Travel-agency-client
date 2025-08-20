import React from 'react';

const MeetingSection = ({ isMeetingOpen, toggleMeeting, meetingData }) => {
  return (
    <div className="flex flex-col gap-5 pb-5 border-b border-[#a6aaac33]">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleMeeting}>
        <h3 className="text-lg sm:text-2xl font-bold text-[#0F1416]">Meeting and Pickup</h3>
        <div className={`${isMeetingOpen ? 'rotate-180' : ''} duration-300`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
            <path d="M1.24976 1.50005L7.2498 7.5L13.2498 1.5" stroke="#1D1F2C" strokeWidth="1.5" strokeMiterlimit="16" />
          </svg>
        </div>
      </div>
      {isMeetingOpen && (
        <div className="flex flex-col gap-4">
          <div className="text-base text-[#0F1416]">You can head directly to the meeting point, or request pickup</div>
          <div className="p-4 border border-[#a6aaac33] rounded-xl">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9.90039 5.1C9.90039 5.37578 9.95471 5.64885 10.0602 5.90364C10.1658 6.15842 10.3205 6.38992 10.5155 6.58492" fill="#0E457D" />
                    </svg>
                    <h4 className="text-base font-medium">Pickup points</h4>
                  </div>
                  <div>
                    <label className="text-[#49556D] text-sm">Select a pickup point</label>
                    <input type="text" placeholder="Type of search" className="border rounded-xl p-2 sm:p-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium text-[#000]">Pickup details</h3>
                  <div>
                    <p className="text-sm font-normal text-[#49556D]">{meetingData.pickupDetails}</p>
                    <button className="flex gap-2 items-center text-base text-[#1D1F2C]">Read more</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingSection;
