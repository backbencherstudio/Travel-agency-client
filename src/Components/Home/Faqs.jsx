import React, { useState, useRef } from "react";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "How can I reset my password?",
      answer:
        "Absolutely! Our team specializes in creating personalized itineraries tailored to your interests, preferences, and budget.",
    },
    {
      question: "How do I book a tour with your agency?",
      answer:
        "You can book by contacting our support team or using our online booking system.",
    },
    {
      question: "What’s included in the tour packages?",
      answer: "Tour packages include accommodation, transportation, and guided tours.",
    },
    {
      question: "Do you offer travel insurance?",
      answer: "Yes, we offer optional travel insurance for all our tours.",
    },
    {
      question: "What happens if I need to cancel or reschedule my trip?",
      answer: "We have flexible rescheduling policies. Contact support for assistance.",
    },
  ];

  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold md:text-5xl md:leading-tight text-[#252D3C]">
            Frequently Asked Questions
          </h2>
          <div className="my-12">
            <p className="mt-1 text-2xl text-[#2C3444] font-bold">
              Don’t Get Answer?
            </p>
            <p className="mt-1 text-lg font-normal text-gray-600 dark:text-neutral-400">
              We will answer you in less than 2 hours!!
            </p>
          </div>
        </div>
        <div>
          <div className="grid gap-4 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="hs-accordion pl-6 pb-5 pr-5 pt-4 border bg-white rounded-xl"
              >
                <button
                  className="flex items-center justify-between text-left w-full"
                  onClick={() => toggleFAQ(index)}
                >
                  <h5
                    className={`${
                      activeIndex === index ? "border-b border-dashed pb-3" : ""
                    } w-full text-base md:text-2xl font-medium text-[#000E18]`}
                  >
                    {faq.question}
                  </h5>
                  <svg
                    className={`w-6 h-6 text-gray-900 transition duration-500 ${
                      activeIndex === index ? "hidden" : "block"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12H18M12 18V6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <svg
                    className={`w-6 h-6 text-gray-900 transition duration-500 ${
                      activeIndex === index ? "block" : "hidden"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12H18"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeIndex === index ? "max-h-[200px]" : "max-h-0"
                  }`}
                  style={{
                    height: activeIndex === index ? contentRefs.current[index]?.scrollHeight : 0,
                  }}
                >
                  <p className="text-[#404C5C] text-base font-normal mt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
