

export default function TravelerPhotos({ travellerPhotos }) {
    return (
        <div>
            <h3 className="pb-5 text-[18px] font-semibold text-[#0F1416]">Traveler Photos:</h3>
            <div className="flex flex-col sm:flex-row gap-2 relative">
                {travellerPhotos?.length >= 1 && (
                    <div className="flex-1 relative">
                        <div className="w-[280px] sm:w-[357px] h-[306px]">
                            <img
                                src={travellerPhotos[0]?.image_url}
                                alt="Travel video"
                                className="w-full h-full object-cover rounded-xl"
                            ></img>
                        </div>
                        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-[10px] bg-[#FFFFFFCC] rounded-full cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="14"
                                viewBox="0 0 12 14"
                                fill="none"
                            >
                                <path
                                    d="M11.1679 7.63448C10.9029 8.64175 9.65 9.35352 7.14431 10.7771C4.72204 12.1532 3.5109 12.8413 2.53488 12.5647C2.13135 12.4503 1.76369 12.2332 1.46718 11.934C0.75 11.2104 0.75 9.80695 0.75 7C0.75 4.19305 0.75 2.78957 1.46718 2.06599C1.76369 1.76683 2.13135 1.54966 2.53488 1.43532C3.5109 1.15874 4.72204 1.84681 7.14431 3.22294C9.65 4.64648 10.9029 5.35825 11.1679 6.36552C11.2774 6.78129 11.2774 7.21871 11.1679 7.63448Z"
                                    stroke="#EB5B2A"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div> */}
                    </div>
                )}
                <div className="flex-1 flex gap-2 overflow-hidden w-[280px] sm:w-[357px]">
                    <div className=" w-1/2 h-[306px] flex flex-col gap-2">
                        {travellerPhotos?.length >= 2 && (
                            <div className="h-1/2 rounded-xl">
                                <img
                                    src={travellerPhotos[1]?.image_url}
                                    alt="Travel Photo"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                        )}
                        {travellerPhotos?.length >= 3 && (
                            <div className="flex-1 h-1/2 rounded-xl overflow-hidden">
                                <img
                                    src={travellerPhotos[2]?.image_url}
                                    alt="Travel Photo"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                        )}
                    </div>
                    <div className="w-1/2 flex h-[306px] flex-col gap-2">
                        {travellerPhotos?.length >= 4 && (
                            <div className="h-1/2">
                                <img
                                    src={travellerPhotos[3]?.image_url}
                                    alt="Travel Photo"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                        )}
                        {travellerPhotos?.length >= 5 && (
                            <div
                                className={`w-full ${window.innerWidth <= 325
                                    ? "h-[127px]"
                                    : window.innerWidth <= 380
                                        ? "h-[151px]"
                                        : window.innerWidth <= 450
                                            ? "h-[174.48px]"
                                            : "h-[151.48px]"
                                    } max-w-full relative overflow-hidden`}
                            >
                                <img
                                    src={travellerPhotos[4]?.image_url}
                                    alt="Travel Photo"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                <div
                                    className={`absolute top-0 select-none text-white flex flex-col items-center justify-center gap-1 ${window.innerWidth <= 325
                                        ? "h-[127px]"
                                        : window.innerWidth <= 450
                                            ? "h-[174.48px]"
                                            : "h-[151.48px]"
                                        } w-full bottom-0 right-0 z-[1] bg-[#00000061] rounded-2xl cursor-pointer overflow-hidden`}

                                >
                                    <div className="px-[10px] py-[12px] border-2 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="10"
                                            viewBox="0 0 14 10"
                                            fill="none"
                                        >
                                            <path
                                                d="M12.7503 5L0.750244 5"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M9.00027 8.75C9.00027 8.75 12.7502 5.98817 12.7502 4.99997C12.7503 4.01177 9.00024 1.25 9.00024 1.25"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">
                                        Show more
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}