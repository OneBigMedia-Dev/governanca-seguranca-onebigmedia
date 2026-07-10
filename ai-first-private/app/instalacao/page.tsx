import Link from "next/link";
import type { ReactNode } from "react";

import { AppChrome } from "@/components/AppChrome";
import { requireAllowedSession } from "@/lib/session";

type InstallStep = {
  title: string;
  description: ReactNode;
  command?: string;
  result?: string;
};

const windowsSteps: InstallStep[] = [
  {
    title: "Instalar VS Code",
    description: (
      <>
        Baixe em{" "}
        <a className="inline-link" href="https://code.visualstudio.com/download" rel="noreferrer" target="_blank">
          code.visualstudio.com/download
        </a>
        . Marque Add to PATH quando aparecer e reabra o PowerShell.
      </>
    ),
    command: "code --version\ncode .",
    result: "Sucesso: o VS Code abre a pasta atual."
  },
  {
    title: "Instalar Git for Windows",
    description: (
      <>
        Baixe em{" "}
        <a className="inline-link" href="https://git-scm.com/download/win" rel="noreferrer" target="_blank">
          git-scm.com/download/win
        </a>
        . O Git também ajuda o Claude Code a usar ferramentas de terminal melhores no Windows.
      </>
    ),
    command:
      'git --version\ngit config --global user.name "Seu Nome"\ngit config --global user.email "seu.email@1bigmedia.group"',
    result: "Sucesso: Git instalado e usuário configurado."
  },
  {
    title: "Instalar Node.js LTS",
    description: (
      <>
        Baixe a versão LTS em{" "}
        <a className="inline-link" href="https://nodejs.org" rel="noreferrer" target="_blank">
          nodejs.org
        </a>
        . Next.js será usado via npx, sem instalação global.
      </>
    ),
    command: "node --version\nnpm --version\nnpx create-next-app@latest --version",
    result: "Sucesso: Node, npm e create-next-app respondem no terminal."
  },
  {
    title: "Instalar Python e pip",
    description: (
      <>
        Baixe em{" "}
        <a className="inline-link" href="https://www.python.org/downloads/" rel="noreferrer" target="_blank">
          python.org/downloads
        </a>
        . Marque Add python.exe to PATH no instalador.
      </>
    ),
    command: "python --version\npip --version",
    result: "Sucesso: Python e pip respondem no PowerShell."
  },
  {
    title: "Instalar Claude Code CLI",
    description: "Use o instalador nativo recomendado pela documentação oficial. Não precisa abrir como administrador.",
    command: "irm https://claude.ai/install.ps1 | iex\nclaude --version\nclaude doctor",
    result: "Sucesso: Claude Code instalado e diagnóstico sem erros críticos."
  },
  {
    title: "Instalar a extensão Claude Code no VS Code",
    description: "No VS Code, abra Extensions com Ctrl+Shift+X, procure Claude Code ou use o Marketplace oficial.",
    command: "code --install-extension anthropic.claude-code",
    result: "Sucesso: aparece o ícone/painel do Claude Code no VS Code."
  },
  {
    title: "Credenciais e acesso ao Claude",
    description:
      "Este guia leva apenas até a instalação estar pronta. As credenciais especiais de acesso ao Claude Code serão enviadas para todos os participantes antes da Aula 01.",
    result: "Sucesso: instalação validada; login será feito com as credenciais enviadas antes da aula."
  }
];

