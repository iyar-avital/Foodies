const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Work from index.js" });
  // res.redirect("http://localhost:3000/");
});

module.exports = router;
