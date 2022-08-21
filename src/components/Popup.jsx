import React from "react";
import cross from "../assets/icons/cross.svg";

const Popup = ({ children, popup, setPopup }) => {
  if (!popup) {
    return;
  }

  return (
    <div className="popup-container">
      <div className="popup-inner">
        <img
          onClick={() => setPopup(false)}
          className="cross"
          src={cross}
          alt=""
        />
        {children}
      </div>
    </div>
  );
};

export default Popup;
