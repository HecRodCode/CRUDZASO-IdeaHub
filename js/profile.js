import { email } from './auth.js';

const nameProfile =document.getElementById("nameProfile")
const emailProfile = document.getElementById("emailProfile")
const nameSignUp =document.getElementById("nameSignUp")
if (nameProfile) {
  nameProfile.textContent ="danna"
}
if(emailProfile){
    emailProfile.textContent= email
}



/*document.addEventListener("DOMContentLoaded", ()=>{
const textProfile=document.getElementById("textProfile")
const savedEmail = localStorage.getItem("email");
if (textProfile && savedEmail) {
  textProfile.innerHTML = `<p>${savedEmail}</p>`;
}
});*/