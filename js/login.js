const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginBtn');

usernameInput.addEventListener('input', validateInputs);
passwordInput.addEventListener('input', validateInputs);

function validateInputs() {
    const usernameValue = usernameInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (usernameValue !== '' && passwordValue !== '') {
        loginButton.removeAttribute('disabled');
    } else {
        loginButton.setAttribute('disabled', 'disabled');
    }
}