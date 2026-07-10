import { signIn, signOut } from "@/auth";

export function SignInWithGoogleButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/checklist" });
      }}
    >
      <button className="button" type="submit">
        Entrar com Google
      </button>
    </form>
  );
}

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}
    >
      <button className="button ghost" type="submit">
        Sair
      </button>
    </form>
  );
}
