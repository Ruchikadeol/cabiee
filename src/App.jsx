import React from "react";
import "./App.css";
import "./assets/scss/main.scss";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000} // close after 3 sec
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
        />
        <RoutesComponent />
      </Router>
    </>
  );
}

export default App;
