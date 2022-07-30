import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLogoutUserMutation } from "../redux/appApi";

function Logout() {
  const [logoutUser, { isLoading, error }] = useLogoutUserMutation();
  let nav = useNavigate();
  useEffect(() => {
    logoutUser();
    toast.info("You logged out");
    nav("/");
  }, []);

  return <React.Fragment></React.Fragment>;
}

export default Logout;