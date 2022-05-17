function showForgotPasswordModal() {
  $("#logInForm").modal("hide");
  $("#forgotPasswordForm").modal("show");
  $("#resetUsername").prop("disabled", false);
  $("#resetEmailButton").show();
  $("#resetPasswordForm").hide();
}

function hideForgotPasswordModal() {
  $("#forgotPasswordForm").modal("hide");
  $("#logInForm").modal("show");
}

async function sendEmail() {
  alert("Sending email...");
  // Make the email input and the buttom disable
  $("#resetUsername").prop("disabled", true);
  $("#resetEmailButton").hide();
  $("#resetPasswordForm").show();

  var email = $('#resetEmail').val();
  alert(email);

  var passCode = (Math.random() + 1).toString(36).substring(2);
  alert(passCode);

  var encrypted = encrypt(passCode);
  alert(encrypted);

  let data = new URLSearchParams({ email: email, code: encrypted });
  await fetchData(
    "/send_email",
    { method: "post", body: data },
    true
  );
}

async function resetPassword(username, newPassword) {
  // TODO: change 
  alert("Resetting password...");
  const encrypted = encrypt(newPassword);
  let data = new URLSearchParams({ password: encrypted });
  await fetchData(
    "/reset_password/" + username,
    { method: "put", body: data },
    true
  );
}
