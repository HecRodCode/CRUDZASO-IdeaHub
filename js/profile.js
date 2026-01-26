const session = JSON.parse(sessionStorage.getItem('currentUser'));

if(!session){
  window.location.href = 'index.html';
}
//Info the user
const nameUser =document.getElementById("nameProfile")
if(nameUser){
nameUser.textContent = `Usuario: ${session.name}`
}
//info the email
const emailUser =document.getElementById("emailProfile")
if(emailUser){
emailUser.textContent = `Email: ${session.email}`
}
console.log(session)
