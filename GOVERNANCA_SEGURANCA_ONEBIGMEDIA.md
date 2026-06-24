# Governança de Segurança da Informação - OneBigMedia

Versão: 1.0  
Data: 2026-06-23  
Responsável pelo pipeline e validação de projetos: Paulo  
Responsável pela liberação de acesso ao Claude Code: Fred Valente  
Organização GitHub: https://github.com/orgs/OneBigMedia-Dev/repositories

## 1. Objetivo

Este documento define a estrutura de segurança da informação, governança de projetos, regras para aquisição de ferramentas, uso de inteligência artificial, controle de tokens, segurança em banco de dados, segurança no GCP, uso do GitHub e pipeline de validação antes de produção na OneBigMedia.

O objetivo é criar um processo robusto, auditável e sustentável, sem travar a operação. Toda nova iniciativa técnica deve nascer com responsável claro, controle de acesso, validação de segurança, rastreabilidade no Jira e critérios objetivos para entrada em produção.

## 2. Escopo

Este processo se aplica a:

- Novos projetos de software, automação, dados, scraping, dashboards, integrações e pipelines.
- Repositórios da organização `OneBigMedia-Dev` no GitHub.
- Projetos e recursos no Google Cloud Platform.
- Bancos de dados, buckets, filas, APIs, credenciais e integrações.
- Ferramentas de IA, incluindo Claude Code e outros agentes de desenvolvimento.
- Aquisição, renovação ou cancelamento de aplicativos, SaaS e licenças.
- Uso de Jira para solicitação, validação, aprovação e registro operacional.

## 3. Princípios

1. Menor privilégio: cada pessoa, serviço ou ferramenta deve ter apenas o acesso necessário.
2. Separação de ambientes: desenvolvimento, homologação e produção devem ser separados.
3. Revisão humana obrigatória: código, infraestrutura e mudanças críticas não entram em produção sem revisão.
4. Segredos nunca ficam no código: tokens, chaves, senhas e arquivos de credenciais devem usar ferramentas próprias de segredo.
5. Tudo que é crítico deve ser rastreável: Jira, Pull Request, logs e histórico de deploy.
6. Produção exige aprovação explícita.
7. IA acelera, mas não substitui responsabilidade técnica.
8. Custo e segurança são critérios de aprovação, não itens posteriores.

## 4. Papéis e Responsabilidades

| Papel | Responsabilidade |
| --- | --- |
| Solicitante | Abrir demanda no Jira com objetivo, contexto, dados envolvidos e urgência. |
| Dono técnico do projeto | Responder pela arquitetura, operação, documentação e sustentação do projeto. |
| Paulo | Validar novos projetos, aprovar avanço no pipeline, revisar critérios antes de produção e manter este processo. |
| Fred Valente | Liberar, revisar e controlar acessos ao Claude Code. |
| Financeiro/Gestão | Aprovar custos de licenças, ferramentas, APIs e recursos recorrentes. |
| Revisor técnico | Revisar Pull Requests, riscos técnicos, segurança e testes. |
| Administrador GitHub/GCP | Aplicar permissões, regras de branch, secrets, ambientes e políticas de acesso. |

## 5. Classificação de Risco

Todo projeto, app ou integração deve ser classificado antes da aprovação.

### Baixo risco

Características:

- Não acessa dados sensíveis.
- Não possui credenciais críticas.
- Não altera produção.
- Não integra com GitHub, GCP, banco de dados ou contas externas críticas.

Exemplos:

- Documentação interna.
- Scripts locais sem dados sensíveis.
- Provas de conceito sem credenciais reais.

### Médio risco

Características:

- Usa APIs externas.
- Usa tokens com escopo limitado.
- Acessa dados operacionais internos.
- Pode gerar custo recorrente.
- Pode afetar relatórios, dashboards ou rotinas internas.

Exemplos:

- Automação com YouTube API em ambiente de teste.
- Pipeline de dados em homologação.
- Integração com Jira ou GitHub sem acesso administrativo.

### Alto risco

Características:

- Acessa produção.
- Acessa banco de dados real.
- Acessa dados de clientes, receita, canais, tokens, contas Google, CMS ou dados financeiros.
- Possui permissões administrativas em GitHub, GCP, Jira ou ferramentas de IA.
- Executa deploy, altera infraestrutura ou manipula segredos.

Exemplos:

- Pipeline de produção no GCP.
- Service account com acesso a BigQuery, Cloud Storage ou Cloud SQL.
- Agente de IA com permissão para editar código e executar comandos.
- App SaaS conectado ao GitHub ou GCP.

