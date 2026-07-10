import { AppChrome } from "@/components/AppChrome";
import { requireAllowedSession } from "@/lib/session";

const contacts = [
  "paulo.moura@1bigmedia.group",
  "samuel.jose@1bigmedia.group",
  "thalita.frossard@1bigmedia.group",
  "rarysson.ferreira@1bigmedia.group",
  "welbert.gomes@1bigmedia.group"
];

export default async function DuvidasPage() {
  const session = await requireAllowedSession();
  const email = session.user?.email ?? "conta autorizada";

  return (
    <AppChrome email={email}>
      <div className="page-title">
        <div>
          <p className="muted">Suporte do pré-curso</p>
          <h1>Dúvidas</h1>
        </div>
      </div>

      <section className="intro-band">
        <p>
          Para dúvidas de acesso, instalação, cursos, materiais ou transcrição do projeto,
          envie mensagem pelo chat do Google ou mande e-mail para uma das pessoas abaixo.
        </p>
      </section>

      <div className="contact-grid">
        {contacts.map((contact) => (
          <a className="contact-item" href={`mailto:${contact}`} key={contact}>
            {contact}
          </a>
        ))}
      </div>
    </AppChrome>
  );
}
