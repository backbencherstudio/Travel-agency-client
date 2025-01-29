import React from 'react'
import PackageTourCruise from '../../Components/PackageTourCruise/PackageTourCruise'
import bgImg from '../../assets/img/packages/banner.png'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const ClientPackages = () => {
  // const blogsArray = [
  //     {
  //         id: 1,
  //         title: "Hidden Gems: 7 Underrated Destinations to Visit",
  //         description: "Step off the beaten path with these hidden destinations that promise unique experiences and fewer crowds.",
  //         days: 7,
  //         image: image1,
  //         user: {name: 'Bessie Cooper', role: 'Tour Expert', image: avatar3},
  //       },
  //       {
  //         id: 2,
  //         title: "A Food Lover’s Guide to Southeast Asia",
  //         description: "Indulge in Southeast Asia’s rich food culture with our guide to must-try dishes, from Thai street food to Malaysian delights.",
  //         days: 5,
  //         image: image2,
  //         user: {name: 'Bessie Cooper', role: 'Tour Expert', image: avatar3},
  //       },
  //       {
  //         id: 3,
  //         title: "Top 10 Most Scenic Road Trips Worldwide",
  //         description: "Hit the road with our list of scenic drives, featuring breathtaking landscapes, winding routes, and memorable stops along the way.",
  //         days: 10,
  //         image: image3,
  //         user: {name: 'Bessie Cooper', role: 'Tour Expert', image: avatar3},
  //       },
  //       {
  //         id: 4,
  //         title: "Top 10 Most Scenic Road Trips Worldwide",
  //         description: "Hit the road with our list of scenic drives, featuring breathtaking landscapes, winding routes, and memorable stops along the way.",
  //         days: 10,
  //         image: image3,
  //         user: {name: 'Bessie Cooper', role: 'Tour Expert', image: avatar3},
  //       },
  //     {
  //         id: 5,
  //         title: "A Food Lover’s Guide to Southeast Asia",
  //         description: "Indulge in Southeast Asia’s rich food culture with our scenic drives, featuring breathtaking landscapes, winding rou guide to must-try dishes, from Thai street food to Malaysian delights.",
  //         days: 5,
  //         image: "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg",
  //         user: { name: 'Bessie Cooper', role: 'Tour Expert', image: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-indian-man-png-image_10149659.png" },
  //     },
  //     {
  //         id: 6,
  //         title: "Top 10 Most Scenic Road Trips Worldwide",
  //         description: "Hit the road with our list of scenic drives, featuring breathtaking landscapes, winding routes, and memorable stops along the way.",
  //         days: 10,
  //         image: "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg",
  //         user: { name: 'Bessie Cooper', role: 'Tour Expert', image: "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-indian-man-png-image_10149659.png" },
  //     },
  // ];

  return (
    <div>
      <Helmet>
        <title>Around 360 - Packages</title>
      </Helmet>
      {/* Banner Section with Background Image */}
      <div
        className='flex items-center justify-center h-[483px]'
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div
          style={{
            background:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%)',
            height: '100%',
            width: '100%'
          }}
          className='text-center flex items-center justify-center flex-col text-white'
        >
          <h3 className='flex gap-2 justify-center items-center text-lg'>
            <Link to='/'>Home</Link>
            <span className='mx-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='5'
                height='10'
                viewBox='0 0 5 10'
                fill='none'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0.442596 0.344988C0.173058 0.560619 0.129357 0.953926 0.344988 1.22347L3.36597 4.9997L0.344987 8.77593C0.129356 9.04547 0.173057 9.43878 0.442596 9.65441C0.712135 9.87004 1.10544 9.82634 1.32107 9.5568L4.65441 5.39013C4.83702 5.16187 4.83702 4.83753 4.65441 4.60926L1.32107 0.442596C1.10544 0.173058 0.712135 0.129357 0.442596 0.344988Z'
                  fill='white'
                />
              </svg>
            </span>
            Packages
          </h3>
          <h4 className='pageTitle'>Our Packages</h4>
          <p className='mt-4 text-lg px-0 max-w-[622px]'>
            Discover our expertly crafted travel packages designed to suit every
            occasion, from family vacations and romantic getaways to group
            adventures and exclusive offers.
          </p>
        </div>
      </div>
      <div className='bg-[#F0F4F9] lg:min-h-screen'>
        <PackageTourCruise />
      </div>
    </div>
  )
}

export default ClientPackages
