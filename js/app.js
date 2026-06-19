/* Clearlane — app controller */

const state = {
  rows: [],
  fileName: "",
  countryRules: DEFAULT_COUNTRY_RULES.map((r) => ({ ...r })),
  dateFormat: DATE_FORMATS[0],
  timeFormat: TIME_FORMATS[0],
  paymentModes: [...DEFAULT_PAYMENT_MODES],
  results: [],
  activeFilter: "all",
  searchTerm: "",
};

/* ---------- icon hydration ---------- */
function hydrateIcons() {
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (!ICONS[name]) return;
    el.insertAdjacentHTML("afterbegin", icon(name));
  });
}

/* ---------- toast ---------- */
function showToast(message) {
  const stack = document.getElementById("toastStack");
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `${icon("checkCircle")}<span>${message}</span>`;
  stack.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transition = "opacity .2s ease";
    setTimeout(() => el.remove(), 220);
  }, 2600);
}

/* ---------- stepper ---------- */
function setActiveStep(stepNumber) {
  document.querySelectorAll(".lane-step").forEach((el) => {
    const n = Number(el.dataset.step);
    el.classList.remove("is-active", "is-done");
    if (n < stepNumber) el.classList.add("is-done");
    else if (n === stepNumber) el.classList.add("is-active");
  });
  const pct = ((Math.min(stepNumber, 4) - 1) / 3) * 100;
  const progress = document.getElementById("lanesProgress");
  if (progress) progress.style.width = `calc(${pct}% )`;
}

/* ---------- config panel: rule table ---------- */
function renderRuleTable() {
  const body = document.getElementById("ruleTableBody");
  body.innerHTML = state.countryRules
    .map(
      (rule, i) => `
    <tr data-i="${i}">
      <td><input class="rule-input" data-field="country" value="${rule.country}" /></td>
      <td><input class="rule-input" data-field="code" value="${rule.code}" style="text-transform:uppercase;" /></td>
      <td><input class="rule-input digits" data-field="digits" type="number" min="4" max="15" value="${rule.digits}" /></td>
      <td><button class="icon-btn" data-action="remove-rule">${icon("trash")}</button></td>
    </tr>`
    )
    .join("");

  body.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", (e) => {
      const tr = e.target.closest("tr");
      const i = Number(tr.dataset.i);
      const field = e.target.dataset.field;
      state.countryRules[i][field] = field === "digits" ? Number(e.target.value) : e.target.value;
    });
  });

  body.querySelectorAll('[data-action="remove-rule"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tr = e.target.closest("tr");
      const i = Number(tr.dataset.i);
      state.countryRules.splice(i, 1);
      renderRuleTable();
    });
  });
}

function addRuleRow() {
  state.countryRules.push({ country: "New country", code: "", dial: "", digits: 10 });
  renderRuleTable();
}

/* ---------- config panel: formats + payment modes ---------- */
function renderFormatSelects() {
  const dateSel = document.getElementById("dateFormatSelect");
  dateSel.innerHTML = DATE_FORMATS.map((f) => `<option value="${f}">${f}</option>`).join("");
  dateSel.value = state.dateFormat;
  dateSel.addEventListener("change", (e) => (state.dateFormat = e.target.value));

  const timeSel = document.getElementById("timeFormatSelect");
  timeSel.innerHTML = TIME_FORMATS.map((f) => `<option value="${f}">${f}</option>`).join("");
  timeSel.value = state.timeFormat;
  timeSel.addEventListener("change", (e) => (state.timeFormat = e.target.value));

  const paymentInput = document.getElementById("paymentModesInput");
  paymentInput.value = state.paymentModes.join(", ");
  paymentInput.addEventListener("input", (e) => {
    state.paymentModes = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
  });
}

/* ---------- file handling ---------- */
function setFile(rows, fileName) {
  state.rows = rows;
  state.fileName = fileName;
  state.results = [];

  document.getElementById("filePillSlot").innerHTML = `
    <div class="file-pill">
      ${icon("fileText")}
      <div class="file-pill-text">
        <div class="file-pill-name">${fileName}</div>
        <div class="file-pill-meta">${rows.length.toLocaleString()} rows detected</div>
      </div>
    </div>`;

  document.getElementById("clearFileBtn").style.display = "inline-flex";
  document.getElementById("validateBtn").disabled = rows.length === 0;
  resetResultsUI();
  setActiveStep(2);
}

