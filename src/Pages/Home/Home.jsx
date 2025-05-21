import Hero from '../../Components/Home/Hero'
import TravelDreams from '../../Components/Home/TravelDreams'
import TopDestinations from '../../Components/Home/TopDestinations'
import TravelWithUs from '../../Components/Home/TravelWithUs'
import TravelPackages from '../../Components/Home/TravelPackages'
import Testimonials from '../../Components/Home/Testimonials'
import Destinations from '../../Components/Home/Destinations'
import Blogs from '../../Components/Home/Blogs'
import Faqs from '../../Components/Home/Faqs'
import { Helmet } from 'react-helmet-async'
import Gift from '../../Components/Home/Gift'

const Home = () => {
  return (
    <div className='animate-from-middle'>
      <Helmet>
        <title>Around 360 - Home</title>
      </Helmet>
      <div className='pb-20 pt-4'>
        <Hero />
      </div>
      <div className='py-20 relative z-10 bg-white'>
        <TravelDreams />
      </div>
      <div className='py-20 bg-[#F0F4F9]'>
        <TopDestinations />
      </div>
      <div className='py-20'>
        <TravelWithUs />
      </div>
      <div className='py-20 bg-[#F0F4F9]'>
        <TravelPackages />
      </div>
      <div className='py-20'>
        <Testimonials />
      </div>
      <div className='py-20 bg-[#F0F4F9]'>
        <Gift />
      </div>
      <div className='py-20'>
        <Destinations />
      </div>
      <div className='py-20 bg-[#F0F4F9]'>
        <Blogs />
      </div>
      <div className='py-20'>
        <Faqs />
      </div>
    </div>
  )
}

export default Home
