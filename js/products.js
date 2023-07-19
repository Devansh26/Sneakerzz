
// Main section

const onSearch = () => {
    const input = document.querySelector("#searchBar");
    const filter = input.value.toUpperCase();

    const list = document.querySelectorAll(".productList .card");

    list.forEach((el) => {
        const text = el.textContent.toUpperCase();
        el.style.display = text.includes(filter) ? "" : "none";
    });
};

document.addEventListener('DOMContentLoaded', function() {
    // Get the search bar element
    const searchBar = document.querySelector("#searchBar");

    // Add event listener for the search bar
    searchBar.addEventListener('input', onSearch);
});