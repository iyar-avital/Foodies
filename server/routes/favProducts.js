const express = require("express");
const { auth } = require("../middlewares/auth");
const { ProductModel } = require("../models/productModel");
const { UserModel } = require("../models/userModel");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.session.user._id });
    res.json(user.favs_ar);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

router.get("/productsInfo", auth, async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.session.user._id });
    let favs_ar = user.favs_ar;
    let data = await ProductModel.find({ short_id: { $in: favs_ar } });
    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

router.patch("/add_remove/:prodId", auth, async (req, res) => {
  try {
    let prodId = req.params.prodId;
    let favs_ar = req.session.user.favs_ar;

    if (favs_ar.includes(prodId)) {
      //remove the product form favorites list
      favs_ar = favs_ar.filter((short_id) => short_id != prodId);
    } else {
      //add to start
      favs_ar.unshift(prodId);
      //limit to 40 items
      favs_ar.splice(40, favs_ar.length);
    }
    await UserModel.updateOne({ _id: req.session.user._id }, { favs_ar: favs_ar });
    console.log(favs_ar);
    req.session.user.favs_ar = favs_ar;
    res.status(200).json(favs_ar);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

module.exports = router;
