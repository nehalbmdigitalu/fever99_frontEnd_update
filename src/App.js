import React from "react";
import { ToastContainer } from "react-toastify";
import Loader from '../src/Components/common/loader/loadingAnimation'
import AppRoutes from './routes.js';
import "react-toastify/dist/ReactToastify.css";
// import AOS from "aos";
// import 'aos/dist/aos.css'; // Import AOS styles
function App() {
  // Empty dependency array ensures this effect runs once when component mounts
  return (
    <>
      <Loader />
      <ToastContainer
        autoClose={5000}
      />
      <AppRoutes />
    </>
  );
}

export default App;
