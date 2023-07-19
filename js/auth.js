function insertUser(user) {
  // open the CRM database with the version 1
  const request = indexedDB.open('Sneakerzz', 1);

  // create the Contacts object store and indexes
  request.onupgradeneeded = (event) => {
    let db = event.target.result;

    // create the Contacts object store 
    // with auto-increment id
    let store = db.createObjectStore('users', {
      keyPath: 'email',
    });

    // create an index on the email property
    let index = store.createIndex('email', 'email', {
      unique: true
    });
  };

  // handle the error event
  request.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
  };

  // handle the success event
  request.onsuccess = (event) => {
    const db = event.target.result;

    // create a new transaction
    const txn = db.transaction('users', 'readwrite');

    // get the Contacts object store
    const store = txn.objectStore('users');
    //
    let query = store.put(user);

    // handle success case
    query.onsuccess = function (event) {
      window.location.href = './login.html';
    };

    // handle the error case
    query.onerror = function (event) {
      console.log(event.target.errorCode);
    }

    // close the database once the 
    // transaction completes
    txn.oncomplete = function () {
      db.close();
    };
  };
}


function checkCredentials(credetials) {
  // open the CRM database with the version 1
  const request = indexedDB.open('Sneakerzz', 1);

  // create the Contacts object store and indexes
  request.onupgradeneeded = (event) => {
    let db = event.target.result;
  };

  // handle the error event
  request.onerror = (event) => {
    console.error(`Database error: ${event.target.errorCode}`);
  };

  // handle the success event
  request.onsuccess = (event) => {
    const db = event.target.result;

    const txn = db.transaction('users', 'readonly');
    const store = txn.objectStore('users');

    let query = store.get(credetials.email);

    console.log()

    query.onsuccess = (event) => {
      if (!event.target.result) {
        alert("Invalid Credentials! Please try again later.");
      } else {
        // console.table(event.target.result);
        alert("Welcome " + event.target.result.email + "!");
        window.location.href = './home.html';
      }
    };

    query.onerror = (event) => {
      console.log(event.target.errorCode);
    }

    txn.oncomplete = function () {
      db.close();
    };
  };
}




function validateForm() {

  event.preventDefault();

  // Perform form validation and display errors
  const firstName = document.getElementById('first_name').value;
  const lastName = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('pwd').value;
  const checkBox = document.getElementById('checkbox');

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


  if (!checkBox.checked) {
    document.getElementById("checkbox_error").textContent = 'You must accept the terms and conditions by checking the Checkbox';
    isValid = false;
  } else {
    document.getElementById("checkbox_error").textContent = '';
  }

  if (isValid) {

    let user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }
    console.log(isValid);
    insertUser(user);
  }
}

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

  if (isValid) {
    // Redirect to home page or perform any other action
    credentials = {
      email: email,
      password: password
    }
    checkCredentials(credentials);
  }
}



