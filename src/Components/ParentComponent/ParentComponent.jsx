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
        <div className="max-w-[1216px] w-full mx-auto pb-20" >
            {children}            
        </div>
    );
};

export default ParentComponent;