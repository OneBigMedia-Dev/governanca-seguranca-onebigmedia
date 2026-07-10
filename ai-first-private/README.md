# AI First Private

Aplicação Next.js para publicar o Programa AI First na Vercel com Google OAuth e allowlist de e-mails.

## Variáveis de ambiente

Configure na Vercel:

- `AUTH_SECRET`: string aleatória com pelo menos 32 caracteres.
- `AUTH_GOOGLE_ID`: Client ID do OAuth Google.
- `AUTH_GOOGLE_SECRET`: Client Secret do OAuth Google.
- `ALLOWED_EMAILS`: e-mails autorizados separados por vírgula.

Para rodar localmente, copie `.env.example` para `.env.local` e preencha os valores localmente. Não commite `.env.local` nem `client_secret*.json`.

## Google OAuth

No Google Cloud Console, adicione a callback URL da Vercel:

```text
https://SEU-PROJETO.vercel.app/api/auth/callback/google
```

Para desenvolvimento local:

```text
http://localhost:3000/api/auth/callback/google
```

## Comandos

```bash
npm install
npm run dev
npm run build
```

## Rotas

- `/login`: entrada via Google.
- `/checklist`: checklist individual protegido.
- `/programa-ai-first`: HTML protegido do programa.
- `/pre-curso-ai-first`: HTML protegido do pré-curso.
