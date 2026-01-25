import * as Storage from './storage.js';

// Login
const registerForm = document.getElementById('signup-form');

if (registerForm) {
  registerForm.addEventListener('submit', registerUser);
}

function registerUser(e) {
  e.preventDefault();

  // Select Data
  const userName = document.getElementById('nameUser').value.trim();
  const email = document.getElementById('email-sign').value.trim();
  const password = document.getElementById('password-sign').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const message = document.getElementById('signUp-message');

  message.innerText = '';
  message.style.color = '';

  // Validation password
  if (password !== confirmPassword) {
    message.innerText = 'Passwords do not match';
    message.style.color = 'red';
    return;
  }

  const users = Storage.getUsers();

  // Validation user exists
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    message.innerText = 'The user already exists';
    message.style.color = 'red';
    return;
  }

  // Hashtags
  const defaultHashtags = [
    'programacion',
    'salud',
    'videojuegos',
    'series_o_peliculas',
    'ideas_creativas',
  ];

  // New User
  const newUser = {
    id: crypto.randomUUID(),
    name: userName,
    email,
    password,
    hashtags: [...defaultHashtags],
  };

  Storage.saveUser(newUser);
  Storage.setCurrentUser(newUser);

  message.innerText = 'Account created successfully!';
  message.style.color = '#10b981';

  setTimeout(() => {
    window.location.href = 'ideas.html'; // Redirect to ideas.html
  }, 1000);
}

// Login
const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', loginUser);
}

// Login
export function loginUser(e) {
  e.preventDefault();

  // Select Data
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const message = document.getElementById('login-message');

  const user = Storage.findUser(email, password);

  // Validation
  if (user) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'ideas.html'; // Redirect to ideas.html
  } else {
    message.innerText = 'Incorrect email or password';
    message.style.color = 'red';
  }
}
