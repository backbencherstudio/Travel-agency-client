import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2'

export default function ViewOffers() {
    const navigate = useNavigate()
    const id = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const title = 'Promotional code and offers management'
    const data = [
        "Percentage",
        "10",
        "Jun 20, 2025",
        "Jun 25, 2025",
        "1",
        "3",
        "1",
    ]


    const handleDeleteClick = async id => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You wont be able to undo this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        })
    }


    const handleDeactivation=(id)=>{
        console.log(id);
    }


    return (
        <div className="overflow-hidden py-5" style={{ minHeight: "calc(100vh - 100px)" }}>
            <div className='flex flex-col sm:flex-row justify-between items-center pb-5'>
                <h1 className='text-[#0D0E0D] text-[20px]'>{title}</h1>
            </div>
            <div className="bg-white p-4 rounded-lg space-y-5">
                <h3 className="text-[#000E19] font-semibold">Promotional Code: #{id}</h3>
                <div className="flex gap-10 text-sm">
                    <ul className="space-y-4 text-[#475467]">
                        <li>Discount Type</li>
                        <li>Discount Value</li>
                        <li>Creation Date</li>
                        <li>Expiration Date</li>
                        <li>Status</li>
                        <li>Usage Limit</li>
                        <li>Used</li>
                    </ul>
                    <ul className="space-y-4 text-[#111827]">
                        <li>Percentage</li>
                        <li>10%</li>
                        <li>Jun 20, 2025</li>
                        <li>Jun 25, 2025</li>
                        <li className="text-[#067647]">Active</li>
                        <li>3 Times</li>
                        <li>1 Times</li>
                    </ul>
                </div>
                <div className="space-x-3">
                    <button className="bg-[#E7ECF2] text-[#3B82F6] text-[12px] py-1 px-4 rounded cursor-pointer" onClick={() => navigate(`/dashboard/edit-offers/${id}`)}>Edit</button>
                    <button className="bg-[#4CAF50] text-[#fff] text-[12px] py-1 px-4 rounded cursor-pointer" onClick={()=>handleDeactivation(id)}>Deactive</button>
                    <button className="bg-[#FF5252] text-[#fff] text-[12px] py-1 px-4 rounded cursor-pointer" onClick={()=>handleDeleteClick(id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}