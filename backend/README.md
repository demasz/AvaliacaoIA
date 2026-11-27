# Backend — Cardápio Digital

API REST independente para o catálogo e registro de pedidos demonstrativos da Taverna do Bosque. O backend usa Express 5 e PostgreSQL; o frontend é iniciado separadamente em `Frontend/`. Não há pagamento, estoque, autenticação ou painel administrativo.

## Pré-requisitos

- Node.js 24 ou superior.
- Bun.
- PostgreSQL acessível localmente ou em um ambiente autorizado.

## Instalação e configuração

Na pasta `backend/`:

```powershell
bun install
Copy-Item .env.example .env
```

Edite `.env`:

```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgres://cardapio:cardapio_dev@localhost:5432/cardapio_dev
DATABASE_URL_TEST=postgres://cardapio:cardapio_test@localhost:5432/cardapio_test
FRONTEND_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Crie localmente os bancos referenciados. Use credenciais próprias para desenvolvimento e não versione o arquivo `.env`.

`DATABASE_URL` é a conexão da aplicação. Para integração, `DATABASE_URL_TEST` é obrigatória e o nome do banco deve terminar em `_test`; a aplicação de teste nunca usa `DATABASE_URL` como alternativa. A execução das migrações e seeds atua somente no banco selecionado pela variável correspondente.

`FRONTEND_ORIGINS` aceita origens completas sem caminho, separadas por vírgula. A lista padrão contempla o servidor Vite/TanStack local na porta `3000`. Ajuste-a quando o frontend usar outra origem. `VITE_API_URL` é uma variável do frontend, definida no ambiente do projeto em `Frontend/`, e não contém segredo.

## Banco de dados

Depois de criar o banco de desenvolvimento:

```sh
bun run db:migrate
bun run db:seed
```

`db:migrate` aplica a migration versionada com Umzug. `db:rollback` desfaz a migration mais recente; faça backup antes de reverter um banco com dados importantes. `db:seed` popula quatro categorias e oito produtos; é seguro executar novamente e atualiza os registros pelos identificadores estáveis.

## Executar

Terminal 1 — na pasta `Frontend/`:

```powershell
Set-Location Frontend
bun install
bun run dev
```

Terminal 2 — na pasta `backend/`:

```powershell
Set-Location backend
bun run dev
```

A API escuta por padrão em `http://localhost:3001`. Confirme a inicialização pela mensagem no terminal ou consulte `GET /api/health`. O servidor autentica a conexão antes de começar a aceitar requisições e encerra o pool ao receber `SIGINT` ou `SIGTERM`.

## Endpoints

| Método | Endpoint                        | Descrição                      |
| ------ | ------------------------------- | ------------------------------ |
| GET    | `/api/health`                   | Health check                   |
| GET    | `/api/categories`               | Categorias com produtos ativos |
| GET    | `/api/products`                 | Produtos ativos                |
| GET    | `/api/products?category=drinks` | Filtro por categoria           |
| GET    | `/api/products?featured=true`   | Filtro por destaque            |
| GET    | `/api/products/:id`             | Produto ativo por UUID         |
| POST   | `/api/orders`                   | Cria pedido demonstrativo      |

Exemplo de pedido:

```sh
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d "{\"items\":[{\"productId\":\"UUID_DO_PRODUTO\",\"quantity\":2}]}"
```

O corpo aceita apenas `items`, com até 50 produtos distintos; cada quantidade deve ser um inteiro entre 1 e 99. O backend calcula os valores com preços do PostgreSQL e responde `201` com `data.id`, `data.items` e `data.totalCents`. Dados financeiros enviados pelo cliente são rejeitados.

Erros usam `{ "error": { "code": "...", "message": "...", "details": [] } }`. Não há endpoint para listar pedidos.

## Testes e qualidade

```sh
bun run typecheck
bun run test
```

Para executar testes de integração, crie primeiro um banco separado terminado em `_test`, por exemplo `cardapio_test`, e configure a variável na sessão atual:

PowerShell:

```powershell
$env:DATABASE_URL_TEST = "postgres://usuario:senha@localhost:5432/cardapio_test"
bun run test:integration
```

O teste exige essa variável, autentica no banco, aplica migrations e grava dados. Não use banco de desenvolvimento ou produção. `docs/testes.md` registra os resultados observados.

## Build

```sh
bun run build
bun run start
```

## Solução de problemas

- **Falha de conexão ao iniciar:** verifique se o PostgreSQL está ativo, se o banco existe e se `DATABASE_URL` está correta. A API não inicia desconectada.
- **CORS bloqueado:** adicione a origem exata do frontend a `FRONTEND_ORIGINS` e reinicie a API; não use `*`.
- **Integração não inicia:** defina `DATABASE_URL_TEST` e confirme que o nome do banco termina em `_test`.
- **Imagem ausente:** seis pratos usam imagens locais servidas pelo frontend em `Frontend/public/images/`; bebidas sem imagem própria retornam `null` e usam o fallback visual.
- **Produto ou categoria não encontrado:** confirme se `db:seed` foi executado e use os UUIDs e slugs retornados pela API.
