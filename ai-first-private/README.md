# AI First Private

Aplicação Next.js para publicar o Programa AI First na Vercel com Google OAuth,
allowlist de e-mails e checklist persistido no Supabase.

## Variáveis de ambiente

Configure na Vercel:

- `AUTH_SECRET`: string aleatória com pelo menos 32 caracteres.
- `AUTH_GOOGLE_ID`: Client ID do OAuth Google.
- `AUTH_GOOGLE_SECRET`: Client Secret do OAuth Google.
- `ALLOWED_EMAILS`: e-mails autorizados separados por vírgula.
- `SUPABASE_URL`: URL do projeto Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: chave server-side para salvar o progresso do checklist.

Para rodar localmente, copie `.env.example` para `.env.local` e preencha os valores localmente.
Não commite `.env.local`, `client_secret*.json` ou tokens.

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
pnpm install
pnpm dev
pnpm build
```

## Rotas

- `/login`: entrada via Google.
- `/orientacoes`: instruções pós-login, próximos passos e prazos.
- `/checklist`: checklist individual protegido.
- `/materiais`: downloads do pré-curso.
- `/cronograma`: cronograma das aulas.
- `/duvidas`: contatos de suporte.
- `/programa-ai-first`: HTML protegido do programa.
- `/pre-curso-ai-first`: HTML protegido do pré-curso.
