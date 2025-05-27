/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import chatIcon from "../../assets/img/chat-icon.svg";

const ParentComponent = ({ children }) => {
    const location = useLocation();
    const pathname = location.pathname;
    const pathnameArray = pathname.split('/');
    const pathnameArrayLength = pathnameArray.length;
    // console.log(pathnameArray);
    return (
        <div className="max-w-[1216px] mx-auto py-20  px-5 xl:px-0  " >
            <div className="flex flex-row justify-between items-start mb-5">
                <div className="flex flex-row gap-2 items-center">
                    <Link to="/" className={`text-sm`}>Home</Link>
                    <span className="text-sm">{">"} </span>
                    <Link to="/tours" className={`text-sm`}>{pathnameArray[1] === "tours" ? "Tour" : pathnameArray[1] === "cruise" ? "Cruise" : "Packages"}</Link>
                    <span className="text-sm">{">"} </span>
                    <Link to="/tour-details" className={`text-sm ${pathnameArrayLength === 3 ? "font-bold" : ""}`}>{pathnameArray[1] === "tours" ? "Tour Details" : pathnameArray[1] === "cruise" ? "Cruise Details" : "Package Details"}</Link>
                </div>
                <div>
                    <button className="bg-[#F6F8FA] p-2 font-medium rounded-lg flex flex-row gap-1 items-center text-[#EB5B2A]">
                        <img src={chatIcon} alt="chat" className="w-4 h-4" />
                        Chat Now
                    </button>
                </div>
            </div>
            {children}
        </div>
    );
};

export default ParentComponent;