import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeStrip from "../comps/homeStrip";
import Info from "../comps/info";
import StoreCard from "../comps/store/storeCard";
import { API_URL, doApiGet } from "../services/apiService";

function Home(props) {
  const [shops_ar, setShops_ar] = useState([]);

  useEffect(() => {
    // doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/stores?perPage=6&status=active";
    let resp = await doApiGet(url);
    setShops_ar(resp.data);
  };

  return (
    <React.Fragment>
      <HomeStrip />
      <main className="container mb-4">
        {/* <Info /> */}
        <div className="row">
          {shops_ar.map((item) => {
            return <StoreCard key={item._id} item={item} />;
          })}
        </div>
        {/* <div className="text-center">
          <Link className="animaLink" to="/allStore">
            Get All Stores
          </Link>
        </div> */}
      </main>
    </React.Fragment>
  );
}

export default Home;