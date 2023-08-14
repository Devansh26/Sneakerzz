function sendMessage() {
    event.preventDefault();

    // Get form input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    console.log(name, email)

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  
    let isValid = true;
  
    if (!nameRegex.test(name)) {
      document.getElementById('name_error').textContent = 'Please enter a valid name.';
      isValid = false;
    } else {
      document.getElementById('name_error').textContent = '';
    }
  
    if (!emailRegex.test(email)) {
      document.getElementById('email_error').textContent = 'Please enter a valid email address.';
      isValid = false;
    } else {
      document.getElementById('email_error').textContent = '';
    }

    if (!phone.match(phoneRegex)) {
        document.getElementById('phone_error').textContent = 'Please enter a valid North American phone number: (XXX) XXX-XXXX.';
        isValid = false;
    } else {
        document.getElementById('phone_error').textContent = '';
    }

    if (message.trim() == '') {
        document.getElementById('message_error').textContent = 'Please enter a message we can respond to.';
        isValid = false;
    } else {
        document.getElementById('message_error').textContent = '';
    }


    if(isValid) {
        $('#messageModal').modal('show');
    }
}


// Attach an event listener to the "Okay!" button
document.getElementById('close').addEventListener('click', function () {
    // Close the modal
    $('#messageModal').modal('hide');

    window.location.href = 'contactus.html';
});
