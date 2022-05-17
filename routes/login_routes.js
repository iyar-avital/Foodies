var express = require("express");
var passport = require("passport");
var router = express.Router();

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
  resetPassword
} = require("../controllers/login_controller.js");

router.delete("/logout", logout);
router.post("/signup", signup);
router.put("/reset_password/:name", resetPassword);

module.exports = router;
