// Local Database State Initialization
let bookCollection = JSON.parse(localStorage.getItem('lib_books')) || [
    { id: "BK-8821", title: "Clean Code", author: "Robert C. Martin", status: "Available" },
    { id: "BK-4309", title: "You Don't Know JS", author: "Kyle Simpson", status: "Available" },
    { id: "BK-1104", title: "Design Patterns", author: "Erich Gamma", status: "Reserved" }
];

let reservationCollection = JSON.parse(localStorage.getItem('lib_reservations')) || [
    { id: "RES-9912", bookId: "BK-1104", bookTitle: "Design Patterns", patron: "Alex Mercer", date: "05/28/2026" }
];

let auditLogs = JSON.parse(localStorage.getItem('lib_logs')) || [
    { text: "System database initialization complete.", type: "create", time: "05/28/2026, 10:00 AM" }
];

// Context Nodes
const UI = {
    tabs: document.querySelectorAll('.nav-item'),
    tabViews: document.querySelectorAll('.tab-content'),
    viewTitle: document.getElementById('view-title'),
    globalSearch: document.getElementById('globalSearch'),
    
    // Counter Metrics
    metricTotal: document.getElementById('metric-total-books'),
    metricAvail: document.getElementById('metric-avail-books'),
    metricRes: document.getElementById('metric-total-res'),
    
    // Table Hubs
    dashboardTable: document.getElementById('dashboardQuickView'),
    inventoryTable: document.getElementById('inventoryTableBody'),
    reservationsTable: document.getElementById('reservationsTableBody'),
    logsContainer: document.getElementById('logStreamContainer'),
    
    // Modals & Action Links
    bookModal: document.getElementById('assetModal'),
    openBookBtn: document.getElementById('openBookModalBtn'),
    closeBookBtn: document.getElementById('closeAssetModal'),
    cancelBookBtn: document.getElementById('cancelAssetBtn'),
    bookForm: document.getElementById('assetForm'),
    
    bookingModal: document.getElementById('bookingModal'),
    closeBookingBtn: document.getElementById('closeBookingModal'),
    cancelBookingBtn: document.getElementById('cancelBookingBtn'),
    bookingForm: document.getElementById('bookingForm'),
    clearLogsBtn: document.getElementById('clearLogsBtn')
};

// Application Init Setup
function initApp() {
    registerEventListeners();
    refreshInterface();
}

// Global Core UI Redraw Wrapper
function refreshInterface() {
    saveToStorage();
    calculateMetrics();
    renderDashboardView();
    renderInventoryView();
    renderReservationsView();
    renderAuditLogs();
}

function saveToStorage() {
    localStorage.setItem('lib_books', JSON.stringify(bookCollection));
    localStorage.setItem('lib_reservations', JSON.stringify(reservationCollection));
    localStorage.setItem('lib_logs', JSON.stringify(auditLogs));
}

function calculateMetrics() {
    UI.metricTotal.innerText = bookCollection.length;
    UI.metricAvail.innerText = bookCollection.filter(b => b.status === 'Available').length;
    UI.metricRes.innerText = reservationCollection.length;
}

// Log Writer Helper
function logEvent(text, type) {
    const timeString = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, month: 'numeric', day: 'numeric', year: 'numeric' });
    auditLogs.unshift({ text, type, time: timeString });
    refreshInterface();
}

