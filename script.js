// Local Database State Initialization
const LIBRARY_DATA_VERSION = 2;
const defaultBookCollection = [
  {
    id: "BK-8821",
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "Available",
  },
  {
    id: "BK-4309",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    status: "Available",
  },
  {
    id: "BK-1104",
    title: "Design Patterns",
    author: "Erich Gamma",
    status: "Reserved",
  },
  {
    id: "BK-2135",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    status: "Available",
  },
  {
    id: "BK-3210",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    status: "Available",
  },
  {
    id: "BK-4477",
    title: "1984",
    author: "George Orwell",
    status: "Available",
  },
  {
    id: "BK-5592",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    status: "Reserved",
  },
  {
    id: "BK-6618",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    status: "Available",
  },
  {
    id: "BK-7784",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    status: "Available",
  },
  {
    id: "BK-8901",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    status: "Available",
  },
  {
    id: "BK-9022",
    title: "The Alchemist",
    author: "Paulo Coelho",
    status: "Available",
  },
  {
    id: "BK-0133",
    title: "Brave New World",
    author: "Aldous Huxley",
    status: "Available",
  },
  {
    id: "BK-1245",
    title: "The Lean Startup",
    author: "Eric Ries",
    status: "Available",
  },
  {
    id: "BK-1357",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    status: "Reserved",
  },
  {
    id: "BK-1468",
    title: "The Midnight Library",
    author: "Matt Haig",
    status: "Available",
  },
  {
    id: "BK-1579",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    status: "Available",
  },
  {
    id: "BK-1680",
    title: "Educated",
    author: "Tara Westover",
    status: "Available",
  },
  {
    id: "BK-1791",
    title: "The Road",
    author: "Cormac McCarthy",
    status: "Available",
  },
  {
    id: "BK-1902",
    title: "Dune",
    author: "Frank Herbert",
    status: "Available",
  },
  {
    id: "BK-2013",
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    status: "Available",
  },
  {
    id: "BK-2124",
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    status: "Available",
  },
];

let bookCollection;
const storedBooks = JSON.parse(localStorage.getItem("lib_books"));
const storedBookVersion = Number(localStorage.getItem("lib_books_version"));
if (!storedBooks || storedBookVersion !== LIBRARY_DATA_VERSION) {
  bookCollection = [...defaultBookCollection];
  localStorage.setItem("lib_books_version", String(LIBRARY_DATA_VERSION));
} else {
  bookCollection = storedBooks;
}

let reservationCollection = JSON.parse(
  localStorage.getItem("lib_reservations"),
) || [
  {
    id: "RES-9912",
    bookId: "BK-1104",
    bookTitle: "Design Patterns",
    patron: "Alex Mercer",
    date: "05/28/2026",
  },
];

let auditLogs = JSON.parse(localStorage.getItem("lib_logs")) || [
  {
    text: "System database initialization complete.",
    type: "create",
    time: "05/28/2026, 10:00 AM",
  },
];

