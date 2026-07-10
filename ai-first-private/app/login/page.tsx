import { redirect } from "next/navigation";

import { SignInWithGoogleButton } from "@/components/AuthActions";
import { getAllowedSession } from "@/lib/session";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getAllowedSession();

  if (session) {
    redirect("/checklist");
  }

  const params = await searchParams;
  const accessDenied = params.error === "AccessDenied";

  return (
    <main className="login-page">
      <section className="login-panel">
        <p className="muted">One Big Media - AI First</p>
        <h1>Área privada do programa</h1>
        <p className="muted">
          Entre com a conta Google autorizada para acessar o pré-curso, o
          programa e o checklist individual.
        </p>
        {accessDenied ? (
          <div className="alert">
            Esta conta Google não está autorizada para acessar o programa.
          </div>
        ) : null}
        <SignInWithGoogleButton />
      </section>
    </main>
  );
}
