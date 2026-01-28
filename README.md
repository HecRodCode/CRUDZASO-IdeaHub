# MemoStream

--

| Name             | GitHub                              |
| ---------------- | ----------------------------------- |
| Héctor           | https://github.com/HecRodCode       |
| Camilo Guengue   | https://github.com/CamiloGuengue    |
| Santiago Archila | https://github.com/ArchilaG         |
| Michelle Oyola   | https://github.com/Michelle22062005 |
| Juan Eduardo     | https://github.com/HeroLeni         |

--

## About The Project

MemoStream is a frontend-only social media application developed as part of the **[CRUDZASO](https://github.com/crudzaso)**. collaborative learning initiative. The platform allows users to share ideas, interact through likes and bookmarks, and discover content through smart filtering.
This project emphasizes core web development concepts including `DOM manipulation`, client-side state management, user authentication flow, and responsive design, all implemented with `vanilla JavaScript` without frameworks or backend services.

---

## ✨ Features

### Authentication System

- User registration with validation
- Secure login flow with error handling
- Session persistence using sessionStorage
- Protected routes with automatic redirects
- Logout functionality

### Idea Management (CRUD)

- Create ideas with text and hashtags
- Edit and delete your own ideas
- Author verification for permissions
- Real-time UI updates

### Social Interactions

- Like/unlike ideas with visual feedback
- Bookmark ideas for later viewing
- View liked ideas in dedicated tab
- Access bookmarked ideas through modal
- Persistent state across sessions

### Advanced Filtering

- Username Filter: Search ideas by author (real-time)
- Hashtag Filter: Multi-tag filtering with OR logic
- Visual tag chips with remove functionality
- Combined filtering support

---

## 🚀 Live Demo

🔗 https://hecrodcode.github.io/CRUDZASO-IdeaHub/

---

## ⚡ Installation

### Prerequisites

1. Modern web browser (Chrome, Firefox, Safari, Edge)
2. Git
3. Local server (optional)

### Setup

1. Clone the repository

```bash
clone https://github.com/your-username/MemoStream.git
```

2. Open with a local server

### Using VS Code Live Server:

- Install "Live Server" extension
- Right-click index.html → "Open with Live Server"

### Using Python:

```bash
python -m http.server 8000
```

Then open http://localhost:8000

3. Register a new account and start using the app

---

## 📁 Project Structure

```bash
MemoStream/
│
├── index.html                # Login page
├── ideas.html                # dashboard
├── profile.html              # User profile page
│
├── css/
│   ├── login.css            # Login styles
│   ├── ideas.css            # Feed styles
│   ├── profile.css          # Profile styles
│   └── styles.css           # Global styles
│
├── js/
│   ├── auth.js              # Authentication logic
│   ├── storage.js           # Storage helpers
│   ├── ideas.js             # Ideas CRUD & filters
│   ├── profile.js           # Profile functionality
│   └── ui.js                # UI utilities
│
├── assets/
│   └── image/
│       ├── logo.jpg
│       └── icons/
│
└── README.md
```

---

## 👥 Team Structure

This project was developed by the CRUDZASO team, with each member specializing in specific features.

| Member   | Role      | Branches                                 | Files Modified                                                                                            | Responsibilities                                                  |
| -------- | --------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Héctor   | Leader    | `feature/login`<br>`develop`             | `index.html`<br>`register.html`<br>`js/auth.js`<br>`js/storage.js`<br>`css/login.css`<br>`css/styles.css` | Login and registration flow<br>Session management<br>PRs & Merges |
| Camilo   | Developer | `feature/ideas-crud`                     | `ideas.html`<br>`js/ideas.js`<br>`js/storage.js`                                                          | CRUD operations<br>Author validation                              |
| Santiago | Developer | `feature/filters`                        | `ideas.html`<br>`js/ui.js`                                                                                | Username filter<br>Hashtag filter                                 |
| Michelle | Developer | `feature/profile`<br>`feature/ui-layout` | `profile.html`<br>`js/profile.js`<br>`js/ui.js`<br>`css/profile.css`<br>`css/styles.css`                  | User profile<br>DOM rendering<br>UI layout                        |
| Edwar    | Developer | `feature/session-guard`                  | `js/auth.js`<br>`js/ui.js`                                                                                | Route protection<br>Session redirects<br>Logout                   |

---

## 🧩 Technical Implementation

### Storage Architecture

#### Users (`localStorage`)

```bash
javascript{
  "users": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "password": "hashed"
    }
  ]
}
```

#### Ideas (`localStorage`)

```bash
javascript{
  "ideas": [
    {
      "id": "uuid",
      "author": "John Doe",
      "authorId": "uuid",
      "body": "Idea text...",
      "hashtags": ["#tech"],
      "likes": ["user-id"],
      "bookmarks": ["user-id"]
    }
  ]
}
```

#### Session (`sessionStorage`)

```bash
javascript{
  "currentUser": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Core Functionality

#### Authentication

- Email validation and duplicate prevention
- Password verification
- Session creation and management
- Automatic route protection

#### CRUD Operations

- Unique ID generation for each idea
- Owner verification (authorId === currentUser.id)
- Real-time DOM updates
- Data persistence in localStorage

#### Filtering System

- Real-time username search (case-insensitive)
- Multi-hashtag filtering with OR logic
- Combined filter support
- Dynamic UI updates

---

## 👨‍💻 Technologies

- `HTML5`: Semantic markup
- `CSS3`: Flexbox, Grid, animations
- `Vanilla JavaScript`: ES6+ modules, DOM APIs
- `Storage API`s: localStorage, sessionStorage

---

## 🔑 Key Learnings

### Technical Skills:

- DOM manipulation and event delegation
- Client-side state management
- Authentication and session handling
- Data filtering and transformation
- Responsive design implementation

### Collaboration:

- Git workflow and branch management
- Code reviews and feature integration
- Task breakdown and coordination
- Clear documentation practices
