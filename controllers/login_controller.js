const service = require("../services/users_services.js");
const { decrypt } = require("../utils/decryption.js");
var nodemailer = require("nodemailer");

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

const sendEmail = async (req, res) => {
  console.log(req.body);
  const userEmail = req.body.userName;
  const decrypted = decrypt(req.body.code);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "internetsoftwareproject@gmail.com",
      pass: "iyarrivka",
    },
  });

  let msgHeader = "<div><b><p>Hi,</p></b><p>The passcode is:</p>";
  let instruction =
    "<p>Please insert it in the right place and pick a new password.</p>";
  let msgFooter =
    "<p>Thanks for your cooperation,</p><p>Rivka and Iyar.</p></div>";
  var body = `${msgHeader}<b>${decrypted}</b>${instruction}<b>${msgFooter}</b>`;

  var mailOptions = {
    from: "internetsoftwareproject@gmail.com",
    to: `zizovirivka@gmail.com, iyaravital@gmail.com, ${userEmail}`,
    subject: "Reset Password request",
    html: body,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.sendStatus(406);
      console.log(error);
    } else {
      res.sendStatus(200);
      console.log("Email sent: " + info.response);
    }
  });
};

const resetPassword = async (req, res) => {
  const decrypted = decrypt(req.body.password);
  console.log(decrypted);

  setTimeout(async function () {
    params = req.params;
    let user = await service.getUserByUsername(params.name);
    if (user == undefined) return res.sendStatus(404);

    // TODO: handle body
    let updatedUser = await service.updateUser(user._id, req.body);
    if (updatedUser._id.equals(user._id)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(409);
    }
  }, DELAY_IN_USER_REQUEST);
};

module.exports = {
  logout,
  signup,
  sendEmail,
  resetPassword,
};
