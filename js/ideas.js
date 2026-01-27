/* === STORAGE === */
const IDEAS_KEY = 'ideas';

/* === AUTH GUARD === */
const storedUser = sessionStorage.getItem('currentUser');

if (!storedUser) {
  // No hay sesión → fuera
  window.location.href = './index.html'; // o login.html
  throw new Error('User not authenticated');
}

const currentUser = JSON.parse(storedUser);

// SHOW NAME USER
const greetingEl = document.getElementById('greeting');
if (greetingEl && currentUser) {
  greetingEl.textContent = `Hello, ${currentUser.name}`;
}

// ELEMENTS
const postsContainer = document.getElementById('posts-container');

const modal = document.getElementById('idea-modal');
const openModalBtn = document.getElementById('open-idea-modal');
const closeModalBtn = document.getElementById('close-idea-modal');
const cancelBtn = document.getElementById('cancel-idea');
const publishBtn = document.getElementById('publish-idea');

const bookmarksModal = document.getElementById('bookmarks-modal');
const bookmarksContainer = document.getElementById('bookmarks-container');
const closeBookmarksBtn = document.getElementById('close-bookmarks-modal');

const deleteModal = document.getElementById('delete-modal');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');
const closeDeleteModalBtn = document.getElementById('close-delete-modal');

const editModal = document.getElementById('edit-modal');
const closeEditModalBtn = document.getElementById('close-edit-modal');
const cancelEditBtn = document.getElementById('cancel-edit');
const saveEditBtn = document.getElementById('save-edit');
const editBodyTextarea = document.getElementById('edit-body');

const tabAll = document.getElementById('tab-all');
const tabLikes = document.getElementById('tab-likes');
const feedTabs = document.querySelectorAll('.feed-tab');

const favoritesBtn = document.getElementById('open-favorites');
const bookmarksBtn = document.getElementById('open-bookmarks');

let ideaToDelete = null;
let ideaToEdit = null;

// HELPERS
function getIdeas() {
  const ideas = JSON.parse(localStorage.getItem(IDEAS_KEY)) || [];
  // Migrar ideas antiguas sin authorId
  return ideas.map((idea) => {
    if (!idea.authorId && idea.author === currentUser.name) {
      return { ...idea, authorId: currentUser.id };
    }
    return idea;
  });
}

function saveIdeas(ideas) {
  localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
}

function getActiveTab() {
  return document.querySelector('.feed-tab.active')?.dataset.view || 'all';
}

// MODAL HANDLERS
openModalBtn?.addEventListener('click', () => {
  modal?.classList.remove('hidden');
});

function closeModal() {
  modal?.classList.add('hidden');
}

closeModalBtn?.addEventListener('click', closeModal);
cancelBtn?.addEventListener('click', closeModal);

modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

bookmarksModal?.addEventListener('click', (e) => {
  if (e.target === bookmarksModal) {
    bookmarksModal.classList.add('hidden');
  }
});

deleteModal?.addEventListener('click', (e) => {
  if (e.target === deleteModal) closeDeleteModal();
});

editModal?.addEventListener('click', (e) => {
  if (e.target === editModal) closeEditModal();
});

/* === CREATE IDEA === */
publishBtn?.addEventListener('click', () => {
  const body = document.getElementById('idea-body').value.trim();
  const hashtagsRaw = document.getElementById('idea-hashtags').value;

  if (!body) {
    alert('Write something first');
    return;
  }

  const hashtags = hashtagsRaw
    .split(' ')
    .map((h) => h.trim())
    .filter(Boolean)
    .map((h) => (h.startsWith('#') ? h : `#${h}`));

  const ideas = getIdeas();

  ideas.unshift({
    id: crypto.randomUUID(),
    author: currentUser.name,
    authorId: currentUser.id,
    body,
    hashtags,
    likes: [],
    bookmarks: [],
    createdAt: new Date().toISOString(),
  });

  saveIdeas(ideas);
  closeModal();

  document.getElementById('idea-body').value = '';
  document.getElementById('idea-hashtags').value = '';

  renderIdeas(getActiveTab());
});

