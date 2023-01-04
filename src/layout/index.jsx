import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = ({ children, variable, setVariable}) => {
  const [isOpen, setIsOpen] = useState(false);

  const OnClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Header OnClick={OnClick} isOpen={isOpen} variable={variable} setVariable={setVariable}/>
      <Sidebar OnClick={OnClick} isOpen={isOpen} />
      <div className="header_bottom"/>
      {children}
      {/*<Footer />*/}
    </>
  );
};

export default Layout;