const funFacts = [
  'The longest novel ever written is "A la recherche du temps perdu" by Marcel Proust, with over 9 million characters.',
  "The first book printed using movable type was the Gutenberg Bible in the 1450s.",
  "Reading can reduce stress levels by up to 68% in just six minutes.",
  "J.K. Rowling is the first author to become a billionaire from writing books.",
  "William Shakespeare added over 1,700 words to the English language through his works.",
  "The Library of Congress in the United States houses more than 170 million items.",
  "The world's oldest known library was founded in ancient Assyria around 650 BCE.",
  "The first modern novel is often cited as Daniel Defoe's 'Robinson Crusoe' from 1719.",
  "Arthur Conan Doyle wrote the Sherlock Holmes stories in a single room above a pharmacy.",
  "Books were once chained to library shelves to prevent theft in the Middle Ages.",
  "The first book ever written on a typewriter was 'The Adventures of Tom Sawyer.'",
  "The longest sentence in literature appears in Victor Hugo's 'Les Misérables' and spans 823 words.",
  "A single book can contain over 100,000 words on average, depending on genre.",
  "The first printed children's book was 'Orbis Pictus' by John Amos Comenius in 1658.",
  "The word 'book' comes from the Old English word 'bōc', related to 'beech' wood tablets.",
  "The Guinness World Records began as a book to settle pub arguments in 1955.",
  "Agatha Christie is the best-selling fiction writer of all time.",
  "The smallest book in the world is smaller than a grain of rice and requires a microscope to read.",
  "Many famous authors worked as librarians, teachers, or journalists before publishing.",
  "The first e-book was created in 1971 and was a digital copy of the U.S. Declaration of Independence.",
  "In Japan, there are vending machines that dispense books and manga volumes.",
  "Book covers were once plain and undecorated until the 19th century.",
  "Libraries were essential in ancient Alexandria, which housed scrolls instead of bound books.",
  "Reading fiction improves empathy by helping readers understand others' emotions.",
  "Bookworms can trace their nickname back to insects that ate the bindings of old books.",
];

let currentFunFactIndex = null;
let funFactIntervalId = null;

// Context Nodes
const UI = {
  tabs: document.querySelectorAll(".nav-item"),
  tabViews: document.querySelectorAll(".tab-content"),
  viewTitle: document.getElementById("view-title"),
  globalSearch: document.getElementById("globalSearch"),
  actionCluster: document.querySelector(".action-cluster"),
  searchBar: document.querySelector(".search-bar"),
  adminAuthBtn: document.getElementById("adminAuthBtn"),
  adminLoginModal: document.getElementById("adminLoginModal"),
  sidebar: document.querySelector(".sidebar"),
  sidebarToggle: document.getElementById("sidebarToggle"),
  sidebarOverlay: document.getElementById("sidebarOverlay"),
  adminLoginForm: null,
  closeAdminLogin: null,
  cancelAdminLogin: null,
  adminBadge: document.getElementById("adminBadge"),

  // Counter Metrics
  metricTotal: document.getElementById("metric-total-books"),
  metricAvail: document.getElementById("metric-avail-books"),
  metricRes: document.getElementById("metric-total-res"),

  // Table Hubs
  dashboardTable: document.getElementById("dashboardQuickView"),
  inventoryTable: document.getElementById("inventoryTableBody"),
  reservationsTable: document.getElementById("reservationsTableBody"),
  logsContainer: document.getElementById("logStreamContainer"),
  funFactsList: document.getElementById("funFactsList"),

  // Modals & Action Links
  bookModal: document.getElementById("assetModal"),
  openBookBtn: document.getElementById("openBookModalBtn"),
  closeBookBtn: document.getElementById("closeAssetModal"),
  cancelBookBtn: document.getElementById("cancelAssetBtn"),
  bookForm: document.getElementById("assetForm"),

  // Table Hubs
  dashboardTable: document.getElementById("dashboardQuickView"),
  inventoryTable: document.getElementById("inventoryTableBody"),
  reservationsTable: document.getElementById("reservationsTableBody"),
  logsContainer: document.getElementById("logStreamContainer"),

  // Modals & Action Links
  bookModal: document.getElementById("assetModal"),
  openBookBtn: document.getElementById("openBookModalBtn"),
  closeBookBtn: document.getElementById("closeAssetModal"),
  cancelBookBtn: document.getElementById("cancelAssetBtn"),
  bookForm: document.getElementById("assetForm"),

  bookingModal: document.getElementById("bookingModal"),
  closeBookingBtn: document.getElementById("closeBookingModal"),
  cancelBookingBtn: document.getElementById("cancelBookingBtn"),
  bookingForm: document.getElementById("bookingForm"),
  clearLogsBtn: document.getElementById("clearLogsBtn"),
};

// Admin credentials (simple, client-side for demo)
const DEFAULT_ADMINS = [{ username: "Admin", password: "1234" }];

