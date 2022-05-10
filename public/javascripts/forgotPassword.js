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
    To: data.get('email'),
    From: "internetsoftwareproject@gmail.com",
    Subject: "Reset Password request",
    Body: body,
  }).then(async (message) => {
    alert('sended' + data.get('userName'));
    await resetPassword(data.get('userName'), passCode);
  });

}

async function resetPassword(username, passCode) {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB');
  var encrypted = encrypt.encrypt(passCode);

  let data = new URLSearchParams({ password: encrypted });
  await fetchData(
    "/reset_password/" + username,
    { method: "put", body: data },
    true
  );
}
