const fs = require('fs');
const service = require("../services/users_services.js");
const crypto = require("crypto");

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

const resetPassword = async (req, res) => {
  // TODO: add helper function to decrypt password 
  // TODO: Handle in user not found 
  console.log(req.body.password);
  const rsaPrivateKey = {
    key: fs.readFileSync('private_key.pem', 'utf8'),
    passphrase: '',
    padding: crypto.constants.RSA_PKCS1_PADDING,
  };

  const decryptedMessage = crypto.privateDecrypt(
    rsaPrivateKey,
    Buffer.from(req.body.password, 'base64'),
  );
  console.log(decryptedMessage.toString('utf8'));

  setTimeout(async function () {
    params = req.params;
    let user = await service.getUserByUsername(params.name);
    console.log(user);
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
  resetPassword
};
