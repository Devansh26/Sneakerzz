
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

// Function to update the product list based on filters
function updateProductList() {
    const shoesFilter = document.getElementById("shoesFilter");
    const socksFilter = document.getElementById("socksFilter");

    const shoesContainer = document.querySelector(".shoes");
    const socksContainer = document.querySelector(".socks");

    // Toggle visibility based on filters
    if (shoesFilter.checked && socksFilter.checked) {
        // Display both shoe and sock containers
        shoesContainer.style.display = "block";
        socksContainer.style.display = "block";
    } else if (shoesFilter.checked) {
        // Display only shoe container
        shoesContainer.style.display = "block";
        socksContainer.style.display = "none";
    } else if (socksFilter.checked) {
        // Display only sock container
        shoesContainer.style.display = "none";
        socksContainer.style.display = "block";
    } else {
        // Display both containers when no filter is selected
        shoesContainer.style.display = "block";
        socksContainer.style.display = "block";
    }
}

// Attach event listeners to the filters
document.getElementById("shoesFilter").addEventListener("change", updateProductList);
document.getElementById("socksFilter").addEventListener("change", updateProductList);


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

    //updateProductList();
});

// document.getElementById("addProductButton").addEventListener("click", addToCart);
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const toastEl = document.querySelector(".toast");
const toastBody = toastEl.querySelector(".toast-body");
// Add event listeners to each button
addToCartButtons.forEach((button) => {
    const productName = button.dataset.productName;
    const category = button.dataset.productCategory;
    const price = button.dataset.productPrice;
    const image = button.dataset.productImage

    const userEmail = getCookie('userEmail');

    //button.addEventListener("click", () => addToCart(productName, category, price,image));
    const sizeOptions = document.querySelectorAll('input[name="size"]');

    button.addEventListener("click", function () {
        const selectedSizeElement = document.querySelector('input[name="size"]:checked');
        const selectedSize = selectedSizeElement ? selectedSizeElement.value : "";
        console.log(selectedSize);
        if (selectedSize === "") {
            toastBody.classList.add("bg-danger");
            toastBody.textContent = "Size not selected for " + productName + "(" + category + ")";
        } else {
            addToCart(userEmail, productName, category, price, image, selectedSize);
            toastBody.classList.remove("bg-danger");
            toastBody.textContent = "Added to cart";
            //selectedSizeElement.value = "";

            // Reset the checked property of radio buttons
            sizeOptions.forEach(option => {
                option.checked = false;
            });

            // // Delay clearing the selected radio button for 3 seconds
            // setTimeout(() => {
            //     sizeOptions.forEach(option => {
            //         option.checked = false;
            //     });
            // }, 3000);// 3 seconds
        }

        // Show the Bootstrap toast
        const bootstrapToast = new bootstrap.Toast(toastEl);

        bootstrapToast.show();
    });

});

function addToCart(userEmail, productName, category, price,image,selectedSize) {


    // console.log("Product Name:", productName);
    // console.log("Category:", category);
    // console.log("Price:", price);

    // Open the IndexedDB database (create it if it doesn't exist)
    const request = indexedDB.open("Sneakerzz",1);
    // let newVersion = 2;
    request.onupgradeneeded = function (event) {
        const db = event.target.result;
        console.log("Upgrade needed");

        // Create an object store (table) in the database
        if (!db.objectStoreNames.contains("products")) {
            db.createObjectStore("products", {keyPath: "id", autoIncrement: true});
            console.log("Products created");
        }
    };

    request.onsuccess = function (event) {
        const db = event.target.result;
        console.log("Database opened successfully");
        const transaction = db.transaction(['products'], 'readwrite');
        const objectStore = transaction.objectStore('products');

        // Get all the products from the object store to check if the product is already present
        const getAllRequest = objectStore.getAll();

        const userEmail = getCookie('userEmail');


        getAllRequest.onsuccess = function (event) {
            const products = event.target.result;
            const existingProduct = products.find((product) =>
                product.productName.trim().toLowerCase() === productName.trim().toLowerCase() &&
                product.size === selectedSize && product.user === userEmail
            );

            const existingProducts = products.filter((product) =>
                product.productName.trim().toLowerCase() === productName.trim().toLowerCase() &&
                product.size !== selectedSize && product.user === userEmail
            );

            existingProducts.forEach(existingProduct => {
                // Get the card's unique identifier for the existing product with different size
                const cardId = existingProduct.productName.toLowerCase().replace(/\s+/g, "_");

                const availableQtySpan = document.querySelector(`[data-card-id="${cardId}"] .available-qty`);

                // Decrement the available_qty for each product with different size
                existingProduct.available_qty = existingProduct.available_qty - 1;

                // Update the product in the IndexedDB
                const updateRequest = objectStore.put(existingProduct);
                updateRequest.onsuccess = function () {
                    console.log("Quantity decreased for existing product with all size:", existingProduct);
                    if (availableQtySpan) {
                        availableQtySpan.textContent = existingProduct.available_qty;
                    }
                };
                updateRequest.onerror = function (error) {
                    console.error("Error updating product quantity:", error);
                };
            });

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

                const sameProductDifferentSize = products.find((product) =>
                    product.productName.trim().toLowerCase() === productName.trim().toLowerCase() &&
                    product.user === userEmail
                );

                // If the product is not found, add a new entry to the table
                const productData = {
                    user:userEmail,
                    productName: productName,
                    category: category,
                    price: price,
                    quantity: 1, // Set initial quantity to 1
                    productImage:image,
                    size:selectedSize,
                    available_qty : sameProductDifferentSize ? sameProductDifferentSize.available_qty: 99, // Set initial quantity to 99
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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

