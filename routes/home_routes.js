var express = require("express");
var router = express.Router();

const {
  indexView,
  aboutUsView,
  contactUsView,
} = require("../controllers/home_controller.js");

router.get("/about_us", aboutUsView);
router.get("/contact_us", contactUsView);
router.get("/", indexView);

module.exports = router;
