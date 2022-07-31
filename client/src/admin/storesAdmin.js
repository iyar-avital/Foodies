import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import { BsPen, BsEraser } from "react-icons/bs";
import { MdAddBusiness } from "react-icons/md";
import { toast } from "react-toastify";

import LottieAnimation from "../comps/misc/lottieAnimation";
import PageLinks from "../comps/misc/pageLinks";

function StoresAdmin(props) {
  const [ar, setAr] = useState([]);
  const [ownerAr, setOwnerAr] = useState([]);
  const [numPage, setPageNum] = useState(1);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const nav = useNavigate();
  const location = useLocation();
  let selectRef = useRef();

  useEffect(() => {
    doApi();
  }, [location, status]);

  useEffect(() => {
    nav("/admin/stores");
  }, [status]);

  const doApi = async () => {
    // get stores page number
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    setPageNum(pageQuery);
    let url = API_URL + "/stores?page=" + pageQuery + "&status=" + status;
    try {
      let resp = await doApiGet(url);
      setAr(resp.data);
      setLoading(false);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }

    // get owner name
    let ownerUrl = API_URL + "/users/usersList";
    try {
      let resp = await doApiGet(ownerUrl);
      let temp_ar = resp.data.map((item) => {
        return { _id: item._id, name: item.name, email: item.email };
      });
      setOwnerAr(temp_ar);
      // console.log(temp_ar);
    } catch (err) {
      alert("there problem come back later");
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  const delStore = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        let url = API_URL + "/stores/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        // console.log(resp.data);
        if (resp.data.deletedCount) {
          toast.info("Stores deleted !");
        }
        // to show the new list without the Store that we deleted
        doApi();
      } catch (err) {
        console.log(err.response);
        toast.error(err.response.data.err);
      }
    }
  };

  const updateStatus = async (_id, _name) => {
    let url = API_URL + "/stores/updateStatus/" + _id;
    let resp = await doApiMethod(url, "PATCH", {});
    console.log(resp.data);

    if (resp.data.emailStatus === "ok") {
      toast.success("Email sent to the store owner");
    } else {
      toast.error("Email failed to reach the store owner");
    }
    toast.info("Store " + _name + " is " + resp.data.data.status);
    doApi();
  };

  const onSelectOption = () => {
    let storeStatus = selectRef.current.value;
    setStatus(storeStatus);
  };

  return (
    <div className="container">
      <h1 className="display-4">Stores List</h1>
      <div className="mb-5 col-md-3 position-absolute top-0 end-0">
        <select ref={selectRef} onChange={onSelectOption} className="form-select">
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Image</th>
            <th>Short_id</th>
            <th>status</th>
            <th>Del/Edit</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1 + 5 * (numPage - 1)}</td>
                <td>{item.name}</td>
                <td>
                  {ownerAr.map((owner) => {
                    return owner._id == item.admin_id ? owner.email : "";
                  })}
                </td>
                <td>
                  <img
                    src={item.imgUrl || "/images/no_image.png"}
                    alt={item.name + " image"}
                    height="50"
                    width="90"
                  />
                </td>
                <td>{item.short_id}</td>
                <td>
                  <button
                    onClick={() => updateStatus(item._id, item.name)}
                    className={item.status == "active" ? "btn btn-primary" : "btn btn-danger"}
                  >
                    {item.status}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      delStore(item._id);
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
      {ar.length === 0 && !loading ? <h2 className="text-center my-5">No Stores fund</h2> : ""}
      {loading ? <LottieAnimation /> : ""}
      <PageLinks
        perPage="5"
        apiUrlAmount={API_URL + "/stores/amount?status=" + status}
        urlLinkTo={"/admin/stores"}
        clsCss="btn me-2 mt-4 pageLinks"
      />
    </div>
  );
}

export default StoresAdmin;