import React, { useState } from 'react';

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { question: "How can I reset my password?", answer: "Absolutely! Our team specializes in creating personalized itineraries tailored to your interests, preferences, and budget." },
    { question: "How do I book a tour with your agency?", answer: "Absolutely! Our team specializes in creating personalized itineraries tailored to your interests, preferences, and budget." },
    { question: "What’s included in the tour packages?", answer: "Absolutely! Our team specializes in creating personalized itineraries tailored to your interests, preferences, and budget." },
    { question: "Do you offer travel insurance?", answer: "Absolutely! Our team specializes in creating personalized itineraries tailored to your interests, preferences, and budget." },
    { question: "What happens if I need to cancel or reschedule my trip?", answer: "Absolutely! Our team specializes in creating personalized itineraries tailored to your interests, preferences, and budget." },
  ];

  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="flex gap-12">
        <div>
          <div>
            <h2 className="text-2xl font-bold md:text-5xl md:leading-tight text-[#252D3C]">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="my-12">
            <p className="mt-1 text-2xl text-[#2C3444] font-bold">Don’t Get Answer?</p>
            <p className="mt-1 text-lg font-normal text-gray-600 dark:text-neutral-400">
              We will answer you in less than 2 hours!!
            </p>
          </div>
        </div>

        <div>
          <div className="grid gap-4 divide-y divide-gray-200 dark:divide-neutral-700">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="hs-accordion pl-6 pb-6 pr-5 pt-4 bg-white rounded-xl w-full"
              >
                <button
                  className="group inline-flex items-center justify-between text-left w-full"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={openIndex === index}
                >
                  <h5 className="border-b border-dashed w-full text-2xl font-medium text-[#000E18] pb-3">
                    {faq.question}
                  </h5>
                  {openIndex === index ? (
                    <svg
                      className="w-6 h-6 text-indigo-600 transition duration-500"
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
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-900 transition duration-500"
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
                  )}
                </button>
                {openIndex === index && (
                  <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 pt-2">
                    <p className="text-[#404C5C] text-base font-normal">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
