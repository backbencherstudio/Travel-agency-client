import { Link } from "react-router-dom"

export default function CheckAvailability({handleCheckAvailability}) {
    return (
        <div className="bg-white rounded-xl p-6 w-full max-w-[405px] flex flex-col gap-5 relative">
            <div className="w-full flex flex-col items-center justify-center">
                <div className="p-[11px] bg-[#f4afaf1a] rounded-full">
                    <div className="p-[11px] bg-[#f4afaf33] rounded-full">
                        <div className="bg-[#EB5B2A] w-16 h-16 flex items-center justify-center rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21C16.5228 21 21 16.5228 21 11Z" stroke="white" stroke-width="1.5" />
                                <path d="M11.2422 16V11C11.2422 10.5286 11.2422 10.2929 11.0957 10.1464C10.9493 10 10.7136 10 10.2422 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.992 7H11.001" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[30px] w-full">
                    <div className="text-center flex flex-col gap-[10px]">
                        <h3 className="text-[18px] font-medium text-[#0F1416] text-nowrap">Sorry, this date is sold out for 5 travelers</h3>
                        <p className="text-[16px] text-[#475467] font-medium">We're sorry: this package is currently unavailable for booking. Please check back later or explore other options.</p>
                    </div>
                    <Link to="/" onClick={handleCheckAvailability}>
                        <div className="py-3 px-4 w-full text-center text-[#EB5B2A] text-[16px] font-semibold border border-[#EB5B2A] rounded-full cursor-pointer">
                            Back to Home
                        </div>
                    </Link>
                </div>
            </div>
            <div className="absolute top-4 left-4 cursor-pointer" onClick={handleCheckAvailability}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M15 1L1 15" stroke="#0F1416" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M1 1L15 15" stroke="#0F1416" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    )
}