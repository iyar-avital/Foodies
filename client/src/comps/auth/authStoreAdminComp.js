import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, doApiGet } from "../../services/apiService";
import { STORE_SHORT_IDS } from "../../services/localService";
import { useLogoutUserMutation } from "../../redux/appApi";
import Cookies from "js-cookie";

function AuthStoreAdminComp(props) {
  let nav = useNavigate();
  let session = Cookies.get("FOODZONE_SESSION");
  const [logoutUser, { isLoading, error }] = useLogoutUserMutation();

  useEffect(() => {
    if (session) {
      doApi();
    } else {
      toast.error("Please log in first");
      logoutUser();
      nav("../login");
    }
  }, []);

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      let resp = await doApiGet(url);
      if (resp.data.role === "admin") {
        props.setAuthorized(true);
        return;
      } else if (resp.data.role !== "storeAdmin") {
        toast.error("Plase Wait for admin approval");
        nav("../");
        return;
      }
      //verify that users own this store
      else if (
        !localStorage[STORE_SHORT_IDS] ||
        !JSON.parse(localStorage[STORE_SHORT_IDS]).includes(props.short_id)
      ) {
        toast.error("You are not allowed to access this store");
        nav("/");
        return;
      }
      props.setAuthorized(true);
      return;
    } catch (err) {
      //
      console.log(err.response);
      toast.error("Something went wrong...");
      nav("../");
    }
  };

  return <React.Fragment></React.Fragment>;
}

export default AuthStoreAdminComp;
