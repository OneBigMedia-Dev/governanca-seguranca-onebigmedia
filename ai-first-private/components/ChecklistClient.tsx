"use client";

import { useEffect, useMemo, useState } from "react";

type ChecklistItem = {
  id: string;
  label: string;
};

type ChecklistSection = {
  title: string;
  items: ChecklistItem[];
};

const STORAGE_KEY = "onebigmedia-ai-first-checklist-v1";

const sections: ChecklistSection[] = [
  {
    title: "Instalação",
    items: [
      { id: "vscode", label: "Instalei VS Code e validei o terminal integrado" },
      { id: "git", label: "Instalei Git e configurei nome e e-mail" },
      { id: "node", label: "Instalei Node.js LTS e validei npm/create-next-app" },
      { id: "python", label: "Instalei Python e validei pip" },
      { id: "claude-cli", label: "Instalei Claude Code CLI e rodei claude doctor" },
      { id: "claude-vscode", label: "Instalei a extensão Claude Code no VS Code" }
    ]
  },
  {
    title: "Cursos e fundamentos",
    items: [
      { id: "claude-101", label: "Concluí Claude 101" },
      { id: "claude-code-101", label: "Concluí Claude Code 101" },
      { id: "platform-101", label: "Concluí Claude Platform 101" },
      { id: "governance-read", label: "Li as regras de governança e segurança" }
    ]
  },
  {
    title: "Mapeamento do processo",
    items: [
      { id: "area-owner", label: "Defini área, responsável e validador do desafio" },
      { id: "current-process", label: "Mapeei o processo atual e ferramentas usadas" },
      { id: "pain", label: "Escrevi a dor principal e o impacto esperado" },
      { id: "data-sources", label: "Listei dados, arquivos, APIs ou sistemas envolvidos" },
      { id: "security-limits", label: "Registrei limites de segurança e dados que não podem entrar em prompt" }
    ]
  },
  {
    title: "Preparação do MVP",
    items: [
      { id: "workspace", label: "Criei a pasta OneBigMediaOS (Blueprint)" },
      { id: "docs", label: "Criei README, DESAFIO, PROMPTS e DECISÕES" },
      { id: "first-plan", label: "Usei Plan Mode para propor os próximos passos" },
      { id: "review", label: "Revisei riscos, permissões, hooks, subagents e logs" },
      { id: "demo-plan", label: "Preparei a narrativa de demo e critérios de continuidade" }
    ]
  }
];

function loadCheckedIds(): Set<string> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : []);
  } catch {
    return new Set();
  }
}

export function ChecklistClient() {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCheckedIds(loadCheckedIds());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checkedIds)));
  }, [checkedIds, isLoaded]);

  const allItems = useMemo(() => sections.flatMap((section) => section.items), []);
  const completed = checkedIds.size;
  const total = allItems.length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  function toggleItem(id: string) {
    setCheckedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function resetChecklist() {
    setCheckedIds(new Set());
  }

  return (
    <>
      <div className="summary-grid">
        <div className="summary-item">
          <strong>{progress}%</strong>
          <span>progresso</span>
        </div>
        <div className="summary-item">
          <strong>{completed}</strong>
          <span>itens concluídos</span>
        </div>
        <div className="summary-item">
          <strong>{total}</strong>
          <span>itens totais</span>
        </div>
        <div className="summary-item">
          <strong>{sections.length}</strong>
          <span>frentes</span>
        </div>
      </div>

      <div className="progress-bar" style={{ "--progress": `${progress}%` } as React.CSSProperties}>
        <span />
      </div>

      <div className="quick-links">
        <a className="button secondary" href="/programa-ai-first">
          Abrir programa
        </a>
        <button className="button ghost" type="button" onClick={resetChecklist}>
          Limpar checklist
        </button>
      </div>

      <div className="checklist" style={{ marginTop: 28 }}>
        {sections.map((section) => (
          <section className="section-band" key={section.title}>
            <h2>{section.title}</h2>
            <div className="checks-grid">
              {section.items.map((item) => {
                const isDone = checkedIds.has(item.id);
                return (
                  <button
                    aria-pressed={isDone}
                    className={isDone ? "check-item done" : "check-item"}
                    key={item.id}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                  >
                    <span className="check-box">{isDone ? "✓" : ""}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
