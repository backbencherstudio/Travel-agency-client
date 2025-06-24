import { Link } from "react-router-dom"

export default function FreeCancellation({ handleFreeCancellation }) {
    const cancellationRules = [
        "For a full refund, you must cancel at least 24 hours before the experience's start time.",
        "If you cancel less than 24 hours before the experience's start time, the amount you paid will not be refunded.",
        "Any changes made less than 24 hours before the experience's start time will not be accepted.",
        "Cut-off times are based on the experience's local time."
    ]
    return (
        <div className="bg-white rounded-xl p-6 flex flex-col gap-8 relative w-[750px]">
            <div className="text-center flex flex-col gap-1">
                <h3 className="text-[#0F1416] text-[24px] font-semibold">Cancelllation Policy</h3>
                <p className="text-[#58677D] text-[14px]">Free cancellation</p>
            </div>
            <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-2">
                    <div className="w-full flex">
                        <div className="flex-1 text-end text-[#0F1416] text-[14px] font-medium">April 09</div>
                        <div className="flex-1 text-end text-[#0F1416] text-[14px] font-medium">April 10</div>
                    </div>
                    <div className="flex relative">
                        <div className="flex-1 text-center py-3 bg-[#14AE5C] rounded-l-xl text-[#0F1416] text-base font-semibold">100% refund</div>
                        <div className="w-[10px] h-[63px] bg-[#FFCA01] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
                        <div className="flex-1 text-center py-3 bg-[#EB5B2A] rounded-r-xl text-[#0F1416] text-base font-semibold">Non refundable</div>
                    </div>
                </div>
                <div className="flex flex-col gap-5">
                    <h3 className="text-[#0F1416] text-[16px]">You can cancel up to 24 hours in advance of the experience for a full refund.</h3>
                    <div className="flex flex-col gap-3">
                        {cancellationRules.map(rule => (
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                                    <path d="M9.875 8C9.875 8.62989 9.62478 9.23398 9.17938 9.67938C8.73398 10.1248 8.12989 10.375 7.5 10.375C6.87011 10.375 6.26602 10.1248 5.82062 9.67938C5.37522 9.23398 5.125 8.62989 5.125 8C5.125 7.37011 5.37522 6.76602 5.82062 6.32062C6.26602 5.87522 6.87011 5.625 7.5 5.625C8.12989 5.625 8.73398 5.87522 9.17938 6.32062C9.62478 6.76602 9.875 7.37011 9.875 8Z" fill="black" />
                                </svg>
                                <p className="text-[#475467] text-base text-wrap">{rule}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-1">
                        <Link to="/cancellation" className="underline">Learn more</Link>{" "}<span>about cancellations</span>
                    </div>
                </div>
            </div>
            <div className="absolute top-4 left-4 cursor-pointer" onClick={handleFreeCancellation}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M15 1L1 15" stroke="#0F1416" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M1 1L15 15" stroke="#0F1416" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    )
}