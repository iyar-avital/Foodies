async function logout() {
  try {
    let response = await fetch("/logout", { method: 'delete' });
    if (!response.ok)
      return

    // Romove username and password from the url
    window.history.pushState({}, document.title, window.location.pathname);
    sessionStorage.setItem('loggedIn', false);
    location.reload();

  } catch (error) {
    console.error('Error: ', error);
  }
}