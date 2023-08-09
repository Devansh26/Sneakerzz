document.addEventListener('DOMContentLoaded', function () {
    const saveProfileButton = document.getElementById('saveProfileButton');
    const firstNameInput = document.querySelector('[placeholder="First Name"]');
    const lastNameInput = document.querySelector('[placeholder="Last Name"]');
    const mobileNumberInput = document.querySelector('[placeholder="Enter phone number"]');
    // ... and so on for other input fields

    // Open a connection to the IndexedDB database
    const request = indexedDB.open('Sneakerzz', 1);

    request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(['users'], 'readonly');
        const objectStore = transaction.objectStore('users');

        const getRequest = objectStore.get('ayush@gmail.com'); // Use the appropriate key to retrieve the user's data

        getRequest.onsuccess = function (event) {
            const userData = event.target.result;

            if (userData) {
                // Pre-fill the input fields with the retrieved data
                firstNameInput.value = userData.firstName;
                lastNameInput.value = userData.lastName;
                mobileNumberInput.value = userData.mobileNumber;
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
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            mobileNumber: mobileNumberInput.value,
            // ... and so on for other fields
        };

        // Perform actions to update and save profile changes in the database
        updateProfile('user1', updatedData);
    });

    function updateProfile(key, data) {
        // Open a connection to the IndexedDB database
        const request = window.indexedDB.open('Sneakerzz', 1);

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction(['users'], 'readwrite');
            const objectStore = transaction.objectStore('users');

            const putRequest = objectStore.put(data, key);

            putRequest.onsuccess = function () {
                console.log('Profile data updated:', data);
            };

            transaction.oncomplete = function () {
                db.close();
            };
        };
    }
});
