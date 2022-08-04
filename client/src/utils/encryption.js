import JSEncrypt from "jsencrypt";

export const encrypt = (message) => {
  var publicKey =
    "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAx1G7Drae+RjKjy/hdfAgpWDiGec3zI/FbUtPHlMNf5fdMV3g5UhgkrC0n32S2SVIEr/nctx7KkbyR9GRYMlwdR4WHkvoJGQoD17mZB20SABU498Xnyxz2Cn+k7vIyHHg4d0GKXR8QtmsrI22aMvLNZF46hf03mH9/OznCyp0mtMhakrF0wgviNRk/xMPFH8Rm4mmPKbCE0tddp3NZmDMTpu/Dgdi4LGvk7gNx9oUjDHK3+fnNSyK3MlX+If/fNOaj8NbIGHnPje6MxT4Y6shW5W7qAeVhljFC9MrGHsDoeG/q5Wtrr2PUSBRS8CwsrAjLza9TzPsS3aFmFSJvkg3obMlcT9ZrL5DOx+YzbHM+EtVStHxNQ747D7rOsBBGwUwUtC1VbLJOptz0+jb+gr0LQnZhkHVsygS5wH1U0XIObfGnlAzIT/yDAA4AKBoBDAQmK0EHfgQRDxRl/LQJuPDq8p3EpW4+VUuo6b4GftxBUNSESPN89+yUkvw6jqcKaJpzGrI3s/GgKWJYLThzHodQxUIG7ch6Gj0RTsuudBPxuaa7pBGBlJTPN/iuH7Yvyh4fVZRjvIL5O/sEevy7jp9+iapXzk+Rp+J8SiUDUTEvBfKIgREbOBDXjR4cxSbCIec2v5mGfTS4k9cgYoaVTfzCr3xciuT8hDf9vFVh5woNdMCAwEAAQ==";

  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(publicKey);
  var encrypted = jsEncrypt.encrypt(message);
  return encrypted;
};