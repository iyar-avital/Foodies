function showForgotPasswordModal() {
  $("#logInForm").modal("hide");
  $("#forgotPasswordForm").modal("show");
}
function hideForgotPasswordModal() {
  $("#forgotPasswordForm").modal("hide");
  $("#logInForm").modal("show");
}

async function sendEmail() {
  let forgotPasswordForm = document.getElementById("passwordform");
  let data = new URLSearchParams(new FormData(forgotPasswordForm));

  // Make the email input and the buttom disable
  $("#resetEmail").prop("disabled", true);
  $("#resetEmailButton").hide();

  try {
    let response = await fetch("/send_email", { method: "post", body: data });
    if (response.ok) {
    } else {
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

async function resetPassword() {
  let resetPasswordForm = document.getElementById("resetPasswordForm");
  let data = new URLSearchParams(new FormData(resetPasswordForm));
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
