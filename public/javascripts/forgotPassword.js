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
  }).then((message) => {
    alert('sended' + data.get('userName'));
    resetPassword(data.get('userName'), passCode);
  });

}

async function resetPassword(username, passCode) {
  let data = new URLSearchParams({ password: passCode });

  // npm i node-rsa
  // const NodeRSA = require('node-rsa');
  //  const key = new NodeRSA({b: 512}); 
  // const text = 'Hello RSA!'; 
 
  // const encrypted = key.encrypt(text, 'base64'); 
  // console.log('encrypted: ', encrypted);

  alert(data);
  const settings= {
    method: "put",
    body: data,
  };
  // await fetch( "/users/update/" + "ABC", settings);
  // await fetchData(
  //   "/users/update/" + username,
  //   { method: "put", body: data },
  //   true
  // );
}

