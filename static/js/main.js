(function () {
  "use strict";

  // ---------- Mode switch (Upload file / Type manually) ----------
  const tabs = document.querySelectorAll(".mode-switch__tab");
  const panels = document.querySelectorAll(".mode-panel");

  function activateMode(mode) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.mode === mode;
      tab.classList.toggle("mode-switch__tab--active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === mode;
      panel.hidden = !isActive;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activateMode(tab.dataset.mode));
  });

  // ---------- Drag-and-drop ----------
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("file-input");

  if (dropzone && fileInput) {
    // Click & keyboard activation opens the file picker.
    dropzone.addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        fileInput.click();
      }
    });

    fileInput.addEventListener("change", () => {
      if (fileInput.files && fileInput.files.length > 0) {
        showSelectedFile(fileInput.files[0]);
      }
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        dropzone.classList.add("is-dragover");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
        dropzone.classList.remove("is-dragover");
      });
    });

    dropzone.addEventListener("drop", (event) => {
      const droppedFiles = event.dataTransfer && event.dataTransfer.files;
      if (droppedFiles && droppedFiles.length > 0) {
        // Keep the hidden input in sync so form handling can consume it.
        fileInput.files = droppedFiles;
        showSelectedFile(droppedFiles[0]);
      }
    });
  }

  function showSelectedFile(file) {
    const title = dropzone.querySelector(".dropzone__title");
    const hint = dropzone.querySelector(".dropzone__hint");
    if (title) title.textContent = file.name;
    if (hint) {
      const sizeKb = (file.size / 1024).toFixed(1);
      hint.textContent = `${file.type || "file"} — ${sizeKb} KB`;
    }
  }

  // ---------- Chip toggle (Choose topics / Choose focus) ----------
  document.querySelectorAll('[data-toggle="chip"]').forEach((chip) => {
    chip.addEventListener("click", () => {
      chip.classList.toggle("chip--active");
    });
  });

  // ---------- Segment groups (Number of questions / Difficulty) ----------
  document.querySelectorAll(".segment-group").forEach((group) => {
    const segments = group.querySelectorAll(".segment");
    segments.forEach((seg) => {
      seg.addEventListener("click", () => {
        segments.forEach((other) => {
          other.classList.remove("segment--active");
          other.setAttribute("aria-checked", "false");
        });
        seg.classList.add("segment--active");
        seg.setAttribute("aria-checked", "true");
      });
    });
  });

  // ---------- Attachment remove (delegated so dynamically-added rows work) ----------
  document.addEventListener("click", (event) => {
    const removeBtn = event.target.closest(".attachment__remove");
    if (!removeBtn) return;
    const item = removeBtn.closest(".attachment");
    if (item) item.remove();
  });

  // ---------- Add topic / Add focus inline editor ----------
  document.querySelectorAll(".chip--add[data-add-chip]").forEach((addBtn) => {
    addBtn.addEventListener("click", () => activateAddChip(addBtn));
  });

  function activateAddChip(addBtn) {
    if (addBtn.dataset.editing === "true") return;
    addBtn.dataset.editing = "true";

    const plus = addBtn.querySelector(".chip__plus");
    const label = addBtn.querySelector(".chip__label");
    if (plus) plus.style.display = "none";
    if (label) label.style.display = "none";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "chip__input";
    input.placeholder = addBtn.dataset.placeholder || "New item";
    input.setAttribute("aria-label", input.placeholder);
    addBtn.appendChild(input);
    input.focus();

    const restore = () => {
      input.remove();
      if (plus) plus.style.display = "";
      if (label) label.style.display = "";
      delete addBtn.dataset.editing;
    };

    const commit = () => {
      const value = input.value.trim();
      if (value) insertChipBefore(addBtn, value);
      restore();
    };

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        commit();
      } else if (event.key === "Escape") {
        event.preventDefault();
        restore();
      }
    });

    input.addEventListener("blur", commit);
  }

  function insertChipBefore(addBtn, value) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip chip--active";
    chip.dataset.toggle = "chip";

    const icon = document.createElement("span");
    icon.className = "chip__icon";
    icon.setAttribute("aria-hidden", "true");

    const label = document.createElement("span");
    label.className = "chip__label";
    label.textContent = value;

    chip.append(icon, label);
    chip.addEventListener("click", () => chip.classList.toggle("chip--active"));

    addBtn.parentElement.insertBefore(chip, addBtn);
  }

  // ---------- Practice: Upload file(s) ----------
  const practiceFiles = document.getElementById("practice-files");
  const practiceList = document.getElementById("practice-attachments");
  if (practiceFiles && practiceList) {
    practiceFiles.addEventListener("change", () => {
      const files = practiceFiles.files;
      if (!files || files.length === 0) return;
      Array.from(files).forEach((file) => {
        practiceList.appendChild(buildAttachment(file));
      });
      practiceFiles.value = "";
    });
  }

  function buildAttachment(file) {
    const item = document.createElement("li");
    item.className = "attachment";

    const avatar = document.createElement("span");
    avatar.className = "attachment__avatar";
    avatar.setAttribute("aria-hidden", "true");

    const meta = document.createElement("span");
    meta.className = "attachment__meta";

    const name = document.createElement("span");
    name.className = "attachment__name";
    name.textContent = file.name;

    const type = document.createElement("span");
    type.className = "attachment__type";
    type.textContent = describeFileType(file);

    meta.append(name, type);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "attachment__remove";
    remove.setAttribute("aria-label", `Remove ${file.name}`);
    const x = document.createElement("span");
    x.setAttribute("aria-hidden", "true");
    x.textContent = "×";
    remove.appendChild(x);

    item.append(avatar, meta, remove);
    return item;
  }

  function describeFileType(file) {
    if (!file.type) return "File";
    if (file.type.startsWith("image/")) return "Image";
    if (file.type === "application/pdf") return "PDF";
    return file.type;
  }

  // ============================================================
  // Auth helpers
  // ============================================================
  function getUser() {
    try {
      var raw = sessionStorage.getItem("cubit_user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setUser(user) {
    sessionStorage.setItem("cubit_user", JSON.stringify(user));
  }

  function clearUser() {
    sessionStorage.removeItem("cubit_user");
  }

  // ---------- Sidebar auth area (runs on every page) ----------
  function initSidebarAuth() {
    var area = document.getElementById("sidebar-user-area");
    if (!area) return;

    var user = getUser();

    if (user) {
      // Logged-in state: avatar + name + upward dropdown
      area.innerHTML =
        '<button class="user-profile__trigger" id="user-profile-trigger" ' +
        'aria-expanded="false" aria-haspopup="true">' +
        '<span class="user-profile__avatar" aria-hidden="true"></span>' +
        '<span class="user-profile__name">' + escapeHtml(user.name) + "</span>" +
        "</button>" +
        '<div class="user-dropdown" id="user-dropdown" hidden>' +
        '<button class="user-dropdown__item" id="user-account-btn">Account</button>' +
        '<button class="user-dropdown__item" id="user-logout-btn">Log out</button>' +
        "</div>";

      var trigger = document.getElementById("user-profile-trigger");
      var dropdown = document.getElementById("user-dropdown");

      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = !dropdown.hidden;
        dropdown.hidden = isOpen;
        trigger.setAttribute("aria-expanded", isOpen ? "false" : "true");
      });

      document.getElementById("user-logout-btn").addEventListener("click", function () {
        clearUser();
        window.location.href = "login.html";
      });

      document.getElementById("user-account-btn").addEventListener("click", function () {
        dropdown.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
      });

      // Close dropdown when clicking anywhere outside
      document.addEventListener("click", function () {
        if (dropdown && !dropdown.hidden) {
          dropdown.hidden = true;
          trigger.setAttribute("aria-expanded", "false");
        }
      });
    } else {
      // Logged-out state: Sign in link
      area.innerHTML =
        '<a href="login.html" class="user-signin-link">' +
        '<span class="user-profile__avatar" aria-hidden="true"></span>' +
        "<span>Sign in</span>" +
        "</a>";
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  initSidebarAuth();

  // ---------- Login form (validates + checks hardcoded credentials) ----------
  var loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var usernameField = loginForm.querySelector("#login-username");
      var passwordField = loginForm.querySelector("#login-password");
      var errorBanner = document.getElementById("login-error");

      [usernameField, passwordField].forEach(function (f) {
        f.classList.remove("auth-field__input--error");
      });
      if (errorBanner) errorBanner.hidden = true;

      // Empty-field check
      var errors = [];
      if (!usernameField.value.trim()) errors.push(usernameField);
      if (!passwordField.value) errors.push(passwordField);

      if (errors.length > 0) {
        errors.forEach(function (f) {
          f.classList.add("auth-field__input--error");
        });
        errors[0].focus();
        return;
      }

      // Credential check (temporary hardcoded — replace with backend later)
      var TEMP_USERNAME = "admin";
      var TEMP_PASSWORD = "jota";

      if (
        usernameField.value.trim() === TEMP_USERNAME &&
        passwordField.value === TEMP_PASSWORD
      ) {
        setUser({ name: "Ben Kim", username: TEMP_USERNAME });
        window.location.href = "index.html";
      } else {
        if (errorBanner) {
          errorBanner.hidden = false;
          errorBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
        passwordField.value = "";
        usernameField.classList.add("auth-field__input--error");
        passwordField.classList.add("auth-field__input--error");
        usernameField.focus();
      }
    });
  }

  var googleSignIn = document.getElementById("google-signin");
  if (googleSignIn) {
    googleSignIn.addEventListener("click", function () {
      console.info("Google sign-in is not yet connected to a backend.");
    });
  }

  // ============================================================
  // My Work page
  // ============================================================
  var ctxMenu = document.getElementById("ctx-menu");
  var rightClickMenu = document.getElementById("rightclick-menu");
  var moveModal = document.getElementById("move-modal");

  if (ctxMenu || rightClickMenu || moveModal) {
    var activeCardTarget = null;

    // ---- Open the ⋮ context menu ----
    document.addEventListener("click", function (e) {
      var menuBtn = e.target.closest(".card-menu-btn");
      if (menuBtn) {
        e.stopPropagation();
        activeCardTarget = menuBtn.closest(".conv-card, .folder-card");
        openMenu(ctxMenu, menuBtn);
        return;
      }
      // Dismiss both menus on outside click
      if (!e.target.closest(".ctx-menu")) {
        if (ctxMenu) ctxMenu.hidden = true;
        if (rightClickMenu) rightClickMenu.hidden = true;
      }
    });

    // ---- Right-click context menu on cards ----
    document.querySelectorAll(".conv-card, .folder-card").forEach(function (card) {
      card.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        if (ctxMenu) ctxMenu.hidden = true;
        if (rightClickMenu) {
          activeCardTarget = card;
          rightClickMenu.style.left = e.clientX + "px";
          rightClickMenu.style.top = e.clientY + "px";
          rightClickMenu.hidden = false;
        }
      });
    });

    // ---- Wire ctx menu actions ----
    function wireMenuItems(menu) {
      if (!menu) return;
      menu.querySelectorAll(".ctx-menu__item").forEach(function (item) {
        item.addEventListener("click", function () {
          var action = item.dataset.action;
          menu.hidden = true;

          if (action === "move" && moveModal) {
            moveModal.hidden = false;
          } else if (action === "delete" && activeCardTarget) {
            activeCardTarget.remove();
            activeCardTarget = null;
          } else if (action === "new-folder") {
            var name = window.prompt("New folder name:");
            if (name && name.trim()) {
              addFolderCard(name.trim());
            }
          }
        });
      });
    }

    wireMenuItems(ctxMenu);
    wireMenuItems(rightClickMenu);

    // ---- Move modal: folder radio selection ----
    if (moveModal) {
      moveModal.querySelectorAll(".modal__folder-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          moveModal.querySelectorAll(".modal__folder-btn").forEach(function (b) {
            b.classList.remove("modal__folder-btn--active");
            b.setAttribute("aria-checked", "false");
          });
          btn.classList.add("modal__folder-btn--active");
          btn.setAttribute("aria-checked", "true");
        });
      });

      // Close on overlay backdrop click
      moveModal.addEventListener("click", function (e) {
        if (e.target === moveModal) moveModal.hidden = true;
      });

      // Confirm move
      var moveFileBtn = document.getElementById("modal-move-file");
      if (moveFileBtn) {
        moveFileBtn.addEventListener("click", function () {
          moveModal.hidden = true;
          activeCardTarget = null;
        });
      }

      // Create folder stub
      var createFolderBtn = document.getElementById("modal-create-folder");
      if (createFolderBtn) {
        createFolderBtn.addEventListener("click", function () {
          var name = window.prompt("New folder name:");
          if (name && name.trim()) {
            addMoveModalFolder(name.trim());
          }
        });
      }
    }

    // ---- New Folder button (toolbar) ----
    var newFolderBtn = document.getElementById("mywork-new-folder-btn");
    if (newFolderBtn) {
      newFolderBtn.addEventListener("click", function () {
        var name = window.prompt("New folder name:");
        if (name && name.trim()) {
          addFolderCard(name.trim());
        }
      });
    }
  }

  // Add a folder card to the folders list
  function addFolderCard(name) {
    var list = document.getElementById("folders-list");
    if (!list) return;
    var card = document.createElement("div");
    card.className = "folder-card";
    card.innerHTML =
      '<span class="folder-card__icon" aria-hidden="true"></span>' +
      '<div class="folder-card__meta">' +
      '<span class="folder-card__name">' + escapeHtml(name) + "</span>" +
      '<span class="folder-card__count">0 items</span>' +
      "</div>" +
      '<button type="button" class="card-menu-btn" aria-label="' +
      escapeHtml(name) + ' options" aria-haspopup="menu">⋮</button>';
    list.appendChild(card);
  }

  // Add a folder option to the Move modal grid
  function addMoveModalFolder(name) {
    if (!moveModal) return;
    var grid = moveModal.querySelector(".modal__folder-grid");
    if (!grid) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "modal__folder-btn";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", "false");
    btn.innerHTML =
      '<span class="modal__folder-icon" aria-hidden="true"></span>' +
      escapeHtml(name);
    btn.addEventListener("click", function () {
      grid.querySelectorAll(".modal__folder-btn").forEach(function (b) {
        b.classList.remove("modal__folder-btn--active");
        b.setAttribute("aria-checked", "false");
      });
      btn.classList.add("modal__folder-btn--active");
      btn.setAttribute("aria-checked", "true");
    });
    grid.appendChild(btn);
  }

  // Position a fixed menu near an anchor element
  function openMenu(menu, anchor) {
    if (!menu) return;
    var rect = anchor.getBoundingClientRect();
    menu.hidden = false;
    menu.style.top = rect.bottom + 4 + "px";
    menu.style.left = rect.left + "px";
    // Keep within right edge of viewport
    var menuRect = menu.getBoundingClientRect();
    if (menuRect.right > window.innerWidth - 8) {
      menu.style.left = Math.max(8, rect.right - menuRect.width) + "px";
    }
    // Keep within bottom edge of viewport
    if (menuRect.bottom > window.innerHeight - 8) {
      menu.style.top = Math.max(8, rect.top - menuRect.height - 4) + "px";
    }
  }
})();
