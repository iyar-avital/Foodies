const service = require("../services/passwords_services.js");

const sendEmail = async (req, res) => {
  console.log("in password controller sendemail func");
  console.log("email: ", req.body);
  var passCode = service.generatePassCode();
  res.sendStatus(200);
};

const resetPassword = async (req, res) => {
  console.log("passwords: ", req.body);
  if (req.body.passCode == "" || req.body.passCode == " ") {
    res.sendStatus(404);
  } else if (req.body.newPassword != req.body.repeatNew) {
    res.sendStatus(404);
  } else res.sendStatus(200);
};

module.exports = {
  sendEmail,
  resetPassword,
};
