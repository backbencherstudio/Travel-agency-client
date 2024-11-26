import React, { useState } from "react";
import lock from '../../assets/img/form-img/lock.svg'
import { Link } from "react-router-dom";

const SuccessPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full md:max-w-[25rem] text-center">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[#EB5B2A] flex items-center justify-center">
          <img src={lock} alt="" className="" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mt-4 text-[#0F1416]">Successfully Password Changed</h2>

        {/* Message */}
        <p className="text-base text-[#0F1416] mt-2">
          Your password has been updated successfully
        </p>

        {/* Button */}
        <Link to="/login">
            <button
            onClick={onClose}
            className="mt-4 w-full bg-[#EB5B2A] text-white py-2 rounded-full text-base font-medium hover:bg-[#D9531D] transition"
            >
            Back to Log in
            </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPopup;