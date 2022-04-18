async function updateUser(userNameToUpdate, userRoleToUpdate) {
  await fetchData(
    "/users/update/" + userNameToUpdate + "/" + userRoleToUpdate,
    { method: "put" },
    true
  );
}
