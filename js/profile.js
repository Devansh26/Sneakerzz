document.addEventListener('DOMContentLoaded', function () {
    const saveProfileButton = document.getElementById('saveProfileButton');
    const firstNameInput = document.querySelector('[placeholder="First Name"]');
    const lastNameInput = document.querySelector('[placeholder="Last Name"]');
    const email = document.querySelector('[placeholder="Enter email id"]');
    const password = document.querySelector('[placeholder="Enter password"]');
    const user = document.getElementById('user');

    // Open a connection to the IndexedDB database
    const request = indexedDB.open("Sneakerzz",1);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(['users'], 'readonly');
        const objectStore = transaction.objectStore('users');

        const userEmail = getCookie('userEmail');

        user.innerHTML = userEmail;

        const getRequest = objectStore.get(userEmail);

        getRequest.onsuccess = function (event) {
            const userData = event.target.result;

            if (userData) {
                // Pre-fill the input fields with the retrieved data
                firstNameInput.value = userData.firstName;
                lastNameInput.value = userData.lastName;
                email.value = userData.email;
                password.value= userData.password;
                // ... and so on for other input fields
            }
        };

        transaction.oncomplete = function () {
            db.close();
        };
    };

    saveProfileButton.addEventListener('click', function () {
        // Get input field values
        const updatedData = {
            email: email.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            password: password.value,
            // ... and so on for other fields
        };

        // Perform actions to update and save profile changes in the database
        updateProfile('user1', updatedData);
    });

    function updateProfile(key, data) {
        // Open a connection to the IndexedDB database
        const request = indexedDB.open('Sneakerzz', 1);

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction(['users'], 'readwrite');
            const objectStore = transaction.objectStore('users');

            const putRequest = objectStore.put(data);

            putRequest.onsuccess = function () {
                console.log('Profile data updated:', data);
                const toastEl = document.querySelector(".toast");
                const bootstrapToast = new bootstrap.Toast(toastEl);
                bootstrapToast.show();
            };

            transaction.oncomplete = function () {
                db.close();
            };
        };
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}
