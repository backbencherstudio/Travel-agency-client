/* eslint-disable react/no-unescaped-entities */
import Nature from "../../assets/img/blogs/nature.jpg"

const Featured = () => {
    return (
        <div className="grid md:grid-cols-2 md:gap-10 bg-[#FFFFFF] px-10 py-6 rounded-lg mb-8 ">
            <div >
                <div className="flex gap-10 items-center" >
                    <h2 className="bg-[#F1F4FD] font-semibold px-[17px] py-[6px] rounded-md text-[#003087] " >Featured</h2>
                    <h2>10 mins</h2>
                    <h2>25th Aug</h2>
                </div>

                <h2 className="text-black text-[26px] font-bold leading-[100%] tracking-[0.12px] font-open-sans mt-6 mb-4">Bali’s must-sees: beaches, temples,  waterfalls.</h2>

                <p>Bali is a paradise that promises breathtaking scenery, rich cultural heritage, and unforgettable experiences. From serene beaches and ancient temples to majestic waterfalls hidden in lush landscapes, Bali has something for every traveler. This guide takes you through the must-see spots in Bali for an adventure you'll treasure forever.</p>
            </div>

            <div>
                <img className="w-full rounded-3xl" src={Nature} alt="" />
            </div>
        </div>
    );
};

export default Featured;