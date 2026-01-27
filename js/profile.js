const session = JSON.parse(sessionStorage.getItem('currentUser'));

if(!session){
  window.location.href = 'index.html';
}
//Info the user
const nameUser =document.getElementById("nameProfile")
if(nameUser){
nameUser.textContent = session.name
}
//info the email
const emailUser =document.getElementById("emailProfile")
if(emailUser){
emailUser.textContent = session.email
}
console.log(session)

//IDEAS 
const ideasCard =JSON.parse(localStorage.getItem('ideas'));
if(!ideasCard.length ===0){
  window.location.href="ideas.html"
}
//total de ideas
const contIdeas = document.getElementById("totalIdeas")
contIdeas.textContent= `Total de ideas: ${ideasCard.length}`


//lista de ideas
const listIdeas = document.getElementById("listIdeas");
ideasCard.forEach(idea => {
  const list =document.createElement('li');
  list.textContent =`${idea.author} - #${idea.hashtags}: ${idea.body}`;
  list.style.listStyle="none"
  listIdeas.append(list);
});
