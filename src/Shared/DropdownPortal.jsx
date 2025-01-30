import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const DropdownPortal = ({ isOpen, children, position }) => {
    const [portalContainer] = useState(() => document.createElement('div'));

    useEffect(() => {
        document.body.appendChild(portalContainer);
        return () => {
            document.body.removeChild(portalContainer);
        };
    }, [portalContainer]);

    if (!isOpen) return null;

    // Get the window dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate dropdown position
    let adjustedTop = position.top;
    let adjustedLeft = position.left;

    // Check if dropdown is out of bounds horizontally
    if (adjustedLeft + 200 > windowWidth) { 
        adjustedLeft = windowWidth - 200; 
    }

    // Check if dropdown is out of bounds vertically
    if (adjustedTop + 150 > windowHeight) { 
        adjustedTop = position.top - 150; 
    }

    return ReactDOM.createPortal(
        <div
            style={{
                position: 'absolute',
                top: adjustedTop,
                left: adjustedLeft,
                zIndex: 1000, 
            }}
            className="dropdown-portal-content"
        >
            {children}
        </div>,
        portalContainer
    );
};

export default DropdownPortal;