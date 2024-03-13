import React from "react";
import { Route, Router, Outlet } from "react-router-dom";
import { applicationRoutes as routes } from "../../dependencies/route/index";

function HomePage() {
  const getRoutes = () => {
    return (
      <>
        {routes.map((route, index) => {
          const { path, element } = route;
          return <Route key={index.toString()} path={path} element={element} />;
        })}
      </>
    );
  };
  return (
    <>
        <div>
            {getRoutes}
        </div>
    </>
  );
}

export default HomePage;
