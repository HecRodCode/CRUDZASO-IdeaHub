const abrirModalBtn = document.getElementById('crearIdea');
abrirModalBtn.addEventListener('click',() => {
    modalOverlay.classList.add('active')

 });
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
    idea.className = 'nueva-card'

    idea.innerHTML = `
        <button class="btn-eliminar" onclick="eliminarCard(this)">×</button>
        <h4 id="autor-card">${autor.value}</h4>
        <p id="hasgtag-card"><strong>Email:</strong> ${hashtag.value}</p>
        <p id="text-card"><strong>Desc:</strong> ${text.value}</p>
    `;
    contenedorIdeas.append(idea)
}