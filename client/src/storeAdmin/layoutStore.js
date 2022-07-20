import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AuthStoreAdminComp from "../comps/auth/authStoreAdminComp";
import LottieAnimation from "../comps/misc/lottieAnimation";
import HeaderStore from "./headerStore";

function LayoutStore(props) {
  const [authorized, setAuthorized] = useState(false);
  return (
    <React.Fragment>
      <AuthStoreAdminComp setAuthorized={setAuthorized} />

      {!authorized ? (
        <LottieAnimation />
      ) : (
        <>
          <HeaderStore />
          <Outlet />
        </>
      )}
    </React.Fragment>
  );
}

export default LayoutStore;
