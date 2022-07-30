import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Cart from "../store/cart";
import Navigation from "./Navigation";
// import Cart from "./store/cart";

function Layout() {
  return (
    <div className="page-container">
      {" "}
      <Navigation />
      <Cart />
      <Outlet className="content-wrap" />
      <Footer />
    </div>
  );
}
export default Layout;