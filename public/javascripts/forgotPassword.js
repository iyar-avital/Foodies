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
  let data = new URLSearchParams(new FormData(forgotPasswordForm));

  // Make the email input and the buttom disable
  $("#resetUsername").prop("disabled", true);
  $("#resetEmail").prop("disabled", true);
  $("#resetEmailButton").empty();
  $("#resetEmailButton").hide();

  let helloStr =
    "Hello there, \n\nFor changing your email account password,\n\nplease enter the passCode shown below in the right place and choose another password.\n\n";
  let passCode = "A36yv7d9E5";
  let thanksStr = "\n\nThanks for your cooperation,\n\nRivka and Iyar. ";
  var body = `${helloStr}PassCode is: ${passCode}${thanksStr}`;
  Email.send({
    Host: "smtp.gmail.com",
    Username: "internetsoftwareproject@gmail.com",
    Password: "iyarrivka",
    To: "zizovirivka@gmail.com, iyaravital@gmail.com",
    From: "internetsoftwareproject@gmail.com",
    Subject: "Reset Password request",
    Body: body,
  }).then((message) => alert("mail sent successfully"));
}

async function resetPassword() {
  let resetPasswordForm = document.getElementById("resetPasswordForm");
  let data = new URLSearchParams(new FormData(resetPasswordForm));
  data.append("userName", document.getElementById("resetUsername").innerText);
  try {
    let response = await fetch("/reset_password", {
      method: "post",
      body: data,
    });
    if (response.ok) {
    } else {
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}
