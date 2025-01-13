import React from "react";
import cancel from "../../assets/img/contact/cancel.png";
import HeroSection from "../../Components/HeroSection/HeroSection";
import ParentComponent from "../../Components/ParentComponent/ParentComponent";

const Cancellation = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Cancellation", path: "/cancellation" },
  ];

  // ===========Contents============
  const policies = [
    {
      id: 1,
      title: `. General Cancellations`,
      text: `Within 24 Hours of Booking: Receive a full refund if you cancel within the first 24 hours of booking.
      7 Days Before Departure: Cancellations made up to 7 days before departure qualify for a 75% refund.
      Less Than 7 Days Before Departure: Unfortunately, cancellations made within 7 days of the trip start date will not be eligible for a refund.`,
    },

    {
      id: 2,
      title: `. Customized Itinerary Cancellations`,
      text: `For tailored or customized itineraries, cancellation terms may differ. Due to the personalized nature of these trips, certain services may be non-refundable. Please refer to your itinerary agreement or contact us directly for specific details.`,
    },

    {
      id: 3,
      title: `. Group Travel Cancellations`,
      text: `Group travel cancellations are subject to unique terms based on group size and travel arrangements. We recommend contacting our support team for group-specific cancellation policies and refund guidelines.`,
    },

    {
      id: 4,
      title: `. Special Events or Seasonal Packages`,
      text: `Seasonal or promotional packages may have separate cancellation terms, which are outlined at the time of booking. Please review the terms carefully, as certain promotions may be non-refundable.`,
    },

    {
      id: 5,
      title: `. How to Request a Cancellation`,
      text: `To request a cancellation, please reach out to our customer service team via email or phone. Be sure to include your booking reference number, trip details, and the reason for cancellation. Once received, we will process your request promptly and provide any applicable refunds within 7-10 business days.`,
    },

    {
      id: 6,
      title: `. Travel Insurance`,
      text: `For additional peace of mind, we recommend purchasing travel insurance. This can provide added coverage for unforeseen events such as medical emergencies, trip interruptions, or cancellations beyond our standard policy.`,
    },
  ];
  // ===========Contents============

  return (
    <>
      <HeroSection
        bgImg={cancel}
        pageName="Cancellation Policies"
        links={links}
        description="We understand that travel plans can change unexpectedly. Our cancellation policy is designed to provide flexibility while ensuring fairness to all our customers."
      />

      <ParentComponent>
        <div className="content grid lg:grid-cols-2 w-[70%] lg:w-auto ">
          <div className="left mb-12">
            <div className="flex flex-row sm:flex-col gap-4 text-[#0155FE]">
              <h1 className="sm:text-[62px] text-4xl flex flex-col ">
                Cancellation 
              </h1>
              <h1 className="sm:text-[62px] text-4xl flex flex-col ">Policies</h1>
            </div>
          </div>
          <div className="right">
            {policies.map((data, index) => (
              <div className="items">
                <h1 className="text-[31px] mb-5 font-semibold  ">
                  {index + 1} {data.title}
                </h1>
                <p className="text-[20px] mb-7">{data.text}</p>
              </div>
            ))}
          </div>
        </div>
      </ParentComponent>
    </>
  );
};

export default Cancellation;
