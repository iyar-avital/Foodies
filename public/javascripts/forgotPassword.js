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

  try {
    let response = await fetch("/send_email", { method: "post", body: data });

    if (response.ok) {
      console.log("ok");
    } else {
      console.log("else");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
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
