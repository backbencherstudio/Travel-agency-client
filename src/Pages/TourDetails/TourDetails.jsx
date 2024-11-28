import HeroSection from "../../Components/HeroSection/HeroSection";
import ParentComponent from "../../Components/ParentComponent/ParentComponent";
import Details from "../../Components/TourDetails.jsx/Details";
import blogImage from '../../assets/img/blogs/blogImage.png';
import image1 from '../../assets/img/tour-details/image-1.png';
import image2 from '../../assets/img/tour-details/image-2.png';
import image3 from '../../assets/img/tour-details/image-3.png';
import image4 from '../../assets/img/tour-details/image-4.png';
import image5 from '../../assets/img/tour-details/image-5.png';

const TourDetails = () => {
    const tour =  {
                        id: 1,
                        title: "Sacred Temples of Bali",
                        description: "Explore our diverse range of guided tours. each designed to immerse you in captivating destinations and unforgettable experiences.",
                        overview: "Bali is a paradise that promises breathtaking scenery, rich cultural heritage, and unforgettable experiences. From serene beaches and ancient temples to majestic waterfalls hidden in lush landscapes, Bali has something for every traveler. This guide takes you through the must-see spots in Bali for an adventure you'll treasure forever.",
                        rating: 4.8,
                        days: 7,
                        location: "Beijing, China",
                        price: 2999,
                        locationImage: image1,
                        include: ["Hotel + All inclusive", "Breakfast, Lunch & Dinner", "Hotel Accommodation", "How to use premade UI kits", "Transfer Between Destinations"],
                        exclude: ["Sight-seen", "City Tour", "Custom Duty"],
                        tourPlan: [
                            {"locationImage": image1, "day": 1, "tourDescription": "Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."}, 
                            {"locationImage": image2, "day": 2, "tourDescription": "Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."}, 
                            {"locationImage": image3, "day": 3, "tourDescription": "Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."}, 
                            {"locationImage": image4, "day": 4, "tourDescription": "Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy."}
                        ],
                    }
  return (
    <div>
      <div className="bg-[#F0F4F9]" >
            <HeroSection bgImg={blogImage} pageName="Our Tour" pathName1="/" pathName2="tours" pageName1="Tour" pageName2="Tour Details" description={tour.description} overview={tour.overview} />

            <ParentComponent>

                <Details tour={tour} />

            </ParentComponent>

        </div >
    </div>
  );
};
export default TourDetails;
