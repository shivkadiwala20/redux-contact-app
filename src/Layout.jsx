import React from 'react';

// import Home from "./Pages/Home/Home";
import { Outlet } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import Home from './Pages/Home/Home';

const Layout = () => {
  return (
    <>
      <Home />
      <Outlet />
    </>
  );
};

export default Layout;
