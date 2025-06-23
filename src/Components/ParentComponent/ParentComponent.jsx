/* eslint-disable react/prop-types */

const ParentComponent = ({children}) => {
    return (
        <div className="max-w-[1216px] w-full mx-auto pb-20" >
            {children}            
        </div>
    );
};

export default ParentComponent;