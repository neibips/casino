import React from "react";

const Container = ({ parentClass, children }) => {
  return (
    <div className={parentClass + "_container"}>
      <div className="page_container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-11 col-md-12 mx-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
