import { findUser } from './storage.js';

const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', loginUser);
}

// Login
function loginUser(e) {
  e.preventDefault();

  // Select Data
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const message = document.getElementById('login-message');

  const user = findUser(email, password);

  // Validation
  if (user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'ideas.html'; // Redirect to ideas.html
  } else {
    message.innerText = 'Incorrect email or password';
    message.style.color = 'red';
  }
}
