var express = require("express");
var passport = require("passport");
var router = express.Router();
var auth = require("../utils/authentication");

router.post(
  "/login",
  passport.authenticate("local", { failWithError: true }),
  function (req, res) {
    res.sendStatus(200);
  },
  function (err, req, res) {
    res.sendStatus(400);
  }
);

const {

  logout,
  signup,
  sendEmail,
  resetPassword,
  personalAreaView,
  personalAreaData,
} = require("../controllers/login_controller.js");

router.delete("/logout", logout);
router.post("/signup", signup);
router.post("/send_email", sendEmail);
router.put("/reset_password/:name", resetPassword);

// ------------- personal area -------------
router.get("/personal_area", auth.checkAuthenticated, personalAreaView);
router.get("/personal_area/data", auth.checkAuthenticated, personalAreaData);

module.exports = router;
