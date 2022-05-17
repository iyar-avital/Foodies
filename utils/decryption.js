const crypto = require("crypto");
const fs = require('fs');

const decrypt = (message) => {

    const privateKey = {
        key: fs.readFileSync('private_key.pem', 'utf8'),
        passphrase: '',
        padding: crypto.constants.RSA_PKCS1_PADDING,
    };

    const decrypted = crypto.privateDecrypt(
        privateKey,
        Buffer.from(message, 'base64'),
    );

    return decrypted.toString('utf8');
}

module.exports = {
    decrypt
}

