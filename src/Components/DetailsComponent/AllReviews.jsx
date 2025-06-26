import ReviewCard from "./ReviewCard"
import './details.css'


export default function AllReviews({handleShowAllReview,handlePostNewReview,reviews}) {
    const overallRating = [
        78, 62, 44, 30, 18
    ]


    return (
        <div className="bg-white rounded-xl p-6 w-fit h-fit max-w-[1024px] relative">
            <div className="flex flex-col sm:flex-row justify-between gap-16">
                <div className="flex flex-col gap-7 md:w-[230px] lg:w-[300px]">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path d="M10.6774 6.30847C12.1551 3.65751 12.894 2.33203 13.9987 2.33203C15.1034 2.33203 15.8422 3.65751 17.32 6.30847L17.7023 6.9943C18.1222 7.74762 18.3322 8.12428 18.6596 8.3728C18.987 8.62133 19.3947 8.71358 20.2102 8.89809L20.9526 9.06606C23.8222 9.71534 25.257 10.04 25.5984 11.1377C25.9397 12.2354 24.9616 13.3793 23.0052 15.6669L22.4991 16.2588C21.9432 16.9089 21.6652 17.2339 21.5402 17.636C21.4151 18.0381 21.4572 18.4718 21.5412 19.3392L21.6177 20.1288C21.9135 23.1811 22.0614 24.7072 21.1677 25.3856C20.274 26.064 18.9306 25.4455 16.2437 24.2084L15.5486 23.8883C14.7851 23.5368 14.4034 23.361 13.9987 23.361C13.594 23.361 13.2123 23.5368 12.4488 23.8883L11.7536 24.2084C9.06682 25.4455 7.7234 26.064 6.8297 25.3856C5.936 24.7072 6.08389 23.1811 6.37966 20.1288L6.45618 19.3392C6.54023 18.4718 6.58225 18.0381 6.4572 17.636C6.33216 17.2339 6.05419 16.9089 5.49827 16.2588L4.99214 15.6669C3.03582 13.3793 2.05766 12.2354 2.39902 11.1377C2.74038 10.04 4.1752 9.71534 7.04482 9.06606L7.78723 8.89809C8.60269 8.71358 9.01042 8.62133 9.3378 8.3728C9.66518 8.12428 9.87514 7.74762 10.2951 6.9943L10.6774 6.30847Z" fill="#161721" />
                        </svg>
                        <div className="text-[32px] font-medium text-[#1D1F2C]">{4.88} <span className="text-base">Rating</span></div>
                    </div>
                    <div className="flex flex-col gap-[18px] md:sticky top-5">
                        <h3 className="text-[#0F1416] text-base font-semibold">Overall rating</h3>
                        <div>
                            {overallRating?.map((rating, index) => (<div key={rating} className="flex gap-[14px] items-center">
                                <span className="text-[#252B42] text-[14px] w-[40px]">{5 - index} Star</span>
                                <div className="flex-1 bg-[#E9ECEF] h-2 rounded-full">
                                    <div className="bg-[#161721] h-full rounded-full" style={{ width: `${rating}%` }}></div>
                                </div>
                                <span className="text-[#252B42] text-[14px] w-[32px]">{rating}%</span>
                            </div>))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-11 flex-1">
                    <div className="flex justify-between">
                        <div className="pr-10 text-[#1D1F2C] text-md md:text-xl lg:text-2xl font-semibold">
                            <h3>Guest reviews Sacred</h3>
                            <h3>Temples of Bali</h3>
                        </div>
                        <button className="px-2 sm:px-5 sm:py-[11px] border rounded-full text-orange-500 border-orange-500 text-sm lg:text-base" onClick={()=>{handlePostNewReview();handleShowAllReview()}}>Write a review</button>
                    </div>
                    <div className="flex flex-col gap-4 sm:gap-11">
                        <div className="flex flex-col gap-[18px]">
                            <div className="flex justify-between items-center text-xs sm:text-base">
                                <h3>Guest reviews</h3>
                                <div className="sm:text-[14px] text-xs font-medium flex items-center gap-2">
                                    <label htmlFor="">Sort reviews by : </label>
                                    <div className="p-2 border border-[#DFE1E7] rounded-full">
                                        <select name="" id="" className="bg-white text-[#1D1F2C] font-normal outline-none">
                                            <option value="most_relecant">Most relevant</option>
                                            <option value="newest">Newest</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 py-2 border rounded-full flex items-center gap-1">
                                <label htmlFor="search" className="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 2.5C4.62665 2.5 2.5 4.62665 2.5 7.25C2.5 9.87335 4.62665 12 7.25 12C9.87335 12 12 9.87335 12 7.25C12 4.62665 9.87335 2.5 7.25 2.5ZM1.5 7.25C1.5 4.07436 4.07436 1.5 7.25 1.5C10.4256 1.5 13 4.07436 13 7.25C13 10.4256 10.4256 13 7.25 13C4.07436 13 1.5 10.4256 1.5 7.25Z" fill="#4A4C56" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6089 10.6089C10.8042 10.4137 11.1208 10.4137 11.3161 10.6089L14.3536 13.6464C14.5488 13.8417 14.5488 14.1583 14.3536 14.3536C14.1583 14.5488 13.8417 14.5488 13.6464 14.3536L10.6089 11.3161C10.4137 11.1208 10.4137 10.8042 10.6089 10.6089Z" fill="#4A4C56" />
                                    </svg>
                                </label>
                                <input type="text" name="search" id="search" placeholder="Search reviews" className="outline-none placeholder:text-[12px] text-[#4A4C56] py-1" />
                            </div>
                        </div>
                        <div>
                            {reviews.map(review => <ReviewCard key={review.user.user_name} review={review} />)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-4 left-4 cursor-pointer" onClick={handleShowAllReview}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M15 1L1 15" stroke="#0F1416" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M1 1L15 15" stroke="#0F1416" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    )
}