## 6. Política de Aquisição de Apps, SaaS e Licenças

Nenhuma nova ferramenta paga, SaaS, extensão, app ou integração deve ser usada de forma oficial sem registro e aprovação.

### 6.1 Fluxo obrigatório no Jira

O solicitante deve abrir uma tarefa com:

- Nome da ferramenta.
- Link do fornecedor.
- Objetivo de uso.
- Time ou usuários impactados.
- Custo mensal/anual estimado.
- Tipo de dado acessado.
- Integrações necessárias.
- Permissões solicitadas.
- Alternativas avaliadas.
- Responsável interno.
- Criticidade: baixa, média ou alta.

### 6.2 Critérios mínimos de aprovação

A ferramenta deve ser avaliada nos seguintes pontos:

- Suporta MFA ou SSO.
- Permite gestão centralizada de usuários.
- Permite revogar acessos rapidamente.
- Possui logs ou trilha de auditoria.
- Informa onde os dados são armazenados.
- Possui política de privacidade e termos claros.
- Permite exportação ou remoção de dados.
- Não exige permissões excessivas.
- Não solicita acesso amplo ao GitHub, GCP, banco ou arquivos sem justificativa.
- Tem custo compatível com o benefício.

### 6.3 Regras de contratação

- Ferramentas de baixo risco podem ser aprovadas pelo responsável da área, desde que registradas.
- Ferramentas de médio risco exigem aprovação do dono técnico e validação de segurança.
- Ferramentas de alto risco exigem aprovação do dono técnico, Paulo e gestão/financeiro.
- Licenças sem uso devem ser revisadas mensalmente.
- Toda ferramenta conectada a GitHub, GCP, Jira ou bancos deve ter dono interno definido.

## 7. Política de Uso de IA

Ferramentas de IA podem ser usadas para desenvolvimento, documentação, análise de dados, revisão de código, geração de testes, investigação de erros e automação. O uso deve respeitar segurança, confidencialidade e validação humana.

### 7.1 Regras gerais

- Não inserir senhas, tokens, API keys, service account keys ou OAuth credentials em prompts.
- Não enviar dumps de banco, planilhas sensíveis, dados de clientes ou dados financeiros sem aprovação.
- Não conceder acesso administrativo a agentes de IA por padrão.
- Código gerado por IA deve passar por Pull Request e revisão humana.
- Mudanças geradas por IA em produção precisam seguir o mesmo fluxo de qualquer mudança humana.
- Agentes de IA não devem executar comandos destrutivos sem aprovação explícita.
- O uso de conectores, MCPs, extensões e plugins deve ser previamente aprovado quando acessar dados internos.

### 7.2 Claude Code

O acesso ao Claude Code deve ser liberado por Fred Valente.

Regras:

- Cada usuário deve usar conta individual.
- Não compartilhar conta, sessão ou chave de acesso.
- Usar permissões restritas por padrão.
- Revisar comandos antes de aprovar execução.
- Não permitir execução automática irrestrita em repositórios críticos.
- Não autorizar acesso a pastas com credenciais fora do escopo do projeto.
- Para projetos de alto risco, usar sessão separada por repositório/projeto.
- Registrar no Jira quando Claude Code for usado em projeto crítico.

### 7.3 Segurança de prompts e dados

É proibido enviar para ferramentas de IA sem aprovação:

- Tokens OAuth.
- Arquivos `client_secret.json`.
- Arquivos de service account do GCP.
- Dumps de banco.
- Dados de clientes ou parceiros.
- Credenciais de YouTube CMS, Google, GCP, GitHub, Jira ou bancos.
- Logs com tokens, cookies ou dados pessoais.
- Chaves privadas, certificados e arquivos `.env`.

É permitido, sem aprovação adicional:

- Trechos de código sem segredos.
- Logs anonimizados.
- Mensagens de erro sem credenciais.
- Documentação técnica interna sem dados sensíveis.
- Dados fictícios ou mascarados.

### 7.4 Controle de consumo de tokens e custos

Todo uso relevante de IA deve ter:

- Dono responsável.
- Finalidade definida.
- Estimativa de custo ou limite mensal.
- Revisão mensal de consumo.
- Critério para desligamento ou redução.
- Separação entre uso exploratório e uso operacional.

Para projetos com IA em produção:

