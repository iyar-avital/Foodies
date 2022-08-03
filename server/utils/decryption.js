const crypto = require("crypto");
const Buffer = require("buffer/").Buffer;

const decrypt = (message) => {
  const privateKey = {
    key: process.env.PRIVATE_KEY,
    passphrase: "",
    padding: crypto.constants.RSA_PKCS1_PADDING,
  };

  const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(message, "base64"));

  return decrypted.toString("utf8");
};

module.exports = decrypt;