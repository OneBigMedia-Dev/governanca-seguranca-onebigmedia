import { AppChrome } from "@/components/AppChrome";
import { ChecklistClient } from "@/components/ChecklistClient";
import { requireAllowedSession } from "@/lib/session";

export default async function ChecklistPage() {
  const session = await requireAllowedSession();
  const email = session.user?.email ?? "conta autorizada";

  return (
    <AppChrome email={email}>
      <div className="page-title">
        <div>
          <p className="muted">Preparação individual</p>
          <h1>Check List AI First Pré-Curso</h1>
        </div>
      </div>
      <section className="intro-band">
        <p>
          Marque tudo que já foi feito para acompanhar seu progresso no pré-curso.
          Cada tarefa marcada fica registrada e pode ser retomada depois do logout.
        </p>
      </section>
      <ChecklistClient />
    </AppChrome>
  );
}
