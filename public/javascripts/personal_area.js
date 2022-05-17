async function loadPersonalArea() {
  try {
    let response = await fetch("/personal_area/", { method: "get" });
    let responseData = await fetch("/personal_area/data", { method: "get" });
    let items = await responseData.json();
    let view = await response.json();

    console.log(items);
    console.log(view);
    if (response.ok) return;
  } catch (error) {
    console.error("Error: ", error);
  }
}
