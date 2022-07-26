import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";
import Cart from "./store/cart";
// import Cart from "./store/cart";

function Layout() {
  return (
    <div>
      {" "}
      <Navigation />
      <Cart />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;