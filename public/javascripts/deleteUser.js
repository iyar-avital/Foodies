async function deleteUser(userNameToDelete) {
    await fetchData("/users/delete/" + userNameToDelete, { method: 'delete' }, true);
}