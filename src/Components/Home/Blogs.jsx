import image1 from '../../assets/img/blogs/image-1.png';
import image2 from '../../assets/img/blogs/image-2.png';
import image3 from '../../assets/img/blogs/image-3.png';
import avatar3 from '../../assets/img/avatar/avatar-1.jpg';
import { Link } from 'react-router-dom';
import CardComponent from '../CardComponent/CardComponent';
import { useTravelData } from '../../Context/TravelDataContext/TravelDataContext';

const Blogs = () => {
    const { homeData } = useTravelData();

    // const blogs = [
    //     {
    //       id: 1,
    //       title: "Hidden Gems: 7 Underrated Destinations to Visit",
    //       description: "Step off the beaten path with these hidden destinations that promise unique experiences and fewer crowds.",
    //       days: 7,
    //       image: image1,
    //       user: {name: 'Bessie Cooper', role: 'Tour Expert', image: avatar3},
    //     },
    //     {
    //       id: 2,
    //       title: "A Food Lover’s Guide to Southeast Asia",
    //       description: "Indulge in Southeast Asia’s rich food culture with our guide to must-try dishes, from Thai street food to Malaysian delights.",
    //       days: 5,
    //       image: image2,
    //       user: {name: 'Bessie Cooper', role: 'Tour Expert', image: avatar3},
    //     },
    //     {
    //       id: 3,
    //       title: "Top 10 Most Scenic Road Trips Worldwide",
    //       description: "Hit the road with our list of scenic drives, featuring breathtaking landscapes, winding routes, and memorable stops along the way.",
    //       days: 10,
    //       image: image3,
    //       user: {name: 'Bessie Cooper', role: 'Tour Expert', image: avatar3},
    //     },
    //     {
    //       id: 4,
    //       title: "Top 10 Most Scenic Road Trips Worldwide",
    //       description: "Hit the road with our list of scenic drives, featuring breathtaking landscapes, winding routes, and memorable stops along the way.",
    //       days: 10,
    //       image: image3,
    //       user: {name: 'Bessie Cooper', role: 'Tour Expert', image: avatar3},
    //     },
    // ];

    // console.log('blogs', blogs)

    return (
        <div className='max-w-[1216px] mx-auto px-5 xl:px-0'>
            <div className='text-2xl md:text-5xl font-bold text-center text-[#1D1F2C]'>Travel Inspiration & Tips</div>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8 py-12'>
                {
                    homeData?.blogs?.map(item => (
                        <CardComponent blog={item} key={item.id} />
                    ))
                }
            </div>

            <div className='grid justify-center'>
                <Link to='/blogs'>
                    <button className='flex gap-2 items-center justify-center px-5 py-3 bg-[#D65326] group hover:text-orange-500 hover:bg-transparent hover:shadow-lg  rounded-full hover:bg-[#EB5B2A] transition-all duration-300 text-white text-base'>
                        See All Blogs
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M4.6665 10H16.3332" stroke="white" className='stroke-white group-hover:stroke-orange-500' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.5 4.16699L16.3333 10.0003L10.5 15.8337" stroke="white" className='stroke-white group-hover:stroke-orange-500' strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Blogs