- Definir limite de gasto.
- Definir alertas de consumo.
- Registrar modelo/ferramenta usada.
- Monitorar volume de chamadas.
- Registrar falhas, custos e incidentes.
- Evitar prompts longos com dados desnecessários.
- Implementar cache quando tecnicamente viável.

## 8. Política GitHub

Todos os repositórios corporativos devem ficar na organização `OneBigMedia-Dev`, salvo exceção aprovada.

### 8.1 Padrão de repositório

Todo repositório deve conter:

- `README.md`
- `SECURITY.md`
- `CODEOWNERS`
- `.gitignore`
- `.env.example`, quando aplicável
- Workflow de CI, quando aplicável
- Dependabot, quando aplicável
- Documentação mínima de instalação, execução e deploy
- Identificação do dono técnico

### 8.2 Regras de branch

A branch principal deve ser `main`.

Regras obrigatórias para `main`:

- Push direto bloqueado.
- Force push bloqueado.
- Exclusão da branch bloqueada.
- Merge apenas via Pull Request.
- Ao menos 1 aprovação obrigatória.
- Ao menos 2 aprovações para projetos de alto risco.
- Checks obrigatórios antes do merge.
- Histórico de aprovação preservado.
- Alterações em arquivos sensíveis exigem revisão de CODEOWNERS.

Arquivos sensíveis:

- Workflows de CI/CD.
- Arquivos de infraestrutura.
- Configurações de deploy.
- Arquivos de autenticação.
- Scripts de migração.
- Dependências e lockfiles.
- Código de acesso a banco.
- Código de manipulação de segredos.

### 8.3 Segurança de código

Devem ser habilitados quando disponíveis:

- Secret scanning.
- Push protection.
- Dependabot alerts.
- Dependabot security updates.
- Code scanning/CodeQL para linguagens suportadas.
- Dependency review em Pull Requests.

Nenhum segredo deve ser versionado.

Exemplos de arquivos proibidos:

- `.env`
- `client_secret.json`
- `service-account.json`
- `credentials.json`
- `token.json`
- `user_oauth_token.json`
- Arquivos `.pem`, `.key`, `.p12`, `.pfx`
- Dumps `.sql`, `.dump`, `.bak`

### 8.4 GitHub Actions

Regras:

- Workflows devem usar o menor conjunto possível de permissões.
- `GITHUB_TOKEN` deve ter permissões explícitas.
- Deploy em produção deve usar GitHub Environments com aprovação manual.
- Secrets de produção devem existir apenas no environment `production`.
- Actions de terceiros devem ser fixadas por versão confiável.
- Workflows que executam código de Pull Request externo devem ser avaliados com cautela.

### 8.5 Modelo de times

Sugestão de times na organização:

- `admins`: acesso administrativo restrito.
- `developers`: leitura e escrita nos repositórios necessários.
- `reviewers`: revisores técnicos.
- `production-approvers`: aprovadores de produção.
- `security-reviewers`: revisão de segurança e segredos.
- `data-engineering`: pipelines, BigQuery, dados e Airflow.

Permissões devem ser dadas por time, não individualmente, sempre que possível.

## 9. Política GCP

O GCP deve ser organizado com separação clara de ambientes, acessos e responsabilidades.

### 9.1 Estrutura recomendada

Separar projetos por ambiente:

- `onebigmedia-dev`
- `onebigmedia-staging`
- `onebigmedia-prod`

Quando houver domínios muito diferentes, separar por produto ou área:

- `obm-data-dev`
- `obm-data-staging`
- `obm-data-prod`
- `obm-apps-dev`
- `obm-apps-staging`
- `obm-apps-prod`

### 9.2 IAM

Regras:

- Usar grupos em vez de usuários individuais.
- Evitar roles básicas em produção: `Owner`, `Editor`, `Viewer`.
- Aplicar menor privilégio.
- Conceder acesso no menor escopo possível.
- Usar acesso temporário para operações administrativas.
- Revisar IAM mensalmente em produção.
- Remover acessos de pessoas que mudaram de função ou saíram.
- Registrar exceções no Jira.

### 9.3 Service accounts

Regras:

- Uma service account por aplicação, pipeline ou componente.
- Nome deve indicar finalidade e ambiente.
- Não reutilizar service account de produção em dev/staging.
- Evitar criação de chaves JSON.
- Preferir Workload Identity Federation ou identidade gerenciada.
- Quando chave JSON for inevitável, registrar justificativa, dono, expiração e plano de rotação.
- Chaves não podem ser salvas em repositórios, máquinas pessoais ou pastas compartilhadas.

