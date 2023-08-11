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
    window.location.href="../html/login.html";
}