function clearFile() {
  state.rows = [];
  state.fileName = "";
  state.results = [];
  document.getElementById("filePillSlot").innerHTML = "";
  document.getElementById("clearFileBtn").style.display = "none";
  document.getElementById("validateBtn").disabled = true;
  document.getElementById("fileInput").value = "";
  resetResultsUI();
  resetExportUI();
  setActiveStep(1);
}

function parseCSVText(text, fileName) {
  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
  setFile(parsed.data, fileName);
}

function handleFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => parseCSVText(e.target.result, file.name);
  reader.readAsText(file);
}

/* ---------- validation run ---------- */
function runValidation() {
  if (state.rows.length === 0) return;

  const config = {
    countryRules: state.countryRules.filter((r) => r.code),
    dateFormat: state.dateFormat,
    timeFormat: state.timeFormat,
    paymentModes: state.paymentModes,
  };

  state.results = validateDataset(state.rows, config);
  state.activeFilter = "all";
  state.searchTerm = "";

  renderResults();
  enableExports();
  setActiveStep(4);
}

/* ---------- results rendering ---------- */
function resetResultsUI() {
  document.getElementById("resultsBody").innerHTML = `
    <div class="empty-state">
      ${`<div class="empty-state-icon">${icon("fileText")}</div>`}
      <div class="empty-state-title">No results yet</div>
      <div class="empty-state-sub">Upload a file and run validation above to see row-by-row results here.</div>
    </div>`;
}

function resetExportUI() {
  ["downloadCleanBtn", "downloadRejectedBtn", "downloadChunksBtn"].forEach((id) => {
    document.getElementById(id).disabled = true;
  });
}

function enableExports() {
  document.getElementById("downloadCleanBtn").disabled = false;
  document.getElementById("downloadRejectedBtn").disabled = state.results.every((r) => r.valid);
  document.getElementById("downloadChunksBtn").disabled = false;
}

function getHeaders() {
  if (state.rows.length === 0) return [];
  return Object.keys(state.rows[0]);
}

function filteredResults() {
  let list = state.results;
  if (state.activeFilter === "valid") list = list.filter((r) => r.valid);
  if (state.activeFilter === "invalid") list = list.filter((r) => !r.valid);

  if (state.searchTerm) {
    const term = state.searchTerm.toLowerCase();
    list = list.filter((r) =>
      Object.values(r.row).some((v) => String(v ?? "").toLowerCase().includes(term))
    );
  }
  return list;
}

