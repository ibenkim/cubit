# 📐 Cubit — AI-Powered Math Assistant

> An interactive, premium learning platform for AI-assisted mathematics, problem-solving, and practice customization.

---

### 📚 Project Documentation

Explore the planning, requirements, and development tracking files in the `docs` directory:

| Document | Description | Reference Link |
| :--- | :--- | :--- |
| 🗂️ **Docs README** | Index of documentation contents and directories. | [docs/README.md](file:///Users/Ben/Desktop/GitHub/cubit/docs/README.md) |
| 📋 **Task Tracker** | Active TODOs, in-progress items, and completed features. | [docs/tasks.md](file:///Users/Ben/Desktop/GitHub/cubit/docs/tasks.md) |
| 📈 **Progress Log** | Chronological logs of Figma design translations and feature implementations. | [docs/progress.md](file:///Users/Ben/Desktop/GitHub/cubit/docs/progress.md) |
| ⚙️ **Backend & AI Specs** | System requirements, database schemas, and AI prompt design specs. | [docs/backend-requirements.md](file:///Users/Ben/Desktop/GitHub/cubit/docs/backend-requirements.md) |

---

## 🌟 Product Overview

**Cubit** is designed to streamline math learning for students by providing immediate, context-aware AI support and tools to build and organize structured homework practice. It bridges modern UI components with next-generation tutoring workflows:

*   🔐 **Authentication & Session Flow** — A robust client-side validation portal ([login.html](file:///Users/Ben/Desktop/GitHub/cubit/login.html)) validating credentials, storing sessions in `sessionStorage`, and providing dynamic profile/logout submenus.
*   📥 **Get Math Help Dashboard** — Home interface ([index.html](file:///Users/Ben/Desktop/GitHub/cubit/index.html)) with drag-and-drop workspace uploading (supporting JPEG, PNG, PDF) and manual problem formulation.
*   💡 **AI Grader & Hint Generator** — Quick access points for detailed corrections ("Correct my work") and localized, step-by-step assistance ("Give me a hint").
*   🛠️ **Custom Practice Generation** — A multi-step practice setup utility ([practice.html](file:///Users/Ben/Desktop/GitHub/cubit/practice.html)) allowing teachers or students to customize difficulty, input text instructions, assign focused tags, and select/attach materials.
*   📁 **Student Work Workspace** — A file/folder management dashboard ([my-work.html](file:///Users/Ben/Desktop/GitHub/cubit/my-work.html)) supporting nested navigation, folder creation, drag/move dialogs, search, and custom card actions.

---

## 🚀 Getting Started

Since Cubit is currently a rich client-side static application, you can start the UI directly in your browser.

### 1. Run a Local Development Server
To ensure dynamic modules, local session storage, and assets load seamlessly without CORS restrictions, run a lightweight HTTP server from the root of the repository:

```bash
# Option A: Using Python 3
python3 -m http.server 8000

# Option B: Using Node (npx)
npx serve -l 8000
```

### 2. Login to the Dashboard
Once the server is running, navigate to `http://localhost:8000/login.html` and use the default administrator credentials:

*   **Username**: `admin`
*   **Password**: `jota`

---

## 📂 Project Structure

A high-level map of the codebase layout and directory references:

```text
cubit/
├── docs/                             # Planning and requirements tracking
│   ├── README.md                     # Documentation index
│   ├── backend-requirements.md       # DB and AI integration requirements
│   ├── progress.md                   # Log of development history
│   └── tasks.md                      # Active developer tasks checklist
├── static/                           # Client-side static resources
│   ├── css/
│   │   └── styles.css                # Global design system variables & core layouts
│   └── js/
│       └── main.js                   # Navigation state, interactive chips & upload handlers
├── index.html                        # Homework dashboard / Main helper area
├── login.html                        # Authentication gate
├── my-work.html                      # Workspace manager / Folder directories
└── practice.html                     # Custom exercise generation panel
```

---

## 🛠️ Technology Stack

*   **Frontend Layout**: Semantic HTML5 markup, responsive grid structures, and accessibility-compliant landmarks.
*   **Design & Styling**: Custom [styles.css](file:///Users/Ben/Desktop/GitHub/cubit/static/css/styles.css) using modern CSS variables, fluid responsive layouts, micro-interactions, smooth focus outlines, and interactive dialog animations.
*   **Fonts**: Display titles styled in *Plus Jakarta Sans*; body and UI controls rendered in *Nunito Sans*.
*   **Logic & Operations**: Vanilla ES6 JS in [main.js](file:///Users/Ben/Desktop/GitHub/cubit/static/js/main.js) handling dynamic list management, DOM transitions, file attachment previews, inline title adjustments, and auth state synchronization.
