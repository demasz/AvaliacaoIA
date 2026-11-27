# Especificação técnica do backend

## 1. Objetivo e evolução do escopo

O Cardápio Digital evoluiu do MVP originalmente exclusivamente frontend para uma aplicação com API Express e persistência PostgreSQL. O catálogo ativo é carregado do banco, e pedidos demonstrativos são registrados pelo backend. A confirmação não representa pagamento, entrega, envio à cozinha ou operação comercial real.

Esta especificação descreve o código implementado em `backend/`; a solicitação original foi preservada em `prompts/prompt-backend-copilot.md`.

## 2. Escopo

Incluído:

- API REST para saúde, categorias, produtos e criação de pedidos.
- Persistência de categorias, produtos, pedidos e snapshots dos itens.
- Validação de entrada, cálculo financeiro no servidor e transação atômica.
- Consumo da API pelo frontend React.

Fora do escopo: autenticação, painel administrativo, listagem pública de pedidos, estoque, pagamento, entrega, cupons, clientes e integrações comerciais.

## 3. Arquitetura e tecnologias

O backend é um serviço independente do frontend e pode ser iniciado na pasta `backend/`.

| Tecnologia                        | Uso                                                     |
| --------------------------------- | ------------------------------------------------------- |
| Node.js 24+                       | Execução do TypeScript nativo e do JavaScript compilado |
| Express 5                         | Aplicação HTTP e rotas                                  |
| TypeScript                        | Tipagem estática                                        |
| PostgreSQL                        | Persistência relacional                                 |
| Sequelize 6                       | Models, consultas, transações e conexão                 |
| Umzug                             | Histórico de migrations                                 |
| Zod                               | Validação de parâmetros, filtros e corpos               |
| Helmet, CORS e express-rate-limit | Segurança HTTP e limitação de pedidos                   |
| Vitest e Supertest                | Testes unitários e HTTP/integrados                      |

O uso de controllers separados foi evitado: as rotas validam e encaminham as chamadas para serviços com regras de negócio. Os serviços consultam models e não constroem respostas HTTP.

```text
backend/
├── src/
│   ├── config/              # Validação de ambiente
│   ├── database/            # Conexão, migrations e seeders
│   ├── middlewares/         # Erros centralizados
│   ├── models/              # Entidades Sequelize e associações
│   ├── modules/             # Serviços de categorias, produtos e pedidos
│   ├── routes/              # Contratos HTTP e validação de entrada
│   ├── schemas/             # Schemas Zod
│   ├── types/               # DTOs e contratos internos
│   ├── utils/               # Erros HTTP tipados
│   ├── app.ts               # Configuração Express testável
│   └── server.ts            # Conexão e ciclo de vida do servidor
└── tests/
    ├── unit/
    └── integration/
```

Fluxo de uma chamada: Express aplica CORS, Helmet e limite de JSON; a rota valida o input; o serviço executa a consulta ou regra de negócio; o middleware de erros converte exceções para o envelope documentado.

## 4. Banco de dados

Todos os identificadores persistidos são UUIDs. IDs estáveis identificam os registros do seed, enquanto slugs únicos são usados para filtros e URLs do catálogo. O frontend usa os UUIDs retornados pela API para montar pedidos. Valores monetários são inteiros em centavos.

| Tabela        | Campos e regras principais                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `categories`  | `id`, `name`, `slug` único, timestamps                                                                                                            |
| `products`    | `id`, `slug` único, `name`, `description`, `price_cents`, `category_id`, `image_url` anulável, `featured`, `featured_label`, `active`, timestamps |
| `orders`      | `id`, `status` (`CONFIRMED`), `total_cents`, timestamps                                                                                           |
| `order_items` | `id`, `order_id`, `product_id` anulável, `product_name`, `unit_price_cents`, `quantity`, `subtotal_cents`, timestamps                             |

Relacionamentos e integridade:

- Categoria tem muitos produtos; produto exige uma categoria. A exclusão da categoria é restringida.
- Pedido tem um ou mais itens; excluir um pedido remove seus itens.
- O item referencia o produto com `ON DELETE SET NULL`; seu nome e valores copiados preservam o histórico.
- Índices apoiam filtros por categoria/estado, ordenação temporal de pedidos e acesso a itens.
- Constraints no PostgreSQL impedem preços e totais negativos, estados de pedido não suportados, quantidades não positivas e valores negativos nos snapshots.

### Migrations e seed

