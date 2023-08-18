document.addEventListener('DOMContentLoaded', function() {

    // Attach the event listener to a parent element (navbarContainer)
    const navbarContainer = document.getElementById('navbarContainer');
    navbarContainer.addEventListener('click', function(event) {
        if (event.target && event.target.id === 'logoutLink') {
            event.preventDefault(); // Prevent the default link behavior
            deleteSessionCookie();
        }
    });


});

window.addEventListener('load', function () {
    //const sessionToken = checkSessionCookie();
    const username = document.getElementById("username");

    // User is authenticated, perform necessary actions
    //console.log("User is authenticated");
    const userEmail = getCookie('userEmail');

    //console.log(username);
    if (username && getCookie('userEmail')) {
        const request = indexedDB.open("Sneakerzz", 1);

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction(['users'], 'readonly');
            const objectStore = transaction.objectStore('users');

            //const userEmail = getCookie('userEmail');

            const getRequest = objectStore.get(userEmail);

            getRequest.onsuccess = function (event) {
                const userData = event.target.result;

                username.innerHTML = userData.firstName;
            };

            transaction.oncomplete = function () {
                db.close();
            };
        };
    }
});

window.addEventListener("DOMContentLoaded", function () {

    const navbarContainer = document.getElementById("navbarContainer");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "navbar.html", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            navbarContainer.innerHTML = xhr.responseText;

            // Get the current page URL
            const currentPage = window.location.href;

            // Get all the navbar links
            const navLinks = navbarContainer.getElementsByTagName("a");

            // Loop through the navbar links and set the active class to the corresponding link
            for (let i = 0; i < navLinks.length; i++) {
                if (navLinks[i].href === currentPage) {
                    navLinks[i].classList.add("active");
                }
            }
        }
    };
    xhr.send();
});

window.addEventListener("DOMContentLoaded", function () {
    const footerContainer = document.getElementById("footerContainer");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "footer.html", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            footerContainer.innerHTML = xhr.responseText;
        }
    };
    xhr.send();
});

function deleteSessionCookie() {
    console.log("Delete Session");
    // Delete sessionToken cookie
    document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Delete userEmail cookie
    document.cookie = 'userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href="../index.html";
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}
