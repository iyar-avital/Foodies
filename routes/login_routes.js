var express = require("express");
var passport = require("passport");
var router = express.Router();

router.post("/login", passport.authenticate('local', function (err, user) {
    if (!user)
        return res.sendStatus(400);
    res.sendStatus(200);
}));

const {
    logout,
    signup,
    sendEmail,
    resetPassword,
} = require("../controllers/login_controller.js");
router.delete("/logout", logout);
router.post("/signup", signup);
router.post("/send_email", sendEmail);
router.post("/reset_password", resetPassword);

module.exports = router;
