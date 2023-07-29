window.addEventListener("DOMContentLoaded", function () {
    var navbarContainer = document.getElementById("navbarContainer");
    var xhr = new XMLHttpRequest();
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
    var footerContainer = document.getElementById("footerContainer");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "footer.html", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            footerContainer.innerHTML = xhr.responseText;
        }
    };
    xhr.send();
});