async function logout() {
    // Romove username and password from the url
    window.history.pushState({}, document.title, window.location.pathname);
    localStorage.removeItem('username');
    localStorage.removeItem('logedin');
    location.reload();
  }