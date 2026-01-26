const abrirModalBtn = document.getElementById('crearIdea');
abrirModalBtn.addEventListener('click',() => {
    modalOverlay.classList.add('active')

 });
 let contadorIdeas=0;
function cerrarModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('active');
}


  function btnGuardarIdea(){
    const autor = document.getElementById('categoria1');
    const hashtag = document.getElementById('categoria2');
    const text = document.getElementById('idea');
    console.log(autor.value)
    console.log(hashtag.value)
    console.log(text.value)



     const contenedorIdeas = document.getElementById('containerIdeas');

 const idea = document.createElement('div');
    idea.className = 'nueva-idea'

    idea.innerHTML = `
        <button class="btn-eliminar" onclick="eliminarIdea(this)">×</button>
        <h4 id="autor-card">${autor.value}</h4>
        <p id="hashtag-card"><strong>#:</strong> ${hashtag.value}</p>
        <p id="text-card"> ${text.value}</p>
    `;
    contenedorIdeas.append(idea)
    contadorIdeas++;
    actualizarContador();
}

function eliminarIdea(btn){
    const idea = btn.closest('.nueva-idea');
    
    if (!idea) return console.error('No idea encontrada');
    
    const autor = idea.querySelector('#autor-card').textContent;
    idea.remove()
    contadorIdeas--;
    actualizarContador();

}

function actualizarContador(){
    document.getElementById("totalIdeas").textContent =`Ideas totales: ${contadorIdeas}`;

}
//PENDIENTE EN HACER LA LISTA DE IDEAS
function listasIdeas(){
    const text = document.getElementById('idea');
    const list =document.createElement('li');
    const listIdeas=document.getElementById("listIdeas")
    list.textContent =`Listas: ${text.value}`;

    listIdeas.append(list);
}
    