### 9.4 Logs e auditoria

Devem estar habilitados:

- Cloud Audit Logs.
- Logs de acesso administrativo.
- Logs de deploy.
- Logs de erro de aplicações críticas.
- Alertas para alterações de IAM, service accounts e chaves.

Logs críticos devem ter retenção definida e acesso restrito.

### 9.5 Custos

Todo projeto GCP deve ter:

- Billing associado ao centro de custo correto.
- Orçamento mensal.
- Alertas em 50%, 80% e 100%.
- Dono responsável.
- Revisão mensal de recursos ociosos.

## 10. Política de Banco de Dados

### 10.1 Ambientes

Todo banco deve seguir a separação:

- Desenvolvimento: dados fictícios ou mínimos.
- Staging: dados mascarados ou subconjunto autorizado.
- Produção: dados reais com acesso restrito.

É proibido usar dump de produção em máquina local sem aprovação formal.

### 10.2 Acesso

Regras:

- Nenhum banco de produção deve ficar exposto publicamente.
- Acesso deve ocorrer por rede privada, proxy, VPN, bastion ou mecanismo controlado.
- Usuários individuais ou grupos devem ser usados em vez de contas compartilhadas.
- Admin de banco deve ser restrito.
- Acesso de escrita em produção deve ser excepcional e temporário.
- Toda credencial deve ter dono e data de revisão.

### 10.3 Permissões

Separar perfis:

- Leitura.
- Escrita.
- Migração.
- Administração.
- Auditoria.

Aplicações devem usar usuários próprios e com permissões mínimas.

### 10.4 Backup e recuperação

Todo banco crítico deve ter:

- Backup automático.
- Retenção definida.
- Teste periódico de restore.
- Plano de recuperação.
- Registro do tempo máximo aceitável de perda de dados.
- Registro do tempo máximo aceitável de indisponibilidade.

### 10.5 Migrações

Migrações de banco devem:

- Passar por Pull Request.
- Rodar primeiro em dev/staging.
- Ter plano de rollback quando possível.
- Ter aprovação antes de produção.
- Ser executadas pelo pipeline ou por responsável autorizado.
- Ser registradas no Jira.

## 11. Política de Segredos, Tokens e Credenciais

Segredos incluem:

- API keys.
- OAuth tokens.
- Refresh tokens.
- Service account keys.
- Senhas.
- Certificados.
- Chaves privadas.
- Cookies de sessão.
- Arquivos `.env`.

### 11.1 Regras obrigatórias

- Segredos não podem ser versionados no Git.
- Segredos devem ficar em Secret Manager, GitHub Secrets, Vault ou ferramenta aprovada.
- Segredos de produção devem ser separados dos de dev/staging.
- Segredos devem ter dono.
- Segredos devem ter rotação definida.
- Segredos expostos devem ser revogados imediatamente.
- Nunca compartilhar segredos por Slack, WhatsApp, e-mail ou arquivo solto.

### 11.2 Resposta a vazamento

Se um segredo for commitado ou exposto:

1. Revogar imediatamente o segredo.
2. Criar novo segredo.
3. Atualizar sistemas dependentes.
4. Verificar logs de uso indevido.
5. Registrar incidente no Jira.
6. Remover o segredo do histórico quando necessário.
7. Revisar por que o controle falhou.

## 12. Pipeline de Criação e Validação de Projetos

Nenhum projeto deve ir para produção sem passar por este pipeline.

### Etapa 1 - Solicitação no Jira

Criar ticket com:

- Nome do projeto.
- Solicitante.
- Dono técnico.
- Objetivo.
- Problema que resolve.
- Dados envolvidos.
- Integrações.
- Ferramentas e APIs.
- Estimativa de custo.
- Prazo desejado.
- Criticidade.
- Necessidade de IA.
- Necessidade de banco.
- Necessidade de GCP.
- Necessidade de GitHub Actions.

Saída esperada:

- Ticket classificado.
- Dono técnico definido.
- Risco inicial definido.

### Etapa 2 - Triagem técnica

Validar:

- Se o projeto é necessário.
- Se já existe solução interna.
- Se envolve dados sensíveis.
- Se envolve produção.
- Se envolve custo recorrente.
- Se precisa de aprovação financeira.
- Se precisa de revisão de segurança.

Saída esperada:

- Aprovado para discovery.
- Recusado.
- Pendente de informações.

### Etapa 3 - Discovery e desenho

O dono técnico deve documentar:

