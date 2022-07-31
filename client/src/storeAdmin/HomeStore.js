import React from "react";
import "../comps/css/homeStrip.css";
import { motion } from "framer-motion";

function HomeStore(props) {
    return (
        <div
            className="strip_home container-fluid d-flex align-items-center"
            style={{
                backgroundImage: `url(https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
            }}
        >
            <motion.div
                className="container text_bg text-center"
                initial={{ x: "-100vw" }}
                animate={{ x: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
            >
                <h2>Welcome to your store</h2>
            </motion.div>
        </div>
    );
}

export default HomeStore;