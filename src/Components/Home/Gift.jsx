import React from "react";
import ChatToggle from "../../Shared/ChatToggle";
import { useTravelData } from "../../Context/TravelDataContext/TravelDataContext";
import gift from "../../assets/img/gift/gift-icon.svg";
import bgImage from "../../assets/img/gift/bg-icon.png";
import moment from "moment";

const Gift = () => {
    // const { homeData } = useTravelData();
    // console.log('homeData', homeData);
    const giftCards = [
        {
            id: 1,
            card_name: "Virtual Gift Card",
            gift_value: 100,
            valid_for: "Any Tour or Package",
            gift_code: "GIFT 2025",
            valid_until: "2025-12-31",
        },
        {
            id: 2,
            card_name: "Virtual Gift Card",
            gift_value: 150,
            valid_for: "Any Tour or Package",
            gift_code: "GIFT 2025",
            valid_until: "2025-12-31",
        },
        {
            id: 3,
            card_name: "Virtual Gift Card",
            gift_value: 200,
            valid_for: "Any Tour or Package",
            gift_code: "GIFT 2025",
            valid_until: "2025-12-31",
        },
    ];

    return (
        <>
            <div>
                <div className="w-full px-5 xl:px-0">
                    <div className="max-w-[1216px] mx-auto">
                        <div className="text-center max-w-[800px] mx-auto flex flex-col gap-4 justify-center items-center">
                            <div className='text-2xl md:text-4xl font-bold text-center flex flex-col md:flex-row justify-center items-center gap-3 text-[#1D1F2C]'><img src={gift} alt="Gift" />  Send a Gift, Share a Journey</div>
                            <p className="text-sm md:text-lg font-medium text-center text-[#475467]">Surprise your loved ones with the perfect travel gift! Choose from a variety of pre-paid gift cards that can be used to book exclusive packages, tours, and experiences</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start py-12 md:py-20">
                            {giftCards?.map((giftCard, index) => (
                                <div key={index} className="px-[30px] py-[38px] flex flex-col gap-3 bg-white shadow rounded-xl overflow-hidden items-center justify-start border-[3px] border-dashed border-[#EB5B2A] relative" style={{ backgroundImage: `url(${bgImage})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '90%' }}>
                                    <div className="w-full flex flex-col gap-4 items-center">
                                        <div className="flex flex-col gap-3 justify-center items-center">
                                            <p className="text-lg font-bold flex flex-row justify-center items-center gap-2"><img src={gift} className="w-[18px] h-[18px]" alt="Gift" /> {giftCard.card_name} <img src={gift} className="w-[18px] h-[18px]" alt="Gift" /></p>
                                            <p className="text-sm text-[#475467]">Redeem this gift for your next adventure</p>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center w-full">
                                            <p className="text-base font-medium text-[#0F1416]">Gift Value:</p>
                                            <p className=" text-[#EB5B2A]">${giftCard.gift_value}</p>
                                        </div>
                                        <div className="flex flex-row gap-2 items-center w-full">
                                            <p className="text-base font-medium text-[#0F1416]">Valid for:</p>
                                            <p className=" text-[#475467]">{giftCard.valid_for}</p>
                                        </div>
                                        <div className="bg-[#FDEFEA] flex flex-col gap-2 items-center w-full border border-dashed border-[#EB5B2A] rounded-lg p-2">
                                            <p className="text-sm text-[#475467]">Use this code at Booking:</p>
                                            <p className="text-xl font-bold text-[#0E457D]">{giftCard.gift_code}</p>
                                        </div>
                                        <button className="bg-[#D65326] text-white px-8 py-[10px] rounded-full text-sm">Redeem Now</button>
                                        <div className="flex flex-row gap-2 items-center w-full mb-6">
                                            <p className="text-base font-medium text-[#0F1416]">Valid until:</p>
                                            <p className=" text-[#475467]">{moment(giftCard.valid_until).format('MMMM DD, YYYY')}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start py-12 md:py-20">
              {destinations?.map((destination) => (
                <div className="flex gap-3 bg-white shadow rounded-xl overflow-hidden items-center justify-start">
                  <div className="relative w-[102px] h-[102px] flex-shrink-0">
                    <img
                      className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50"
                      loading="lazy"
                      src={destination.image}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-xl font-bold">{destination.title}</p>
                    <span className="text-sm text-[#4A4C56]">
                      Price starts at{" "}
                      <span className="text-[#EB5B2A]">
                        ${destination.starting_price}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div> */}
                </div>
            </div>

            <ChatToggle />

        </>
    );
};

export default Gift;
