import { Link } from "react-router-dom"
export default function ConfirmBooking() {
    return (
        <div className="bg-white rounded-xl p-6 flex flex-col gap-5">
            <div className="w-full flex flex-col gap-5 items-center justify-center">
                <div className="p-[11px] bg-[#f4afaf1a] rounded-full">
                    <div className="p-[11px] bg-[#f4afaf33] rounded-full">
                        <div className="bg-[#EB5B2A] w-16 h-16 flex items-center justify-center rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                <rect x="4.5" y="7" width="16" height="14" rx="4" stroke="white" stroke-width="1.5" />
                                <circle cx="12.5" cy="14" r="2" stroke="white" stroke-width="1.5" />
                                <path d="M16.5 7C16.5 4.79086 14.7091 3 12.5 3C10.2909 3 8.5 4.79086 8.5 7" stroke="white" stroke-width="1.5" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[30px] w-full">
                    <div className="text-center flex flex-col gap-[10px]">
                        <h3 className="text-[24px] font-bold text-[#0F1416] text-nowrap flex flex-col">
                            <span>Your Booking has been</span>
                            <span>Confirmed</span>
                        </h3>
                        <div className="text-[16px] text-[#0F1416] font-medium text-nowrap">
                            <p>Thanks for booking trip. We will share you all the
                            </p>
                            <p>trip details in your registered email address</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link to="/tours?">
                            <div className="py-3 px-4 w-full text-center text-[#FFF] text-[16px] font-semibold bg-orange-500 rounded-full cursor-pointer">
                                View Tour
                            </div>
                        </Link>
                        <Link to="/">
                            <div className="py-3 px-4 w-full text-center text-[#EB5B2A] text-[16px] font-semibold border border-[#EB5B2A] rounded-full cursor-pointer">
                                Back to Home
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}