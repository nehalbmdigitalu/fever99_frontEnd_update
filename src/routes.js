import React from "react";
import httpService from "./axios-interceptor";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/common/Header';
import Footer from './Components/common/Footer';
import { routes } from './dependencies/route/index';
import Sidebar from "./Components/common/Sidebar";
import { storage } from "./dependencies/store/storage";
import { useDispatch } from "react-redux";
import { setLogin } from "./dependencies/action";


httpService.setupInterceptors();

const AppRoutes = (props) => {
  const dispatch = useDispatch()
  const token = storage.getJwtToken()
  if (token) {
    dispatch(setLogin())
  } else {

  }
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index.toString()}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
