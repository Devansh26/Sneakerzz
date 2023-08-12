/* Set rates + misc */
const taxRate = 0.05;
const shippingRate = 15.0;
const fadeTime = 300;

/* Load the products */
document.addEventListener("DOMContentLoaded", function () {

    const sessionToken = checkSessionCookie();

    if (sessionToken) {
        // User is authenticated, perform necessary actions
        console.log("User is authenticated");
    } else {
        // User is not authenticated, handle accordingly
        console.log("User is not authenticated");
        window.location.href="../html/login.html";
    }


    // Open the indexedDB
    const request = indexedDB.open("Sneakerzz",2);

    let initialTotal = 0;
    let initialSubtotal = 0;

    // Handle database open success
    request.onsuccess = function (event) {
        console.log("IndexedDB opened successfully.");
        const db = event.target.result;
        // Get the products object store
        const transaction = db.transaction(["products"], "readonly");
        const objectStore = transaction.objectStore("products");

        // Open a cursor to fetch all products
        const productsCursor = objectStore.openCursor();
        productsCursor.onsuccess = function (event) {
            //console.log("Product found:", cursor.value);
            const cursor = event.target.result;

            if (cursor) {
                console.log("Product found:", cursor.value);

                // Create the product HTML elements
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                const productImageDiv = document.createElement("div");
                productImageDiv.classList.add("product-image");
                const productImage = document.createElement("img");
                productImage.src = cursor.value.productImage; // Replace with the actual image URL from the indexedDB
                productImageDiv.appendChild(productImage);

                const productDetailsDiv = document.createElement("div");
                productDetailsDiv.classList.add("product-details");
                const productTitle = document.createElement("div");
                productTitle.classList.add("product-title");
                productTitle.textContent = cursor.value.productName; // Replace with the actual product name from the indexedDB
                const productDescription = document.createElement("p");
                productDescription.classList.add("product-description");
                productDescription.textContent = "Dummy description"; // Replace with the actual description from the indexedDB
                productDetailsDiv.appendChild(productTitle);
                productDetailsDiv.appendChild(productDescription);

                const productPriceDiv = document.createElement("div");
                productPriceDiv.classList.add("product-price");
                productPriceDiv.textContent = cursor.value.price;

                const productQuantityDiv = document.createElement("div");
                productQuantityDiv.classList.add("product-quantity");
                const productQuantityInput = document.createElement("input");
                productQuantityInput.type = "number";
                productQuantityInput.value = cursor.value.quantity; // Replace with the actual quantity from the indexedDB
                productQuantityInput.min = "1";
                productQuantityDiv.appendChild(productQuantityInput);

                const productRemovalDiv = document.createElement("div");
                productRemovalDiv.classList.add("product-removal");
                const removeProductButton = document.createElement("button");
                removeProductButton.classList.add("remove-product");
                removeProductButton.textContent = "Remove";
                productRemovalDiv.appendChild(removeProductButton);

                const linePrice = parseInt(cursor.value.price) * cursor.value.quantity;
                initialSubtotal += linePrice;

                const productLinePriceDiv = document.createElement("div");
                productLinePriceDiv.classList.add("product-line-price");
                productLinePriceDiv.textContent = linePrice.toFixed(2);

                const subtotalElement = document.getElementById("cart-subtotal");
                subtotalElement.textContent = initialSubtotal.toFixed(2);
                // Calculate the initial "Grand Total" (subtotal + tax + shipping) and update the element
                const tax = initialSubtotal * taxRate;
                const shipping = initialSubtotal > 0 ? shippingRate : 0;
                initialTotal = initialSubtotal + tax + shipping;

                const grandTotalElement = document.getElementById("cart-total");
                grandTotalElement.textContent = initialTotal.toFixed(2);

                // Append all elements to the product div
                productDiv.appendChild(productImageDiv);
                productDiv.appendChild(productDetailsDiv);
                productDiv.appendChild(productPriceDiv);
                productDiv.appendChild(productQuantityDiv);
                productDiv.appendChild(productRemovalDiv);
                productDiv.appendChild(productLinePriceDiv);

                // Append the product div to the shopping cart
                const shoppingCart = document.querySelector(".shopping-cart");
                shoppingCart.appendChild(productDiv);
                const columnLabels = shoppingCart.querySelector(".column-labels");
                shoppingCart.insertBefore(productDiv, columnLabels.nextSibling);
                // Move to the next product in the cursor
                cursor.continue();
            }
        };
    };
    request.onerror = function (event) {
        console.error("Error opening IndexedDB:", event.target.error);
    };

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

/* Assign actions */
// $('.product-quantity input').change( function() {
//     updateQuantity(this);
// });

$(document).on('change', '.product-quantity input', function() {
    updateQuantity(this);
});

$(document).on("click", ".product-removal button", function () {
    removeItem(this);
});


// $(".product-removal button").click(function () {
//     removeItem(this);
// });

/* Recalculate cart */
function recalculateCart() {
    let subtotal = 0;

    /* Sum up row totals */
    $(".product").each(function () {
        subtotal += parseFloat($(this).children(".product-line-price").text());
    });

    /* Calculate totals */
    const tax = subtotal * taxRate;
    const shipping = subtotal > 0 ? shippingRate : 0;
    const total = subtotal + tax + shipping;

    /* Update totals display */
    $(".totals-value").fadeOut(fadeTime, function () {
        $("#cart-subtotal").html(subtotal.toFixed(2));
        $("#cart-tax").html(tax.toFixed(2));
        $("#cart-shipping").html(shipping.toFixed(2));
        $("#cart-total").html(total.toFixed(2));
        if (total === 0) {
            $(".checkout").fadeOut(fadeTime);
        } else {
            $(".checkout").fadeIn(fadeTime);
        }
        $(".totals-value").fadeIn(fadeTime);
    });
}

/* Update quantity */
function updateQuantity(quantityInput) {
    /* Calculate line price */
    const productRow = $(quantityInput).parent().parent();
    const price = parseFloat(productRow.children(".product-price").text());
    const quantity = $(quantityInput).val();
    const linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children(".product-line-price").each(function () {
        $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}

/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    const productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
    });
}