O Umzug aplica a migration versionada `20261126-initial-schema` e armazena o histórico em `SequelizeMeta`. O seed contém quatro categorias e oito produtos: seis pratos com imagens locais e duas bebidas sem imagem própria. Ele usa IDs estáveis e executa em transação; execuções repetidas atualizam os registros existentes, inclusive quando nomes ou slugs do catálogo mudam.

As seis imagens dos pratos ficam em `public/images/` e são servidas pelo frontend; os produtos apontam para caminhos locais em `imageUrl`. As bebidas sem imagem usam `imageUrl: null` e o fallback visual da interface. Nenhuma URL interna do Lovable é usada.

## 5. Regras de pedidos

`POST /api/orders` aceita um array não vazio com até 50 itens distintos. Cada item exige um UUID `productId` e `quantity` inteira de 1 a 99. A estrutura é estrita: atributos financeiros ou outros campos não previstos são rejeitados.

O serviço abre uma transação, busca os produtos no banco com bloqueio de atualização, valida existência e estado ativo, obtém os preços persistidos, calcula subtotal e total em centavos e grava o pedido junto dos snapshots. O total e cada subtotal não podem exceder o inteiro máximo do PostgreSQL. Qualquer falha durante a gravação reverte a transação inteira.

Fórmulas:

```text
subtotalCents = priceCents do banco × quantity
totalCents = soma dos subtotais
```

Caso financeiro coberto pelos testes:

```text
2 × 2500 + 1 × 800 + 2 × 1200 = 8200 centavos
```

Duplicidade de produto no mesmo corpo é rejeitada; o cliente deve enviar um item por produto com a quantidade agregada. Não há retentativa automática nem chave de idempotência: uma tentativa manual após perda de resposta pode criar outro pedido.

## 6. Endpoints

Todos os endpoints usam o prefixo `/api`.

| Método e endpoint                    | Comportamento                                                                                             |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `GET /api/health`                    | Retorna `{ "status": "ok", "service": "cardapio-api" }`; não expõe credenciais ou estado interno do banco |
| `GET /api/categories`                | Lista categorias com produtos ativos, em ordem alfabética                                                 |
| `GET /api/products`                  | Lista produtos ativos, incluindo os dados públicos da categoria                                           |
| `GET /api/products?category=mains`   | Filtra pelo slug da categoria                                                                             |
| `GET /api/products?featured=true`    | Filtra por destaque; aceita filtros combinados                                                            |
| `GET /api/products/:id`              | Consulta produto ativo por UUID, incluindo categoria                                                      |
| `POST /api/orders`                   | Registra pedido; responde `201 Created` com snapshot e total do banco                                     |

Não existe `GET /api/orders` ou endpoint administrativo.

### Exemplo de criação

Requisição:

```json
{
  "items": [{ "productId": "UUID_DO_PRODUTO", "quantity": 2 }]
}
```

Resposta `201`:

```json
{
  "data": {
    "id": "UUID_DO_PEDIDO",
    "status": "CONFIRMED",
    "createdAt": "2026-11-26T20:00:00.000Z",
    "items": [
      {
        "id": "UUID_DO_ITEM",
        "productId": "UUID_DO_PRODUTO",
        "productName": "Mix de Carnes",
        "unitPriceCents": 2500,
        "quantity": 2,
        "subtotalCents": 5000
      }
    ],
    "totalCents": 5000
  }
}
```

As respostas de categorias, produtos e pedidos usam `{ "data": ... }`; o health check é a exceção.

## 7. Validação e erros

Schemas Zod validam UUID, slugs, booleano de destaque e corpo da criação. Erros são retornados como:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "A requisição contém dados inválidos.",
    "details": []
  }
}
```

O conteúdo de `details` é preenchido para erros de validação de entrada. Códigos e status principais:

| HTTP | Exemplos                                          |
| ---: | ------------------------------------------------- |
|  400 | JSON inválido, input inválido ou atributos extras |
|  403 | Origem não permitida                              |
|  404 | Rota, categoria ou produto inexistente            |
|  409 | Produto inativo ou conflito persistente           |
|  413 | Corpo excede o limite                             |
|  422 | Total excede o limite numérico                    |
|  429 | Limite de confirmação excedido                    |
|  500 | Erro inesperado, sem stack trace na resposta      |

Falhas inesperadas são registradas no console fora de produção. Erros de banco conhecidos são convertidos sem expor URLs, credenciais ou stack traces ao cliente.

## 8. Configuração e segurança

Copie `backend/.env.example` para `backend/.env` e ajuste os valores:

| Variável            | Uso                                                                  |
| ------------------- | -------------------------------------------------------------------- |
| `NODE_ENV`          | `development`, `test` ou `production`                                |
| `PORT`              | Porta da API; padrão `3001`                                          |
| `DATABASE_URL`      | Banco da aplicação; obrigatório fora do modo de testes               |
| `DATABASE_URL_TEST` | Exclusivamente banco de testes; nome deve terminar em `_test`        |
| `FRONTEND_ORIGINS`  | Origens exatas separadas por vírgula; padrão local na porta `3000` |
| `VITE_API_URL`      | URL da API no frontend; padrão `http://localhost:3001/api`           |

