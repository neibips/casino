import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Route>
    <App />
  </Route>
);