const macSteps: InstallStep[] = [
  {
    title: "Instalar VS Code",
    description: (
      <>
        Baixe em{" "}
        <a className="inline-link" href="https://code.visualstudio.com/download" rel="noreferrer" target="_blank">
          code.visualstudio.com/download
        </a>
        , arraste para Aplicativos e habilite o comando code pela Command Palette.
      </>
    ),
    command: "code --version\ncode .",
    result: "Sucesso: o VS Code abre a pasta atual."
  },
  {
    title: "Instalar ferramentas de linha de comando",
    description: (
      <>
        O Git costuma vir pelas Command Line Tools da Apple. Se preferir, também pode baixar em{" "}
        <a className="inline-link" href="https://git-scm.com/download/mac" rel="noreferrer" target="_blank">
          git-scm.com/download/mac
        </a>
        .
      </>
    ),
    command:
      'xcode-select --install\ngit --version\ngit config --global user.name "Seu Nome"\ngit config --global user.email "seu.email@1bigmedia.group"',
    result: "Sucesso: Git instalado e usuário configurado."
  },
  {
    title: "Instalar Node.js LTS",
    description: (
      <>
        Baixe em{" "}
        <a className="inline-link" href="https://nodejs.org" rel="noreferrer" target="_blank">
          nodejs.org
        </a>{" "}
        ou use Homebrew, se já estiver padronizado no seu Mac.
      </>
    ),
    command: "node --version\nnpm --version\nnpx create-next-app@latest --version",
    result: "Sucesso: Node, npm e create-next-app respondem no terminal."
  },
  {
    title: "Instalar Python e pip",
    description: (
      <>
        Baixe em{" "}
        <a className="inline-link" href="https://www.python.org/downloads/" rel="noreferrer" target="_blank">
          python.org/downloads
        </a>
        . Vamos usar Python para planilhas, dados, scripts e protótipos.
      </>
    ),
    command: "python3 --version\npython3 -m pip --version",
    result: "Sucesso: Python e pip respondem no terminal."
  },
  {
    title: "Instalar Claude Code CLI",
    description: "Use o instalador nativo recomendado pela documentação oficial e reabra o Terminal após instalar.",
    command: "curl -fsSL https://claude.ai/install.sh | bash\nclaude --version\nclaude doctor",
    result: "Sucesso: Claude Code instalado e diagnóstico sem erros críticos."
  },
  {
    title: "Instalar a extensão Claude Code no VS Code",
    description: "No VS Code, abra Extensions com Cmd+Shift+X, procure Claude Code ou instale pelo comando abaixo.",
    command: "code --install-extension anthropic.claude-code",
    result: "Sucesso: aparece o ícone/painel do Claude Code no VS Code."
  },
  {
    title: "Credenciais e acesso ao Claude",
    description:
      "Este guia leva apenas até a instalação estar pronta. As credenciais especiais de acesso ao Claude Code serão enviadas para todos os participantes antes da Aula 01.",
    result: "Sucesso: instalação validada; login será feito com as credenciais enviadas antes da aula."
  }
];

function InstallSteps({ steps }: { steps: InstallStep[] }) {
  return (
    <div className="install-steps">
      {steps.map((step, index) => (
        <article className="install-step" key={step.title}>
          <span className="install-step-num">{index + 1}</span>
          <div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            {step.command ? (
              <pre className="command-block">
                <code>{step.command}</code>
              </pre>
            ) : null}
            {step.result ? <p className="verify-line">{step.result}</p> : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export default async function InstalacaoPage() {
  const session = await requireAllowedSession();
  const email = session.user?.email ?? "conta autorizada";

  return (
    <AppChrome email={email}>
      <div className="page-title">
        <div>
          <p className="muted">Pré-curso AI First</p>
          <h1>Instalação passo a passo</h1>
        </div>
      </div>

      <section className="intro-band">
        <h2>Antes de começar</h2>
        <p>
          Siga o roteiro do seu sistema operacional e valide cada comando no terminal. Depois,
          marque os itens concluídos no checklist para registrar seu progresso.
        </p>
      </section>

      <div className="quick-links">
        <Link className="button" href="/materiais">
          Ver materiais
        </Link>
        <Link className="button secondary" href="/checklist">
          Abrir checklist
        </Link>
        <Link className="button secondary" href="/duvidas">
          Dúvidas com P&D
        </Link>
      </div>

      <section className="section-band">
        <div className="section-heading">
          <h2>Windows</h2>
          <span className="deadline-pill">Prazo: 16/07/2026</span>
        </div>
        <InstallSteps steps={windowsSteps} />
      </section>

      <section className="section-band">
        <div className="section-heading">
          <h2>Mac</h2>
          <span className="deadline-pill">Prazo: 16/07/2026</span>
        </div>
        <InstallSteps steps={macSteps} />
      </section>

      <section className="intro-band">
        <h2>Materiais e suporte</h2>
        <p>
          O guia de instalação e o guia de ferramentas estão em{" "}
          <Link className="inline-link" href="/materiais">
            Materiais
          </Link>
          . Em caso de erro, dúvida ou bloqueio de acesso, acione a equipe de P&D pela página de{" "}
          <Link className="inline-link" href="/duvidas">
            Dúvidas
          </Link>
          .
        </p>
      </section>
    </AppChrome>
  );
}
