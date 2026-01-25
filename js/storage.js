// Save a user in localStorage
export function saveUser(user) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

// Get all users
export function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

// Save current user in sessionStorage
export function setCurrentUser(user) {
  sessionStorage.setItem('currentUser', JSON.stringify(user));
}

// Get current user
export function getCurrentUser() {
  return JSON.parse(sessionStorage.getItem('currentUser'));
}

// Find user in localStorage
export function findUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  return users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
}
