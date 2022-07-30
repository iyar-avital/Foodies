const crypto = require("crypto");
const fs = require("fs");
const Buffer = require("buffer/").Buffer;

const decrypt = (message) => {
  const privateKey = {
    key: fs.readFileSync(process.env.CRYPT_PRIVET_KEY, "utf8"),
    passphrase: "",
    padding: crypto.constants.RSA_PKCS1_PADDING,
  };

  const decrypted = crypto.privateDecrypt(privateKey, Buffer.from(message, "base64"));

  return decrypted.toString("utf8");
};

module.exports = decrypt;