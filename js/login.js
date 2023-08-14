// Open or create IndexedDB database
const dbName = "Sneakerzz";
const dbVersion = 2;
const userStore = "users";

let db;

const request = indexedDB.open(dbName, dbVersion);

request.onerror = (event) => {
    console.error("Error opening IndexedDB:", event.target.error);
};

request.onupgradeneeded = (event) => {
    db = event.target.result;
    const objectStore = db.createObjectStore(userStore, {keyPath: "email"});
};

request.onsuccess = (event) => {
    db = event.target.result;

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", validateLogin);
};


function validateLogin() {
    event.preventDefault();

    // Perform form validation and display errors
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    if (!emailRegex.test(email)) {
        document.getElementById('email_error').textContent = 'Please enter a valid email address.';
        isValid = false;
    } else {
        document.getElementById('email_error').textContent = '';
    }

    if (password === '') {
        document.getElementById('pwd_error').textContent = 'Please enter the password.';
        isValid = false;
    } else {
        document.getElementById('pwd_error').textContent = '';
    }

    if (isValid) {
        // Redirect to home page or perform any other action
        userCredentials = {
            email: email,
            password: password
        }
        handleLogin(userCredentials, event);
    }
}

function handleLogin(userCredentials, event) {
    event.preventDefault();

    // Check if the user exists and verify credentials
    const transaction = db.transaction([userStore], "readonly");
    const objectStore = transaction.objectStore(userStore);
    const request = objectStore.get(userCredentials.email);

    request.onsuccess = (event) => {
        const user = event.target.result;

        if (user && userCredentials.password === user.password) {
            const sessionToken = generateSessionToken();
            setSessionCookie(sessionToken,userCredentials.email);
            window.location.href = "./home.html"
        } else {
            document.getElementById("login_error").textContent = "Invalid Credentials! Try again.";
        }
    };
}

// Generate a random session token
function generateSessionToken() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const tokenLength = 32;
    let token = "";

    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }

    return token;
}

// Save the session token in IndexedDB
function setSessionCookie(sessionToken,userEmail) {
    const expirationDate = new Date();
    // Set the cookie to expire in, for example, 7 days
    expirationDate.setDate(expirationDate.getDate() + 7);

    document.cookie = `sessionToken=${sessionToken}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = `userEmail=${userEmail}; expires=${expirationDate.toUTCString()}; path=/`;
}

