import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AuthAdminComp from "../comps/auth/authAdminComp";
import LottieAnimation from "../comps/misc/lottieAnimation";

import HeaderAdmin from "./headerAdmin";

function LayoutAdmin(props) {
  const [authorized, setAuthorized] = useState(false);
  return (
    <div>
      <React.Fragment>
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