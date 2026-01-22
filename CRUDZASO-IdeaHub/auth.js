export function checkAuth () {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const isLoginPage = window.location.pathname.includes('login.html')


if (!user && !isLoginPage) {
    window.location.href = 'login.html';
}
else if (user && isLoginPage) {
    window.location.href
}
}

export function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';

}