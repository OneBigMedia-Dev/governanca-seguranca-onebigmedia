import { AppChrome } from "@/components/AppChrome";
import { requireAllowedSession } from "@/lib/session";

const materials = [
  {
    title: "Guia Instalação AI First",
    description: "Apresentação com o passo a passo de instalação e validação do ambiente.",
    href: "/api/materials/guia-instalacao-ai-first",
    format: "PPTX"
  },
  {
    title: "Guia de ferramentas AI First",
    description: "Documento de apoio com ferramentas, usos recomendados e cuidados operacionais.",
    href: "/api/materials/guia-ferramentas-ai-first",
    format: "DOCX"
  }
];

export default async function MateriaisPage() {
  const session = await requireAllowedSession();
  const email = session.user?.email ?? "conta autorizada";

  return (
    <AppChrome email={email}>
      <div className="page-title">
        <div>
          <p className="muted">Pré-curso AI First</p>
          <h1>Materiais disponíveis</h1>
        </div>
      </div>

      <div className="material-list">
        {materials.map((material) => (
          <article className="material-item" key={material.href}>
            <div>
              <span className="deadline-pill">{material.format}</span>
              <h2>{material.title}</h2>
              <p>{material.description}</p>
            </div>
            <a className="button secondary" href={material.href} download>
              Baixar
            </a>
          </article>
        ))}
      </div>
    </AppChrome>
  );
}