function loadAdmins() {
  const stored = JSON.parse(localStorage.getItem("lib_admins"));
  if (!Array.isArray(stored) || stored.length === 0) {
    localStorage.setItem("lib_admins", JSON.stringify(DEFAULT_ADMINS));
    return [...DEFAULT_ADMINS];
  }
  return stored;
}

function saveAdmins(admins) {
  localStorage.setItem("lib_admins", JSON.stringify(admins));
}

function findAdmin(username, password) {
  const admins = loadAdmins();
  return admins.some(
    (admin) => admin.username === username && admin.password === password,
  );
}

function adminExists(username) {
  const admins = loadAdmins();
  return admins.some((admin) => admin.username === username);
}

function updateSidebarToggleIcon() {
  if (!UI.sidebarToggle || !UI.sidebar) return;
  const isClosed = UI.sidebar.classList.contains("closed");
  UI.sidebarToggle.innerHTML = isClosed
    ? '<i class="fa-solid fa-bars"></i>'
    : '<i class="fa-solid fa-xmark"></i>';
  document.body.classList.toggle("sidebar-open", !isClosed);
}

function closeSidebarOnMobile() {
  if (!UI.sidebar) return;
  if (window.innerWidth <= 1080) {
    UI.sidebar.classList.add("closed");
    if (UI.sidebarOverlay) UI.sidebarOverlay.classList.remove("active");
  } else {
    UI.sidebar.classList.remove("closed");
    if (UI.sidebarOverlay) UI.sidebarOverlay.classList.remove("active");
  }
  updateSidebarToggleIcon();
}

function toggleSidebar() {
  if (!UI.sidebar) return;
  const isClosed = UI.sidebar.classList.contains("closed");
  if (isClosed) {
    // Open sidebar on mobile
    if (window.innerWidth <= 1080) {
      UI.sidebar.classList.remove("closed");
      if (UI.sidebarOverlay) UI.sidebarOverlay.classList.add("active");
    }
  } else {
    // Close sidebar
    UI.sidebar.classList.add("closed");
    if (UI.sidebarOverlay) UI.sidebarOverlay.classList.remove("active");
  }
  updateSidebarToggleIcon();
}

function addAdmin(username, password) {
  const admins = loadAdmins();
  admins.push({ username, password });
  saveAdmins(admins);
}

function isAdminAuthenticated() {
  return sessionStorage.getItem("lib_isAdmin") === "true";
}

function setAdminAuthenticated(flag) {
  if (flag) sessionStorage.setItem("lib_isAdmin", "true");
  else sessionStorage.removeItem("lib_isAdmin");
  // reflect UI immediately
  updateAdminUI();
}

function updateAdminUI() {
  const admin = isAdminAuthenticated();
  if (UI.openBookBtn) UI.openBookBtn.style.display = admin ? "" : "none";
  if (UI.adminAuthBtn) UI.adminAuthBtn.textContent = admin ? "Logout" : "Login";
  if (UI.adminBadge) UI.adminBadge.style.display = admin ? "inline" : "none";
}

