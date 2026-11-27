# Documentação do projeto — Cardápio Digital

## 1. Visão geral

O Cardápio Digital é um MVP web para uma lanchonete fictícia chamada **Taverna do Bosque**. Clientes podem consultar os produtos, filtrar categorias, montar uma sacola e registrar um pedido demonstrativo.

O frontend e a API são aplicações independentes no mesmo repositório. O catálogo e os pedidos ficam no PostgreSQL; o carrinho existe somente na memória do navegador. A confirmação do pedido não representa pagamento, entrega ou envio à cozinha.

## 2. Funcionalidades

- Consulta de produtos, descrições, preços, categorias e imagens.
- Filtro por categoria e seção de produtos em destaque.
- Adição, incremento, decremento e remoção de itens na sacola.
- Cálculo de subtotais e total em centavos.
- Envio do pedido à API e exibição do resumo persistido.
- Estados de carregamento, erro de conexão e confirmação.
- Layout responsivo e componentes acessíveis para navegação e diálogo.

## 3. Tecnologias e arquitetura

| Camada | Tecnologias principais |
| --- | --- |
| Interface | React, TypeScript, TanStack Start/Router, Vite, Tailwind CSS |
| Componentes e ícones | Radix UI, Lucide React |
| API | Node.js 24+, Express 5, TypeScript, Zod |
| Persistência | PostgreSQL, Sequelize 6, Umzug |
| Qualidade | Vitest, Testing Library, Supertest, ESLint |

Fluxo de leitura do catálogo:

```text
Navegador
  -> Frontend/src/routes/index.tsx
  -> Frontend/src/lib/api/
  -> API Express (backend/src/routes/)
  -> serviços (backend/src/modules/)
  -> Sequelize
  -> PostgreSQL
```

No registro de pedidos, a API valida os identificadores e as quantidades, lê os preços atuais no banco, calcula os valores e grava o pedido e seus itens em uma transação. O frontend não envia nem determina os preços finais.

## 4. Catálogo atual

Os preços são valores iniciais do seed e podem ser alterados no banco. As imagens dos pratos são arquivos estáticos em `Frontend/public/images/`; as bebidas usam o fallback visual. Os arquivos fornecidos originalmente ficam em `Frontend/Assets/`.

| Produto | Categoria | Preço | Imagem |
| --- | --- | ---: | --- |
| Mix de Carnes | Pratos principais | R$ 25,00 | `mix-de-carnes.jpg` |
| Espetão da Taverna | Pratos principais | R$ 29,00 | `espetao.jpg` |
| Espetinho da Taverna | Pratos principais | R$ 12,00 | `espetinho.jpg` |
| Mix de Cogumelos | Acompanhamentos | R$ 14,00 | `mix-de-cogumelos.jpg` |
| Pão com Queijo | Acompanhamentos | R$ 11,00 | `pao-com-queijo.jpg` |
| Maçã Recheada | Sobremesas | R$ 16,00 | `maca-recheada.jpg` |
| Poção Azul | Bebidas | R$ 8,00 | Fallback |
| Elixir de Fogo | Bebidas | R$ 10,00 | Fallback |

As categorias têm slugs `mains`, `sides`, `desserts` e `drinks`. Os produtos e categorias usam IDs UUID estáveis no seed. O seed atualiza os registros por ID, portanto mudanças em nomes ou slugs não criam produtos duplicados.

## 5. Estrutura do repositório

```text
.
├── Frontend/
│   ├── src/
│   │   ├── components/   # Cartões, sacola e componentes de interface
│   │   ├── lib/api/      # Cliente HTTP, tipos e funções de acesso à API
│   │   ├── lib/cart.ts   # Reducer, validação e cálculos da sacola
│   │   ├── routes/       # Páginas TanStack Start
│   │   └── test/         # Testes do frontend
│   ├── public/images/    # Imagens locais dos pratos
│   ├── Assets/           # Arquivos de imagem originais
│   ├── package.json      # Dependências e scripts do frontend
│   └── vite.config.ts    # Vite, TanStack Start e Nitro
├── backend/
│   ├── src/config/       # Configuração e validação de ambiente
│   ├── src/database/     # Conexão, migrations e seed
│   ├── src/models/       # Models e associações Sequelize
│   ├── src/modules/      # Regras do catálogo e pedidos
│   ├── src/routes/       # Endpoints e validação HTTP
│   └── tests/            # Testes unitários e de integração
├── docs/                 # Especificação, guia e registros de validação
├── prompts/              # Prompts de implementação preservados
└── README.md
```

## 6. API e pedidos

