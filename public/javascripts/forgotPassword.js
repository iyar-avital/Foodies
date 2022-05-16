
function showForgotPasswordModal() {
  $("#logInForm").modal("hide");
  $("#forgotPasswordForm").modal("show");
  $("#resetUsername").prop("disabled", false);
  $("#resetEmail").prop("disabled", false);
  $("#resetEmailButton").show();
}

function hideForgotPasswordModal() {
  $("#forgotPasswordForm").modal("hide");
  $("#logInForm").modal("show");
}

async function sendEmail() {
  let forgotPasswordForm = document.getElementById("passwordform");
  let data = new FormData(forgotPasswordForm);

  // Make the email input and the buttom disable
  $("#resetUsername").prop("disabled", true);
  $("#resetEmail").prop("disabled", true);
  $("#resetEmailButton").empty();
  $("#resetEmailButton").hide();

  let helloStr =
    "Hello there, \nYour new password to our website is:,\n";
  var passCode = (Math.random() + 1).toString(36).substring(2);
  let thanksStr = "\nThanks for your cooperation,\nRivka and Iyar. ";
  var body = `${helloStr}${passCode}${thanksStr}`;

  await Email.send({
    Host: "smtp.gmail.com",
    Username: "internetsoftwareproject@gmail.com",
    Password: "iyarrivka",
    To: 'iyaravital@gmail.com, zizovirivka@gmail.com',
    From: "internetsoftwareproject@gmail.com",
    Subject: "Reset Password request",
    Body: body,
  }).then((message) => {
    alert('sended');
    resetPassword(data.get('userName'), passCode);
  });

}


async function resetPassword(username, passCode) {

  // TODO: add calling to server to get public key
  publicKey = 'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAx1G7Drae+RjKjy/hdfAgpWDiGec3zI/FbUtPHlMNf5fdMV3g5UhgkrC0n32S2SVIEr/nctx7KkbyR9GRYMlwdR4WHkvoJGQoD17mZB20SABU498Xnyxz2Cn+k7vIyHHg4d0GKXR8QtmsrI22aMvLNZF46hf03mH9/OznCyp0mtMhakrF0wgviNRk/xMPFH8Rm4mmPKbCE0tddp3NZmDMTpu/Dgdi4LGvk7gNx9oUjDHK3+fnNSyK3MlX+If/fNOaj8NbIGHnPje6MxT4Y6shW5W7qAeVhljFC9MrGHsDoeG/q5Wtrr2PUSBRS8CwsrAjLza9TzPsS3aFmFSJvkg3obMlcT9ZrL5DOx+YzbHM+EtVStHxNQ747D7rOsBBGwUwUtC1VbLJOptz0+jb+gr0LQnZhkHVsygS5wH1U0XIObfGnlAzIT/yDAA4AKBoBDAQmK0EHfgQRDxRl/LQJuPDq8p3EpW4+VUuo6b4GftxBUNSESPN89+yUkvw6jqcKaJpzGrI3s/GgKWJYLThzHodQxUIG7ch6Gj0RTsuudBPxuaa7pBGBlJTPN/iuH7Yvyh4fVZRjvIL5O/sEevy7jp9+iapXzk+Rp+J8SiUDUTEvBfKIgREbOBDXjR4cxSbCIec2v5mGfTS4k9cgYoaVTfzCr3xciuT8hDf9vFVh5woNdMCAwEAAQ=='

  alert('The passcode is: ' + passCode);
  const jsEncrypt = new JSEncrypt();
  jsEncrypt.setPublicKey(publicKey);
  var encrypted = jsEncrypt.encrypt(passCode);
  alert(encrypted);
  let data = new URLSearchParams({ password: encrypted });
  await fetchData(
    "/reset_password/" + username,
    { method: "put", body: data },
    true
  );
}

