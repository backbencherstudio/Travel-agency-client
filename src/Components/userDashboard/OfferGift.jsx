import React, { useEffect, useState } from "react";
import gift from "../../assets/img/gift/gift-icon.svg";
import bgImage from "../../assets/img/gift/bg-icon.png";
import moment from "moment";
import { UserServices } from "~/userServices/user.services";
import { useLocation } from "react-router-dom";

// console.log('homeData', homeData);
// const giftCards = [
//   {
//     id: 1,
//     card_name: "Virtual Gift Card",
//     gift_value: 100,
//     valid_for: "Any Tour or Package",
//     gift_code: "GIFT 2025",
//     valid_until: "2025-12-31",
//   },
//   {
//     id: 2,
//     card_name: "Virtual Gift Card",
//     gift_value: 150,
//     valid_for: "Any Tour or Package",
//     gift_code: "GIFT 2025",
//     valid_until: "2025-12-31",
//   },
//   {
//     id: 3,
//     card_name: "Virtual Gift Card",
//     gift_value: 200,
//     valid_for: "Any Tour or Package",
//     gift_code: "GIFT 2025",
//     valid_until: "2025-12-31",
//   },
//   {
//     id: 3,
//     card_name: "Virtual Gift Card",
//     gift_value: 200,
//     valid_for: "Any Tour or Package",
//     gift_code: "GIFT 2025",
//     valid_until: "2025-12-31",
//   },
// ];

const OfferGift = () => {
  const [giftCards, setGiftCards] = useState([]);
  const path = useLocation();
  const fetchCards = async () => {
    try {
      const res = await UserServices?.getGiftcards();
      if (res?.success) {
        setGiftCards(res?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="">
      <div className="  grid grid-cols-2 gap-6">
        {giftCards?.map((giftCard, index) => (
          <div
            key={index}
            className="px-[30px] py-[38px] flex flex-col gap-3 bg-white shadow rounded-xl overflow-hidden items-center justify-start border-[3px] border-dashed border-[#EB5B2A] relative"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "90%",
            }}
          >
            <div className="w-full flex flex-col gap-4 items-center">
              <div className="flex flex-col gap-3 justify-center items-center">
                <p className="text-lg font-bold flex flex-row justify-center items-center gap-2">
                  <img src={gift} className="w-[18px] h-[18px]" alt="Gift" />{" "}
                  {giftCard.card_name}{" "}
                  <img src={gift} className="w-[18px] h-[18px]" alt="Gift" />
                </p>
                {path?.pathname === "/user-dashboard/offer" ? (
                  <p className="text-sm text-[#475467]">
                    Send this to your loved ones.
                  </p>
                ) : (
                  <p>Redeem this gift for your next adventure</p>
                )}
              </div>
              {giftCard?.amount && (
                <div className="flex flex-row gap-2 items-center w-full">
                  <p className="text-base font-medium text-[#0F1416]">
                    Gift Value:
                  </p>
                  <p className=" text-[#EB5B2A]">${giftCard.amount}</p>
                </div>
              )}
              {giftCard?.valid_for && (
                <div className="flex flex-row gap-2 items-center w-full">
                  <p className="text-base font-medium text-[#0F1416]">
                    Valid for:
                  </p>
                  <p className=" text-[#475467]">{giftCard.valid_for}</p>
                </div>
              )}
              <div className="bg-[#FDEFEA] flex flex-col gap-2 items-center w-full border border-dashed border-[#EB5B2A] rounded-lg p-2">
                <p className="text-sm text-[#475467]">
                  Use this code at Booking:
                </p>
                <p className="text-xl font-bold text-[#0E457D]">
                  {giftCard.code}
                </p>
              </div>
              {!path?.pathname === "/user-dashboard/offer" && (
                <button className="bg-[#D65326] text-white px-8 py-[10px] rounded-full text-sm">
                  Redeem Now
                </button>
              )}
              {giftCard?.valid_until && (
                <div className="flex flex-row gap-2 items-center w-full mb-6">
                  <p className="text-base font-medium text-[#0F1416]">
                    Valid until:
                  </p>
                  <p className=" text-[#475467]">
                    {moment(giftCard.valid_until).format("MMMM DD, YYYY")}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferGift;
