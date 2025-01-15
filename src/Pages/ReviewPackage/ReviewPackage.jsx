import React, { useState } from 'react';
import "./review.css";
import { FaStar } from 'react-icons/fa'; // Import FaStar from react-icons

function ReviewPackage() {
    // State hooks to manage form data and rating
    const [formData, setFormData] = useState({
        mobileNumber: '',
        address: '',
        area: '',
        city: '',
        pinCode: '',
        state: '',
    });

    const [rating, setRating] = useState(0); // To manage the star rating

    // Handle form field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle star rating click
    const handleRating = (index) => {
        setRating(index + 1); // Set the rating to the index clicked
    };

    return (
        <div className='max-w-[1216px] mx-auto mt-10 grid grid-cols-8 gap-8'>
            <div className='col-span-5 flex flex-col gap-[30px] w-full'>
                <h1>Review Package</h1>
                <div className='p-8 w-3/4 card'>
                    <h1>Beijing, China</h1>
                    <div className='flexo'>
                        <div className='border-r-2 pr-20'>
                            <p>Review</p>
                            <div className="flex">
                                {/* Render the stars dynamically */}
                                <p className="flex gap-1">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            onClick={() => handleRating(index)}
                                            className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-400'}`}
                                            size={20}
                                        />
                                    ))}
                                </p>
                            </div>
                        </div>
                        <div className='border-r-2 pr-20'>
                            <p>Days</p>
                            <p className='font-bold'>6 days</p>
                        </div>
                        <div>
                            <p>Location</p>
                            <p className='font-bold'>Beijing, China</p>
                        </div>
                    </div>
                    <div className='flexo mt-5 justify-between'>
                        <div>
                            <p>Aug 11, 2024</p>
                        </div>
                        <div>
                            <p className='btnOrange'>6D/5N</p>
                        </div>
                        <div>
                            <p>Aug 16, 2024</p>
                        </div>
                    </div>
                </div>

                <h4>Please Enter Contact Details</h4>
                <form className='mb-20 flex flex-col gap-5'>
                    <div className='flex flex-col'>
                        <label className='reviewLabel' htmlFor="mobileNumber">Mobile Number</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            placeholder='Enter Mobile Number'
                            className='h-[72px] outline-none border px-5 py-3 rounded-lg mt-1 '
                            value={formData.mobileNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='reviewLabel' htmlFor="address">Flat, House no., Building, Company, Apartment</label>
                        <input
                            type="text"
                            name="address"
                            className='h-[72px] outline-none border px-5 py-3 rounded-lg mt-1 '
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='reviewLabel' htmlFor="area">Area, Colony, Street, Sector, Village</label>
                        <input
                            type="text"
                            name="area"
                            className='h-[72px] outline-none border px-5 py-3 rounded-lg mt-1 '
                            value={formData.area}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='reviewLabel' htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            className='h-[72px] outline-none border px-5 py-3 rounded-lg mt-1 '
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='reviewLabel' htmlFor="pinCode">Pin Code</label>
                        <input
                            type="text"
                            name="pinCode"
                            placeholder='Enter Pin/Zip Code'
                            className='h-[72px] outline-none border px-5 py-3 rounded-lg mt-1 '
                            value={formData.pinCode}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='reviewLabel' htmlFor="state">State</label>
                        <input
                            type="text"
                            name="state"
                            className='h-[72px] outline-none border px-5 py-3 rounded-lg mt-1 '
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>

            <div className='col-span-3 h-fit px-5 shadow-xl rounded-lg py-5'>
                <h1 className='border-b'>$4700 <span className='font-normal text-lg'>(Inclusive of All Taxes)</span></h1>
                {/* Pricing details */}
                <div className='flex items-start mt-5 border-b pb-5 justify-between'>
                    <div>
                        <h4>Total Basic Cost</h4>
                        <p className='text-base font-normal flex items-center gap-3'><span>2500</span> <span>x</span> <span>2</span> Travelers</p>
                    </div>
                    <h4>$5000</h4>
                </div>
                <div className='flex items-start mt-5 border-b pb-5 justify-between'>
                    <div>
                        <div className='flex flex-col gap-2 mb-3'>
                            <h4>Coupon Discount</h4>
                            <span className='bg-[#EB5B2A] text-white px-3 py-1 rounded-2xl w-fit'>BESTOFFER50</span>
                        </div>
                        <p className='text-base font-normal flex items-center gap-3'><span>2500</span> <span>x</span> <span>2</span> Travelers</p>
                    </div>
                    <h4>-$350</h4>
                </div>
                <div className='flex items-start mt-5 border-b pb-5 justify-between'>
                    <div>
                        <h4>Fee & Taxes</h4>
                        <p className='text-base font-normal flex items-center gap-3'><span>2500</span> <span>x</span> <span>2</span> Travelers</p>
                    </div>
                    <h4>+$50</h4>
                </div>
                <button className='btnOrange w-full mt-4'>Proceed To Payments</button>
            </div>
        </div>
    );
}

export default ReviewPackage;
