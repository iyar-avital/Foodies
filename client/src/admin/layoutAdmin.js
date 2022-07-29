import React from "react";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AuthAdminComp from "../comps/utils/auth/authAdminComp";
import LottieAnimation from "../comps/utils/lottieAnimation";

import HeaderAdmin from "./headerAdmin";

function LayoutAdmin(props) {
  const [authorized, setAuthorized] = useState(false);
  return (
    <div>
      <React.Fragment>
        <AuthAdminComp />/
        <HeaderAdmin />
        <Outlet />
        <AuthAdminComp setAuthorized={setAuthorized} />

        {!authorized ? (
          <LottieAnimation />
        ) : (
          <>
            <HeaderAdmin />
            <Outlet />
          </>
        )}
      </React.Fragment>
    </div>
  );
}
export default LayoutAdmin;