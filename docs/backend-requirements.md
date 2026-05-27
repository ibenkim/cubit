# Backend & AI Requirements

A running catalogue of every UI element built so far that needs a database
(persistent storage) or AI model integration to be fully functional.

The columns are:

- **DB** — needs a database (user profile, files, history, persisted choices).
- **AI** — needs an AI model (LLM, vision, problem-generation, grading).
- **Notes** — short description of the contract / inputs / outputs.

## Login page (`login.html`)

| Element | DB | AI | Notes |
|---|:-:|:-:|---|
| Username + Password form ("Log in") | x |  | Verify credentials, create session/JWT, return user. |
| "Continue with Google" | x |  | OAuth flow against Google; upsert user row on first sign-in. |
| "Forgot password?" link | x |  | Look up user, send reset email, persist time-limited token. |
| "Sign up today" link | x |  | New-user registration form + record creation. |

## Sidebar (shared across Home and Practice)

| Element | DB | AI | Notes |
|---|:-:|:-:|---|
| Logo / wordmark |  |  | Static. |
| Nav items (Home / Practice / Skills Map / My Work) |  |  | Static routes. |
| Recents list | x |  | Per-user recent activity (chat / practice / upload IDs). |
| User profile (avatar, "Ben Kim") | x |  | Pull from session user record (name, avatar URL). |

## Home — "Get math help" (`index.html`)

| Element | DB | AI | Notes |
|---|:-:|:-:|---|
| Mode tabs (Upload file / Type manually) |  |  | Pure UI state. |
| Drag-and-drop / file picker | x |  | Upload to object storage; persist file metadata (owner, mime, size). |
| "What is the question?" input |  |  | Plain input — value is sent to AI on submit. |
| "Give hint" CTA | x | x | AI generates a hint from file + question; persist the resulting chat/turn. |
| "Correct my work" button | x | x | AI vision/OCR + grading; persist the correction as a Work item. |
| "Give me a hint" button | x | x | AI hint generation; persist as a Work item. |
| Recent Work grid | x |  | Per-user list of completed work, with thumbnails. |
| "View All" link | x |  | Paginated list view of Recent Work. |

## Practice (`practice.html`)

| Element | DB | AI | Notes |
|---|:-:|:-:|---|
| Choose topics chips | x |  | Topic catalogue (curriculum) + per-user selections. |
| "Add topic" inline editor | x |  | Persist user-created topics. |
| Use past work — "Upload file(s)" | x |  | Upload to object storage, attach to the in-progress practice session. |
| Use past work — "Choose from My Work" | x |  | Browse the user's prior uploads / corrections. |
| Attachment list (remove `×`) | x |  | Mutate the practice session's attachment set. |
| Choose focus chips | x |  | Focus catalogue + per-user selections. |
| "Add focus" inline editor | x |  | Persist user-created focuses. |
| Practice settings — Number of questions | x |  | Persist on the practice session. |
| Practice settings — Difficulty | x |  | Persist on the practice session. |
| Extra notes textarea | x |  | Persist on the practice session. |
| "Generate Practice" CTA (header + footer) | x | x | AI generates problem set from topics / focus / attachments / notes; persist as a Practice run. |

## Cross-cutting

- **Auth & session middleware** for every authenticated route.
- **File storage** (S3-compatible) for uploads (homework images, PDFs).
- **Vision / OCR pipeline** for ingesting handwritten/photographed math.
- **LLM-backed problem generator** for the Practice flow.
- **LLM grader / hint generator** for the Home flow.
- **Recents / history service** (read model over chat + practice runs).
- **Telemetry** so we can track which AI features need iteration.

## Data model sketch (minimum)

```
User           id, email, name, avatar_url, auth_provider, created_at
Session        id, user_id, expires_at
File           id, user_id, storage_key, mime, size, created_at
Topic          id, label, is_user_defined, user_id?
Focus          id, label, is_user_defined, user_id?
WorkItem       id, user_id, kind('correct'|'hint'), file_id, question,
               ai_response, created_at
PracticeRun    id, user_id, topic_ids[], focus_ids[], file_ids[],
               num_questions, difficulty, notes, ai_problems_json,
               status, created_at
```
