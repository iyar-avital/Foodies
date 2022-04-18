async function addUser() {
    console.log("arrives addUser");
    let addUserForm = document.getElementById('addUserForm');
    let data = new URLSearchParams(new FormData(addUserForm));
    await fetchData("/users/add", { method: 'post', body: data }, true);
}