function renderResults() {
  const total = state.results.length;
  const validCount = state.results.filter((r) => r.valid).length;
  const invalidCount = total - validCount;
  const errorRate = total ? Math.round((invalidCount / total) * 100) : 0;

  const headers = getHeaders().slice(0, 6); // keep the preview table readable
  const visible = filteredResults().slice(0, 200);

  document.getElementById("resultsBody").innerHTML = `
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-icon tone-neutral">${icon("database")}</div>
        <div class="stat-value">${total.toLocaleString()}</div>
        <div class="stat-label">Total rows</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon tone-accent">${icon("checkCircle")}</div>
        <div class="stat-value">${validCount.toLocaleString()}</div>
        <div class="stat-label">Passed validation</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon tone-danger">${icon("xCircle")}</div>
        <div class="stat-value">${invalidCount.toLocaleString()}</div>
        <div class="stat-label">Flagged rows</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon tone-warn">${icon("alertTriangle")}</div>
        <div class="stat-value">${errorRate}%</div>
        <div class="stat-label">Error rate</div>
      </div>
    </div>

    <div class="results-toolbar">
      <div class="search-box">
        ${icon("search")}
        <input type="text" id="searchInput" placeholder="Search order id, customer, product..." value="${state.searchTerm}" />
      </div>
      <div class="chip-group" id="filterChips">
        <button class="chip ${state.activeFilter === "all" ? "is-active" : ""}" data-filter="all">All ${total}</button>
        <button class="chip tone-accent ${state.activeFilter === "valid" ? "is-active" : ""}" data-filter="valid">Valid ${validCount}</button>
        <button class="chip tone-danger ${state.activeFilter === "invalid" ? "is-active" : ""}" data-filter="invalid">Invalid ${invalidCount}</button>
      </div>
    </div>

    <div class="table-wrap">
      <div class="table-scroll">
        <table class="results-table">
          <thead>
            <tr>
              <th>Status</th>
              ${headers.map((h) => `<th>${h}</th>`).join("")}
              <th>Issues</th>
            </tr>
          </thead>
          <tbody>
            ${
              visible.length
                ? visible
                    .map(
                      (r) => `
              <tr>
                <td>
                  <span class="status-pill ${r.valid ? "valid" : "invalid"}">
                    ${icon(r.valid ? "checkCircle" : "xCircle")}
                    ${r.valid ? "Valid" : "Invalid"}
                  </span>
                </td>
                ${headers.map((h) => `<td>${escapeHtml(r.row[h] ?? "")}</td>`).join("")}
                <td class="cell-issues">${r.errors.join(" · ") || "—"}</td>
              </tr>`
                    )
                    .join("")
                : `<tr><td colspan="${headers.length + 2}" style="text-align:center; padding:30px; font-family:var(--font-body); color:var(--ink-faint);">No rows match this filter.</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </div>
    ${
      filteredResults().length > 200
        ? `<p style="margin-top:10px; font-size:12px; color:var(--ink-faint);">Showing first 200 of ${filteredResults().length} matching rows. Download the full export below.</p>`
        : ""
    }
  `;

  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.searchTerm = e.target.value;
    renderResults();
  });
  document.querySelectorAll("#filterChips .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.activeFilter = chip.dataset.filter;
      renderResults();
    });
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* ---------- exports ---------- */
function downloadClean() {
  const csv = buildCleanCSV(state.results);
  downloadBlob(csv, `clearlane_clean_${timestampSlug()}.csv`);
  showToast("Clean dataset downloaded");
}

function downloadRejected() {
  const csv = buildRejectedCSV(state.results);
  downloadBlob(csv, `clearlane_rejected_${timestampSlug()}.csv`);
  showToast("Rejected rows downloaded");
}

async function downloadChunks() {
  const size = Math.max(10, Number(document.getElementById("chunkSizeInput").value) || 500);
  const { blob, count } = await buildChunkZip(state.results, size);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `clearlane_chunks_${timestampSlug()}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Zip with ${count} chunk file${count === 1 ? "" : "s"} downloaded`);
}

function updateChunkNote() {
  const size = Math.max(10, Number(document.getElementById("chunkSizeInput").value) || 500);
  const validCount = state.results.filter((r) => r.valid).length;
  const parts = validCount ? Math.ceil(validCount / size) : 0;
  document.getElementById("chunkNote").textContent = validCount
    ? `rows per file → ${parts} file${parts === 1 ? "" : "s"}`
    : "rows per file";
}

/* ---------- wiring ---------- */
function wireEvents() {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");

  dropzone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => handleFile(e.target.files[0]));

  ["dragenter", "dragover"].forEach((evt) =>
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.add("is-dragover");
    })
  );
  ["dragleave", "drop"].forEach((evt) =>
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.remove("is-dragover");
    })
  );
  dropzone.addEventListener("drop", (e) => {
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  document.getElementById("sampleBtn").addEventListener("click", () => {
    parseCSVText(getSampleCSV(), "sample_transactions.csv");
  });

  document.getElementById("clearFileBtn").addEventListener("click", clearFile);
  document.getElementById("addRuleBtn").addEventListener("click", addRuleRow);
  document.getElementById("validateBtn").addEventListener("click", runValidation);

  document.getElementById("downloadCleanBtn").addEventListener("click", downloadClean);
  document.getElementById("downloadRejectedBtn").addEventListener("click", downloadRejected);
  document.getElementById("downloadChunksBtn").addEventListener("click", downloadChunks);
  document.getElementById("chunkSizeInput").addEventListener("input", updateChunkNote);
}

/* ---------- init ---------- */
function init() {
  hydrateIcons();
  renderRuleTable();
  renderFormatSelects();
  wireEvents();
  setActiveStep(1);
}

document.addEventListener("DOMContentLoaded", init);
