/* eslint-disable react/no-unescaped-entities */
import moment from "moment";
import Nature from "../../assets/img/blogs/nature.jpg";
import { Link } from "react-router-dom";

const Featured = ({ blogs }) => {
    // console.log('blogs', blogs)
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 bg-[#FFFFFF] px-2 md:px-10 py-6 rounded-lg mb-8 ">
            <div >
                <div className="flex gap-10 items-center" >
                    <h2 className="bg-[#F1F4FD] font-semibold px-[17px] py-[6px] rounded-md text-[#003087] " >Featured</h2>
                    <h2>{blogs[0]?.read_time} mins</h2>
                    <h2>{moment(blogs[0]?.created_at).format('DD MMM YYYY')}</h2>
                </div>

                <Link to={`/blogDetails/${blogs[0]?.id}`} className="text-black block text-[26px] font-bold leading-[100%] tracking-[0.12px] font-open-sans mt-6 mb-4 hover:text-blue-400 duration-300">{blogs[0]?.title}</Link>

                <p>{blogs[0]?.description}</p>
            </div>

            <div>
                <img className="w-full rounded-3xl mt-5 md:mt-0" src={blogs[0]?.blog_images?.[0]?.image_url} alt={blogs[0]?.blog_images?.[0]?.image_url} />
            </div>
        </div>
    );
};

export default Featured;