export function findUser(email, password) {
  const users = JSON.parse(localStorage.getItem('users')) || [];

  return users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );
}