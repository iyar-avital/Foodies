import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doApiGet } from "../../services/apiService";

function PageLinks(props) {
  const nav = useNavigate();
  const [pages, setPages] = useState(0);
  // get categories page number
  const urlParams = new URLSearchParams(window.location.search);
  let pageQuery = urlParams.get("page") || 1;

  useEffect(() => {
    doApi();
  }, [props.apiUrlAmount]); //updating the stores amount according the new api request

  const doApi = async () => {
    let url = props.apiUrlAmount;
    let resp = await doApiGet(url);
    setPages(Math.ceil(resp.data.amount / props.perPage));
  };

  return (
    <div className="my-3 text-center">
      {/* <span>page: </span> */}
      {/* [...Array(pages)] - createa array from number var that we can do map/loop on him */}
      {Number(pageQuery) === 1 ? (
        ""
      ) : (
        <button
          className={props.clsCss}
          onClick={() => {
            nav(props.urlLinkTo + "?page=" + (Number(pageQuery) - 1));
          }}
        >
          {"<"}
        </button>
      )}
      {[...Array(pages)].map((item, i) => {
        return (
          <button
            key={i}
            className={props.clsCss}
            onClick={() => {
              nav(props.urlLinkTo + "?page=" + (i + 1));
            }}
          >
            {i + 1}
          </button>
        );
      })}
      {Number(pageQuery) === pages ? (
        ""
      ) : (
        <button
          className={props.clsCss}
          onClick={() => {
            nav(props.urlLinkTo + "?page=" + (Number(pageQuery) + 1));
          }}
        >
          {">"}
        </button>
      )}
    </div>
  );
}

export default PageLinks;
