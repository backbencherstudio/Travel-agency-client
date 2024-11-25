/* eslint-disable react/prop-types */

const ParentComponent = ({children}) => {
    return (
        <div className="max-w-[1216px] mx-auto py-20  px-5 xl:px-0 " >
            {children}            
        </div>
    );
};

export default ParentComponent;