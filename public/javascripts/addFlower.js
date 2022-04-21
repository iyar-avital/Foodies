async function addFlower() {
    let addFlowerForm = document.getElementById('addFlowerForm');
    let formData = new FormData(addFlowerForm);
    await fetchData("/flowers/add", { method: 'post', body: formData }, true);
}