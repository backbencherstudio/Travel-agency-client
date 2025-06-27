import { RailSymbol } from "lucide-react";
import { useEffect, useRef, useState } from "react";


const FilledStar = () => (<svg xmlns="http://www.w3.org/2000/svg" width="38" height="37" viewBox="0 0 38 37" fill="none">
        <path d="M14.6118 8.33856C16.5645 4.83551 17.5409 3.08398 19.0007 3.08398C20.4604 3.08398 21.4368 4.83551 23.3895 8.33856L23.8947 9.24484C24.4496 10.2403 24.7271 10.738 25.1597 11.0664C25.5923 11.3948 26.1311 11.5167 27.2087 11.7606L28.1897 11.9825C31.9817 12.8405 33.8777 13.2695 34.3288 14.7201C34.7799 16.1706 33.4873 17.6821 30.9022 20.7051L30.2334 21.4872C29.4987 22.3462 29.1314 22.7758 28.9662 23.3071C28.801 23.8385 28.8565 24.4116 28.9675 25.5577L29.0687 26.6012C29.4595 30.6345 29.6549 32.6511 28.474 33.5477C27.293 34.4442 25.5178 33.6268 21.9673 31.992L21.0488 31.5691C20.0398 31.1046 19.5354 30.8723 19.0007 30.8723C18.4659 30.8723 17.9615 31.1046 16.9525 31.5691L16.034 31.992C12.4835 33.6268 10.7083 34.4442 9.52734 33.5477C8.34638 32.6511 8.5418 30.6345 8.93264 26.6012L9.03375 25.5577C9.14482 24.4116 9.20035 23.8385 9.03511 23.3071C8.86986 22.7758 8.50256 22.3462 7.76794 21.4872L7.09913 20.7051C4.51399 17.6821 3.22142 16.1706 3.67251 14.7201C4.12359 13.2695 6.0196 12.8405 9.8116 11.9825L10.7926 11.7606C11.8702 11.5167 12.409 11.3948 12.8416 11.0664C13.2742 10.738 13.5517 10.2403 14.1066 9.24484L14.6118 8.33856Z" fill="#EB5B2A" />
    </svg>);


const EmptyStar = () => (<svg xmlns="http://www.w3.org/2000/svg" width="38" height="37" viewBox="0 0 38 37" fill="none">
        <path
            d="M14.6118 8.33856C16.5645 4.83551 17.5409 3.08398 19.0007 3.08398C20.4604 3.08398 21.4368 4.83551 23.3895 8.33856L23.8947 9.24484C24.4496 10.2403 24.7271 10.738 25.1597 11.0664C25.5923 11.3948 26.1311 11.5167 27.2087 11.7606L28.1897 11.9825C31.9817 12.8405 33.8777 13.2695 34.3288 14.7201C34.7799 16.1706 33.4873 17.6821 30.9022 20.7051L30.2334 21.4872C29.4987 22.3462 29.1314 22.7758 28.9662 23.3071C28.801 23.8385 28.8565 24.4116 28.9675 25.5577L29.0687 26.6012C29.4595 30.6345 29.6549 32.6511 28.474 33.5477C27.293 34.4442 25.5178 33.6268 21.9673 31.992L21.0488 31.5691C20.0398 31.1046 19.5354 30.8723 19.0007 30.8723C18.4659 30.8723 17.9615 31.1046 16.9525 31.5691L16.034 31.992C12.4835 33.6268 10.7083 34.4442 9.52734 33.5477C8.34638 32.6511 8.5418 30.6345 8.93264 26.6012L9.03375 25.5577C9.14482 24.4116 9.20035 23.8385 9.03511 23.3071C8.86986 22.7758 8.50256 22.3462 7.76794 21.4872L7.09913 20.7051C4.51399 17.6821 3.22142 16.1706 3.67251 14.7201C4.12359 13.2695 6.0196 12.8405 9.8116 11.9825L10.7926 11.7606C11.8702 11.5167 12.409 11.3948 12.8416 11.0664C13.2742 10.738 13.5517 10.2403 14.1066 9.24484L14.6118 8.33856Z"
            stroke="#A7B6CC"
            strokeWidth="1.125"
        />
    </svg>);

