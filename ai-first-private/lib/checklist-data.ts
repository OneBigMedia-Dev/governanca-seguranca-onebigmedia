export type ChecklistItem = {
  id: string;
  label: string;
};

export type ChecklistSection = {
  title: string;
  deadline: string;
  description: string;
  links: Array<{
    href: string;
    label: string;
  }>;
  items: ChecklistItem[];
};

export const checklistSections: ChecklistSection[] = [
  {
    title: "Ferramentas e instalação",
    deadline: "Prazo: quinta-feira, 16/07/2026",
    description:
      "Instale e valide cada ferramenta. Se tiver dúvida, consulte os materiais disponíveis ou a página de instalação. Se ainda houver erro, acione o time de P&D.",
    links: [
      { href: "/materiais", label: "Materiais" },
      { href: "/programa-ai-first#instalacao", label: "Página de instalação" },
      { href: "/duvidas", label: "Dúvidas" }
    ],
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
    description:
      "Faça login no site da Anthropic com a conta da empresa. Use a tradução do navegador para português quando precisar e ative legendas nos vídeos. Em caso de dúvida, acione o time de P&D.",
    links: [
      { href: "https://anthropic.skilljar.com/", label: "Anthropic Academy" },
      { href: "/duvidas", label: "Dúvidas" }
    ],
    items: [
      { id: "claude-101", label: "Concluí Claude 101" },
      { id: "claude-code-101", label: "Concluí Claude Code 101" },
      { id: "platform-101", label: "Concluí Claude Platform 101" },
      { id: "governance-read", label: "Li as regras de governança e segurança" }
    ]
  },
  {
    title: "Mapeamento de uma dor da área",
    deadline: "Prazo: quinta-feira, 23/07/2026",
    description:
      "Escolha uma dor real da sua área. Uma forma simples é entrar em uma call consigo mesmo, ligar a transcrição e registrar contexto, etapas, responsáveis, inputs, outputs, exceções e dores. Em caso de dúvidas, acione o time de P&D.",
    links: [{ href: "/duvidas", label: "Dúvidas" }],
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
