async function login() {
    let loginForm = document.getElementById('form');
    let data = new URLSearchParams(new FormData(loginForm));
    try {
        let response = await fetch("/login", { method: 'post', body: data });
        if (response.ok)
            return sessionStorage.setItem('loggedIn', true);

        // Romove username and password from the url
        window.history.pushState({}, document.title, window.location.pathname);
    } catch (error) {
        console.error('Error: ', error);
    }
}