- Arquitetura proposta.
- Fluxo de dados.
- Sistemas envolvidos.
- Permissões necessárias.
- Repositórios necessários.
- Projetos GCP necessários.
- Banco de dados, tabelas ou datasets envolvidos.
- Estratégia de deploy.
- Plano de logs e monitoramento.
- Riscos conhecidos.

Saída esperada:

- Documento técnico curto.
- Aprovação para implementação.

### Etapa 4 - Criação do repositório

Criar repositório na organização `OneBigMedia-Dev`.

Configuração obrigatória:

- Repositório privado, salvo exceção aprovada.
- Branch `main` protegida.
- Pull Request obrigatório.
- CODEOWNERS.
- SECURITY.md.
- CI inicial.
- Secret scanning.
- Push protection.
- Dependabot.
- `.env.example`.
- README com instruções.

Saída esperada:

- Repositório pronto para desenvolvimento.

### Etapa 5 - Ambiente de desenvolvimento

Configurar:

- Ambiente `dev`.
- Secrets de dev.
- Service accounts de dev.
- Banco ou dataset de dev.
- Dados fictícios ou amostra segura.
- Pipeline de testes.

Saída esperada:

- Projeto executando fora de produção.

### Etapa 6 - Desenvolvimento

Regras:

- Trabalhar em branch.
- Abrir Pull Request.
- Não subir segredos.
- Escrever testes quando aplicável.
- Documentar decisões importantes.
- Registrar tarefas no Jira.
- Revisar código antes de merge.

Saída esperada:

- Código revisado e integrado em `main`.

### Etapa 7 - Staging/homologação

Validar:

- Build.
- Testes.
- Integrações.
- Permissões.
- Performance mínima.
- Consumo estimado.
- Logs.
- Alertas.
- Tratamento de erro.
- Rollback.
- Segurança de dados.

Saída esperada:

- Checklist de homologação aprovado.

### Etapa 8 - Revisão antes de produção

Checklist obrigatório:

- [ ] Dono técnico definido.
- [ ] Jira atualizado.
- [ ] Repositório na organização correta.
- [ ] Branch principal protegida.
- [ ] PR revisado.
- [ ] CI passando.
- [ ] Secrets fora do código.
- [ ] Dependências avaliadas.
- [ ] IAM revisado.
- [ ] Service accounts separadas por ambiente.
- [ ] Banco protegido.
- [ ] Backup configurado, quando aplicável.
- [ ] Logs configurados.
- [ ] Alertas configurados.
- [ ] Custo estimado aprovado.
- [ ] Plano de rollback documentado.
- [ ] Documentação mínima concluída.
- [ ] Aprovação final de Paulo.

Saída esperada:

- Aprovação formal para produção.

### Etapa 9 - Produção

Regras:

- Deploy via pipeline.
- Aprovação manual no GitHub Environment `production`.
- Deploy registrado no Jira.
- Monitoramento após deploy.
- Rollback disponível.

Saída esperada:

- Projeto em produção com rastreabilidade.

### Etapa 10 - Pós-produção

Após 7 dias:

- Revisar erros.
- Revisar custo real.
- Revisar logs.
- Revisar consumo de tokens/API.
- Revisar incidentes.
- Ajustar alertas.
- Fechar pendências no Jira.

## 13. Template de Ticket Jira - Novo Projeto

Título:

`[Novo Projeto] Nome do Projeto`

Campos sugeridos:

```text
Objetivo:

Solicitante:

Dono técnico:

Área responsável:

Prazo desejado:

Criticidade: baixa / média / alta

Dados envolvidos:

Integrações:

Repositório GitHub necessário? sim / não

Projeto GCP necessário? sim / não

Banco de dados necessário? sim / não

Uso de IA? sim / não

Ferramentas/licenças necessárias:

Custo estimado:

Riscos conhecidos:

Critérios de sucesso:

Plano de rollback:

Aprovações necessárias:
```

## 14. Template de Ticket Jira - Nova Ferramenta ou Licença

Título:

`[Nova Ferramenta] Nome da Ferramenta`

Campos sugeridos:

```text
Ferramenta:

Fornecedor:

Link:

Objetivo:

Usuários:

Custo mensal/anual:

Dados acessados:

Integrações:

Permissões solicitadas:

Possui MFA/SSO?

Possui logs/auditoria?

Permite remover/exportar dados?

Alternativas avaliadas:

Risco: baixo / médio / alto

Dono interno:

Data de revisão da licença:

Aprovações necessárias:
```

## 15. Template de Pull Request

