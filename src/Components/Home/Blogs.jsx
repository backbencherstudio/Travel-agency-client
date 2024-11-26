import image1 from '../../assets/img/blogs/image-1.png';
import image2 from '../../assets/img/blogs/image-2.png';
import image3 from '../../assets/img/blogs/image-3.png';
import avatar3 from '../../assets/img/avatar/avatar-3.png';
import { Link } from 'react-router-dom';

const Blogs = () => {

    const blogs = [
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
    ];

    console.log('blogs', blogs)

  return (
    <div className='max-w-7xl mx-auto px-5'>
        <div className='text-2xl md:text-5xl font-bold text-center'>Travel Inspiration & Tips</div>
        <div className=' grid md:grid-cols-2 lg:grid-cols-3  gap-5 mb-8 py-12'>
            {blogs?.map(blog => (
                <div key={blog?.id} className="relative flex flex-col bg-white shadow-md border border-slate-200 rounded-xl">
                    <div className="relative h-56 overflow-hidden text-white rounded-t-xl">
                        <img src={blog.image} alt="card-image" />
                        <div className="absolute top-0 left-0 bg-[#F5F7F9] text-[#323B47] px-3 pb-1 m-4 rounded-full text-xs font-bold">
                            Recently Added
                        </div>
                    </div>
                    <div className="p-4">
                        <div className='flex items-center gap-1'>
                            <div className="mb-5 bg-[#E7ECF2] text-[#0E457D] text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#0E457D] dark:bg-gray-700 dark:text-gray-300">
                                5 mins read
                            </div>
                            <div className="mb-5 bg-[#FDEFEA] text-[#EB5B2A] text-xs font-medium me-2 px-2.5 py-[5px] rounded-full border border-[#EB5B2A] dark:bg-gray-700 dark:text-gray-300">
                                Jan 6, 2024
                            </div>
                        </div>
                        <h6 className="mb-2 text-slate-800 text-xl font-bold">
                            {blog.title}
                        </h6>
                        <p className="text-[#65666b] leading-normal text-base font-light">
                            {blog.description.length > 100 ? blog.description.substring(0, 100) + "..." : blog.description.name}
                            {blog.description.length > 100 && (
                                <Link to={`/blogs/${blog.id}`} className="text-[#0E457D] ml-2 font-bold">
                                    Read More
                                </Link>
                            )}
                        </p>
                        <div className="w-full flex mb-1 items-center mt-4">
                            <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 shadow">
                                <img src={blog.user?.image} alt=""/>
                            </div>
                            <div className="flex-grow pl-3">
                                <h6 className="font-bold text-base uppercase text-black">{blog.user.name}</h6>
                                <p className='text-sm text-[#899AB2]'>{blog.user.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        <div className='grid justify-center'>
            <button className='flex gap-2 items-center justify-center px-5 py-3 bg-[#D65326] rounded-full text-white text-base'>
                See All Blogs 
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M4.6665 10H16.3332" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.5 4.16699L16.3333 10.0003L10.5 15.8337" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    </div>
  )
}

export default Blogs