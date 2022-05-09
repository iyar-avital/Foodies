async function updateUser(userNameToUpdate, userRoleToUpdate) {
  let data = new URLSearchParams({ role: userRoleToUpdate });
  await fetchData(
    "/users/update/" + userNameToUpdate,
    { method: "put", body: data },
    true
  );
}
