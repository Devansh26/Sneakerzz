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
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

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
    // Redirect to login page or perform any other action
    window.location.href = 'login.html';
  }
}

function validateLogin() {
  event.preventDefault();

    // Perform form validation and display errors
  const email = document.getElementById('email').value;
  const password = document.getElementById('pwd').value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  let isValid = true;

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
    // Redirect to home page or perform any other action
    window.location.href = 'home.html';
  }
}



