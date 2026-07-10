import { AppChrome } from "@/components/AppChrome";
import { requireAllowedSession } from "@/lib/session";

const weeks = [
  {
    week: "Semana 1",
    focus: "Fundamentos + operação real do Claude",
    delivery: "Pasta base criada, prompts base e primeira decisão registrada."
  },
  {
    week: "Semana 2",
    focus: "Desafios reais das áreas e escopo de MVP",
    delivery: "Desafio escolhido, objetivo do MVP, critérios de sucesso e riscos iniciais."
  },
  {
    week: "Semana 3",
    focus: "Primeira solução útil com Next.js",
    delivery: "Primeira tela funcional, app rodando localmente e README atualizado."
  },
  {
    week: "Semana 4",
    focus: "Dados, planilhas, arquivos e Python",
    delivery: "Pipeline simples de dados, dados de teste e regras de segurança documentadas."
  },
  {
    week: "Semana 5",
    focus: "Automação do fluxo principal",
    delivery: "MVP local rodando de ponta a ponta e checklist de testes simples."
  },
  {
    week: "Semana 6",
    focus: "Integrações, APIs e ferramentas aprovadas",
    delivery: "Integração controlada ou simulação segura, com plano de acesso e revogação."
  },
  {
    week: "Semana 7",
    focus: "Fechamento do MVP, testes e governança",
    delivery: "MVP beta revisado, README completo, checklist de segurança e roteiro da demo."
  },
  {
    week: "Semana 8",
    focus: "Demo Day e plano de continuidade",
    delivery: "Demo apresentada, plano de continuidade e decisão de próximos passos."
  }
];

export default async function CronogramaPage() {
  const session = await requireAllowedSession();
  const email = session.user?.email ?? "conta autorizada";

  return (
    <AppChrome email={email}>
      <div className="page-title">
        <div>
          <p className="muted">Trilha prática de 8 semanas</p>
          <h1>Cronograma das aulas</h1>
        </div>
      </div>

      <div className="info-grid compact">
        <article className="info-card">
          <span className="deadline-pill">Pré-curso</span>
          <h2>Ferramentas</h2>
          <p>Concluir instalação e validação até quinta-feira, 16/07/2026.</p>
        </article>
        <article className="info-card">
          <span className="deadline-pill">Pré-curso</span>
          <h2>Cursos e transcrição</h2>
          <p>Concluir cursos obrigatórios e transcrição do projeto até quinta-feira, 23/07/2026.</p>
        </article>
      </div>

      <div className="schedule-list">
        {weeks.map((week) => (
          <article className="schedule-item" key={week.week}>
            <span>{week.week}</span>
            <div>
              <h2>{week.focus}</h2>
              <p>{week.delivery}</p>
            </div>
          </article>
        ))}
      </div>
    </AppChrome>
  );
}