export default function PostNewReview({ handlePostNewReview, handleShowAllReview, reviews }) {
    const [rating, setRating] = useState([]);
    const fileInput = useRef(null);


    const handleFileInputOpen = () => {
        fileInput.current.click();
    };



    return (
        <div className="bg-white relative rounded-xl p-[40px]">
            <div className="flex flex-col gap-[60px]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-[60px] h-[60px] rounded-full">
                        <img src={reviews[0].avatar} alt="Guest profile picture" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div>
                        <h3 className="text-[20px] font-semibold text-[#323B47]">{reviews[0].user.name}</h3>
                        <h2 className="text-[#58677D] text-[14px]">{reviews[0].user.user_name}</h2>
                    </div>
                </div>
                <div className="flex flex-col gap-6 items-center">
                    <div className="flex gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setRating(i + 1)} // Set rating directly
                                className="cursor-pointer"
                            >
                                {i < rating ? <FilledStar /> : <EmptyStar />}
                            </button>
                        ))}
                    </div>
                    <div className="">
                        <textarea name="" id="" placeholder="Share details of your own experience at this place" className="resize-none w-full sm:w-[572px] h-[140px] border border-[#D2D2D5] rounded-xl p-4 outline-none"></textarea>
                    </div>
                    <div className="flex justify-center bg-[#F6F8FA] w-full py-2 rounded-xl">
                        <div onClick={handleFileInputOpen} className="flex gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                <g clip-path="url(#clip0_5033_48711)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.707 4.879C8.26948 4.31635 9.03242 4.00017 9.828 4H13.5C13.7652 4 14.0196 4.10536 14.2071 4.29289C14.3946 4.48043 14.5 4.73478 14.5 5C14.5 5.26522 14.3946 5.51957 14.2071 5.70711C14.0196 5.89464 13.7652 6 13.5 6H9.828C9.56281 6.00006 9.30849 6.10545 9.121 6.293L8.293 7.121C7.73052 7.68365 6.96758 7.99983 6.172 8H4.5C4.23478 8 3.98043 8.10536 3.79289 8.29289C3.60536 8.48043 3.5 8.73478 3.5 9V19C3.5 19.2652 3.60536 19.5196 3.79289 19.7071C3.98043 19.8946 4.23478 20 4.5 20H18.5C18.7652 20 19.0196 19.8946 19.2071 19.7071C19.3946 19.5196 19.5 19.2652 19.5 19V12C19.5 11.7348 19.6054 11.4804 19.7929 11.2929C19.9804 11.1054 20.2348 11 20.5 11C20.7652 11 21.0196 11.1054 21.2071 11.2929C21.3946 11.4804 21.5 11.7348 21.5 12V19C21.5 19.7956 21.1839 20.5587 20.6213 21.1213C20.0587 21.6839 19.2956 22 18.5 22H4.5C3.70435 22 2.94129 21.6839 2.37868 21.1213C1.81607 20.5587 1.5 19.7956 1.5 19V9C1.5 8.20435 1.81607 7.44129 2.37868 6.87868C2.94129 6.31607 3.70435 6 4.5 6H6.172C6.43719 5.99994 6.69151 5.89455 6.879 5.707L7.707 4.879Z" fill="black" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 14C6.5 12.6739 7.02678 11.4021 7.96447 10.4645C8.90215 9.52678 10.1739 9 11.5 9C12.8261 9 14.0979 9.52678 15.0355 10.4645C15.9732 11.4021 16.5 12.6739 16.5 14C16.5 15.3261 15.9732 16.5979 15.0355 17.5355C14.0979 18.4732 12.8261 19 11.5 19C10.1739 19 8.90215 18.4732 7.96447 17.5355C7.02678 16.5979 6.5 15.3261 6.5 14ZM11.5 11C11.106 11 10.7159 11.0776 10.3519 11.2284C9.98797 11.3791 9.65726 11.6001 9.37868 11.8787C9.1001 12.1573 8.87913 12.488 8.72836 12.8519C8.5776 13.2159 8.5 13.606 8.5 14C8.5 14.394 8.5776 14.7841 8.72836 15.1481C8.87913 15.512 9.1001 15.8427 9.37868 16.1213C9.65726 16.3999 9.98797 16.6209 10.3519 16.7716C10.7159 16.9224 11.106 17 11.5 17C12.2956 17 13.0587 16.6839 13.6213 16.1213C14.1839 15.5587 14.5 14.7956 14.5 14C14.5 13.2044 14.1839 12.4413 13.6213 11.8787C13.0587 11.3161 12.2956 11 11.5 11ZM16.5 5C16.5 4.73478 16.6054 4.48043 16.7929 4.29289C16.9804 4.10536 17.2348 4 17.5 4H23.5C23.7652 4 24.0196 4.10536 24.2071 4.29289C24.3946 4.48043 24.5 4.73478 24.5 5C24.5 5.26522 24.3946 5.51957 24.2071 5.70711C24.0196 5.89464 23.7652 6 23.5 6H17.5C17.2348 6 16.9804 5.89464 16.7929 5.70711C16.6054 5.51957 16.5 5.26522 16.5 5Z" fill="black" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5 1C20.7652 1 21.0196 1.10536 21.2071 1.29289C21.3946 1.48043 21.5 1.73478 21.5 2V8C21.5 8.26522 21.3946 8.51957 21.2071 8.70711C21.0196 8.89464 20.7652 9 20.5 9C20.2348 9 19.9804 8.89464 19.7929 8.70711C19.6054 8.51957 19.5 8.26522 19.5 8V2C19.5 1.73478 19.6054 1.48043 19.7929 1.29289C19.9804 1.10536 20.2348 1 20.5 1Z" fill="black" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_5033_48711">
                                        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <h3>Add photos</h3>
                        </div>
                        <input type="file" accept="image/*" ref={fileInput} className="hidden" />
                    </div>
                </div>
                <div className="flex gap-3 justify-end">
                    <button className="text-base font-medium text-orange-500 border border-orange-500 px-3 py-1 rounded-full" onClick={() => { handlePostNewReview(); handleShowAllReview() }}>Cancel</button>
                    <button className="text-base font-medium text-white bg-orange-500 px-6 py-[5px] rounded-full" onClick={() => { handlePostNewReview(); handleShowAllReview() }}>Post</button>
                </div>
            </div>
            <div className="absolute top-4 left-4 cursor-pointer" onClick={() => { handlePostNewReview(); handleShowAllReview() }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M15 1L1 15" stroke="#0F1416" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M1 1L15 15" stroke="#0F1416" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    )
}
