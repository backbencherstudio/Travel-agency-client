// import blogImage from "./../assets/img/blogs/blog-banner.png"
import { Pagination, Stack } from "@mui/material";
import Featured from "../../Components/BlogComponents/Featured";
import Subscribe from "../../Components/BlogComponents/Subscribe";
import CardComponent from "../../Components/CardComponent/CardComponent";
import HeroSection from "../../Components/HeroSection/HeroSection";
import ParentComponent from "../../Components/ParentComponent/ParentComponent";
import blogImage from '../../assets/img/blogs/blogImage.png';
import image1 from '../../assets/img/blogs/image-1.png';
import image2 from '../../assets/img/blogs/image-2.png';
import image3 from '../../assets/img/blogs/image-3.png';
import avatar3 from '../../assets/img/avatar/avatar-1.jpg';
import Faqs from "../../Components/Home/Faqs";

const Blogs = () => {
    const links = [{name: "Home", path: "/"}, {name: "Blogs", path: "/tours"}]

    const blogsArray = [
        {
            id: 1,
            title: "Hidden Gems: 7 Underrated Destinations to Visit",
            description: "Step off the beaten path with these hidden destinations that promise unique experiences and fewer crowds.",
            days: 7,
            image: image1,
            user: {name: 'Bessie Cooper', role: 'Tour Expert', image: avatar3},
          },
          {
            id: 2,
            title: "A Food Lover’s Guide to Southeast Asia",
            description: "Indulge in Southeast Asia’s rich food culture with our guide to must-try dishes, from Thai street food to Malaysian delights.",
            days: 5,
            image: image2,
            user: {name: 'Bessie Cooper', role: 'Tour Expert', image: avatar3},
          },
          {
            id: 3,
            title: "Top 10 Most Scenic Road Trips Worldwide",
            description: "Hit the road with our list of scenic drives, featuring breathtaking landscapes, winding routes, and memorable stops along the way.",
            days: 10,
            image: image3,
            user: {name: 'Bessie Cooper', role: 'Tour Expert', image: avatar3},
          },
          {
            id: 4,
            title: "Top 10 Most Scenic Road Trips Worldwide",
            description: "Hit the road with our list of scenic drives, featuring breathtaking landscapes, winding routes, and memorable stops along the way.",
            days: 10,
            image: image3,
            user: {name: 'Bessie Cooper', role: 'Tour Expert', image: avatar3},
          },
        {
            id: 5,
            title: "A Food Lover’s Guide to Southeast Asia",
            description: "Indulge in Southeast Asia’s rich food culture with our scenic drives, featuring breathtaking landscapes, winding rou guide to must-try dishes, from Thai street food to Malaysian delights.",
            days: 5,
            image: "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg",
            user: { name: 'Bessie Cooper', role: 'Tour Expert', image: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-indian-man-png-image_10149659.png" },
        },
        {
            id: 6,
            title: "Top 10 Most Scenic Road Trips Worldwide",
            description: "Hit the road with our list of scenic drives, featuring breathtaking landscapes, winding routes, and memorable stops along the way.",
            days: 10,
            image: "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg",
            user: { name: 'Bessie Cooper', role: 'Tour Expert', image: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-indian-man-png-image_10149659.png" },
        },
    ];


    return (
        <div>
            <HeroSection bgImg={blogImage} pageName="Our Blogs" links={links} description="Explore our blog for the latest travel tips, destination guides, and inspiring stories to fuel your wanderlust. From must-see locations to insider advice, we’re here to make your journey unforgettable." />
            <div className="bg-[#F0F4F9]">

            <ParentComponent>
                {/* ===================================================================  Fetured ============================================================= */}
                <Featured />

                {/* ===================================================================  All Blogs ============================================================= */}
                <div className=' grid md:grid-cols-2 lg:grid-cols-3  gap-5 mb-8 '>
                    {
                        blogsArray?.map(item => (
                            <CardComponent blog={item} key={item.id} />
                        ))
                    }
                </div>

                {/* =================================================================== Subscribe ============================================================= */}
                <Subscribe />

                {/* =================================================================== 3 Blogs ============================================================= */}
                <div className=' grid md:grid-cols-2 lg:grid-cols-3  gap-5 mb-8 '>
                    {
                        blogsArray?.slice(0, 3).map(item => (
                            <CardComponent blog={item} key={item.id} />
                        ))
                    }
                </div>

                {/* =================================================================== Pagination ============================================================= */}
                <div className="flex justify-center mt-20" >
                    <Stack spacing={2}>
                        <Pagination count={10} color="primary" />
                    </Stack>
                </div>

            </ParentComponent>
            
            </div>
            <div className="py-20">
                <Faqs />
            </div>
        </div >
    );
};

export default Blogs;