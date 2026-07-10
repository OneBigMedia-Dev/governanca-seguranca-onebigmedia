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
          <h1>Checklist AI First</h1>
        </div>
      </div>
      <ChecklistClient />
    </AppChrome>
  );
}
