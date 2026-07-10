import Link from "next/link";

import { AppChrome } from "@/components/AppChrome";
import { requireAllowedSession } from "@/lib/session";

export default async function OrientacoesPage() {
  const session = await requireAllowedSession();
  const email = session.user?.email ?? "conta autorizada";

  return (
    <AppChrome email={email}>
      <div className="page-title">
        <div>
          <p className="muted">Pré-curso AI First</p>
          <h1>O que fazer agora</h1>
        </div>
      </div>

      <section className="intro-band">
        <p>
          Depois do login, cada participante deve concluir a preparação individual antes das
          aulas práticas: instalar as ferramentas, finalizar os cursos obrigatórios e registrar
          a transcrição do projeto que será trabalhado durante o programa.
        </p>
      </section>

      <div className="info-grid">
        <article className="info-card">
          <span className="deadline-pill">Até 16/07/2026</span>
          <h2>Ferramentas</h2>
          <p>Instale e valide VS Code, Git, Node.js, Python, Claude Code CLI e extensão no VS Code.</p>
        </article>
        <article className="info-card">
          <span className="deadline-pill">Até 23/07/2026</span>
          <h2>Cursos</h2>
          <p>Conclua Claude 101, Claude Code 101, Claude Platform 101 e leia as regras de governança.</p>
        </article>
        <article className="info-card">
          <span className="deadline-pill">Até 23/07/2026</span>
          <h2>Transcrição do projeto</h2>
          <p>Registre contexto, processo atual, dor, impacto esperado, dados envolvidos e limites de segurança.</p>
        </article>
      </div>

      <section className="section-band">
        <h2>Sequência recomendada</h2>
        <ol className="steps-list">
          <li>Baixe os materiais de instalação e ferramentas.</li>
          <li>Instale as ferramentas e marque cada item no checklist.</li>
          <li>Conclua os cursos obrigatórios e registre o progresso.</li>
          <li>Prepare a transcrição do projeto antes das aulas de escopo.</li>
          <li>Consulte o cronograma para acompanhar o foco de cada semana.</li>
        </ol>
      </section>

      <div className="quick-links">
        <Link className="button" href="/checklist">
          Abrir checklist
        </Link>
        <Link className="button secondary" href="/materiais">
          Materiais disponíveis
        </Link>
        <Link className="button secondary" href="/cronograma">
          Cronograma das aulas
        </Link>
      </div>
    </AppChrome>
  );
}
