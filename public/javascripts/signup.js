async function signup() {
    let signupForm = document.getElementById("signupform");
    let data = new URLSearchParams(new FormData(signupForm));
    await fetchData("/signup", { method: 'post', body: data }, true);
}