/* === RENDER IDEAS === */
function renderIdeas(view = 'all') {
  const ideas = getIdeas();
  postsContainer.innerHTML = '';

  let filtered = ideas;

  if (view === 'likes') {
    filtered = ideas.filter((idea) => {
      return idea.likes && idea.likes.includes(currentUser.id);
    });
  }

  if (filtered.length === 0) {
    postsContainer.innerHTML = "<p style='opacity:.6'>No ideas yet</p>";
    return;
  }

  filtered.forEach((idea) => {
    const article = document.createElement('article');
    article.className = 'post';

    if (!idea.likes) idea.likes = [];
    if (!idea.bookmarks) idea.bookmarks = [];

    const hasLiked = idea.likes.includes(currentUser.id);
    const hasBookmarked = idea.bookmarks.includes(currentUser.id);
    const isOwner = idea.authorId && idea.authorId === currentUser.id;

    // === POSTS ===
    article.innerHTML = `
      <div class="post-header">
        <small>${idea.author || 'Anonymous'}</small>
        ${
          isOwner
            ? `
          <div class="post-actions">
            <button class="edit-btn" title="Edit idea">
              <svg class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button class="delete-btn" title="Delete idea">
              <svg class="icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        `
            : ''
        }
      </div>
      
      <p>${idea.body || ''}</p>

      <div class="post-tags">
        ${(idea.hashtags || []).map((t) => `<span>${t}</span>`).join('')}
      </div>

      <div class="post-footer">
        <button class="like-btn ${hasLiked ? 'active' : ''}">
          <svg class="icon like-icon" viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 5.42 4.42 3 7.5 3
                9.24 3 10.91 3.81 12 5.08
                13.09 3.81 14.76 3 16.5 3
                19.58 3 22 5.42 22 8.5
                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
          </svg>
          <span>${idea.likes.length}</span>
        </button>

        <button class="bookmark-btn ${hasBookmarked ? 'active' : ''}">
          <svg class="icon bookmark-icon" viewBox="0 0 24 24">
            <path
              d="M6 2c-1.1 0-2 .9-2 2v18l8-5.5
                8 5.5V4c0-1.1-.9-2-2-2H6z"
              />
          </svg>
        </button>
      </div>
    `;

    const likeBtn = article.querySelector('.like-btn');
    const bookmarkBtn = article.querySelector('.bookmark-btn');

    if (likeBtn) {
      likeBtn.onclick = (e) => {
        e.stopPropagation();
        toggleLike(idea.id);
      };
    }

    if (bookmarkBtn) {
      bookmarkBtn.onclick = (e) => {
        e.stopPropagation();
        toggleBookmark(idea.id);
      };
    }

    if (isOwner) {
      const deleteBtn = article.querySelector('.delete-btn');
      const editBtn = article.querySelector('.edit-btn');

      if (deleteBtn) {
        deleteBtn.onclick = (e) => {
          e.stopPropagation();
          openDeleteModal(idea.id);
        };
      }

      if (editBtn) {
        editBtn.onclick = (e) => {
          e.stopPropagation();
          openEditModal(idea.id);
        };
      }
    }

    postsContainer.appendChild(article);
  });
}

/* === DELETE MODAL === */
function openDeleteModal(id) {
  ideaToDelete = id;
  deleteModal?.classList.remove('hidden');
}

function closeDeleteModal() {
  deleteModal?.classList.add('hidden');
  ideaToDelete = null;
}

closeDeleteModalBtn?.addEventListener('click', closeDeleteModal);
cancelDeleteBtn?.addEventListener('click', closeDeleteModal);

confirmDeleteBtn?.addEventListener('click', () => {
  if (!ideaToDelete) return;

  const ideas = getIdeas();
  const filteredIdeas = ideas.filter((idea) => idea.id !== ideaToDelete);

  saveIdeas(filteredIdeas);
  closeDeleteModal();
  renderIdeas(getActiveTab());
});

/* === EDIT MODAL === */
function openEditModal(id) {
  const ideas = getIdeas();
  const idea = ideas.find((i) => i.id === id);

  if (!idea) return;

  ideaToEdit = id;
  if (editBodyTextarea) {
    editBodyTextarea.value = idea.body || '';
  }
  editModal?.classList.remove('hidden');
}

function closeEditModal() {
  editModal?.classList.add('hidden');
  ideaToEdit = null;
  if (editBodyTextarea) {
    editBodyTextarea.value = '';
  }
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
