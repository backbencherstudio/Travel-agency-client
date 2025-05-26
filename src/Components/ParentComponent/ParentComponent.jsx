/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const ParentComponent = ({children}) => {
    const location = useLocation();
    const pathname = location.pathname;
    const pathnameArray = pathname.split('/');
    const pathnameArrayLength = pathnameArray.length;
    console.log(pathnameArray);
    return (
        <div className="max-w-[1216px] mx-auto py-20  px-5 xl:px-0  " >
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2 mb-4 items-center">
                    <Link to="/" className={`text-sm`}>Home</Link>
                    {">"}
                    <Link to="/tours" className={`text-sm`}>Tours</Link>
                    {">"}
                    <Link to="/tour-details" className={`text-sm ${pathnameArrayLength === 3 ? "font-bold" : ""}`}>Tour Details</Link>
                </div>
            </div>
            {children}            
        </div>
    );
};

export default ParentComponent;