O backend carrega `.env` a partir de sua própria pasta. A configuração de testes falha explicitamente sem `DATABASE_URL_TEST` e nunca usa `DATABASE_URL` como fallback.

Helmet é habilitado, `X-Powered-By` é desativado, CORS aceita apenas origens configuradas (ou chamadas sem cabeçalho `Origin`) e o corpo JSON é limitado a 16 KB. `POST /api/orders` permite até 20 requisições por IP a cada 15 minutos; em testes, o limite é 100.

Não versionar arquivos `.env` nem usar credenciais de produção localmente.

## 9. Integração frontend

O cliente HTTP está em `src/lib/api/`: centraliza URL base, JSON, timeout de 10 segundos, erros HTTP e falhas de conexão. Produtos e categorias são obtidos pela API; o filtro por categoria acontece no catálogo já carregado. Estados de carregamento, erro, catálogo vazio e resultados são distintos.

O reducer mantém apenas itens do carrinho e a confirmação recebida. O frontend envia somente `{ items: [{ productId, quantity }] }`; após resposta bem-sucedida, exibe snapshots e total do backend e limpa o carrinho. Em falha, os itens permanecem e a interface permite tentar novamente. A interface limita a quantidade por produto em 99 e não permite alterações enquanto o envio está em andamento.

O frontend não armazena pedidos nem assume autoridade sobre preços. O carrinho continua temporário em memória e se perde ao recarregar a página.

## 10. Execução e testes

Pré-requisitos: Node.js 24+, Bun e PostgreSQL acessível.

Na raiz, instale e inicie o frontend:

```sh
bun install
bun run dev
```

Em outro terminal:

```powershell
cd backend
bun install
Copy-Item .env.example .env
```

Configure `DATABASE_URL` e as origens em `backend/.env`, crie o banco indicado e então execute:

```sh
bun run db:migrate
bun run db:seed
bun run dev
```

Scripts disponíveis em `backend/`:

| Comando                    | Resultado                           |
| -------------------------- | ----------------------------------- |
| `bun run dev`              | API com Node em modo watch          |
| `bun run build`            | Compila TypeScript para `dist/`     |
| `bun run start`            | Inicia o build                      |
| `bun run typecheck`        | Verifica código e testes            |
| `bun run test`             | Testes unitários                    |
| `bun run test:integration` | Testes HTTP com PostgreSQL isolado  |
| `bun run db:migrate`       | Aplica migrations                   |
| `bun run db:rollback`      | Reverte a migration mais recente    |
| `bun run db:seed`          | Insere ou atualiza catálogo inicial |

Para integração, crie um banco separado cujo nome termine em `_test` e defina `DATABASE_URL_TEST`; por exemplo, `cardapio_test`. Nunca aponte essa variável para desenvolvimento ou produção. O teste não cria nem remove o banco, mas grava nele e aplica migrations.

## 11. Testes

Os testes unitários cobrem schemas, contratos HTTP, erros, filtros e regras financeiras. Os testes de integração usam Supertest e PostgreSQL real para validar catálogo, filtros, consulta individual, pedido financeiro de 8200 centavos, rejeições, snapshots, rollback e idempotência do seed.

Os resultados e limites de cada execução são registrados em `docs/testes.md`; os comandos e resultados devem corresponder à execução observada, não apenas à cobertura planejada.

## 12. Limitações conhecidas

- Não há autenticação, autorização de usuário ou consulta posterior do pedido.
- O status `CONFIRMED` significa somente persistência demonstrativa; não há cobrança.
- Não há chave de idempotência em pedidos. O servidor não repete requisições automaticamente, mas uma repetição manual após resposta perdida pode duplicar o registro.
- Seis pratos usam imagens locais em `public/images/`; as duas bebidas sem imagem própria usam o fallback visual.
- O carrinho não persiste após recarregar.
- CORS local assume o frontend em `localhost:3000` ou `127.0.0.1:3000`; configure a origem real se a porta ou o host forem diferentes.
