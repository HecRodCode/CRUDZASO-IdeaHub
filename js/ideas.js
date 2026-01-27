let ideas =JSON.parse(localStorage.getItem('ideas')) || [];
 let contadorIdeas=ideas.length;

function guardarIdeasStorage() {
  localStorage.setItem('ideas', JSON.stringify(ideas));
}
document.addEventListener('DOMContentLoaded', () => {
  ideas.forEach((idea, index) => pintarIdea(idea, index));
  actualizarContador();
});


const abrirModalBtn = document.getElementById('crearIdea');
const overlay = document.getElementById('modalOverlay');

abrirModalBtn.addEventListener('click',() => {
    modalOverlay.classList.add('active')

 });

function cerrarModal() {
  const overlay = document.getElementById('modalOverlay');
  overlay.classList.remove('active');
}


 function pintarIdea(ideaData, index) {
  const contenedorIdeas = document.getElementById('containerIdeas');

  const idea = document.createElement('div');
  idea.className = 'nueva-idea';
  idea.dataset.index = index;

  idea.innerHTML = `
    <button class="btn-eliminar" onclick="eliminarIdea(this)">×</button>
    <h4 class="autor-card">${ideaData.autor}</h4>
    <p class="hashtag-card"><strong>#:</strong> ${ideaData.hashtag}</p>
    <p class="text-card">${ideaData.texto}</p>
  `;

  contenedorIdeas.append(idea);
}

function btnGuardarIdea() {
  const autor = document.getElementById('categoria1');
  const hashtag = document.getElementById('categoria2');
  const text = document.getElementById('idea');

  const nuevaIdea = {
    autor: autor.value,
    hashtag: hashtag.value,
    texto: text.value
  };

  ideas.push(nuevaIdea);
  guardarIdeasStorage();
  document.getElementById("containerIdeas").innerHTML="";
  ideas.forEach((idea, i) => pintarIdea(idea, i));

  contadorIdeas = ideas.length;
  actualizarContador();

  cerrarModal();
}


function eliminarIdea(btn) {
  const ideaDiv = btn.closest('.nueva-idea');
  const index = ideaDiv.dataset.index;

  ideas.splice(index, 1);
  guardarIdeasStorage();

  ideaDiv.remove();

  // Volver a renderizar para actualizar índices
  document.getElementById('containerIdeas').innerHTML = '';
  ideas.forEach((idea, i) => pintarIdea(idea, i));

  contadorIdeas = ideas.length;
  actualizarContador();
}


//PENDIENTE EN HACER LA LISTA DE IDEAS
/*    function listasIdeas(){
        const text = document.getElementById('idea');
        const list =document.createElement('li');
        const listIdeas=document.getElementById("listIdeas")
        list.textContent =`Listas: ${text.value}`;

        listIdeas.append(list);
    }
   */     

 function actualizarContador() {
  document.getElementById("totalIdeas").textContent =
    `Ideas totales: ${contadorIdeas}`;
}


