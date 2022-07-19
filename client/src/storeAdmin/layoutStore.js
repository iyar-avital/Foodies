import React from "react";
import { Outlet } from "react-router-dom";
import AuthStoreAdminComp from "../comps/utils/auth/authStoreAdminComp";
import HeaderStore from "./headerStore";

function LayoutStore(props) {
  return (
    <React.Fragment>
      <AuthStoreAdminComp />
      <HeaderStore />
      <Outlet />
    </React.Fragment>
  );
}

export default LayoutStore;
