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
    alert('sended' + passCode);
    resetPassword(data.get('userName'), passCode);
  });

}

async function resetPassword(username, passCode) {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPjcxfYXYkhimFtWrtan1pampQa7Zeggf2W7cwAxJIS4yw51yS35TKNYHg/gDoItLwKVKTkbbjRFcZlSlf3pv/5Gu0UkIrkVJgadriPBDMHVsOOdSg1sp32np2LhABF/xUUP2bIQahiT72/QPoPQyfK1xlOHOvpifPm2P64t6F8wIDAQAB');
  var encrypted = encrypt.encrypt(passCode);

  let data = new URLSearchParams({ password: passCode });
  await fetchData(
    "/reset_password/" + username,
    { method: "put", body: data },
    true
  );
}
