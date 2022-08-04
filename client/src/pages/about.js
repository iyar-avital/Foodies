import React from "react";

import "./css/about.css";
import { motion } from "framer-motion";
import Developers from "../comps/general/developers";

function About(props) {
  let dev1Info = {
    name: "Iyar Avital",
    job: "Property Specialist",
    info: "You can relay on our amazing features list and also our customer services will be great experience.",
    img: "/images/iyar.jpg",
    Facebook: "https://www.facebook.com/profile.php?id=100053948982001",
    Twitter: "https://twitter.com/Ce64USXJyTyFTvu?t=YmCJK-0DlF7uKfESZ_tObw&s=09",
    Instagram: "",
    Snapchat: "",
  };

  let dev2Info = {
    name: "Rivka Zizovi",
    job: "Property Specialist 2",
    info: "You can relay on our amazing features list and also our customer services will be great experience.",
    img: "/images/rivka.jpg",
    Facebook: "https://www.facebook.com/profile.php?id=100078452053799",
    Twitter: "https://mobile.twitter.com/RZizovi",
    Instagram: "",
    Snapchat: "",
  };

  let dev3Info = {
    name: "Efrat Anconina",
    job: "Property Specialist 2",
    info: "You can relay on our amazing features list and also our customer services will be great experience.",
    img: "/images/efrat.jpg",
    Facebook: "",
    Twitter: "https://twitter.com/AnconinaEfrat?t=iESN3v-nAPjygCTS1kBfZw&s=09",
    Instagram: "",
    Snapchat: "",
  };


  return (
    <div className="container">
      <div className="py-5 team4">
        <div className="container">
          <div className="row justify-content-center mb-4">
            <motion.div
              initial={{ y: "-100vw" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="col-md-7 text-center"
            >
              <h3 className="mb-3">Experienced & Professional Team</h3>
              <h6 className="subtitle">
                You can relay on our amazing features list and also our customer services will be
                great experience for you without doubt and in no-time
              </h6>
            </motion.div>
          </div>
          <div className="row">
            <Developers devInfo={dev1Info} />
            <Developers devInfo={dev2Info} />
            <Developers devInfo={dev3Info} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
