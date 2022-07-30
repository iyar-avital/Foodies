const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { auth, authAdmin } = require("../middlewares/auth");
const { UserModel } = require("../models/userModel");
const { genShortId } = require("../utils/genShortId");
const decrypt = require("../utils/decryption");
const { resetPassEmail } = require("../utils/sendEmail");
const { random } = require("lodash");

router.get("/", (req, res) => {
  res.json({ msg: "users from " });
});
// all users
router.get("/usersList", authAdmin, async (req, res) => {
  let perPage = req.query.perPage || 10;
  let page = req.query.page >= 1 ? req.query.page - 1 : 0;
  let role = req.query.role;
  try {
    let filter = role ? { role } : {};
    let data = await UserModel.find(filter, { password: 0 })
      .limit(perPage)
      .skip(page * perPage);
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
// get amount of users
router.get("/amount", async (req, res) => {
  try {
    let cat = req.query.cat || null;
    objFind = cat ? { cat_short_id: cat } : {};
    // countDocuments -> return just the amount of documents in the collections
    let data = await UserModel.countDocuments(objFind);
    res.json({ amount: data });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// user info
router.get("/myInfo", auth, async (req, res) => {
  try {
    let data = await UserModel.findOne({ _id: req.session.user._id }, { password: 0 });
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.status(200).clearCookie(process.env.SESSION_NAME).json({ msg: "logged out" });
  });
});
router.post("/", async (req, res) => {
  try {
    let user = new UserModel(req.body);
    let decryptPass = decrypt(req.body.password);
    user.password = await bcrypt.hash(decryptPass, 10);
    user.short_id = await genShortId(UserModel);
    await user.save();
    req.session.authenticated = true; //initial session
    req.session.user = user; //initial session
    res.status(201).json({ cookie: req.session.cookie, user: user });
  } catch (error) {
    let msg;
    if (error.code === 11000) {
      msg = "User already exists";
    } else {
      msg = error.message;
    }
    res.status(400).json(msg);
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }
    let decryptPass = decrypt(req.body.password);
    // let decryptPass = req.body.password;
    let validPass = await bcrypt.compare(decryptPass, user.password);
    if (!validPass) {
      return res.status(401).json({ err: "Email or password is wrong" });
    }
    req.session.authenticated = true; //initial session
    req.session.user = user; //initial session
    res.status(200).json({ user: user, cookie: req.session.cookie });
  } catch (error) {
    console.log(error);
    res.status(400).json({ err: error.message });
  }
});

router.put("/update", auth, async (req, res) => {
  let { name, email, password, newPassword, address, phone, picture } = req.body;
  let decryptPass = decrypt(password);
  let decryptNewPass = null;
  if (newPassword) {
    decryptNewPass = decrypt(newPassword);
  }
  try {
    let user = await UserModel.findOne({ _id: req.session.user._id });
    let validPass = await bcrypt.compare(decryptPass, user.password);
    if (!validPass) {
      return res.status(403).json({ err: "wrong password" });
    }
    let payload = { name, email, address, phone, picture };
    if (decryptNewPass) {
      password = await bcrypt.hash(decryptNewPass, 10);
      payload = { ...payload, password };
    }
    try {
      let data = await UserModel.updateOne({ _id: user._id }, { ...payload });
      let newUser = await UserModel.findOne({ _id: user._id });
      console.log(data);
      res.status(200).json({ data, user: newUser });
    } catch (error) {
      return res.status(500).json(error); // failed to update
    }
  } catch (error) {
    res.status(400).json(error); //failed to find user
  }
});

//send reset password email to the user
router.get("/resetPass", (req, res) => {
  let email = req.header("x-api-key");
  let rand = random(0, 999999);
  req.session.resetCode = rand;
  if (resetPassEmail(email, rand)) {
    return res.status(200).json({
      msg: "Reset code has been sent to yout email",
      emailSent: true,
    });
  } else {
    return res.status(500).json({ err: "something went wrong", emailSent: false });
  }
});

//checks the recived code
router.get("/checkResetCode", async (res, req) => {
  let code = req.query.code;
  if (code === req.session.resetCode) {
    try {
      let data = await UserModel.updateOne({ _id: req.session.user._id }, { password: null });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json({ err: "code is not correct" });
  }
});
//change the user password
router.patch("/resetCode", async (res, req) => {
  let encryptedPass = req.header("x-api-key");
  let decryptedPass = decrypt(encryptedPass);
  let hashPass = await bcrypt.hash(decryptedPass, 10);
  //becrypt
  try {
    let data = await UserModel.updateOne(
      { _id: req.session.user._id, password: null },
      { password: hashPass }
    );
    res.status(200).json(data);
  } catch (error) {}
});

router.patch("/changeRole/:userId/:role", authAdmin, async (req, res) => {
  let userId = req.params.userId;
  let role = req.params.role;
  try {
    // prevent from user to changch himself or the first admin
    if (userId != req.session.user._id) {
      let data = await UserModel.updateOne({ _id: userId }, { role: role });
      res.json(data);
    } else {
      res.status(401).json({ err: "You cant change your self" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.delete("/", auth, async (req, res) => {
  let password = req.header("x-api-key");
  let decryptPass = decrypt(password);
  let validPass = await bcrypt.compare(decryptPass, req.session.user.password);
  if (!validPass) {
    return res.status(403).json({ err: "wrong password" });
  }
  try {
    let data = await UserModel.deleteOne({ _id: req.session.user._id });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error); // failed to delete
  }
});
// del user - DELETE
router.delete("/delete/:delId", authAdmin, async (req, res) => {
  let delId = req.params.delId;
  try {
    if (delId != req.session.user._id) {
      let data = await UserModel.deleteOne({
        _id: delId,
      });
      // deletedCount -> 1 del success msg
      res.json(data);
    } else {
      res.status(401).json({ err: "You cant delete your self Or the superAdmin" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;