// Application Init Setup
function initApp() {
  registerEventListeners();
  reconcileReservationsWithBooks();
  refreshInterface();
  startFunFactRotation();
  // wire admin modal elements (after DOM ready)
  UI.adminLoginForm = document.getElementById("adminLoginForm");
  UI.adminSignupForm = document.getElementById("adminSignupForm");
  UI.showSignupLink = document.getElementById("showSignupLink");
  UI.showLoginLink = document.getElementById("showLoginLink");
  if (UI.adminAuthBtn) {
    UI.adminAuthBtn.addEventListener("click", () => {
      if (isAdminAuthenticated()) {
        // logout
        setAdminAuthenticated(false);
      } else {
        UI.adminLoginModal.classList.add("active");
      }
    });
  }
  if (UI.adminLoginForm) {
    UI.adminLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("adminUser").value.trim();
      const pass = document.getElementById("adminPass").value;
      if (findAdmin(user, pass)) {
        setAdminAuthenticated(true);
        UI.adminLoginModal.classList.remove("active");
        logEvent("Admin signed in.", "create");
      } else {
        alert("Invalid admin credentials");
      }
    });
  }
  if (UI.adminSignupForm) {
    UI.adminSignupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("signupUser").value.trim();
      const pass = document.getElementById("signupPass").value;
      const confirmPass = document.getElementById("signupConfirmPass").value;
      if (!user || !pass) {
        alert("Please enter a username and password.");
        return;
      }
      if (pass !== confirmPass) {
        alert("Passwords do not match.");
        return;
      }
      if (adminExists(user)) {
        alert("This admin username already exists.");
        return;
      }
      addAdmin(user, pass);
      setAdminAuthenticated(true);
      UI.adminLoginModal.classList.remove("active");
      logEvent(`Admin account created for ${user}.`, "create");
    });
  }
  if (UI.showSignupLink) {
    UI.showSignupLink.addEventListener("click", () => {
      UI.adminLoginForm.classList.add("hidden");
      UI.adminSignupForm.classList.remove("hidden");
    });
  }
  if (UI.showLoginLink) {
    UI.showLoginLink.addEventListener("click", () => {
      UI.adminSignupForm.classList.add("hidden");
      UI.adminLoginForm.classList.remove("hidden");
    });
  }
  // initial admin UI reflect
  updateAdminUI();
  closeSidebarOnMobile();
  if (!isAdminAuthenticated()) {
    UI.adminLoginModal.classList.add("active");
    if (UI.adminSignupForm) UI.adminSignupForm.classList.add("hidden");
    if (UI.adminLoginForm) UI.adminLoginForm.classList.remove("hidden");
  }
}

// Global Core UI Redraw Wrapper
function refreshInterface() {
  saveToStorage();
  calculateMetrics();
  renderDashboardView();
  renderInventoryView();
  renderReservationsView();
  renderAuditLogs();
  renderFunFacts();
  updateHeaderActions();
}

function saveToStorage() {
  localStorage.setItem("lib_books", JSON.stringify(bookCollection));
  localStorage.setItem("lib_books_version", String(LIBRARY_DATA_VERSION));
  localStorage.setItem(
    "lib_reservations",
    JSON.stringify(reservationCollection),
  );
  localStorage.setItem("lib_logs", JSON.stringify(auditLogs));
}

function reconcileReservationsWithBooks() {
  // Ensure every book marked 'Reserved' has a corresponding reservation entry
  const existingReservedIds = new Set(
    reservationCollection.map((r) => r.bookId),
  );
  let added = 0;
  bookCollection.forEach((book) => {
    if (book.status === "Reserved" && !existingReservedIds.has(book.id)) {
      const bId = "RES-" + Math.floor(1000 + Math.random() * 9000);
      const date = new Date().toLocaleDateString();
      reservationCollection.push({
        id: bId,
        bookId: book.id,
        bookTitle: book.title,
        patron: "System (seed)",
        phone: "",
        address: "",
        date: date,
      });
      added++;
    }
  });
  if (added > 0) saveToStorage();
}

function renderFunFacts() {
  if (!UI.funFactsList) return;
  if (currentFunFactIndex === null) {
    currentFunFactIndex = getRandomFactIndex();
  }
  UI.funFactsList.innerHTML = `<li class="fun-fact-item">${funFacts[currentFunFactIndex]}</li>`;
}

function displayFunFact(index) {
  if (!UI.funFactsList) return;
  UI.funFactsList.innerHTML = `<li class="fun-fact-item">${funFacts[index]}</li>`;
}

function getRandomFactIndex(excludeIndex = null) {
  if (funFacts.length === 0) return 0;
  let index = Math.floor(Math.random() * funFacts.length);
  while (funFacts.length > 1 && index === excludeIndex) {
    index = Math.floor(Math.random() * funFacts.length);
  }
  return index;
}

