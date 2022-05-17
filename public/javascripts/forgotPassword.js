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
  var email = $('#resetUsername').val();
  var passCode = (Math.random() + 1).toString(36).substring(2);
  var encrypted = encrypt(passCode);

  try {
    await fetchData("/send_email", {
      method: "post",
      body: new URLSearchParams({ userName: email, code: encrypted })
    });
  } catch (error) {
    console.log(error);
  }

  // Save in client side for comporation later
  localStorage.setItem("user_received_code", passCode);
  localStorage.setItem("username", email);

  // Make the email input and the buttom disable
  $("#resetUsername").prop("disabled", true);
  $("#resetEmailButton").hide();
  $("#resetPasswordForm").show();
}

async function resetPassword() {
  var code = $('#passCode').val();
  if (code != localStorage.getItem("user_received_code"))
    return $('#passCode').addClass('is-invalid');

  var password = $('#newPassword').val();
  let passConfirm = $('#repeatNew').val();
  if (password != passConfirm)
    return $('#newPassword, #repeatNew').addClass('is-invalid');

  var encrypted = encrypt(password);
  let data = new URLSearchParams({ password: encrypted });
  await fetchData(
    "/reset_password/" + localStorage.getItem("username"),
    { method: "put", body: data },
    true
  );
}
