async function logout() {
  // Romove username and password from the url
  window.history.pushState({}, document.title, window.location.pathname);

  try {
    let response = await fetch("/logout", { method: 'delete' });
    if (response.ok)
      location.reload();

  } catch (error) {
    console.error('Error: ', error);
  }
}