function startFunFactRotation() {
  if (funFactIntervalId !== null) return;
  funFactIntervalId = setInterval(() => {
    currentFunFactIndex = getRandomFactIndex(currentFunFactIndex);
    displayFunFact(currentFunFactIndex);
  }, 10000);
}

function updateHeaderActions() {
  const activeView = document.querySelector(".tab-content.active")?.id || "";
  const searchEl = UI.searchBar;
  const addBtn = UI.openBookBtn;

  // Default: show both
  if (searchEl) searchEl.style.display = "";
  if (addBtn) addBtn.style.display = "";

  if (activeView === "overview-tab" || activeView === "history-tab") {
    // hide both search and add
    if (searchEl) searchEl.style.display = "none";
    if (addBtn) addBtn.style.display = "none";
  } else if (activeView === "reservations-tab") {
    // hide add only, keep search
    if (searchEl) searchEl.style.display = "";
    if (addBtn) addBtn.style.display = "none";
  } else {
    // books-tab and others: show both
    if (searchEl) searchEl.style.display = "";
    if (addBtn) addBtn.style.display = "";
  }

  // hide entire cluster if both hidden to avoid empty space
  if (UI.actionCluster) {
    const searchHidden =
      !searchEl || window.getComputedStyle(searchEl).display === "none";
    const addHidden =
      !addBtn || window.getComputedStyle(addBtn).display === "none";
    UI.actionCluster.style.display =
      searchHidden && addHidden ? "none" : "flex";
  }
}

function calculateMetrics() {
  UI.metricTotal.innerText = bookCollection.length;
  UI.metricAvail.innerText = bookCollection.filter(
    (b) => b.status === "Available",
  ).length;
  UI.metricRes.innerText = reservationCollection.length;
}

// Log Writer Helper
function logEvent(text, type) {
  const timeString = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  auditLogs.unshift({ text, type, time: timeString });
  refreshInterface();
}

