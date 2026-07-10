"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { checklistSections } from "@/lib/checklist-data";

type LoadState = "loading" | "ready" | "error";
type SaveState = "idle" | "saving" | "saved" | "error";

type ProgressResponse = {
  checkedIds?: string[];
  reason?: string;
};

function toCheckedSet(ids: unknown): Set<string> {
  if (!Array.isArray(ids)) {
    return new Set();
  }

  return new Set(ids.filter((item): item is string => typeof item === "string"));
}

export function ChecklistClient() {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [syncMessage, setSyncMessage] = useState("Carregando progresso...");
  const saveSequenceRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    async function loadProgress() {
      try {
        const response = await fetch("/api/checklist-progress", { cache: "no-store" });

        if (!response.ok) {
          const errorData = (await response.json().catch(() => ({}))) as ProgressResponse;
          throw new Error(errorData.reason ?? `status_${response.status}`);
        }

        const data = (await response.json()) as ProgressResponse;

        if (isMounted) {
          setCheckedIds(toCheckedSet(data.checkedIds));
          setLoadState("ready");
          setSaveState("saved");
          setSyncMessage("Salvo no Supabase");
        }
      } catch (error) {
        if (isMounted) {
          setLoadState("error");
          setSaveState("error");
          setSyncMessage(
            error instanceof Error
              ? `Não foi possível sincronizar: ${error.message}`
              : "Não foi possível sincronizar"
          );
        }
      }
    }

    void loadProgress();

    return () => {
      isMounted = false;
    };
  }, []);

  const allItems = useMemo(() => checklistSections.flatMap((section) => section.items), []);
  const completed = checkedIds.size;
  const total = allItems.length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  const isReady = loadState === "ready";

  async function persistCheckedIds(nextCheckedIds: Set<string>) {
    const sequence = saveSequenceRef.current + 1;
    saveSequenceRef.current = sequence;
    setSaveState("saving");
    setSyncMessage("Salvando...");

    try {
      const response = await fetch("/api/checklist-progress", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          checkedIds: Array.from(nextCheckedIds)
        })
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as ProgressResponse;
        throw new Error(errorData.reason ?? `status_${response.status}`);
      }

      if (saveSequenceRef.current === sequence) {
        setSaveState("saved");
        setSyncMessage("Salvo no Supabase");
      }
    } catch (error) {
      if (saveSequenceRef.current === sequence) {
        setSaveState("error");
        setSyncMessage(
          error instanceof Error
            ? `Não foi possível sincronizar: ${error.message}`
            : "Não foi possível sincronizar"
        );
      }
    }
  }

  function toggleItem(id: string) {
    if (!isReady) {
      return;
    }

    setCheckedIds((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      void persistCheckedIds(next);
      return next;
    });
  }

  function resetChecklist() {
    if (!isReady) {
      return;
    }

    const next = new Set<string>();
    setCheckedIds(next);
    void persistCheckedIds(next);
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
          <strong>{checklistSections.length}</strong>
          <span>frentes</span>
        </div>
      </div>

      <div className="progress-bar" style={{ "--progress": `${progress}%` } as CSSProperties}>
        <span />
      </div>

      <div className="quick-links">
        <a className="button secondary" href="/programa-ai-first">
          Abrir programa
        </a>
        <button className="button ghost" type="button" onClick={resetChecklist} disabled={!isReady}>
          Limpar checklist
        </button>
        <span className={saveState === "error" ? "sync-status error" : "sync-status"} aria-live="polite">
          {syncMessage}
        </span>
      </div>

      <div className="checklist" style={{ marginTop: 28 }}>
        {checklistSections.map((section) => (
          <section className="section-band" key={section.title}>
            <div className="section-heading">
              <h2>{section.title}</h2>
              <span className="deadline-pill">{section.deadline}</span>
            </div>
            <div className="checks-grid">
              {section.items.map((item) => {
                const isDone = checkedIds.has(item.id);
                return (
                  <button
                    aria-pressed={isDone}
                    className={isDone ? "check-item done" : "check-item"}
                    disabled={!isReady}
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
