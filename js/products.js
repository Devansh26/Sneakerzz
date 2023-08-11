
// Check session on each page
document.addEventListener('DOMContentLoaded', function() {
    const sessionToken = checkSessionCookie();

    if (sessionToken) {
        // User is authenticated, perform necessary actions
        console.log("User is authenticated");
    } else {
        // User is not authenticated, handle accordingly
        console.log("User is not authenticated");
        window.location.href="../html/login.html";
    }
});

// Retrieve the session token from cookie
function checkSessionCookie() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'sessionToken') {
            return value;
        }
    }
    return null;
}

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

document.addEventListener('DOMContentLoaded', function () {
    // Get the search bar element
    const searchBar = document.querySelector("#searchBar");

    // Add event listener for the search bar
    searchBar.addEventListener('input', onSearch);
});

// document.getElementById("addProductButton").addEventListener("click", addToCart);
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
// Add event listeners to each button
addToCartButtons.forEach((button) => {
    const productName = button.dataset.productName;
    const category = button.dataset.productCategory;
    const price = button.dataset.productPrice;
    const image = button.dataset.productImage

    button.addEventListener("click", () => addToCart(productName, category, price,image));

    button.addEventListener("click", function () {
        // Show the Bootstrap toast
        const toastEl = document.querySelector(".toast");
        const bootstrapToast = new bootstrap.Toast(toastEl);
        bootstrapToast.show();
    });

});

function addToCart(productName, category, price,image) {


    console.log("Product Name:", productName);
    console.log("Category:", category);
    console.log("Price:", price);

    // Open the IndexedDB database (create it if it doesn't exist)
    const request = indexedDB.open("Sneakerzz",1);

    request.onupgradeneeded = function (event) {
        const db = event.target.result;
        // Create an object store (table) in the database
        if (!db.objectStoreNames.contains("products")) {
            db.createObjectStore("products", {keyPath: "id", autoIncrement: true});
        }
    };

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(["products"], "readwrite");
        const objectStore = transaction.objectStore("products");

        // Get all the products from the object store to check if the product is already present
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function (event) {
            const products = event.target.result;
            const existingProduct = products.find((product) =>
                product.productName.trim().toLowerCase() === productName.trim().toLowerCase()
            );

            if (existingProduct) {
                // If the product is found, increase the quantity field
                existingProduct.quantity += 1;
                const updateRequest = objectStore.put(existingProduct);
                updateRequest.onsuccess = function () {
                    console.log("Quantity increased for existing product:", existingProduct);
                };
                updateRequest.onerror = function (error) {
                    console.error("Error updating product quantity:", error);
                };
            } else {
                // If the product is not found, add a new entry to the table
                const productData = {
                    productName: productName,
                    category: category,
                    price: price,
                    quantity: 1, // Set initial quantity to 1
                    productImage:image,
                };
                const addRequest = objectStore.add(productData);

                addRequest.onsuccess = function () {
                    console.log("New product added to the table!");
                };
                addRequest.onerror = function (error) {
                    console.error("Error adding product to the table:", error);
                };
            }
        };

        transaction.oncomplete = function () {
            db.close();
        };
    };

    request.onerror = function (error) {
        console.error("Error opening the database:", error);
    };

}
