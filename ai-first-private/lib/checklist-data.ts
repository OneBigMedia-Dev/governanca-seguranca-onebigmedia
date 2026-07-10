export type ChecklistItem = {
  id: string;
  label: string;
};

export type ChecklistSection = {
  title: string;
  deadline: string;
  items: ChecklistItem[];
};

export const checklistSections: ChecklistSection[] = [
  {
    title: "Ferramentas e instalação",
    deadline: "Prazo: quinta-feira, 16/07/2026",
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
    title: "Cursos obrigatórios",
    deadline: "Prazo: quinta-feira, 23/07/2026",
    items: [
      { id: "claude-101", label: "Concluí Claude 101" },
      { id: "claude-code-101", label: "Concluí Claude Code 101" },
      { id: "platform-101", label: "Concluí Claude Platform 101" },
      { id: "governance-read", label: "Li as regras de governança e segurança" }
    ]
  },
  {
    title: "Transcrição do projeto",
    deadline: "Prazo: quinta-feira, 23/07/2026",
    items: [
      { id: "project-context", label: "Transcrevi o contexto do projeto solicitado" },
      { id: "project-process", label: "Descrevi o processo atual e as ferramentas usadas" },
      { id: "project-pain", label: "Registrei a dor principal e o impacto esperado" },
      { id: "project-data", label: "Listei dados, arquivos, APIs ou sistemas envolvidos" },
      { id: "project-security", label: "Registrei limites de segurança e dados que não podem entrar em prompt" },
      { id: "project-validation", label: "Deixei a transcrição pronta para validação" }
    ]
  }
];

export const checklistItemIds = checklistSections.flatMap((section) =>
  section.items.map((item) => item.id)
);
