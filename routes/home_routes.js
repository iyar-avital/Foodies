var express = require("express");
var router = express.Router();

const {
  login,
  signup,
  sendEmail,
  resetPassword,
} = require("../controllers/login_controller.js");

router.post("/login", login);
router.post("/signup", signup);
router.post("/send_email", sendEmail);
router.post("/reset_password", resetPassword);

const {
  indexView,
  aboutUsView,
  contactUsView,
} = require("../controllers/home_controller.js");
router.get("/about_us", aboutUsView);
router.get("/contact_us", contactUsView);
router.get("/", indexView);

module.exports = router;
