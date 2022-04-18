async function login() {
    let loginForm = document.getElementById('form');
    let data = new URLSearchParams(new FormData(loginForm));
    try {
        let response = await fetch("/login", { method: 'post', body: data });
        if (response.ok) {
            localStorage.setItem('username', data.get('username'));
            localStorage.setItem('logedin', 'true');
        }
        else {
            //delete user name from url
        }
    } catch (error) {
        console.error('Error: ', error);
    }
}