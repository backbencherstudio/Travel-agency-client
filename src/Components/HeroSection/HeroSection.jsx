/* eslint-disable react/prop-types */

import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeroSection = ({ bgImg, pageName, links, description }) => {
    return (
        <div>
            <div
                className="flex items-center justify-center h-[483px] w-full"
                style={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="text-center flex items-center justify-center flex-col text-white" 
                    style={{
                        background:
                        "linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%)",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <h3 className="flex gap-2 justify-center items-center">
                        {links?.map((link, index) => (
                            <div key={index} className="flex gap-2 justify-center items-center text-lg">
                                <Link to={`${link.path}`}>{link.name}</Link>
                                <span className={`mx-2 ${index === links.length - 1 ? 'hidden' : ''}`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="5"
                                        height="10"
                                        viewBox="0 0 5 10"
                                        fill="none"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0.442596 0.344988C0.173058 0.560619 0.129357 0.953926 0.344988 1.22347L3.36597 4.9997L0.344987 8.77593C0.129356 9.04547 0.173057 9.43878 0.442596 9.65441C0.712135 9.87004 1.10544 9.82634 1.32107 9.5568L4.65441 5.39013C4.83702 5.16187 4.83702 4.83753 4.65441 4.60926L1.32107 0.442596C1.10544 0.173058 0.712135 0.129357 0.442596 0.344988Z"
                                            fill="white"
                                        />
                                    </svg>
                                </span>
                            </div>
                        ))}
                    </h3>
                    <h4 className="pageTitle">{pageName}</h4>
                    <p className="mt-4 text-lg px-6 sm:px-10 md:px-16 lg:max-w-5xl">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;