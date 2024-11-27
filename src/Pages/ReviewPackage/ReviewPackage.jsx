import React, { useState } from 'react';
import "./review.css";
import { FaStar } from 'react-icons/fa';

function ReviewPackage() {
    // State hooks to manage form data
    const [formData, setFormData] = useState({
        mobileNumber: '',
        address: '',
        area: '',
        city: '',
        pinCode: '',
        state: '',
    });

    // Handle form field change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    console.log(formData);



    return (
        <div className='max-w-[1216px] mx-auto mt-10 grid grid-cols-8 gap-8'>
            <div className='col-span-5 flex flex-col gap-[30px] w-full  '>
                <h1>Review Package</h1>
                <div className='p-8 w-3/4 card'>
                    <h1>Beijing, China</h1>
                    <div className='flexo'>
                        <div className='border-r-2 pr-20'>
                            <p>Review</p>
                            <div className="flex">
                                {/* Star Ratings SVG */}
                                <p className="flex gap-1" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M14.7192 18.8919C14.2775 18.8919 13.7108 18.7503 13.0025 18.3336L10.5108 16.8586C10.2525 16.7086 9.75247 16.7086 9.50247 16.8586L7.00244 18.3336C5.52742 19.2086 4.66075 18.8586 4.26908 18.5753C3.88574 18.2919 3.28573 17.5669 3.6774 15.9003L4.26908 13.3419C4.33574 13.0752 4.20241 12.6169 4.00241 12.4169L1.93572 10.3502C0.902375 9.31685 0.98571 8.43351 1.12738 8.00017C1.26905 7.56683 1.71905 6.80016 3.1524 6.55849L5.81076 6.11682C6.06076 6.07515 6.4191 5.80848 6.52743 5.58348L8.00245 2.64178C8.66912 1.3001 9.54413 1.1001 10.0025 1.1001C10.4608 1.1001 11.3358 1.3001 12.0025 2.64178L13.4692 5.57514C13.5858 5.80015 13.9442 6.06682 14.1942 6.10848L16.8525 6.55015C18.2942 6.79182 18.7442 7.5585 18.8776 7.99184C19.0109 8.42517 19.0942 9.30852 18.0692 10.3419L16.0025 12.4169C15.8025 12.6169 15.6775 13.0669 15.7359 13.3419L16.3275 15.9003C16.7109 17.5669 16.1192 18.2919 15.7359 18.5753C15.5275 18.7253 15.1942 18.8919 14.7192 18.8919Z" fill="#FFCA01" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M14.7192 18.8919C14.2775 18.8919 13.7108 18.7503 13.0025 18.3336L10.5108 16.8586C10.2525 16.7086 9.75247 16.7086 9.50247 16.8586L7.00244 18.3336C5.52742 19.2086 4.66075 18.8586 4.26908 18.5753C3.88574 18.2919 3.28573 17.5669 3.6774 15.9003L4.26908 13.3419C4.33574 13.0752 4.20241 12.6169 4.00241 12.4169L1.93572 10.3502C0.902375 9.31685 0.98571 8.43351 1.12738 8.00017C1.26905 7.56683 1.71905 6.80016 3.1524 6.55849L5.81076 6.11682C6.06076 6.07515 6.4191 5.80848 6.52743 5.58348L8.00245 2.64178C8.66912 1.3001 9.54413 1.1001 10.0025 1.1001C10.4608 1.1001 11.3358 1.3001 12.0025 2.64178L13.4692 5.57514C13.5858 5.80015 13.9442 6.06682 14.1942 6.10848L16.8525 6.55015C18.2942 6.79182 18.7442 7.5585 18.8776 7.99184C19.0109 8.42517 19.0942 9.30852 18.0692 10.3419L16.0025 12.4169C15.8025 12.6169 15.6775 13.0669 15.7359 13.3419L16.3275 15.9003C16.7109 17.5669 16.1192 18.2919 15.7359 18.5753C15.5275 18.7253 15.1942 18.8919 14.7192 18.8919Z" fill="#FFCA01" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M14.7192 18.8919C14.2775 18.8919 13.7108 18.7503 13.0025 18.3336L10.5108 16.8586C10.2525 16.7086 9.75247 16.7086 9.50247 16.8586L7.00244 18.3336C5.52742 19.2086 4.66075 18.8586 4.26908 18.5753C3.88574 18.2919 3.28573 17.5669 3.6774 15.9003L4.26908 13.3419C4.33574 13.0752 4.20241 12.6169 4.00241 12.4169L1.93572 10.3502C0.902375 9.31685 0.98571 8.43351 1.12738 8.00017C1.26905 7.56683 1.71905 6.80016 3.1524 6.55849L5.81076 6.11682C6.06076 6.07515 6.4191 5.80848 6.52743 5.58348L8.00245 2.64178C8.66912 1.3001 9.54413 1.1001 10.0025 1.1001C10.4608 1.1001 11.3358 1.3001 12.0025 2.64178L13.4692 5.57514C13.5858 5.80015 13.9442 6.06682 14.1942 6.10848L16.8525 6.55015C18.2942 6.79182 18.7442 7.5585 18.8776 7.99184C19.0109 8.42517 19.0942 9.30852 18.0692 10.3419L16.0025 12.4169C15.8025 12.6169 15.6775 13.0669 15.7359 13.3419L16.3275 15.9003C16.7109 17.5669 16.1192 18.2919 15.7359 18.5753C15.5275 18.7253 15.1942 18.8919 14.7192 18.8919Z" fill="#FFCA01" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M14.7192 18.8919C14.2775 18.8919 13.7108 18.7503 13.0025 18.3336L10.5108 16.8586C10.2525 16.7086 9.75247 16.7086 9.50247 16.8586L7.00244 18.3336C5.52742 19.2086 4.66075 18.8586 4.26908 18.5753C3.88574 18.2919 3.28573 17.5669 3.6774 15.9003L4.26908 13.3419C4.33574 13.0752 4.20241 12.6169 4.00241 12.4169L1.93572 10.3502C0.902375 9.31685 0.98571 8.43351 1.12738 8.00017C1.26905 7.56683 1.71905 6.80016 3.1524 6.55849L5.81076 6.11682C6.06076 6.07515 6.4191 5.80848 6.52743 5.58348L8.00245 2.64178C8.66912 1.3001 9.54413 1.1001 10.0025 1.1001C10.4608 1.1001 11.3358 1.3001 12.0025 2.64178L13.4692 5.57514C13.5858 5.80015 13.9442 6.06682 14.1942 6.10848L16.8525 6.55015C18.2942 6.79182 18.7442 7.5585 18.8776 7.99184C19.0109 8.42517 19.0942 9.30852 18.0692 10.3419L16.0025 12.4169C15.8025 12.6169 15.6775 13.0669 15.7359 13.3419L16.3275 15.9003C16.7109 17.5669 16.1192 18.2919 15.7359 18.5753C15.5275 18.7253 15.1942 18.8919 14.7192 18.8919Z" fill="#FFCA01" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M14.7192 18.8919C14.2775 18.8919 13.7108 18.7503 13.0025 18.3336L10.5108 16.8586C10.2525 16.7086 9.75247 16.7086 9.50247 16.8586L7.00244 18.3336C5.52742 19.2086 4.66075 18.8586 4.26908 18.5753C3.88574 18.2919 3.28573 17.5669 3.6774 15.9003L4.26908 13.3419C4.33574 13.0752 4.20241 12.6169 4.00241 12.4169L1.93572 10.3502C0.902375 9.31685 0.98571 8.43351 1.12738 8.00017C1.26905 7.56683 1.71905 6.80016 3.1524 6.55849L5.81076 6.11682C6.06076 6.07515 6.4191 5.80848 6.52743 5.58348L8.00245 2.64178C8.66912 1.3001 9.54413 1.1001 10.0025 1.1001C10.4608 1.1001 11.3358 1.3001 12.0025 2.64178L13.4692 5.57514C13.5858 5.80015 13.9442 6.06682 14.1942 6.10848L16.8525 6.55015C18.2942 6.79182 18.7442 7.5585 18.8776 7.99184C19.0109 8.42517 19.0942 9.30852 18.0692 10.3419L16.0025 12.4169C15.8025 12.6169 15.6775 13.0669 15.7359 13.3419L16.3275 15.9003C16.7109 17.5669 16.1192 18.2919 15.7359 18.5753C15.5275 18.7253 15.1942 18.8919 14.7192 18.8919Z" fill="#FFCA01" />
                                    </svg>
                                </p>
                                {/* Repeat above stars */}
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

                {/* <h4>Add Traveler</h4>
                <div className='flex items-center w-full gap-5'>
                    <div className='flex-1'>
                        <button className='btnOrange w-full '><svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M12.5 8V16M16.5 12H8.5M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg> Add Traveler 1</button>
                    </div>
                    <div className='flex-1'>
                        <button className='btnOrange w-full '><svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M12.5 8V16M16.5 12H8.5M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg> Add Traveler 2</button>
                    </div>
                </div> */}
                <h4>Please Enter Contact Details</h4>
                <form className='mb-20 flex flex-col gap-5' >
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
            <div className='col-span-3 h-fit  px-5 shadow-xl     rounded-lg py-5'>
                <h1 className='border-b'>$4700 <span className='font-normal text-lg'>(Inclusive of All Taxes)</span></h1>
                <div className='flex items-start mt-5 border-b pb-5 justify-between'>
                    <div> <h4>Total Basic Cost</h4>
                        <p className='text-base font-normal flex items-center gap-3'><span>2500</span> <span>x</span> <span>2</span> Travelers </p></div>
                    <h4>$5000</h4>
                </div>
                <div className='flex items-start mt-5 border-b pb-5 justify-between'>
                    <div>
                        <div className='flex flex-col gap-2 mb-3'>
                            <h4>Coupon Discount</h4>
                            <span className='bg-[#EB5B2A] text-white px-3 py-1 rounded-2xl w-fit '>BESTOFFER50</span>
                        </div>
                        <p className='text-base font-normal flex items-center gap-3'><span>2500</span> <span>x</span> <span>2</span> Travelers </p></div>
                    <h4>-$350</h4>
                </div>
                <div className='flex items-start mt-5 border-b pb-5 justify-between'>
                    <div> <h4>Fee & Taxes</h4>
                        <p className='text-base font-normal flex items-center gap-3'><span>2500</span> <span>x</span> <span>2</span> Travelers </p></div>
                    <h4>+$50</h4>
                </div>
                <div className='flex items-start mt-5 border-b pb-5 justify-between'>
                    <div> <h4>Coupon Discount</h4>
                        <p className='text-base font-normal flex items-center gap-3'><span>2500</span> <span>x</span> <span>2</span> Travelers </p></div>
                    <h4>-$350</h4>
                </div>
                <button className='btnOrange w-full mt-4   '>Proceed To Payments</button>
            </div>
        </div>
    );
}

export default ReviewPackage;
