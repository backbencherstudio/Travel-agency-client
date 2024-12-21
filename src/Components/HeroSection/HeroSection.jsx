/* eslint-disable react/prop-types */

import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = ({ bgImg, pageName, pathName1, pathName2, dynamicData, pageName1, pageName2, description }) => {
    return (
        <div>
            <div
                className="flex items-center justify-center h-[700px] w-full"
                style={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="text-center flex items-center justify-center flex-col text-white ">
                    <div className=" text-lg flex items-center gap-2 ">
                        <Link to={`${pathName1}`}>{pageName1}</Link>
                        <FaChevronRight />
                        <Link to={`/${pathName2}`}>{pageName2}</Link>
                        {
                            dynamicData &&
                            < >
                                <FaChevronRight />
                                <h2>{dynamicData}</h2>
                            </>
                        }
                    </div>
                    <h4 className="pageTitle">{pageName}</h4>
                    <p className="mt-4 text-lg px-6 sm:px-10 md:px-16 lg:max-w-[45%]">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;