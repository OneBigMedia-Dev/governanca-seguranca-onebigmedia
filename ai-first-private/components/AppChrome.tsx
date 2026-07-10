import Image from "next/image";
import Link from "next/link";

import { SignOutButton } from "@/components/AuthActions";

type AppChromeProps = {
  email: string;
  children: React.ReactNode;
};

export function AppChrome({ email, children }: AppChromeProps) {
  return (
    <>
      <header className="topbar">
        <div className="shell topbar-inner">
          <Link className="brand" href="/orientacoes">
            <Image
              className="brand-mark"
              src="/onebigmedia%20logo.png"
              alt="One Big Media"
              width={30}
              height={30}
              priority
            />
            <span>One Big Media - AI First</span>
          </Link>
          <nav className="nav-actions" aria-label="Navegação privada">
            <Link className="text-link" href="/orientacoes">
              Orientações
            </Link>
            <Link className="text-link" href="/checklist">
              Checklist
            </Link>
            <Link className="text-link" href="/materiais">
              Materiais
            </Link>
            <Link className="text-link" href="/cronograma">
              Cronograma
            </Link>
            <Link className="text-link" href="/programa-ai-first">
              Programa
            </Link>
            <Link className="text-link" href="/duvidas">
              Dúvidas
            </Link>
            <span className="text-link account-email">{email}</span>
            <SignOutButton />
          </nav>
        </div>
      </header>
      <main className="shell page">{children}</main>
    </>
  );
}
