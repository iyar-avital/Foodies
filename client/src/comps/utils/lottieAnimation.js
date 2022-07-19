import React, { useEffect, useRef } from "react";
import Lottie from "lottie-web";

function LottieAnimation(props) {
  let animaRef = useRef(); // for lottie-web animation

  useEffect(() => {
    Lottie.loadAnimation({
      container: animaRef.current,
      loop: true,
      autoplay: true,
      path: "/lottieAnimation/loading.json",
    });
  }, []);

  return (
    <div className="mt-4 box_Animation">
      <div ref={animaRef}></div>
    </div>
  );
}

export default LottieAnimation;
