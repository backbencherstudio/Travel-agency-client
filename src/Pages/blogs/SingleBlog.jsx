/* eslint-disable react/no-unescaped-entities */
import { Avatar } from "@mui/material";
import HeroSection from "../../Components/HeroSection/HeroSection";
import ParentComponent from "../../Components/ParentComponent/ParentComponent";

import blogImage from '../../assets/img/blogs/blogImage.png';
import Faqs from "../../Components/Home/Faqs";
import { FaRegComments } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";

const SingleBlog = () => {

    const comments = [
        {
            id: 1,
            image: "https://static.artzone.ai/media/62077/conversions/22yojXNhcyfLN9S4fsdjFXkjvxK7UcGKiIw92ybU-w768.webp",
            name: "Mark Williams",
            data: "11 jun, 2024",
            description: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            id: 2,
            image: "https://static.artzone.ai/media/62077/conversions/22yojXNhcyfLN9S4fsdjFXkjvxK7UcGKiIw92ybU-w768.webp",
            name: "Mark Williams",
            data: "11 jun, 2024",
            description: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            id: 3,
            image: "https://static.artzone.ai/media/62077/conversions/22yojXNhcyfLN9S4fsdjFXkjvxK7UcGKiIw92ybU-w768.webp",
            name: "Mark Williams",
            data: "11 jun, 2024",
            description: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ]

    return (
        <div>

            <HeroSection bgImg={blogImage} pageName="Our Blogs" dynamicData="Dynamic Data" pathName1="/" pathName2="blogs" pageName1="Home" pageName2="Blog" description="Explore our blog for the latest travel tips, destination guides, and inspiring stories to fuel your wanderlust. From must-see locations to insider advice, we’re here to make your journey unforgettable." />


            <ParentComponent >

                <div className="blog-details grid grid-cols-12 gap-6 ">

                    <div className=" col-span-12 lg:col-span-8">
                        <div>
                            <img className="rounded-2xl" src="https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg" alt="" />
                        </div>
                        <span className="flex items-center mt-5 mb-6 gap-2" >
                            <h2 className="flex items-center mr-2" > <SlLike className="text-orange-500 mr-1 text-xl " /> 15 Likes</h2>
                            <h2 className="flex items-center mr-2" ><FaRegComments className="text-orange-500 mr-1 text-xl " />5 Comments</h2>
                        </span>

                        <div className="content" >

                            <h2 className="font-inter text-[40px] font-semibold leading-[130%]">Bali’s must-sees: beaches, temples, waterfalls.</h2>
                            <p className="mt-5" >Bali is a paradise that promises breathtaking scenery, rich cultural heritage, and unforgettable experiences. From serene beaches and ancient temples to majestic waterfalls hidden in lush landscapes, Bali has something for every traveler. This guide takes you through the must-see spots in Bali for an adventure you'll treasure forever.</p>

                            <div>
                                <h2 className="font-inter text-[24px] font-semibold leading-[130%] tracking-[0.12px] mt-6" >Blissful Beaches</h2>
                                <p className="mt-2" >Bali is famous for its pristine beaches, each offering a unique experience:</p>
                                <p className="mt-2" >Kuta Beach – Known for its vibrant nightlife, Kuta is perfect for those who enjoy beach parties and socializing. Its beautiful sunsets are a bonus!</p>

                                <p className="mt-2" >Seminyak Beach – Trendy and upscale, Seminyak offers chic beach clubs, relaxing lounges, and amazing views.</p>
                                <p className="mt-2" >Nusa Dua – Family-friendly and tranquil, Nusa Dua is ideal for safe swimming and luxury resorts, away from the crowds.</p>
                                <p className="mt-2" >Each of these beaches gives you a different flavor of Bali’s coastal beauty. Relax, surf, or explore the beachside cafes and markets—there’s always something to enjoy.</p>
                            </div>

                            <div>
                                <h2 className="font-inter text-[24px] font-semibold leading-[130%] tracking-[0.12px] mt-6" >Sacred Temples</h2>
                                <p className="mt-2" >Bali is famous for its pristine beaches, each offering a unique experience:</p>
                                <p className="mt-2" >Kuta Beach – Known for its vibrant nightlife, Kuta is perfect for those who enjoy beach parties and socializing. Its beautiful sunsets are a bonus!</p>

                                <p className="mt-2" >Seminyak Beach – Trendy and upscale, Seminyak offers chic beach clubs, relaxing lounges, and amazing views.</p>
                                <p className="mt-2" >Nusa Dua – Family-friendly and tranquil, Nusa Dua is ideal for safe swimming and luxury resorts, away from the crowds.</p>
                                <p className="mt-2" >Each of these beaches gives you a different flavor of Bali’s coastal beauty. Relax, surf, or explore the beachside cafes and markets—there’s always something to enjoy.</p>
                            </div>

                            <div>
                                <h2 className="font-inter text-[24px] font-semibold leading-[130%] tracking-[0.12px] mt-6" >Majestic Waterfalls</h2>
                                <p className="mt-2" >Bali is famous for its pristine beaches, each offering a unique experience:</p>
                                <p className="mt-2" >Kuta Beach – Known for its vibrant nightlife, Kuta is perfect for those who enjoy beach parties and socializing. Its beautiful sunsets are a bonus!</p>

                                <p className="mt-2" >Seminyak Beach – Trendy and upscale, Seminyak offers chic beach clubs, relaxing lounges, and amazing views.</p>
                                <p className="mt-2" >Nusa Dua – Family-friendly and tranquil, Nusa Dua is ideal for safe swimming and luxury resorts, away from the crowds.</p>
                                <p className="mt-2" >Each of these beaches gives you a different flavor of Bali’s coastal beauty. Relax, surf, or explore the beachside cafes and markets—there’s always something to enjoy.</p>
                            </div>


                        </div>

                        <div className="mt-12" >
                            <h2 className="font-inter text-[24px] font-semibold leading-[1.3] tracking-[0.12px] mb-7 " >{comments?.length} Comments</h2>

                            {
                                comments?.map(item => <div key={item.id} >
                                    <div className="mb-5 border-b pb-5 " >

                                        <div className="flex items-center" >
                                            <Avatar alt="Travis Howard" src={item.image} />
                                            <span className="ml-2" >
                                                <h2 className="font-inter text-[16px] font-bold leading-[1.6] tracking-[0.08px]" >{item.name}</h2>
                                                <p className="mt-2">{item.data}</p>
                                            </span>

                                        </div>

                                        <p>{item.description}</p>

                                    </div>
                                </div>)
                            }
                        </div>


                    </div>

                    <div className=" col-span-12 lg:col-span-4">

                        <div className="flex border rounded-lg items-center px-2 " >
                            <CiSearch className="text-3xl cursor-pointer " />
                            <input type="text" className=" w-full p-2 focus:outline-none " />
                        </div>

                        <div className="bg-[#f0f4f9] mt-4 px-6 py-5 rounded-lg " >
                            <h2 className="font-inter text-[20px] font-bold leading-[1.3] tracking-[0.1px]" > Recent Post </h2>

                            <div className="mt-5" >
                                {
                                    comments?.map((item, index) => <div key={item.id} >
                                        <div className={`mb-5 pb-5 ${comments.length === index + 1 ? "border-none" : "border-b"} `} >
                                            <div className="flex items-center" >
                                                <img src="https://create.microsoft.com/_next/image?url=https%3A%2F%2Fdsgrcdnblobprod5u3.azureedge.net%2Fimages%2Fimage-creator-T03_cat.webp&w=1920&q=90" className="w-[100px] h-[80px] rounded-xl " alt="" />
                                                <span className="ml-2" >
                                                    <h2 className="font-inter text-[16px] font-bold leading-[1.6] tracking-[0.08px]" >{item.name}</h2>
                                                    <p className="mt-2">{item.data}</p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>

                    </div>

                </div>

                <div className="py-20" >
                    <Faqs />
                </div>


            </ParentComponent>

        </div>
    );
};


export default SingleBlog;