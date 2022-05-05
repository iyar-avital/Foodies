const service = require("../services/users_services.js");

const logout = async (req, res) => {
  req.logOut();
  res.sendStatus(200);
};

// TODO: change
const signup = async (req, res) => {
  console.log("in signup func", req.body);
  res.sendStatus(200);
};

// TODO: change
const sendEmail = async (req, res) => {
  console.log("in password controller sendemail func");
  console.log(req.body);
  var passCode = (Math.random() + 1).toString(36).substring(2);
  console.log("generated", passCode);
  res.send({ passCode: passCode });
};

// TODO: change
const resetPassword = async (req, res) => {
  console.log("passwords: ", req.body);
  console.log("getPass", passCode);
  console.log("userpass", req.body.passCode);
  if (req.body.passCode == "" || req.body.passCode == " ") {
    res.sendStatus(404);
  } else if (req.body.newPassword != sreq.body.repeatNew) {
    res.sendStatus(404);
  } else res.sendStatus(200);
};

module.exports = {
  logout,
  signup,
  sendEmail,
  resetPassword,
};
