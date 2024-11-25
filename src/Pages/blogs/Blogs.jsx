// import blogImage from "./../assets/img/blogs/blog-banner.png"
import Featured from "../../Components/BlogComponents/Featured";
import Subscribe from "../../Components/BlogComponents/Subscribe";
import CardComponent from "../../Components/CardComponent/CardComponent";
import HeroSection from "../../Components/HeroSection/HeroSection";
import ParentComponent from "../../Components/ParentComponent/ParentComponent";
import blogImage from '../../assets/img/blogs/blogImage.png';

const Blogs = () => {

    const blogsArray = [
        {
            id: 1,
            title: "Hidden Gems: 7 Underrated Destinations to Visit",
            description: "Step off the beaten path with these hidden destinations that promise unique experiences and fewer crowds.",
            days: 7,
            image: "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg",
            user: { name: 'Bessie Cooper', role: 'Tour Expert', image: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-indian-man-png-image_10149659.png" },
        },
        {
            id: 2,
            title: "A Food Lover’s Guide to Southeast Asia",
            description: "Indulge in Southeast Asia’s rich food culture with our guide to must-try dishes, from Thai street food to Malaysian delights.",
            days: 5,
            image: "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg",
            user: { name: 'Bessie Cooper', role: 'Tour Expert', image: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-indian-man-png-image_10149659.png" },
        },
        {
            id: 3,
            title: "Top 10 Most Scenic Road Trips Worldwide",
            description: "Hit the road with our list of scenic drives, featuring breathtaking landscapes, winding routes, and memorable stops along the way.",
            days: 10,
            image: "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg",
            user: { name: 'Bessie Cooper', role: 'Tour Expert', image: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-indian-man-png-image_10149659.png" },
        },
        {
            id: 4,
            title: "Hidden Gems: 7 Underrated Destinations to Visit",
            description: "Step off the beaten path with these hidden destinations that promise unique experiences and fewer crowds.",
            days: 7,
            image: "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg",
            user: { name: 'Bessie Cooper', role: 'Tour Expert', image: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-indian-man-png-image_10149659.png" },
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
        <div className="bg-[#F0F4F9]" >
            <HeroSection bgImg={blogImage} pageName="Our Blogs" pathName1="/" pathName2="blogs" pageName1="Home" pageName2="Blog" description="Explore our blog for the latest travel tips, destination guides, and inspiring stories to fuel your wanderlust. From must-see locations to insider advice, we’re here to make your journey unforgettable." />

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

                

            </ParentComponent>

        </div >
    );
};

export default Blogs;