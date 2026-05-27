# Tasks

Use this file to track current and upcoming work. See
[backend-requirements.md](backend-requirements.md) for the master list of
features that depend on the database or AI.

## To Do

- [ ] Replace placeholder circles with real icon assets (logo, nav, section avatars, chip icons, file-type icons, Google `G` icon)
- [ ] Wire "Generate Practice" CTAs to a real flow (state + backend stub) — see [backend-requirements.md](backend-requirements.md)
- [ ] Wire "Correct my work" / "Give me a hint" buttons (Home page) — see [backend-requirements.md](backend-requirements.md)
- [ ] Wire the login form + Google button to a real auth backend — see [backend-requirements.md](backend-requirements.md)
- [ ] Persist user-added topics / focus chips across reloads (currently in-memory only)
- [ ] Populate Recent Work cards with real data + thumbnails
- [ ] Build the remaining nav destinations (Skills Map)
- [ ] Add tablet/mobile QA pass and refine breakpoints

## In Progress

## Done

- [x] Scaffold `docs/` and `static/` folders
- [x] Build the home / "Get math help" page from Figma node `82:580`
  - [x] Semantic HTML structure (sidebar + main content)
  - [x] Color palette tokens + typography + full layout in CSS
  - [x] Tab switching (Upload file / Type manually)
  - [x] Drag-and-drop file selection on the upload zone
- [x] Build the Practice page from Figma node `24:173`
  - [x] `practice.html` with five collapsible sections + top/bottom CTAs
  - [x] Reusable `.section`, `.chip`, `.action-pill`, `.attachment`,
        `.setting-card` / `.segment`, `.textarea-block`, `.btn-pill` styles
  - [x] Chip toggle, segment-group radio behaviour, attachment removal in JS
  - [x] Cross-link Home/Practice in the sidebar
- [x] Create functionality for "Add topic" and "Add focus" in the Practice tab
  - [x] Inline editor opens on click, commits on Enter, cancels on Escape
  - [x] New chips start in the active state and toggle like the static ones
- [x] Make "Upload file(s)" possible on the Practice tab
  - [x] Hidden `<input type="file" multiple>` driven by an `<label>` action pill
  - [x] Selected files render as attachment rows (name, detected type, remove)
- [x] Build the Sign in page from Figma node `28:2069`
  - [x] Centered `.auth-card` (Sign in title, Username/Password fields, OR
        divider, Continue with Google, Sign up link, Log in CTA)
  - [x] Client-side validation in `main.js`; backend submission stubbed
- [x] Catalogue DB / AI requirements in `docs/backend-requirements.md`
- [x] Implement login/logout flow with temporary credentials (`admin` / `jota`)
  - [x] Login form validates credentials; success sets session + redirects to Home
  - [x] Sidebar shows "Sign in" link when logged out; redirects to `login.html`
  - [x] Sidebar shows user profile + upward dropdown (Log out, Account) when logged in
- [x] Build the My Work page (`my-work.html`) from Figma nodes `21:93`, `84:1190`, `84:1337`, `84:1336`
  - [x] Search toolbar, Select + New Folder buttons, breadcrumb path
  - [x] Folder cards (with ⋮ context menu: Generate practice / Move / Delete)
  - [x] 3-column conversation card grid (same context menu)
  - [x] Right-click context menu (adds "Create new folder" option)
  - [x] Move dialog with folder-radio grid + Create folder / Move file actions
