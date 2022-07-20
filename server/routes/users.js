const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { auth, authAdmin } = require("../middlewares/auth");
const { UserModel } = require("../models/userModel");
const { genShortId } = require("../utils/genShortId");
const decrypt = require("../utils/decryption");

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
    // user.passwort = await
    user.password = await bcrypt.hash(user.password, 10);
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
    // let decryptPass = decrypt(req.body.password);
    // console.log(decryptPass);
    let validPass = await bcrypt.compare(req.body.password, user.password);
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
  try {
    let user = await UserModel.findOne({ _id: req.session.user._id });
    console.log(user);
    let validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(403).json({ err: "wrong password" });
    }
    let payload = { name, email, address, phone, picture };
    if (newPassword) {
      password = await bcrypt.hash(newPassword, 10);
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
// router.patch("/resetPass", auth, async (req, res) => {
//   let newPassword = req.body.newPassword;
//   let validPass = await bcrypt.compare(password, req.session.user.password);
//   if (validPass) {
//     try {
//       let data = await UserModel.updateOne({ _id: req.session.user.id }, { password: newPassword });
//       res.status(200).json(data);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   } else {
//     res.status(401);
//   }
// });

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

router.delete("/", auth, async (res, req) => {
  // let password = req.header("x-api-key");
  try {
    let user = await UserModel.find({ _id: req.session.user._id });
    let validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(403).json({ err: "wrong password" });
    }
    try {
      await UserModel.deleteOne(user);
      res.status(200).json({ msg: "delete user" });
    } catch (error) {
      return res.status(500).json(error); // failed to delete
    }
  } catch (error) {
    return res.status(400).json(error); //failed to find user
  }
  try {
    await UserModel.deleteOne({ _id: req.session.user._id });
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
