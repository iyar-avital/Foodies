import React, { useEffect, useRef } from "react";
import Lottie from "lottie-web";
import "./css/page404.css";
import { useNavigate } from "react-router-dom";

function Page404(props) {
  let animaRef = useRef(); // for lottie-web animation
  let nav = useNavigate();

  useEffect(() => {
    Lottie.loadAnimation({
      container: animaRef.current,
      loop: true,
      autoplay: true,
      path: "https://assets8.lottiefiles.com/packages/lf20_6sxyjyjj.json",
    });
  }, []);

  return (
    <div className="container p-4 text-center" style={{ minHeight: "85vh" }}>
      <div className="mt-4 animation_courier">
        <div ref={animaRef}></div>
      </div>
      <h1 className="text">404</h1>
      <p>Something went wrong. We're sorry !!!</p>
      <button
        onClick={() => {
          nav("/");
        }}
        className="btn btn-danger mx-3"
      >
        Home
      </button>
      <button
        onClick={() => {
          nav(-1);
        }}
        className="btn btn-danger"
      >
        Go Back
      </button>
    </div>
  );
}

export default Page404;
