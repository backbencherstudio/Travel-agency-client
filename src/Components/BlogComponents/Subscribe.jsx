/* eslint-disable react/no-unescaped-entities */
import Nature from "../../assets/img/blogs/nature.jpg"

const Subscribe = () => {
    return (
        <div className="grid md:grid-cols-2 md:gap-16 bg-[#0E457D] px-10 py-6 rounded-lg mb-8 text-white ">
            <div >

                <h2 className=" text-[48px] font-bold leading-[100%] tracking-[0.12px] font-open-sans mt-6 mb-4">Subscribe to our blog</h2>

                <p>Bali is a paradise that promises breathtaking scenery, rich cultural heritage, and unforgettable experiences. From serene beaches and ancient temples to majestic waterfalls hidden in lush landscapes, Bali has something for every traveler. This guide takes you through the must-see spots in Bali for an adventure you'll treasure forever.</p>

                {/* <div className="bg-[#FFFFFF] p-2 relative  w-full " >
                    <input type="text" />
                    <button className="bg-[#003087] absolute right-2 top-1/2 transform -translate-y-1/2 " >Subscribe</button>
                </div> */}

                <div className="flex justify-between py-2 pl-4 pr-2 border-[0.5px] border-[#8f8f8f] rounded-lg bg-[#FFFFFF] mt-5 ">
                    <input type="email" placeholder='Enter your email' className='bg-transparent focus:outline-none w-full text-black' />
                    <div className="flex gap-[6px] px-4 py-2 bg-[#0E457D] items-center rounded-md">
                        <button className='py-1'>Subscribe</button>                        
                    </div>
                </div>

            </div>

            <div>
                <img className="w-full rounded-3xl" src={Nature} alt="" />
            </div>
        </div>
    );
};

export default Subscribe;