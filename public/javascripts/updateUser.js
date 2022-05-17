async function updateUser(userNameToUpdate, updatedUser) {
  let data = new URLSearchParams(updatedUser);
  await fetchData(
    "/users/update/" + userNameToUpdate,
    { method: "put", body: data },
    true
  );
}

