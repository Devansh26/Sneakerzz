const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginBtn');

let originalPosition = 0;
usernameInput.addEventListener('input', validateInputs);
passwordInput.addEventListener('input', validateInputs);

document.addEventListener('mousemove', moveButton);


function validateInputs() {
    const usernameValue = usernameInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (usernameValue !== '' && passwordValue !== '') {
        loginButton.disabled = false;
        loginButton.classList.add('enabled');
        loginButton.style.left = '0';
        originalPosition = 0;
        document.removeEventListener('mousemove', moveButton);
    } else {
        loginButton.disabled = true;
        loginButton.classList.remove('enabled');
        document.addEventListener('mousemove', moveButton);
    }
}

function moveButton(event) {
    const cursorX = event.clientX;

    const buttonRect = loginButton.getBoundingClientRect();
    const buttonLeft = buttonRect.left;
    const buttonRight = buttonRect.right;

    const minDistance = 100;
    const distanceFromButton = Math.min(Math.abs(cursorX - buttonLeft), Math.abs(cursorX - buttonRight));

    if (distanceFromButton < minDistance) {
        const offsetX = cursorX < buttonLeft ? minDistance - distanceFromButton : -minDistance;
        loginButton.style.left = `${originalPosition + offsetX}px`;
    } else if (cursorX < buttonLeft && loginButton.disabled === false) {
        const offsetX = cursorX - buttonRight;
        loginButton.style.left = `${originalPosition + offsetX}px`;
    }
}

function login() {
    event.preventDefault();
    console.log("In Login");
    window.location.href = "./html/home.html"
}