import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.scss";
import "bootstrap";


// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Route, Routes } from "react-router-dom";

// IMPORTS
import Home from "./pages/Home";
import Home2 from "./pages/Home2";
import Users from "./pages/Users";
import Crash from "./pages/Crash";



function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home2 />} />
        <Route exact path="/flip" element={<Home />} />
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/crash" element={<Crash />} />
      </Routes>
    </>
  );
}

export default App;
