export function renderIdeaCard(idea, currentUser) {
    const isAuthor = idea.authorId === currentUser.id;
    const isAdmin = currentUser.role === 'admin';

    const canManage = isAuthor || isAdmin;

    return `
        <div class="card">
            <h3>${idea.title}</h3>
            ${canManage ? '<button>Eliminar</button>' : ''}
        </div>
    `;
}