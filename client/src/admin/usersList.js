import React, { useEffect, useState, useRef } from "react";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import { MdOutlineDeliveryDining, MdAdminPanelSettings } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FiGitPullRequest } from "react-icons/fi";
import { BsShop, BsEraser } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import LottieAnimation from "../comps/misc/lottieAnimation";
import PageLinks from "../comps/misc/pageLinks";

function UsersList(props) {
  const [ar, setAr] = useState([]);
  const [numPage, setPageNum] = useState(1);
  const location = useLocation();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const selectRef = useRef();

  useEffect(() => {
    doApi();
  }, [location, role]);

  //fetch users list
  const doApi = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    setPageNum(pageQuery);
    let url = API_URL + `/users/usersList?page=${pageQuery}&role=${role}`;
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
      setLoading(false);
    } catch (err) {
      alert("there problem come back later");
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  // delete user
  const delUser = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      let url = API_URL + `/users/delete/${_idDel}`;
      try {
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          doApi();
        }
      } catch (err) {
        alert("There was a problem with deleting the user ");
        if (err.response) {
          console.log(err.response.data);
        }
      }
    }
  };

  // change user's role
  const changeRole = async (e, _userId) => {
    let newRole = e.target.value;
    let url = API_URL + `/users/changeRole/${_userId}/${newRole}`;
    try {
      let resp = await doApiMethod(url, "PATCH", {});
      if (resp.data.modifiedCount) {
        setLoading(true);
        doApi();
      }
    } catch (err) {
      alert("there problem come back later");
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  const onSelectOption = () => {
    let role = selectRef.current.value;
    setRole(role);
  };

  return (
    <div className="container">
      <h1 className="display-4">Users List</h1>
      {/* filter users list by role */}
      <div className="my-5 col-md-3 position-absolute top-0 end-0">
        <select ref={selectRef} onChange={onSelectOption} className="form-select">
          <option value="">All users</option>
          <option value="admin">Admin</option>
          <option value="storeAdmin">Store admins</option>
          <option value="user">Clients</option>
        </select>
      </div>
      {ar.length > 0 ? (
        <table className="table table-striped mt-5">
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>email</th>
              <th>address</th>
              <th>role</th>
              <th>del</th>
            </tr>
          </thead>
          <tbody>
            {ar.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td>{i + 1 + 10 * (numPage - 1)}</td>
                  <td>
                    {item.role === "admin" ? <MdAdminPanelSettings /> : ""}
                    {item.role === "storeAdmin" ? <BsShop /> : ""}
                    {item.role === "user" ? <FaUserAlt /> : ""}
                    {" " + item.name}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td className="d-flex justify-content-center">
                    <select
                      defaultValue={item.role}
                      onChange={(e) => {
                        changeRole(e, item._id);
                      }}
                      className="form-select"
                    >
                      <option value="admin">Admin</option>
                      <option value="storeAdmin">StoreAdmin</option>

                      <option value="user">User</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        delUser(item._id);
                      }}
                      className="btn btn-outline-danger mx-2"
                      title="Delete"
                    >
                      <BsEraser />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        ""
      )}
      {loading ? <LottieAnimation /> : ""}
      {!loading && ar.length === 0 ? (
        <h2 className="display-4 text-danger text-center mt-5">No users found</h2>
      ) : (
        <PageLinks
          perPage="10"
          apiUrlAmount={API_URL + "/users/amount"}
          urlLinkTo={"/admin/users"}
          clsCss="btn me-2 mt-4 pageLinks"
        />
      )}
    </div>
  );
}

export default UsersList;