// Open or create IndexedDB database
const dbName = "Sneakerzz";
const dbVersion = 2;
const userStore = "users";

let db;

const request = indexedDB.open(dbName,dbVersion);

request.onerror = (event) => {
  console.error("Error opening IndexedDB:", event.target.error);
};

request.onupgradeneeded = (event) => {
  db = event.target.result;
  const objectStore = db.createObjectStore(userStore, { keyPath: "email" });
};

request.onsuccess = (event) => {
  db = event.target.result;

  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", validateForm);
};


function validateForm() {

  event.preventDefault();

  // Perform form validation and display errors
  const firstName = document.getElementById('first_name').value;
  const lastName = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('pwd').value;
  // const checkBox = document.getElementById('checkbox');

  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  let isValid = true;

  if (!nameRegex.test(firstName)) {
    document.getElementById('first_name_error').textContent = 'Please enter a valid first name.';
    isValid = false;
  } else {
    document.getElementById('first_name_error').textContent = '';
  }

  if (!nameRegex.test(lastName)) {
    document.getElementById('last_name_error').textContent = 'Please enter a valid last name.';
    isValid = false;
  } else {
    document.getElementById('last_name_error').textContent = '';
  }

  if (!emailRegex.test(email)) {
    document.getElementById('email_error').textContent = 'Please enter a valid email address.';
    isValid = false;
  } else {
    document.getElementById('email_error').textContent = '';
  }

  if (!passwordRegex.test(password)) {
    document.getElementById('pwd_error').textContent = 'Password must be at least 8 characters long and contain at least one number, one lowercase letter, and one uppercase letter.';
    isValid = false;
  }
  else {
    document.getElementById('pwd_error').textContent = '';
  }

  if (isValid) {

    let user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }
    console.log(isValid);
    handleSignup(user, event);
  }
}


function handleSignup(user, event) {
  event.preventDefault();

  // Check if the user already exists
  const transaction = db.transaction([userStore], "readonly");
  const objectStore = transaction.objectStore(userStore);
  const request = objectStore.get(user.email);

  request.onsuccess = (event) => {
    const existingUser = event.target.result;

    if (existingUser) {
      document.getElementById("db_error").textContent = "User already exists!";
    } else {
      // Add the user to the database
      const addUserTransaction = db.transaction([userStore], "readwrite");
      const addUserObjectStore = addUserTransaction.objectStore(userStore);
      addUserObjectStore.add(user);

      addUserTransaction.oncomplete = () => {
        alert("Signup successful!");
        window.location.href = "login.html";
      };

      addUserTransaction.onerror = (event) => {
        console.error("Error adding user:", event.target.error);
      };
    }
  };
}
