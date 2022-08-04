import React, { useState, useEffect } from "react";
import HomeStrip from "../comps/general/homeStrip";
import StoreCard from "../comps/store/storeCard";
import { API_URL, doApiGet } from "../services/apiService";

function Home(props) {
  const [shops_ar, setShops_ar] = useState([]);

  useEffect(() => {
  }, []);

  return (
    <React.Fragment>
      <HomeStrip />
      <main className="container">
        {/* <Info /> */}
        <div className="row">
          {shops_ar.map((item) => {
            return <StoreCard key={item._id} item={item} />;
          })}
        </div>
      </main>
    </React.Fragment>
  );
}

export default Home;