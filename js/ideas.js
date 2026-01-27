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

const currentUser = JSON.parse(storedUser);

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

closeEditModalBtn?.addEventListener('click', closeEditModal);
cancelEditBtn?.addEventListener('click', closeEditModal);

saveEditBtn?.addEventListener('click', () => {
  if (!ideaToEdit) return;

  const newBody = editBodyTextarea?.value.trim();

  if (!newBody) {
    alert('The idea cannot be empty');
    return;
  }

  const ideas = getIdeas();
  const idea = ideas.find((i) => i.id === ideaToEdit);

  if (idea) {
    idea.body = newBody;
    saveIdeas(ideas);
  }

  closeEditModal();
  renderIdeas(getActiveTab());
});

/* === LIKE / BOOKMARK === */
function toggleLike(id) {
  const ideas = getIdeas();
  const idea = ideas.find((i) => i.id === id);
  if (!idea) return;

  if (!idea.likes) idea.likes = [];

  const uid = currentUser.id;
  const index = idea.likes.indexOf(uid);

  if (index > -1) {
    idea.likes.splice(index, 1);
  } else {
    idea.likes.push(uid);
  }

  saveIdeas(ideas);
  renderIdeas(getActiveTab());
}

function toggleBookmark(id) {
  const ideas = getIdeas();
  const idea = ideas.find((i) => i.id === id);
  if (!idea) return;

  if (!idea.bookmarks) idea.bookmarks = [];

  const uid = currentUser.id;
  const index = idea.bookmarks.indexOf(uid);

  if (index > -1) {
    idea.bookmarks.splice(index, 1);
  } else {
    idea.bookmarks.push(uid);
  }

  saveIdeas(ideas);
  renderIdeas(getActiveTab());
}

/* === FEED TABS === */
feedTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    feedTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    renderIdeas(tab.dataset.view);
  });
});

/* === FAVORITES BUTTON === */
favoritesBtn?.addEventListener('click', () => {
  feedTabs.forEach((t) => t.classList.remove('active'));
  tabLikes?.classList.add('active');
  renderIdeas('likes');
});

/* === BOOKMARKS MODAL === */
bookmarksBtn?.addEventListener('click', () => {
  const ideas = getIdeas().filter((i) => {
    return i.bookmarks && i.bookmarks.includes(currentUser.id);
  });

  if (!bookmarksContainer) return;

  bookmarksContainer.innerHTML = '';

  if (ideas.length === 0) {
    bookmarksContainer.innerHTML = '<p>No bookmarks yet</p>';
  } else {
    ideas.forEach((idea) => {
      const post = document.createElement('article');
      post.className = 'post';
      post.innerHTML = `
        <small>${idea.author || 'Anonymous'}</small>
        <p>${idea.body || ''}</p>
        <div class="post-tags">
          ${(idea.hashtags || []).map((t) => `<span>${t}</span>`).join('')}
        </div>
      `;
      bookmarksContainer.appendChild(post);
    });
  }

  bookmarksModal?.classList.remove('hidden');
});

closeBookmarksBtn?.addEventListener('click', () => {
  bookmarksModal?.classList.add('hidden');
});

/* === INIT === */
renderIdeas('all');
