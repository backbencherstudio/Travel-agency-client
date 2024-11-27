import React from 'react'
import HeroSection from '../../Components/HeroSection/HeroSection'
import ParentComponent from '../../Components/ParentComponent/ParentComponent'
import blogImage from '../../assets/img/blogs/blogImage.png';
import Faqs from '../../Components/Home/Faqs';
import BlogContent from '../../Components/Blog/BlogContent';
import image1 from '../../assets/img/blog-details/image-1.png';

const BlogDetails = () => {
    const links = [{name: "Home", path: "/"}, {name: "Blogs", path: "/blogs"}, {name: "Blog Details", path: ""},]

    const blog =  {
        id: 1,
        title: "Bali’s must-sees: beaches, temples, waterfalls.",
        description: "Explore our diverse range of guided blogs. each designed to immerse you in captivating destinations and unforgettable experiences.",
        overview: "Bali is a paradise that promises breathtaking scenery, rich cultural heritage, and unforgettable experiences. From serene beaches and ancient temples to majestic waterfalls hidden in lush landscapes, Bali has something for every traveler. This guide takes you through the must-see spots in Bali for an adventure you'll treasure forever.",
        contents: [{title: "Blissful Beaches", description: "Bali is famous for its pristine beaches, each offering a unique experience:Kuta Beach - Known for its vibrant nightlife, Kuta is perfect for those who enjoy beach parties and socializing. Its beautiful sunsets are a bonus! Seminyak Beach — Trendy and upscale, Seminyak offers chic beach clubs, relaxing lounges, and amazing views. Nusa Dua - Family-friendly and tranquil, Nusa Dua is ideal for safe swimming and luxury resorts, away from the crowds. Each of these beaches gives you a different flavor of Bali's coastal beauty. Relax, surf, or explore the beachside cafes and markets—there's always something to enjoy."}, {title: "Blissful Beaches", description: "Bali is famous for its pristine beaches, each offering a unique experience:Kuta Beach - Known for its vibrant nightlife, Kuta is perfect for those who enjoy beach parties and socializing. Its beautiful sunsets are a bonus! Seminyak Beach — Trendy and upscale, Seminyak offers chic beach clubs, relaxing lounges, and amazing views. Nusa Dua - Family-friendly and tranquil, Nusa Dua is ideal for safe swimming and luxury resorts, away from the crowds. Each of these beaches gives you a different flavor of Bali's coastal beauty. Relax, surf, or explore the beachside cafes and markets—there's always something to enjoy."}, {title: "Blissful Beaches", description: "Bali is famous for its pristine beaches, each offering a unique experience:Kuta Beach - Known for its vibrant nightlife, Kuta is perfect for those who enjoy beach parties and socializing. Its beautiful sunsets are a bonus! Seminyak Beach — Trendy and upscale, Seminyak offers chic beach clubs, relaxing lounges, and amazing views. Nusa Dua - Family-friendly and tranquil, Nusa Dua is ideal for safe swimming and luxury resorts, away from the crowds. Each of these beaches gives you a different flavor of Bali's coastal beauty. Relax, surf, or explore the beachside cafes and markets—there's always something to enjoy."}],
        image: image1,
        
    }

  return (
    <div>
      <div className="bg-[#F0F4F9]" >
        <HeroSection bgImg={blogImage} pageName="Our Blogs" links={links} description={blog.description} overview={blog.overview} />
        <ParentComponent>
            <BlogContent details={blog} />
        </ParentComponent>
      </div>
      <ParentComponent>
        {/* <div
          className="relative px-8 py-16 rounded-2xl bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${cancellationBg})` }}
        >
          <div className="absolute inset-0 bg-blue-900/80 rounded-2xl"></div>
          <div className="relative z-10 max-w-xl mx-auto flex flex-col justify-center items-center gap-4 text-center">
            <h1 className="text-2xl md:text-5xl font-bold text-white">Free cancellation</h1>
            <p className="text-base md:text-xl font-normal text-white">
              You'll receive a full refund if you cancel at least 24 hours in advance of most experiences.
            </p>
          </div>
        </div> */}
        <div className="pt-20">
          <Faqs />
        </div>
      </ParentComponent>
    </div>
  )
}

export default BlogDetails