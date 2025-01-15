import React, { useState, useRef, useEffect } from 'react'
import { getFaqs } from '../../Apis/clientApi/ClientFaqApi'

const Faqs = () => {
  const [faqs, setFaqs] = useState([])
  const [activeIndex, setActiveIndex] = useState(null)
  const contentRefs = useRef([])

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFaqs()
        setFaqs(data.data)
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      }
    }

    fetchFaqs()
  }, [])

  const toggleFAQ = index => {
    setActiveIndex(index === activeIndex ? null : index)
  }

  return (
    <div className='max-w-[1216px] lg:px-8 xl:px-0 mx-auto'>
      <div className='w-full flex flex-col md:flex-row justify-between gap-2'>
        <div className='w-full md:w-5/12'>
          <div className='text-center md:text-left'>
            <h2 className='text-3xl font-bold sm:text-4xl lg:text-4xl xl:text-5xl md:leading-tight text-[#252D3C]'>
              Frequently Asked Questions
            </h2>
            <div className='my-12'>
              <p className='mt-1 text-2xl text-[#2C3444] font-bold'>
                Don’t Get Answer?
              </p>
              <p className='mt-1 text-lg font-normal text-gray-600 dark:text-neutral-400'>
                We will answer you in less than 2 hours!!
              </p>
            </div>
          </div>
        </div>

        <div className='w-full md:w-8/12'>
          <div className='grid gap-4 divide-gray-200'>
            {faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className='hs-accordion pl-6 pb-5 pr-5 pt-4 border bg-white rounded-xl'
                >
                  <button
                    className='flex items-center justify-between text-left w-full'
                    onClick={() => toggleFAQ(index)}
                  >
                    <h5
                      className={`${
                        activeIndex === index
                          ? 'border-b border-dashed pb-3'
                          : ''
                      } w-full text-base md:text-2xl font-medium text-[#000E18]`}
                    >
                      {faq.question}
                    </h5>
                    <div className='p-1 border rounded-full'>
                      <svg
                        className={`w-6 h-6 text-gray-900 transition duration-500 ${
                          activeIndex === index ? 'hidden' : 'block'
                        }`}
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M6 12H18M12 18V6'
                          stroke='currentColor'
                          strokeWidth='1.6'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                      </svg>
                      <svg
                        className={`w-6 h-6 text-gray-900 transition duration-500 ${
                          activeIndex === index ? 'block' : 'hidden'
                        }`}
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M6 12H18'
                          stroke='currentColor'
                          strokeWidth='1.6'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        ></path>
                      </svg>
                    </div>
                  </button>
                  <div
                    ref={el => (contentRefs.current[index] = el)}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeIndex === index ? 'max-h-[200px]' : 'max-h-0'
                    }`}
                    style={{
                      height:
                        activeIndex === index
                          ? contentRefs.current[index]?.scrollHeight
                          : 0
                    }}
                  >
                    <p className='text-[#404C5C] text-base font-normal mt-4'>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-gray-500 text-center'>
                No FAQs available at the moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faqs
