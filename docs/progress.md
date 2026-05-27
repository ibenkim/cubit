# Progress Log

Track meaningful milestones and updates over time.

## 2026-05-27 (auth + my work)

- Implemented **login / logout flow** with temporary credentials (`admin` / `jota`):
  - `login.html` form now validates against hardcoded credentials. On success it
    writes a `cubit_user` session to `sessionStorage` and redirects to `index.html`.
    On failure it shows an inline error banner and highlights both fields.
  - `initSidebarAuth()` runs on every page. When logged out it renders a "Sign in"
    link in the sidebar that navigates to `login.html`. When logged in it renders the
    user avatar + name as a clickable button; clicking opens an upward dropdown with
    **Log out** (clears session → `login.html`) and **Account** (stub).
  - Logout clears `sessionStorage` and redirects to the login page.
- Built the **My Work** page (`my-work.html`) from Figma nodes `21:93`, `84:1190`,
  `84:1337`, `84:1336`:
  - Search bar, **Select** and **New Folder** toolbar buttons, and a breadcrumb
    showing the current folder path.
  - Horizontally scrollable row of **folder cards** (icon, name, item count, ⋮ menu).
  - 3-column responsive **conversation card grid** (thumbnail, title, timestamp,
    tag chip, ⋮ menu).
  - **⋮ context menu** (Generate practice / Move / Delete) anchored near each button.
  - **Right-click context menu** on any card adds "Create new folder" to the list.
  - **Move dialog** — radio-style folder grid, Create folder (prompt) and Move file
    actions; backdrop click dismisses.

## 2026-05-27 (later)

- Wired up the first to-do on the **Practice** page:
  - "Add topic" and "Add focus" now open an inline input; pressing Enter
    inserts a new active chip before the Add button. Escape / empty blur
    cancels.
  - "Upload file(s)" is now a real `<label>` for a hidden multi-file input;
    selected files are appended as `.attachment` rows (avatar, name, type,
    remove `×`). Removal is delegated so dynamically-added rows work too.
- Built the **Sign in** (`login.html`) page from Figma node `28:2069`:
  - Standalone `.auth-body` shell (top-left `cubit` logo, centered `auth-card`).
  - Username + Password fields with focus + error states.
  - "Forgot password?" helper link, "or" divider, "Continue with Google"
    button, "Sign up today" meta, centered "Log in" pill CTA.
  - Client-side validation in `main.js` (empty-field check; focus the first
    invalid field). Submission is intentionally stubbed pending the backend.
- Added [docs/backend-requirements.md](backend-requirements.md) listing every
  built element that will need database or AI work, plus a starter data-model
  sketch.

## 2026-05-27

- Built the **Practice** page from Figma node `24:173`.
  - Created `practice.html` with the shared sidebar (Practice marked active)
    plus a top-right and bottom "Generate Practice" CTA.
  - The page card uses five collapsible `<details>` sections: Choose topics,
    Use past work, Choose focus, Practice settings, Extra notes.
  - Extended `static/css/styles.css` with reusable components: `.section`
    (avatar + title + subtitle + chevron), `.section-divider`, `.chip` /
    `.chip--active` / `.chip--add`, `.action-pill`, `.attachment` grid,
    `.setting-card` + `.segment` group, `.textarea-block`, and `.btn-pill`.
  - Extended `static/js/main.js` with chip toggling, segment-group radio
    behaviour, and attachment removal.
  - Updated `index.html` sidebar so Home/Practice links navigate between the
    two pages.

- Built the **home / Get math help** page from Figma node `82:580` in the
  `Cubit` file.
  - Created `index.html` with semantic structure: sidebar (logo, nav, recents,
    user profile) and main content (page title, upload card, recent work grid).
  - Created `static/css/styles.css` with the design token palette
    (`--color-white`, `--color-surface-muted` `#f5f5f5`, `--color-border`
    `#d9d9d9`, `--color-muted` `#a9a9a9`, `--color-text` `#000000`), typography
    (Plus Jakarta Sans for display, Nunito Sans for body), and responsive
    layout.
  - Created `static/js/main.js` for the Upload-file / Type-manually tab switch
    and drag-and-drop file selection on the dropzone.

## 2026-05-15

- Created initial `docs/` and `static/` folder scaffolding.
