import React from "react";
import { Outlet } from "react-router-dom";
import AuthAdminComp from "../comps/utils/auth/authAdminComp";

import HeaderAdmin from "./headerAdmin";

function LayoutAdmin(props) {
  return (
    <div>
      <React.Fragment>
        <AuthAdminComp />/
        <HeaderAdmin />
        <Outlet />
      </React.Fragment>
    </div>
  );
}

export default LayoutAdmin;