// Section Rendering Modules
function renderDashboardView() {
  UI.dashboardTable.innerHTML = "";
  const slice = bookCollection.slice(-4).reverse();
  if (slice.length === 0) {
    UI.dashboardTable.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--text-secondary);">No dynamic tracking telemetry active.</td></tr>`;
    return;
  }
  slice.forEach((book) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td><strong>${book.title}</strong></td>
            <td>${book.author}</td>
            <td><span class="badge ${book.status === "Available" ? "badge-available" : "badge-reserved"}">${book.status}</span></td>
        `;
    UI.dashboardTable.appendChild(tr);
  });
}

function renderInventoryView(filterQuery = "") {
  UI.inventoryTable.innerHTML = "";
  const cleanQuery = filterQuery.toLowerCase().trim();

  const targetSet = bookCollection.filter(
    (b) =>
      b.id.toLowerCase().includes(cleanQuery) ||
      b.title.toLowerCase().includes(cleanQuery) ||
      b.author.toLowerCase().includes(cleanQuery),
  );

  if (targetSet.length === 0) {
    const message =
      bookCollection.length === 0
        ? "No active assets registered in database."
        : "No book assets match your search constraints.";
    UI.inventoryTable.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-secondary);">${message}</td></tr>`;
    return;
  }

  targetSet.forEach((book) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td><code>${book.id}</code></td>
            <td><strong>${book.title}</strong></td>
            <td>${book.author}</td>
            <td><span class="badge ${book.status === "Available" ? "badge-available" : "badge-reserved"}">${book.status}</span></td>
            <td>
                <div class="action-btn-group">
                    ${
                      book.status === "Available"
                        ? `<button class="icon-action-btn reserve-icon" onclick="triggerBookingWizard('${book.id}', '${escape(book.title)}')"><i class="fa-solid fa-calendar-plus" title="Reserve Asset"></i> Reserve</button>`
                        : `<button class="icon-action-btn" disabled style="opacity:0.3; cursor:not-allowed;"><i class="fa-solid fa-lock"></i> Locked</button>`
                    }
                    <button class="icon-action-btn delete-icon" onclick="purgeAsset('${book.id}')" style="margin-left:12px;"><i class="fa-solid fa-trash"></i> Delete</button>
                </div>
            </td>
        `;
    UI.inventoryTable.appendChild(tr);
  });
}

function renderReservationsView(filterQuery = "") {
  UI.reservationsTable.innerHTML = "";
  const cleanQuery = filterQuery.toLowerCase().trim();

  const targetSet = reservationCollection.filter(
    (r) =>
      r.id.toLowerCase().includes(cleanQuery) ||
      r.bookTitle.toLowerCase().includes(cleanQuery) ||
      r.patron.toLowerCase().includes(cleanQuery),
  );

  if (targetSet.length === 0) {
    UI.reservationsTable.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-secondary);">No reservations active.</td></tr>`;
    return;
  }

  targetSet.forEach((res) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td><code>${res.id}</code></td>
        <td><strong>${res.bookTitle}</strong></td>
        <td>${res.patron}</td>
        <td>${res.phone || ""}</td>
        <td>${res.address || ""}</td>
        <td>${res.date}</td>
        <td>
          <button class="btn btn-secondary" style="padding: 0.35rem 0.75rem; font-size:0.8rem;" onclick="releaseReservation('${res.id}', '${res.bookId}')">
            <i class="fa-solid fa-arrow-rotate-left"></i> Check In / Release
          </button>
        </td>
      `;
    UI.reservationsTable.appendChild(tr);
  });
}

function renderAuditLogs() {
  UI.logsContainer.innerHTML = "";
  if (auditLogs.length === 0) {
    UI.logsContainer.innerHTML = `<div style="text-align:center; color:var(--text-secondary); padding: 2rem 0;">Log vault cleared.</div>`;
    return;
  }
  auditLogs.forEach((log) => {
    const div = document.createElement("div");
    div.className = `log-item log-${log.type}`;
    div.innerHTML = `
            <span>${log.text}</span>
            <span class="log-timestamp">${log.time}</span>
        `;
    UI.logsContainer.appendChild(div);
  });
}

// Controller Logic Handlers
function registerEventListeners() {
  // Nav Navigation Controller
  UI.tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      UI.tabs.forEach((t) => t.classList.remove("active"));
      UI.tabViews.forEach((v) => v.classList.remove("active"));

      tab.classList.add("active");
      const viewTarget = tab.getAttribute("data-target");
      document.getElementById(viewTarget).classList.add("active");
      UI.viewTitle.innerText = tab.innerText.trim();
      updateHeaderActions();

      // Close sidebar on mobile after selecting a destination
      if (window.innerWidth <= 1080) {
        UI.sidebar.classList.add("closed");
        if (UI.sidebarOverlay) UI.sidebarOverlay.classList.remove("active");
        updateSidebarToggleIcon();
      }
    });
  });

  // Asset Modals Toggles
  UI.openBookBtn.addEventListener("click", () =>
    UI.bookModal.classList.add("active"),
  );
  UI.closeBookBtn.addEventListener("click", () =>
    UI.bookModal.classList.remove("active"),
  );
  UI.cancelBookBtn.addEventListener("click", () =>
    UI.bookModal.classList.remove("active"),
  );

  UI.closeBookingBtn.addEventListener("click", () =>
    UI.bookingModal.classList.remove("active"),
  );
  UI.cancelBookingBtn.addEventListener("click", () =>
    UI.bookingModal.classList.remove("active"),
  );

  // Submission Logic Chains
  UI.bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const randId = "BK-" + Math.floor(1000 + Math.random() * 9000);
    const titleVal = document.getElementById("bookTitle").value.trim();
    const authorVal = document.getElementById("bookAuthor").value.trim();

    bookCollection.push({
      id: randId,
      title: titleVal,
      author: authorVal,
      status: "Available",
    });
    UI.bookModal.classList.remove("active");
    UI.bookForm.reset();
    logEvent(
      `Registered asset entry [${titleVal}] under signature ${randId}.`,
      "create",
    );
  });

  UI.bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const bId = "RES-" + Math.floor(1000 + Math.random() * 9000);
    const targetBookId = document.getElementById("bookingTargetId").value;
    const targetBookTitle = document.getElementById("bookingTargetTitle").value;
    const patronVal = document.getElementById("patronName").value.trim();
    const patronPhone = document.getElementById("patronPhone")
      ? document.getElementById("patronPhone").value.trim()
      : "";
    const patronAddress = document.getElementById("patronAddress")
      ? document.getElementById("patronAddress").value.trim()
      : "";
    const currentDate = new Date().toLocaleDateString();

    const book = bookCollection.find((b) => b.id === targetBookId);
    if (!book) {
      alert(
        "The selected book asset could not be found. Please refresh and try again.",
      );
      return;
    }
    if (book.status !== "Available") {
      alert("This asset is no longer available for reservation.");
      refreshInterface();
      return;
    }
    if (reservationCollection.some((r) => r.bookId === targetBookId)) {
      alert("A reservation already exists for this asset.");
      refreshInterface();
      return;
    }

    book.status = "Reserved";

    reservationCollection.push({
      id: bId,
      bookId: targetBookId,
      bookTitle: targetBookTitle,
      patron: patronVal,
      phone: patronPhone,
      address: patronAddress,
      date: currentDate,
    });
    UI.bookingModal.classList.remove("active");
    UI.bookingForm.reset();
    logEvent(
      `Issued structural lock on ${targetBookId} to patron (${patronVal}).`,
      "reserve",
    );
  });

  // Real-Time Context Search
  UI.globalSearch.addEventListener("input", (e) => {
    const query = e.target.value;
    renderInventoryView(query);
    renderReservationsView(query);
  });

  UI.clearLogsBtn.addEventListener("click", () => {
    auditLogs = [];
    refreshInterface();
  });

  if (UI.sidebarToggle) {
    UI.sidebarToggle.addEventListener("click", toggleSidebar);
  }

  if (UI.sidebarOverlay) {
    UI.sidebarOverlay.addEventListener("click", () => {
      if (!UI.sidebar.classList.contains("closed")) {
        UI.sidebar.classList.add("closed");
        UI.sidebarOverlay.classList.remove("active");
        updateSidebarToggleIcon();
      }
    });
  }

  window.addEventListener("resize", closeSidebarOnMobile);
}

// Global Scope Operation Wrappers
window.purgeAsset = function (id) {
  const matchIndex = bookCollection.findIndex((b) => b.id === id);
  if (matchIndex !== -1) {
    const title = bookCollection[matchIndex].title;
    bookCollection.splice(matchIndex, 1);

    // Remove lingering active reservations for this specific book asset
    reservationCollection = reservationCollection.filter(
      (r) => r.bookId !== id,
    );

    logEvent(
      `Purged asset registry ${id} (${title}) completely from memory matrix.`,
      "cancel",
    );
    refreshInterface();
  }
};

window.triggerBookingWizard = function (id, escapedTitle) {
  document.getElementById("bookingTargetId").value = id;
  document.getElementById("bookingTargetTitle").value = unescape(escapedTitle);
  UI.bookingModal.classList.add("active");
};

window.releaseReservation = function (resId, bookId) {
  reservationCollection = reservationCollection.filter((r) => r.id !== resId);
  const book = bookCollection.find((b) => b.id === bookId);
  if (book) book.status = "Available";
  logEvent(
    `Released lock allocation ${resId}. Book asset ${bookId} checked back into vault successfully.`,
    "return",
  );
};

// Start Runtime
document.addEventListener("DOMContentLoaded", initApp);
