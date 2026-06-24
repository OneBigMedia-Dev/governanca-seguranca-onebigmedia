(function () {
  const pages = window.GOVERNANCA_PAGES || [];
  const nav = document.getElementById("nav");
  const searchInput = document.getElementById("searchInput");
  const pageKicker = document.getElementById("pageKicker");
  const pageTitle = document.getElementById("pageTitle");
  const overview = document.getElementById("overview");
  const pageSections = document.getElementById("pageSections");
  const pageToc = document.getElementById("pageToc");
  const copyPageLink = document.getElementById("copyPageLink");

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  function currentId() {
    return window.location.hash.replace("#", "") || "inicio";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderNav(filter = "") {
    const normalized = filter.trim().toLowerCase();
    const visiblePages = pages.filter((page) => {
      if (!normalized) return true;
      return [page.title, page.nav, page.group, page.summary]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });

    nav.innerHTML = visiblePages
      .map((page) => {
        const active = page.id === currentId() ? " active" : "";
        return `<a class="nav-item${active}" href="#${page.id}">
          <strong>${escapeHtml(page.nav)}</strong>
          <span>${escapeHtml(page.group)}</span>
        </a>`;
      })
      .join("");

    if (!visiblePages.length) {
      nav.innerHTML = `<div class="empty-state">Nenhum tópico encontrado.</div>`;
    }
  }

  function renderOverview(page) {
    overview.innerHTML = `
      <article class="summary-panel">
        <p>${escapeHtml(page.summary)}</p>
      </article>
      <aside class="meta-panel" aria-label="Metadados da página">
        <div class="meta-grid">
          <div class="meta-item"><span>Responsável</span><strong>${escapeHtml(page.owner)}</strong></div>
          <div class="meta-item"><span>Público</span><strong>${escapeHtml(page.audience)}</strong></div>
          <div class="meta-item"><span>Revisão</span><strong>${escapeHtml(page.review)}</strong></div>
        </div>
      </aside>
    `;
  }

  function slugify(value) {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function renderToc(page) {
    pageToc.innerHTML = page.sections
      .map((section) => `<a href="#sec-${slugify(section.title)}">${escapeHtml(section.title)}</a>`)
      .join("");
  }

  function renderCards(cards) {
    if (!cards) return "";
    return `<div class="card-grid">${cards
      .map(
        (card) => `<article class="info-card ${escapeHtml(card.className || "")}">
          <h4>${escapeHtml(card.title)}</h4>
          <p>${escapeHtml(card.text)}</p>
        </article>`
      )
      .join("")}</div>`;
  }

  function renderChecklist(items) {
    if (!items) return "";
    return `<ul class="check-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function renderPipeline(steps) {
    if (!steps) return "";
    return `<div class="pipeline">${steps
      .map(
        (step) => `<article class="pipeline-step">
          <div>
            <h4>${escapeHtml(step.title)}</h4>
            <p>${escapeHtml(step.text)}</p>
            ${
              step.details
                ? `<ul>${step.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}</ul>`
                : ""
            }
          </div>
        </article>`
      )
      .join("")}</div>`;
  }

  function renderFlowDiagram(flow) {
    if (!flow) return "";
    return `<div class="flowchart">
      <div class="flow-legend" aria-label="Legenda do fluxograma">
        <span><i class="legend-dot step"></i>Etapa</span>
        <span><i class="legend-dot decision"></i>Decisão</span>
        <span><i class="legend-dot approval"></i>Aprovação</span>
        <span><i class="legend-dot risk"></i>Risco</span>
      </div>
      <div class="flow-diagram">${flow
        .map(
          (step, index) => `<article class="flow-node ${escapeHtml(step.type || "operational")}">
            <div class="flow-step-number">${index + 1}</div>
            <div>
              <span class="flow-type">${escapeHtml(typeLabel(step.type))}</span>
              <h4>${escapeHtml(step.title)}</h4>
              <p>${escapeHtml(step.text)}</p>
              ${
                step.details
                  ? `<ul>${step.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}</ul>`
                  : ""
              }
            </div>
          </article>`
        )
        .join("")}</div>
    </div>`;
  }

  function typeLabel(type) {
    const labels = {
      decision: "Decisão",
      approval: "Aprovação",
      risk: "Risco",
      operational: "Etapa"
    };
    return labels[type] || labels.operational;
  }

  function renderStructureDiagram(structure) {
    if (!structure) return "";
    return `<div class="structure-diagram">
      <div class="structure-root">${escapeHtml(structure.root)}</div>
      <div class="structure-grid">${structure.groups
        .map(
          (group) => `<section class="structure-group">
            <h4>${escapeHtml(group.title)}</h4>
            <ul>${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </section>`
        )
        .join("")}</div>
    </div>`;
  }

  function renderMatrix(matrix) {
    if (!matrix) return "";
    return `<table class="matrix-table">
      <thead>
        <tr>${matrix.headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${matrix.rows
          .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
          .join("")}
      </tbody>
    </table>`;
  }

  function renderSwimlane(lanes) {
    if (!lanes) return "";
    return `<div class="swimlane">${lanes
      .map(
        (lane) => `<section class="swimlane-row">
          <div class="swimlane-title">${escapeHtml(lane.title)}</div>
          <div class="swimlane-steps">${lane.steps
            .map((step) => `<span class="swimlane-step">${escapeHtml(step)}</span>`)
            .join("")}</div>
        </section>`
      )
      .join("")}</div>`;
  }

  function renderReferences(references) {
    if (!references) return "";
    return `<div class="reference-list">${references
      .map(
        (reference) => `<a class="reference-item" href="${escapeHtml(reference.url)}" target="_blank" rel="noreferrer">
          <strong>${escapeHtml(reference.title)}</strong>
          <span>${escapeHtml(reference.description || reference.url)}</span>
        </a>`
      )
      .join("")}</div>`;
  }

  function renderTemplate(section) {
    if (!section.template) return "";
    const id = `template-${Math.random().toString(36).slice(2)}`;
    window.setTimeout(() => {
      const button = document.querySelector(`[data-copy="${id}"]`);
      if (!button) return;
      button.addEventListener("click", async () => {
        await copyText(section.template);
        button.textContent = "Copiado";
        window.setTimeout(() => {
          button.textContent = "Copiar";
        }, 1600);
      });
    }, 0);

    return `<div class="template-block">
      <div class="template-head">
        <h4>${escapeHtml(section.title)}</h4>
        <button type="button" data-copy="${id}">Copiar</button>
      </div>
      <pre><code>${escapeHtml(section.template)}</code></pre>
    </div>`;
  }

  function renderSections(page) {
    pageSections.innerHTML = page.sections
      .map((section) => {
        const templateOnly =
          section.template &&
          !section.body &&
          !section.cards &&
          !section.checklist &&
          !section.pipeline &&
          !section.flow &&
          !section.structure &&
          !section.matrix &&
          !section.swimlane &&
          !section.references;
        if (templateOnly) return renderTemplate(section);

        return `<article class="section-block" id="sec-${slugify(section.title)}">
          <div class="section-header">
            <div class="section-icon" aria-hidden="true">${escapeHtml(section.icon || "•")}</div>
            <h3>${escapeHtml(section.title)}</h3>
          </div>
          ${section.body ? `<p>${escapeHtml(section.body)}</p>` : ""}
          ${renderChecklist(section.checklist)}
          ${renderCards(section.cards)}
          ${renderPipeline(section.pipeline)}
          ${renderFlowDiagram(section.flow)}
          ${renderStructureDiagram(section.structure)}
          ${renderMatrix(section.matrix)}
          ${renderSwimlane(section.swimlane)}
          ${renderReferences(section.references)}
          ${renderTemplate(section)}
        </article>`;
      })
      .join("");
  }

  function renderPage() {
    const page = pages.find((item) => item.id === currentId()) || pages[0];
    if (!page) return;

    document.title = `${page.title} - OneBigMedia`;
    pageKicker.textContent = page.kicker;
    pageTitle.textContent = page.title;
    renderOverview(page);
    renderToc(page);
    renderSections(page);
    renderNav(searchInput.value);
  }

  searchInput.addEventListener("input", () => renderNav(searchInput.value));
  window.addEventListener("hashchange", renderPage);
  copyPageLink.addEventListener("click", async () => {
    await copyText(window.location.href);
    copyPageLink.textContent = "Link copiado";
    window.setTimeout(() => {
      copyPageLink.textContent = "Copiar link";
    }, 1600);
  });

  renderPage();
})();
