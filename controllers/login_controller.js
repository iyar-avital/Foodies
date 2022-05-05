const service = require("../services/users_services.js");

const logout = async (req, res) => {
  req.logOut();
  res.sendStatus(200);
};

const signup = async (req, res) => {
  setTimeout(async function () {
    body = req.body;
    user = [body.username, body.password, body.role];
    let newUser = await service.addUser(user);
    if (typeof newUser !== "string") {
      res.sendStatus(200);
    } else {
      res.sendStatus(409);
    }
  }, DELAY_IN_USER_REQUEST);
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
