import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsPen, BsEraser, BsInfoCircle } from "react-icons/bs";
import { MdAddShoppingCart } from "react-icons/md";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import { toast } from "react-toastify";
import PageLinks from "../comps/misc/pageLinks";
import LottieAnimation from "../comps/misc/lottieAnimation";
import AuthAdminComp from "../comps/auth/authAdminComp";

function ProductsAdmin(props) {
  let [ar, setAr] = useState([]);
  let [numPage, setPageNum] = useState(1);
  let nav = useNavigate();
  const location = useLocation();
  useEffect(() => {
    doApi();
  }, [location]);
  const doApi = async () => {
    // get products page number
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    setPageNum(pageQuery);
    let url = API_URL + "/products?page=" + pageQuery;
    try {
      let resp = await doApiGet(url);
      setAr(resp.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };
  const delProduct = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        let url = API_URL + "/products/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          toast.info("Product deleted");
        }
        // to show the new list without the product that we deleted
        doApi();
      } catch (err) {
        console.log(err.response);
        alert("there problem , try again later");
      }
    }
  };
  return (
    <div className="container">
      <AuthAdminComp />
      <h1 className="display-4">Products List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>store_short_id</th>
            <th>Date Created</th>
            <th>Short_id</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1 + 5 * (numPage - 1)}</td>
                <td>
                  <img
                    src={item.imgUrl || "/images/no_image.png"}
                    alt={item.name + " image"}
                    height="50"
                    width="90"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.store_id}</td>
                <td>{item.date_created}</td>
                <td>{item.short_id}</td>
                <td>
                  <button
                    onClick={() => {
                      delProduct(item._id);
                    }}
                    className="btn btn-outline-danger"
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
      <PageLinks
        perPage="5"
        apiUrlAmount={API_URL + "/products/amount"}
        urlLinkTo={"/admin/products"}
        clsCss="btn me-2 mt-4 pageLinks"
      />
      {ar.length === 0 ? <LottieAnimation /> : ""}
    </div>
  );
}
export default ProductsAdmin;
