import React from "react";
import cross from "../assets/icons/cross.svg";

const Fliping = ({ children, popup, setPopup }) => {
    if (!popup) {
        return;
    }

    return (
        <div className="popup-container">
            <div className="popup-inner">
                {children}
            </div>
        </div>
    );
};

export default Fliping;
