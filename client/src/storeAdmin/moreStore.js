import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiGet } from "../services/apiService";
import { BsInfoCircle } from "react-icons/bs";
import { dateCreated } from "../comps/utils/dateCreated";
import LottieAnimation from "../comps/utils/lottieAnimation";
import "./css/moreStore.css";
import "../admin/css/formStore.css";

function MoreStore(props) {
  const [shop, setShop] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  let params = useParams();
  let nav = useNavigate();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/stores/single/" + params.id;
    let resp = await doApiGet(url);
    resp.data.date_created = dateCreated(resp.data.date_created);
    setShop(resp.data);
    // console.log(resp.data);

    let url2 = API_URL + "/users/myInfo";
    let resp2 = await doApiGet(url2);
    setUserInfo(resp2.data);
    // console.log(resp2.data);
  };

  return (
    <React.Fragment>
      {shop.length != 0 && userInfo.length != 0 ? (
        <React.Fragment>
          <div
            style={{
              backgroundImage: `url(${shop.imgUrl || "/images/no_image.png"})`,
            }}
            className="strip container-fluid d-flex align-items-center"
          >
            <div className="container stripText_bg text-center">
              <h2 className="shop_name">{shop.name}</h2>
            </div>
          </div>
          <div className="container store_info store-form">
            <form>
              <div
                className="form-icon edit_img"
                style={{
                  backgroundImage: `url(${shop.imgUrl})`,
                }}
              >
                <span>
                  <BsInfoCircle />
                </span>
              </div>
              <div className="form-group">
                <p className="small">Store Name</p>
                <input
                  disabled
                  defaultValue={shop.name}
                  type="text"
                  className="form-control item"
                />
              </div>
              <div className="form-group">
                <p className="small">Store Owner Name</p>
                <input
                  disabled
                  defaultValue={userInfo.name}
                  type="text"
                  className="form-control item"
                />
              </div>
              <div className="form-group">
                <p className="small">Store Owner Email</p>
                <input
                  disabled
                  defaultValue={userInfo.email}
                  type="text"
                  className="form-control item"
                />
              </div>
              <div className="form-group">
                <p className="small">Date Created</p>
                <input
                  disabled
                  defaultValue={shop.date_created}
                  type="text"
                  className="form-control item"
                />
              </div>
              <div className="form-group">
                <p className="small">Address</p>
                <input
                  disabled
                  defaultValue={shop.address}
                  type="text"
                  className="form-control item"
                />
              </div>
              <div className="form-group">
                <p className="small">Status</p>
                <input
                  disabled
                  defaultValue={shop.status}
                  type="text"
                  className="form-control item"
                />
              </div>
              <div className="form-group">
                <p className="small">Short Id</p>
                <input
                  disabled
                  defaultValue={shop.short_id}
                  type="text"
                  className="form-control item"
                />
              </div>
              <div className="form-group">
                <p className="small">Info</p>
                <textarea
                  disabled
                  defaultValue={shop.info}
                  className="form-control item"
                  style={{ width: "100%", height: "150px" }}
                ></textarea>
              </div>
              <div className="form-group">
                <button
                  className="btn btn-block create-account"
                  onClick={() => {
                    nav("/storeAdmin");
                  }}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </React.Fragment>
      ) : (
        <LottieAnimation />
      )}
    </React.Fragment>
  );
}

export default MoreStore;
