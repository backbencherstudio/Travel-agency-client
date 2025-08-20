import React from 'react'
import PackageTourCruise from '../../Components/PackageTourCruise/PackageTourCruise'
import bgImg from '../../assets/img/packages/banner.png'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useState,useEffect } from 'react'
import Pagination from '~/Shared/Pagination'

const ClientPackages = () => {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const [pageLeft, setPageLeft] = useState([]);
  const [pageRight, setPageRight] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(2);

  const getPackagesData = (packages) => {
    setPackages(packages?.data);
    setTotalPages(packages?.pagination?.total);
  };

  const handlePageChange = async (pageNumber) => {
    if (pageNumber != currentPage) {
      setPageLoading(true);
      setCurrentPage(pageNumber);
      // Add a small delay to create a smooth transition effect
      await new Promise((resolve) => setTimeout(resolve, 300));
      setPageLoading(false);
    }
  };

  const getPageNumbers = () => {
      const pageNumbers = [];
      let startPage = 1;
      if (totalPages >= 6) {
        if (Math.abs(totalPages - currentPage) <= 6) {
          if (isLargeScreen === 3) startPage = Math.abs(totalPages - 6);
          else startPage = Math.abs(totalPages - 4);
        } else {
          startPage = currentPage;
        }
      }
      for (let i = startPage; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
  
      let left = [];
      let right = [];
  
      if (pageNumbers.length <= 4) {
        left = pageNumbers;
      } else {
        if (isLargeScreen === 3 && pageNumbers.length > 7) {
          // Large number of pages – show first 3 and last 3
          left = pageNumbers.slice(0, isLargeScreen);
          right = pageNumbers.slice(-isLargeScreen); // last 3 elements
        } else {
          if (isLargeScreen === 3) {
            left = pageNumbers;
          } else {
            left = pageNumbers.slice(0, isLargeScreen);
            right = pageNumbers.slice(-isLargeScreen);
          }
        }
      }
  
      setPageLeft(left);
      setPageRight(right);
    };
  
    useEffect(() => {
      const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 600 ? 3 : 2);
      };
  
      // Check on mount
      handleResize();
  
      // Listen to resize event
      window.addEventListener("resize", handleResize);
  
      // Cleanup listener on unmount
      return () => window.removeEventListener("resize", handleResize);
    });
  
    useEffect(() => {
      getPageNumbers();
    }, [currentPage, isLargeScreen]);

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
        <PackageTourCruise
          getPackagesData={getPackagesData}
          pageLoading={pageLoading}
          currentPage={currentPage}
        />
        <Pagination data={packages} handlePageChange={handlePageChange} currentPage={currentPage} pageLeft={pageLeft} pageRight={pageRight} totalPages={totalPages}/>
      </div>
    </div>
  )
}

export default ClientPackages
