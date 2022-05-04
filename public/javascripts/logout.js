async function logout() {
  // Romove username and password from the url
  window.history.pushState({}, document.title, window.location.pathname);


  try {
    let response = await fetch("/logout", { method: 'post' });
    if (response.ok) {
      localStorage.removeItem('username');
      localStorage.removeItem('logedin');
      location.reload();
    }
  } catch (error) {
    console.error('Error: ', error);
  }
}