Todos os endpoints usam o prefixo `/api`.

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/api/health` | Verifica se a API está disponível |
| `GET` | `/api/categories` | Lista categorias com produtos ativos |
| `GET` | `/api/products` | Lista produtos ativos |
| `GET` | `/api/products?category=mains` | Filtra pelo slug da categoria |
| `GET` | `/api/products?featured=true` | Lista produtos em destaque |
| `GET` | `/api/products/:id` | Consulta produto ativo por UUID |
| `POST` | `/api/orders` | Registra um pedido demonstrativo |

Exemplo do corpo aceito por `POST /api/orders`:

```json
{
  "items": [
    { "productId": "UUID_DO_PRODUTO", "quantity": 2 }
  ]
}
```

O corpo aceita até 50 produtos distintos; cada quantidade deve ser um inteiro de 1 a 99. A API rejeita itens duplicados e campos financeiros enviados pelo cliente. Valores são calculados em centavos, e a resposta contém o pedido confirmado, os snapshots dos itens e `totalCents`.

O erro segue o formato `{ "error": { "code": "...", "message": "...", "details": [] } }`. Não existe endpoint público para listar pedidos.

## 7. Modelo de dados

| Tabela | Responsabilidade |
| --- | --- |
| `categories` | Categorias do catálogo e seus slugs únicos |
| `products` | Nome, descrição, preço, imagem, categoria, destaque e estado ativo |
| `orders` | Registro e estado do pedido demonstrativo |
| `order_items` | Produto, quantidade, preço e subtotal copiados no momento da compra |

O `product_id` em um item pode ficar nulo se o produto for removido, mas o nome e os valores históricos são preservados no snapshot. Os pedidos e itens são gravados na mesma transação para evitar registros parciais.

## 8. Instalação e execução local

### Requisitos

- Node.js 24 ou superior.
- Bun.
- PostgreSQL local ou acessível.

### Configurar o banco e iniciar a API

No terminal PowerShell, a partir da raiz:

```powershell
Set-Location backend
bun install
Copy-Item .env.example .env
```

Configure `DATABASE_URL` no arquivo `backend/.env`, crie o banco indicado e execute:

```powershell
bun run db:migrate
bun run db:seed
bun run dev
```

A API escuta por padrão em `http://localhost:3001`. O seed deve ser executado após as migrations.

### Iniciar o frontend

Em outro terminal:

```powershell
Set-Location Frontend
bun install
bun run dev
```

O frontend é servido em `http://localhost:3000` e usa `http://localhost:3001/api` como URL padrão da API. Para apontar para outro endereço, defina `VITE_API_URL` antes de iniciar o Vite. Ajuste também `FRONTEND_ORIGINS` no backend para permitir a origem do frontend.

## 9. Testes e builds

Dentro de `Frontend/`:

```powershell
bun run test
bun run typecheck
bun run lint
bun run build
```

Dentro de `backend/`:

```powershell
bun run test
bun run typecheck
bun run build
```

Os testes de integração precisam de um banco separado cujo nome termine em `_test`. Defina `DATABASE_URL_TEST` na sessão do PowerShell:

```powershell
$env:DATABASE_URL_TEST = "postgres://usuario:senha@localhost:5432/cardapio_test"
bun run test:integration
```

Os testes aplicam migrations e gravam dados nesse banco. Nunca use banco de produção ou desenvolvimento para testes de integração. Os resultados efetivamente executados estão em [testes.md](./testes.md).

## 10. Configuração e segurança

As variáveis do backend são documentadas em `backend/.env.example`: `NODE_ENV`, `PORT`, `DATABASE_URL`, `DATABASE_URL_TEST` e `FRONTEND_ORIGINS`. Não versione arquivos `.env` nem credenciais. O frontend usa `VITE_API_URL`, que não deve conter segredos.

A API usa Helmet, allowlist de CORS, limite de corpo JSON, rate limiting para criação de pedidos e validação dos dados recebidos. A configuração detalhada e os códigos de erro estão em [spec-backend.md](./spec-backend.md).

## 11. Limitações conhecidas

- O sistema não tem autenticação, autorização de clientes ou painel administrativo.
- Pedidos são registros demonstrativos; não há pagamento, estoque, entrega ou operação de cozinha.
- Não há endpoint público para consultar pedidos.
- O carrinho não persiste após recarregar ou fechar a página.
- Não há chave de idempotência para pedidos: repetir manualmente uma solicitação pode criar outro registro.
- As duas bebidas não têm imagens próprias; os seis pratos usam imagens locais.

## 12. Documentação relacionada

- [README principal](../README.md): apresentação e comandos essenciais.
- [Especificação funcional](./spec.md): requisitos e critérios do MVP.
- [Especificação técnica do backend](./spec-backend.md): API, banco, validação, segurança e regras de pedidos.
- [README do backend](../backend/README.md): configuração e comandos da API.
- [Testes e validação](./testes.md): resultados observados e limitações dos testes.
