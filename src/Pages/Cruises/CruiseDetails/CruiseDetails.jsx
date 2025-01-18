import Details from '../../../Components/DetailsComponent/Details'
import HeroSection from '../../../Components/HeroSection/HeroSection'
import ParentComponent from '../../../Components/ParentComponent/ParentComponent'
import blogImage from '../../../assets/img/blogs/blogImage.png'
import image1 from '../../../assets/img/tour-details/image-1.png'
import image2 from '../../../assets/img/tour-details/image-2.png'
import image3 from '../../../assets/img/tour-details/image-3.png'
import image4 from '../../../assets/img/tour-details/image-4.png'
import image5 from '../../../assets/img/tour-details/image-5.png'
import cancellationBg from '../../../assets/img/tour-details/cancellation-bg.png'
import TravelPackages from '../../../Components/Home/TravelPackages'
import { useParams } from 'react-router-dom'
import ClientPackageApis from '../../../Apis/clientApi/ClientPackageApis'
import { useEffect, useState } from 'react'
import TravelWithUs from '../../../Components/Home/TravelWithUs'
import Loading from '../../../Shared/Loading'

const CruiseDetails = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Cruises', path: '/cruises' },
    { name: 'Cruise Details', path: '' }
  ]
  const [loading, setLoading] = useState(true)
  const [cruise, setCruise] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    cruiseDetails()
  }, [])

  const cruiseDetails = async () => {
    const res = await ClientPackageApis.getOne(id)
    if (res?.success) {
      setCruise(res?.data)
      setLoading(false)
    }
    console.log('res', res)
  }

  console.log('cruise', cruise)

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className='bg-[#F0F4F9]'>
            <HeroSection
              bgImg={blogImage}
              pageName='Our Cruise'
              links={links}
              description={cruise?.description}
            />
            <ParentComponent>
              <Details details={cruise} />
            </ParentComponent>
          </div>
          <div className='py-20'>
            <TravelWithUs />
          </div>
        </div>
      )}
    </div>
  )
}
export default CruiseDetails