```markdown
## Objetivo

Descreva o que foi alterado e por quê.

## Ticket Jira

Link:

## Tipo de mudança

- [ ] Correção
- [ ] Nova funcionalidade
- [ ] Refatoração
- [ ] Infraestrutura
- [ ] Banco de dados
- [ ] Segurança

## Checklist

- [ ] Testes executados
- [ ] Build executado
- [ ] Sem segredos no código
- [ ] Documentação atualizada
- [ ] Impacto em produção avaliado
- [ ] Rollback definido quando aplicável

## Riscos

Descreva riscos técnicos, de dados, custo ou operação.

## Evidências

Inclua logs, prints, comandos ou resultados relevantes.
```

## 16. Template de SECURITY.md

```markdown
# Segurança

## Reporte de vulnerabilidades

Vulnerabilidades devem ser reportadas internamente via Jira ou diretamente ao responsável técnico do projeto.

## Segredos

Este repositório não deve conter tokens, senhas, chaves, arquivos `.env`, service account keys ou credenciais.

## Ambientes

Os ambientes suportados são:

- dev
- staging
- production

## Deploy em produção

Deploy em produção exige Pull Request aprovado, checks passando e aprovação manual no ambiente `production`.
```

## 17. Checklist de Revisão Mensal

Executar mensalmente:

- [ ] Revisar usuários ativos no GitHub.
- [ ] Revisar administradores do GitHub.
- [ ] Revisar membros dos times.
- [ ] Revisar GCP IAM em produção.
- [ ] Revisar service accounts.
- [ ] Revisar chaves de service accounts.
- [ ] Revisar secrets vencidos ou sem dono.
- [ ] Revisar apps conectados ao GitHub.
- [ ] Revisar apps conectados ao GCP.
- [ ] Revisar licenças sem uso.
- [ ] Revisar custos de GCP.
- [ ] Revisar custos de IA/tokens.
- [ ] Revisar alertas de segurança.
- [ ] Revisar Dependabot/security alerts.
- [ ] Revisar bancos com acesso público.

## 18. Checklist de Incidente

Quando houver incidente de segurança:

- [ ] Registrar incidente no Jira.
- [ ] Definir responsável.
- [ ] Classificar severidade.
- [ ] Conter o impacto.
- [ ] Revogar tokens/credenciais se necessário.
- [ ] Bloquear acessos indevidos.
- [ ] Preservar logs.
- [ ] Identificar causa raiz.
- [ ] Corrigir vulnerabilidade.
- [ ] Comunicar responsáveis.
- [ ] Documentar lições aprendidas.
- [ ] Criar ações preventivas.

## 19. Métricas de Governança

Acompanhar mensalmente:

- Número de projetos em dev, staging e produção.
- Projetos sem dono técnico.
- Repositórios sem branch protection.
- Repositórios com secrets detectados.
- Pull Requests sem revisão.
- Tempo médio de aprovação de projeto.
- Custo mensal GCP.
- Custo mensal de IA/tokens.
- Licenças ativas versus licenças usadas.
- Incidentes por mês.
- Vulnerabilidades abertas por severidade.
- Tempo médio para correção de vulnerabilidades.

## 20. Referências Oficiais

- Google Cloud IAM security best practices: https://cloud.google.com/iam/docs/using-iam-securely
- Google Cloud Architecture Framework - Security: https://cloud.google.com/architecture/framework/security/security-principles
- GitHub repository security quickstart: https://docs.github.com/en/code-security/getting-started/quickstart-for-securing-your-repository
- GitHub rulesets: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets
- GitHub code scanning: https://docs.github.com/en/code-security/concepts/code-scanning/code-scanning
- Claude Code security: https://code.claude.com/docs/en/security
- Jira Cloud permissions overview: https://support.atlassian.com/jira-cloud-administration/docs/overview-of-jira-cloud-permissions/

## 21. Próximos Passos Recomendados

1. Validar este documento com os responsáveis internos.
2. Criar os templates no Jira.
3. Criar um repositório template na organização `OneBigMedia-Dev`.
4. Configurar times e permissões no GitHub.
5. Criar rulesets padrão para branches principais.
6. Ativar secret scanning e push protection.
7. Revisar credenciais existentes nos repositórios atuais.
8. Separar ambientes GCP por projeto ou pasta.
9. Definir orçamento e alertas de GCP.
10. Definir orçamento e alertas para ferramentas de IA.
11. Criar checklist de produção como issue template.
12. Rodar a primeira revisão mensal de acessos.

