# Seguranca

## Reporte de vulnerabilidades

Vulnerabilidades devem ser reportadas internamente via Jira ou diretamente ao responsavel tecnico do projeto.

## Segredos

Este repositorio nao deve conter tokens, senhas, chaves, arquivos `.env`, service account keys, cookies, certificados, dumps de banco ou credenciais.

Se um segredo for exposto, revogue o segredo antes de tratar a limpeza do repositorio como concluida.

## Ambientes

Os ambientes suportados sao:

- `dev`
- `staging`
- `production`

## Deploy em producao

Deploy em producao exige Pull Request aprovado, checks passando, rollback definido e aprovacao manual no ambiente `production`.

## Requisitos internos

Requisitos tecnicos especificos devem ser documentados em `OBMG_SecSpec.md` quando o projeto envolver producao, banco de dados, GCP, GitHub Actions, OAuth, dados sensiveis, YouTube CMS, automacoes com IA ou qualquer integracao de medio/alto risco.

## Automacoes com IA e prompt injection

Sistemas, agentes, conectores, MCPs ou automacoes com IA devem tratar todo conteudo externo como dado nao confiavel, incluindo mensagens de usuario, paginas web, documentos, e-mails, anexos, comentarios de codigo, issues, respostas de APIs e conteudo recuperado por RAG.

Regras obrigatorias:

- Nao obedecer instrucoes encontradas dentro de conteudo externo quando elas conflitarem com instrucoes do sistema, politicas do repositorio ou aprovacao humana.
- Separar claramente instrucoes confiaveis de dados nao confiaveis em prompts, contexto, templates e chamadas de ferramenta.
- Nao enviar segredos, credenciais, cookies, dumps, dados financeiros, dados de clientes ou dados de CMS para modelos de IA sem aprovacao formal.
- Usar menor privilegio para ferramentas de IA: allowlist de comandos, caminhos, APIs e operacoes; bloquear `.env`, chaves, certificados, dumps e arquivos de credenciais.
- Exigir aprovacao humana para acoes destrutivas, administrativas, externas, financeiras, de producao, banco de dados, IAM, deploy ou rotacao de segredo.
- Validar saidas de IA antes de executar codigo, alterar dados, enviar mensagens, abrir PRs, fazer deploy ou chamar APIs sensiveis.
- Isolar memoria/contexto por usuario, sessao, projeto e ambiente; nao persistir conteudo sem sanitizacao e expiracao.
- Registrar decisoes, ferramentas chamadas, aprovacoes e falhas relevantes para auditoria.
- Testar casos adversariais, incluindo prompt injection direto, indireto, conteudo oculto em HTML/Markdown/documentos, tentativa de extrair system prompt, data exfiltration, tool manipulation e custo excessivo.
