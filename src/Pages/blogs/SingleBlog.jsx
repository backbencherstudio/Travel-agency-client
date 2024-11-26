import HeroSection from "../../Components/HeroSection/HeroSection";
import ParentComponent from "../../Components/ParentComponent/ParentComponent";

import blogImage from '../../assets/img/blogs/blogImage.png';

const SingleBlog = () => {

    return (
        <div>

            <HeroSection bgImg={blogImage} pageName="Our Blogs" dynamicData="Dynamic Data" pathName1="/" pathName2="blogs" pageName1="Home" pageName2="Blog" description="Explore our blog for the latest travel tips, destination guides, and inspiring stories to fuel your wanderlust. From must-see locations to insider advice, we’re here to make your journey unforgettable." />


            <ParentComponent >

                <div className="blog-details grid grid-cols-12 gap-6 ">

                    <div className="col-span-8" >
                        <img src="https://letsenhance.io/static/a31ab775f44858f1d1b80ee51738f4f3/11499/EnhanceAfter.jpg" alt="" />
                    </div>

                    <div className="col-span-4">
                        <input type="text" className="border w-full p-2 rounded-lg" />

                        <div className="bg-[#f0f4f9] mt-4" >
                            <h2> Recent Post </h2>

                        </div>

                    </div>

                </div>

            </ParentComponent>

        </div>
    );
};


export default SingleBlog;