// Section Rendering Modules
function renderDashboardView() {
    UI.dashboardTable.innerHTML = '';
    const slice = bookCollection.slice(-4).reverse();
    if(slice.length === 0) {
        UI.dashboardTable.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--text-secondary);">No dynamic tracking telemetry active.</td></tr>`;
        return;
    }
    slice.forEach(book => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${book.title}</strong></td>
            <td>${book.author}</td>
            <td><span class="badge ${book.status === 'Available' ? 'badge-available' : 'badge-reserved'}">${book.status}</span></td>
        `;
        UI.dashboardTable.appendChild(tr);
    });
}

function renderInventoryView(filterQuery = '') {
    UI.inventoryTable.innerHTML = '';
    const cleanQuery = filterQuery.toLowerCase().trim();
    
    const targetSet = bookCollection.filter(b => 
        b.id.toLowerCase().includes(cleanQuery) ||
        b.title.toLowerCase().includes(cleanQuery) ||
        b.author.toLowerCase().includes(cleanQuery)
    );

    if(targetSet.length === 0) {
        UI.inventoryTable.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-secondary);">No items match query constraints.</td></tr>`;
        return;
    }

    targetSet.forEach(book => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><code>${book.id}</code></td>
            <td><strong>${book.title}</strong></td>
            <td>${book.author}</td>
            <td><span class="badge ${book.status === 'Available' ? 'badge-available' : 'badge-reserved'}">${book.status}</span></td>
            <td>
                <div class="action-btn-group">
                    ${book.status === 'Available' ?
                        `<button class="icon-action-btn reserve-icon" onclick="triggerBookingWizard('${book.id}', '${escape(book.title)}')"><i class="fa-solid fa-calendar-plus" title="Reserve Asset"></i> Reserve</button>` : 
                        `<button class="icon-action-btn" disabled style="opacity:0.3; cursor:not-allowed;"><i class="fa-solid fa-lock"></i> Locked</button>`
                    }
                    <button class="icon-action-btn delete-icon" onclick="purgeAsset('${book.id}')" style="margin-left:12px;"><i class="fa-solid fa-trash"></i> Delete</button>
                </div>
            </td>
        `;
        UI.inventoryTable.appendChild(tr);
    });
}

function renderReservationsView(filterQuery = '') {
    UI.reservationsTable.innerHTML = '';
    const cleanQuery = filterQuery.toLowerCase().trim();

    const targetSet = reservationCollection.filter(r =>
        r.id.toLowerCase().includes(cleanQuery) ||
        r.bookTitle.toLowerCase().includes(cleanQuery) ||
        r.patron.toLowerCase().includes(cleanQuery)
    );

    if(targetSet.length === 0) {
        UI.reservationsTable.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-secondary);">No reservations active.</td></tr>`;
        return;
    }

    targetSet.forEach(res => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><code>${res.id}</code></td>
            <td><strong>${res.bookTitle}</strong></td>
            <td>${res.patron}</td>
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
    UI.logsContainer.innerHTML = '';
    if(auditLogs.length === 0) {
        UI.logsContainer.innerHTML = `<div style="text-align:center; color:var(--text-secondary); padding: 2rem 0;">Log vault cleared.</div>`;
        return;
    }
    auditLogs.forEach(log => {
        const div = document.createElement('div');
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
    UI.tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            UI.tabs.forEach(t => t.classList.remove('active'));
            UI.tabViews.forEach(v => v.classList.remove('active'));
            
            tab.classList.add('active');
            const viewTarget = tab.getAttribute('data-target');
            document.getElementById(viewTarget).classList.add('active');
            UI.viewTitle.innerText = tab.innerText.trim();
        });
    });

    // Asset Modals Toggles
    UI.openBookBtn.addEventListener('click', () => UI.bookModal.classList.add('active'));
    UI.closeBookBtn.addEventListener('click', () => UI.bookModal.classList.remove('active'));
    UI.cancelBookBtn.addEventListener('click', () => UI.bookModal.classList.remove('active'));
    
    UI.closeBookingBtn.addEventListener('click', () => UI.bookingModal.classList.remove('active'));
    UI.cancelBookingBtn.addEventListener('click', () => UI.bookingModal.classList.remove('active'));

    // Submission Logic Chains
    UI.bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const randId = "BK-" + Math.floor(1000 + Math.random() * 9000);
        const titleVal = document.getElementById('bookTitle').value.trim();
        const authorVal = document.getElementById('bookAuthor').value.trim();

        bookCollection.push({ id: randId, title: titleVal, author: authorVal, status: "Available" });
        UI.bookModal.classList.remove('active');
        UI.bookForm.reset();
        logEvent(`Registered asset entry [${titleVal}] under signature ${randId}.`, "create");
    });

    UI.bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const bId = "RES-" + Math.floor(1000 + Math.random() * 9000);
        const targetBookId = document.getElementById('bookingTargetId').value;
        const targetBookTitle = document.getElementById('bookingTargetTitle').value;
        const patronVal = document.getElementById('patronName').value.trim();
        const currentDate = new Date().toLocaleDateString();

        const book = bookCollection.find(b => b.id === targetBookId);
        if(book) book.status = "Reserved";

        reservationCollection.push({ id: bId, bookId: targetBookId, bookTitle: targetBookTitle, patron: patronVal, date: currentDate });
        UI.bookingModal.classList.remove('active');
        UI.bookingForm.reset();
        logEvent(`Issued structural lock on ${targetBookId} to patron (${patronVal}).`, "reserve");
    });

    // Real-Time Context Search
    UI.globalSearch.addEventListener('input', (e) => {
        const query = e.target.value;
        renderInventoryView(query);
        renderReservationsView(query);
    });

    UI.clearLogsBtn.addEventListener('click', () => {
        auditLogs = [];
        refreshInterface();
    });
}

// Global Scope Operation Wrappers
window.purgeAsset = function(id) {
    const matchIndex = bookCollection.findIndex(b => b.id === id);
    if(matchIndex !== -1) {
        const title = bookCollection[matchIndex].title;
        bookCollection.splice(matchIndex, 1);
        
        // Remove lingering active reservations for this specific book asset
        reservationCollection = reservationCollection.filter(r => r.bookId !== id);
        logEvent(`Purged asset registry ${id} (${title}) completely from memory matrix.`, "cancel");
    }
};

window.triggerBookingWizard = function(id, escapedTitle) {
    document.getElementById('bookingTargetId').value = id;
    document.getElementById('bookingTargetTitle').value = unescape(escapedTitle);
    UI.bookingModal.classList.add('active');
};

window.releaseReservation = function(resId, bookId) {
    reservationCollection = reservationCollection.filter(r => r.id !== resId);
    const book = bookCollection.find(b => b.id === bookId);
    if(book) book.status = "Available";
    logEvent(`Released lock allocation ${resId} for library book asset ${bookId}.`, "create");
};

// Start Runtime
document.addEventListener('DOMContentLoaded', initApp);