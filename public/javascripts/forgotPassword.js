function showForgotPasswordModal() {
  $("#logInForm").modal("hide");
  $("#forgotPasswordForm").modal("show");
  $("#resetUsername").prop("disabled", false);
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
  $("#resetEmailButton").empty();
  $("#resetEmailButton").hide();

  var passCode = (Math.random() + 1).toString(36).substring(2);
  const encrypted = encrypt(passCode);
  data.append("password", encrypted);

  try {
    await fetchData("/send_email", { method: "post", body: data }, true);
  } catch (error) {
    console.log(error);
  }
}

async function resetPassword(username, passCode) {
  const encrypted = encrypt(passCode);
  let data = new URLSearchParams({ password: encrypted });
  await fetchData(
    "/reset_password/" + username,
    { method: "put", body: data },
    true
  );
}
