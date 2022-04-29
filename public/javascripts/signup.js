async function signup() {
    let signupForm = document.getElementById("signupform");
    let data = new URLSearchParams(new FormData(signupForm));
    try {
        let response = await fetch("/signup", { method: "post", body: data });
        if (response.ok) {
            consolr.log("signup succeeded, in signup.js");
        } else {
            consolr.log("signup fail, in signup.js");
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}
