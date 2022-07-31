import React from "react";

import "./css/about.css";
import { motion } from "framer-motion";
import Developers from "../comps/general/developers";

function About(props) {
  let dev1Info = {
    name: "Michael Doe",
    job: "Property Specialist",
    info: "You can relay on our amazing features list and also our customer services will be great experience.",
    img: "https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t2.jpg",
    Facebook: "",
    Twitter: "",
    Instagram: "",
    Snapchat: "",
  };

  let dev2Info = {
    name: "Michael Doe 2",
    job: "Property Specialist 2",
    info: "You can relay on our amazing features list and also our customer services will be great experience.",
    img: "https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/team/t2.jpg",
    Facebook: "1",
    Twitter: "c",
    Instagram: "c",
    Snapchat: "c",
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
