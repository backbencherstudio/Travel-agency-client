import React from 'react'

const BlogContent = ({ details }) => {
//   console.log('details', details)
  return (
    <div className="grid lg:grid-cols-3 gap-6 bg-[#F0F4F9]">
            <div className="col-span-2 flex flex-col gap-5">
                <div className="">
                  <div className="">
                      <img
                          src={details?.image}
                          alt=""
                          className="h-96 w-full object-cover rounded-xl"
                      />
                  </div>
                </div>
                <h1 className="text-3xl md:text-[40px] text-[#0F1416] font-semibold">{details?.title}</h1>
                <div className='flex flex-col gap-[30px]'>
                    <div className='flex flex-col gap-5 border-b pb-5'>
                        <h3 className='text-[40px] font-semibold text-[#0F1416]'>Overview</h3>
                        <p className='text-base font-normal text-[#0F1416] self-stretch'>{details.overview}</p>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl max-h-fit max-w-full col-span-2 lg:col-span-1 xl:col-span-0">
                {/* <BookCard details={details} renderStars={renderStars} /> */}
            </div>
        </div>
  )
}

export default BlogContent