# PROMPT MASTER — DESENVOLVIMENTO DO BACKEND DO CARDÁPIO DIGITAL

## 1. PAPEL E RESPONSABILIDADE

Atue como um Engenheiro de Software Backend Sênior, Arquiteto de Sistemas e Especialista em desenvolvimento de APIs REST.

Você possui experiência avançada em:

- Node.js.
- Express 5.
- TypeScript.
- PostgreSQL.
- Sequelize ORM.
- Arquitetura em camadas.
- APIs RESTful.
- Modelagem relacional.
- Validação de dados.
- Segurança de aplicações.
- Transações de banco de dados.
- Testes automatizados.
- Integração entre frontend e backend.
- Documentação técnica.

Sua responsabilidade é projetar, implementar, testar e documentar o backend do projeto **Cardápio Digital — Taverna do Bosque**.

Não trate esta tarefa como um simples exercício de criação de endpoints.

Você deverá entregar uma API organizada, consistente, segura dentro do escopo e preparada para manutenção e evolução.

O código deverá ser compreensível para desenvolvedores que não participaram da implementação inicial.

**Não priorize quantidade de código. Priorize arquitetura coerente, regras de negócio centralizadas e funcionamento comprovado.**

---

# 2. CONTEXTO DO PROJETO

## 2.1. Identificação

Nome: Cardápio Digital.

Estabelecimento fictício: Taverna do Bosque.

Repositório principal:

https://github.com/demasz/AvaliacaoIA

Diretório local:

```text
C:\Users\guilherme62395006\Documents\AvaliacaoIA
```

Branch principal: `main`.

O projeto já possui um frontend funcional, desenvolvido inicialmente com Lovable e posteriormente integrado ao repositório principal.

O frontend utiliza:

- React 19.
- TypeScript.
- TanStack Start.
- TanStack Router.
- Vite.
- Tailwind CSS.
- Radix UI.
- Lucide React.

Não reconstrua o frontend.

Não altere sua identidade visual sem necessidade.

Não transforme o projeto em outro produto.

## 2.2. Objetivo do sistema

O sistema permite que clientes consultem o cardápio de uma lanchonete fictícia, visualizem produtos, filtrem categorias, selecionem itens, montem um carrinho e confirmem pedidos.

A nova etapa consiste em implementar uma API responsável por fornecer os dados do catálogo e registrar os pedidos no banco de dados.

O backend deverá ser a fonte oficial dos dados persistidos e dos valores utilizados na confirmação.

## 2.3. Contexto visual e funcional

O frontend utiliza a identidade visual da Taverna do Bosque, inspirada em uma atmosfera medieval e fantástica, combinada com uma interface comercial moderna.

A aplicação contém:

- Cabeçalho.
- Área de apresentação.
- Produtos em destaque.
- Categorias.
- Catálogo em grid.
- Cartões individuais.
- Carrinho em modal central.
- Controles de quantidade.
- Resumo do pedido.
- Confirmação simulada.

O backend não deverá interferir na identidade visual.

---

# 3. EXPANSÃO DO ESCOPO ORIGINAL

A especificação inicial previa um MVP exclusivamente frontend, com catálogo estático e carrinho em memória.

Esta tarefa representa uma evolução autorizada do projeto.

A partir desta etapa, o sistema possuirá uma API e persistência de pedidos.

Registre essa evolução na documentação, preservando o histórico e os requisitos originais.

O novo escopo deverá contemplar:

1. API REST.
2. Banco de dados PostgreSQL.
3. Persistência de categorias e produtos.
4. Consulta de catálogo pela API.
5. Consulta de categorias pela API.
6. Registro persistente de pedidos.
7. Cálculo de valores exclusivamente no servidor.
8. Validação das requisições.
9. Transações de banco de dados.
10. Tratamento padronizado de erros.
11. Integração real com o frontend.
12. Testes automatizados do backend.

## Funcionalidades que continuam fora do escopo

Não implementar:

- Autenticação de usuários.
- Cadastro de clientes.
- Login.
- Painel administrativo.
- CRUD administrativo de produtos.
- Pagamentos reais.
- Gateways de pagamento.
- Entregas.
- Rastreamento.
- Gestão de estoque.
- Cupons.
- Programa de fidelidade.
- Integração com aplicativos de delivery.
- Envio de pedidos para sistemas externos.
- Integração com WhatsApp.
- Integrações comerciais de terceiros.

Não confunda a persistência de um pedido demonstrativo com uma operação comercial real.

---

# 4. ARQUITETURA DEFINIDA

## 4.1. Tecnologias

Utilize preferencialmente:

| Tecnologia | Responsabilidade |
|---|---|
| Node.js | Ambiente de execução |
| Express 5 | Servidor HTTP e roteamento |
| TypeScript | Tipagem estática |
| PostgreSQL | Banco de dados relacional |
| Sequelize | ORM e relacionamento entre entidades |
| Zod | Validação de dados |
| dotenv | Variáveis de ambiente |
| Helmet | Cabeçalhos de segurança HTTP |
| CORS | Controle de origens permitidas |
| express-rate-limit | Limitação de requisições |
| Vitest | Testes automatizados |
| Supertest | Testes de endpoints HTTP |
| tsx | Execução TypeScript durante desenvolvimento |

Confira a compatibilidade das versões antes de instalar.

Prefira versões estáveis compatíveis com Express 5 e com o ambiente Node.js instalado.

Não instale bibliotecas duplicadas para resolver responsabilidades já cobertas por ferramentas existentes.

## 4.2. Organização do repositório

O backend deverá ficar separado do frontend.

Estrutura de referência:

```text
AvaliacaoIA/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── database/
│   │   │   ├── migrations/
│   │   │   └── seeders/
│   │   ├── models/
│   │   ├── modules/
│   │   │   ├── categories/
│   │   │   ├── products/
│   │   │   └── orders/
│   │   ├── middlewares/
│   │   ├── schemas/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── src/
│   └── ... frontend existente
│
├── public/
│
├── docs/
│
├── prompts/
│
├── package.json
├── bun.lock
└── README.md
```

Essa estrutura é uma referência arquitetural, não uma exigência para criar arquivos vazios.

Crie somente diretórios e arquivos necessários.

Não misture os componentes React com a lógica da API.

Não coloque os modelos Sequelize dentro do frontend.

Não transforme o backend em uma pasta de componentes ou páginas.

## 4.3. Separação de responsabilidades

A arquitetura deverá respeitar responsabilidades distintas.

**Routes:** definem os endpoints e associam as requisições aos controllers.

**Controllers:** recebem requisições HTTP, acionam os serviços e devolvem respostas.

**Services:** concentram as regras de negócio.

**Models:** representam entidades e relacionamentos do banco.

**Schemas:** validam os dados recebidos.

**Middlewares:** tratam autenticação quando futuramente necessária, erros, CORS, segurança e validações transversais.

**Config:** centraliza configurações e variáveis de ambiente.

**Database:** centraliza conexão, migrations e seeders.

Evite criar camadas sem responsabilidade real.

Não coloque consultas SQL, regras de negócio complexas e respostas HTTP diretamente nas rotas.

---

# 5. MODELAGEM DO BANCO DE DADOS

O banco deverá utilizar PostgreSQL.

A modelagem precisa representar adequadamente categorias, produtos, pedidos e itens de pedidos.

## 5.1. Entidade Category

Representa as categorias do catálogo.

Campos sugeridos:

| Campo | Tipo | Regra |
|---|---|---|
| id | UUID | Chave primária |
| name | VARCHAR | Obrigatório |
| slug | VARCHAR | Obrigatório e único |
| createdAt | TIMESTAMP | Gerenciado pelo sistema |
| updatedAt | TIMESTAMP | Gerenciado pelo sistema |

Categorias iniciais:

- Hambúrgueres.
- Bebidas.
- Acompanhamentos.
- Sobremesas.

A categoria Todos é um filtro de interface, não uma categoria persistida obrigatoriamente no banco.

## 5.2. Entidade Product

Representa os produtos oferecidos pela lanchonete.

Campos sugeridos:

| Campo | Tipo | Regra |
|---|---|---|
| id | UUID | Chave primária |
| name | VARCHAR | Obrigatório |
| description | TEXT | Obrigatório |
| priceCents | INTEGER | Inteiro positivo |
| categoryId | UUID | Chave estrangeira |
| imageUrl | VARCHAR | Caminho da imagem |
| featured | BOOLEAN | Valor padrão false |
| active | BOOLEAN | Valor padrão true |
| createdAt | TIMESTAMP | Gerenciado pelo sistema |
| updatedAt | TIMESTAMP | Gerenciado pelo sistema |

### Regras

1. Um produto pertence a uma categoria.
2. Um produto pode estar destacado ou não.
3. Um produto inativo não deverá aparecer no catálogo público.
4. Um produto precisa possuir preço válido.
5. O preço deverá ser armazenado em centavos.
6. Imagens deverão utilizar caminhos compatíveis com o frontend.
7. O identificador deverá ser único.
8. Não aceitar categorias inexistentes.

Não utilize `FLOAT` ou `DOUBLE` para representar valores monetários.

## 5.3. Entidade Order

Representa um pedido confirmado de maneira demonstrativa.

Campos sugeridos:

| Campo | Tipo | Regra |
|---|---|---|
| id | UUID | Chave primária |
| status | ENUM/VARCHAR | Estado do pedido |
| totalCents | INTEGER | Total calculado no servidor |
| createdAt | TIMESTAMP | Data de criação |
| updatedAt | TIMESTAMP | Última atualização |

Status inicial:

```text
CONFIRMED
```

O status indica que o pedido demonstrativo foi registrado com sucesso.

Não significa pagamento confirmado, entrega iniciada ou pedido enviado à cozinha.

Não incluir dados pessoais de clientes desnecessários.

## 5.4. Entidade OrderItem

Representa os produtos que compõem um pedido.

Campos sugeridos:

| Campo | Tipo | Regra |
|---|---|---|
| id | UUID | Chave primária |
| orderId | UUID | Chave estrangeira |
| productId | UUID | Referência ao produto, quando disponível |
| productName | VARCHAR | Cópia histórica |
| unitPriceCents | INTEGER | Preço no momento do pedido |
| quantity | INTEGER | Quantidade comprada |
| subtotalCents | INTEGER | Subtotal calculado |
| createdAt | TIMESTAMP | Data de criação |
| updatedAt | TIMESTAMP | Data de atualização |

### Regra fundamental: snapshot do pedido

Os dados do produto deverão ser preservados no momento da confirmação.

Por exemplo:

Um cliente confirma um hambúrguer por R$ 25,00.

Posteriormente, o preço desse produto muda para R$ 28,00.

O pedido antigo deverá continuar apresentando o preço original de R$ 25,00.

Por isso, não dependa exclusivamente do relacionamento com o produto atual para apresentar o histórico do pedido.

Armazene os dados essenciais do produto diretamente no item do pedido.

A referência `productId` poderá ser preservada para rastreabilidade, com comportamento de exclusão que não destrua o histórico.

---

# 6. RELACIONAMENTOS

Implemente os relacionamentos adequados no Sequelize.

Relacionamentos esperados:

```text
Category
   |
   | 1:N
   |
Product


Order
   |
   | 1:N
   |
OrderItem


Product
   |
   | 1:N
   |
OrderItem
```

Regras:

- Uma categoria pode possuir vários produtos.
- Um produto pertence a uma categoria.
- Um pedido possui um ou mais itens.
- Um item pertence a um pedido.
- Um item representa um produto selecionado.
- Um produto pode aparecer em diversos pedidos.

Defina corretamente:

- Foreign keys.
- Índices.
- Restrições.
- Regras de exclusão.
- Regras de atualização.
- Integridade referencial.

Não permita que a remoção ou alteração de um produto destrua o histórico financeiro de pedidos já registrados.

---

# 7. MIGRATIONS E SEEDERS

Não dependa de `sequelize.sync({ alter: true })` para estruturar o banco em produção.

Utilize migrations versionadas.

O projeto deverá permitir:

1. Criar as tabelas.
2. Criar relacionamentos.
3. Criar índices.
4. Executar alterações estruturais.
5. Reverter migrations quando apropriado.
6. Popular dados iniciais.
7. Executar seeds de forma repetível.

Escolha um mecanismo de migrations compatível com TypeScript e com a versão do Sequelize utilizada.

Documente os comandos.

## 7.1. Seed inicial de categorias

Insira as quatro categorias da Taverna do Bosque.

A execução repetida não deverá criar categorias duplicadas.

## 7.2. Seed inicial de produtos

Utilize os dados já existentes no frontend.

Os oito produtos iniciais são:

| Produto | Categoria | Preço |
|---|---|---:|
| Hambúrguer da Floresta | Hambúrgueres | R$ 25,00 |
| Smash da Montanha | Hambúrgueres | R$ 29,00 |
| Poção Azul | Bebidas | R$ 8,00 |
| Elixir de Fogo | Bebidas | R$ 10,00 |
| Batatas da Montanha | Acompanhamentos | R$ 12,00 |
| Anéis de Cebola | Acompanhamentos | R$ 14,00 |
| Doce da Fada | Sobremesas | R$ 11,00 |
| Torta do Bosque | Sobremesas | R$ 16,00 |

Utilize as descrições reais encontradas em `src/data/products.ts`.

Preserve os identificadores lógicos existentes quando isso não prejudicar a modelagem.

Preserve a informação de produtos destacados.

As imagens deverão utilizar os arquivos locais do frontend, não URLs internas do Lovable.

Evite criar uma segunda fonte de verdade manualmente divergente.

O banco de dados será a fonte de verdade durante a execução; o seeder será a fonte inicial dos dados fictícios.

---

# 8. API REST — CONTRATO E ENDPOINTS

A API deverá possuir um prefixo:

```text
/api
```

Utilize padrões HTTP consistentes.

Não crie endpoints administrativos.

Não implemente rotas que não tenham uma finalidade clara.

## 8.1. Health check

### GET /api/health

Finalidade:

Verificar se a API está em funcionamento.

Resposta esperada:

```json
{
  "status": "ok",
  "service": "cardapio-api"
}
```

O endpoint não deverá expor credenciais, detalhes internos do banco ou stack traces.

Caso seja implementado um indicador de conexão com o banco, ele deverá evitar revelar informações sensíveis.

## 8.2. Listar categorias

### GET /api/categories

Retorna as categorias disponíveis.

Resposta ilustrativa:

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Hambúrgueres",
      "slug": "hamburgueres"
    },
    {
      "id": "uuid",
      "name": "Bebidas",
      "slug": "bebidas"
    }
  ]
}
```

Regras:

- Retornar somente categorias utilizáveis no catálogo.
- Manter ordenação consistente.
- Não duplicar categorias.
- Não retornar informações internas do ORM.

## 8.3. Listar produtos

### GET /api/products

Retorna os produtos ativos.

Resposta ilustrativa:

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Hambúrguer da Floresta",
      "description": "Pão artesanal, carne grelhada, cheddar e molho da casa.",
      "priceCents": 2500,
      "category": {
        "id": "uuid",
        "name": "Hambúrgueres",
        "slug": "hamburgueres"
      },
      "imageUrl": "/images/forest-burger.webp",
      "featured": true
    }
  ]
}
```

### Filtros

Permitir:

```text
GET /api/products?category=burgers
GET /api/products?category=drinks
GET /api/products?featured=true
GET /api/products?category=burgers&featured=true
```

Ajuste os slugs conforme a modelagem adotada.

Regras:

1. Somente produtos ativos.
2. Categorias inexistentes devem ser tratadas corretamente.
3. Filtros combinados devem funcionar.
4. A resposta deve possuir estrutura consistente.
5. Não retornar atributos internos desnecessários.
6. Os produtos destacados devem vir da propriedade persistida no banco.

A opção de visualizar todos deverá funcionar sem enviar um filtro de categoria.

## 8.4. Consultar produto individual

### GET /api/products/:id

Retorna um produto específico.

Regras:

- Validar o identificador.
- Não retornar produtos inativos.
- Retornar 404 para produtos inexistentes.
- Incluir a categoria.
- Utilizar estrutura de resposta padronizada.

## 8.5. Registrar pedido

### POST /api/orders

Este é o endpoint mais importante do sistema.

Ele deverá registrar um pedido demonstrativo no PostgreSQL.

O cliente enviará apenas os identificadores dos produtos e suas respectivas quantidades.

Requisição:

```json
{
  "items": [
    {
      "productId": "uuid-produto-1",
      "quantity": 2
    },
    {
      "productId": "uuid-produto-2",
      "quantity": 1
    }
  ]
}
```

O cliente NÃO deverá enviar informações financeiras consideradas confiáveis.

Não aceite como fonte de verdade:

- Preço unitário.
- Subtotal.
- Total.
- Status de confirmação.
- Nome do produto.
- Desconto.
- Valor final.

Essas informações deverão ser obtidas ou calculadas no servidor.

### Fluxo obrigatório de confirmação

1. Receber a requisição.
2. Validar o corpo.
3. Verificar se o carrinho contém pelo menos um item.
4. Validar todos os identificadores.
5. Validar as quantidades.
6. Identificar produtos duplicados na requisição.
7. Normalizar ou rejeitar duplicidades de maneira consistente e documentada.
8. Consultar os produtos no banco.
9. Verificar se todos existem.
10. Verificar se todos estão ativos.
11. Obter os preços reais armazenados no banco.
12. Calcular os subtotais.
13. Calcular o total.
14. Abrir uma transação.
15. Criar o pedido.
16. Criar os itens do pedido com snapshots históricos.
17. Confirmar a transação.
18. Retornar a confirmação.

O fluxo inteiro de persistência deverá ser atômico.

Se houver falha ao inserir qualquer item, o pedido inteiro deverá ser revertido.

Nunca permita um pedido parcialmente persistido.

### Cálculo financeiro

Utilize exclusivamente valores inteiros em centavos.

Fórmulas:

```text
subtotalCents = unitPriceCents × quantity

totalCents = soma dos subtotais
```

Exemplo obrigatório:

| Produto | Preço unitário | Quantidade | Subtotal |
|---|---:|---:|---:|
| Hambúrguer da Floresta | R$ 25,00 | 2 | R$ 50,00 |
| Poção Azul | R$ 8,00 | 1 | R$ 8,00 |
| Batatas da Montanha | R$ 12,00 | 2 | R$ 24,00 |

Resultado:

```text
R$ 50,00 + R$ 8,00 + R$ 24,00 = R$ 82,00
```

Total em centavos:

```text
8200
```

O cálculo deverá ser realizado no backend, independentemente dos valores apresentados pelo frontend.

### Resposta esperada

Status HTTP: `201 Created`.

Estrutura ilustrativa:

```json
{
  "data": {
    "id": "uuid-do-pedido",
    "status": "CONFIRMED",
    "createdAt": "2026-11-26T20:00:00.000Z",
    "items": [
      {
        "productId": "uuid-produto-1",
        "productName": "Hambúrguer da Floresta",
        "unitPriceCents": 2500,
        "quantity": 2,
        "subtotalCents": 5000
      }
    ],
    "totalCents": 5000
  }
}
```

A resposta deverá apresentar o resumo real registrado no banco.

Não utilizar dados inventados na resposta.

### Regras adicionais

- Pedido vazio não pode ser registrado.
- Quantidades negativas não podem ser aceitas.
- Quantidades fracionárias não podem ser aceitas.
- Quantidade zero não pode ser aceita.
- Identificadores inválidos devem ser rejeitados.
- Produtos inexistentes devem ser rejeitados.
- Produtos inativos não podem ser comprados.
- Preços enviados pelo cliente devem ser ignorados.
- O total deve ser sempre calculado no servidor.
- O pedido e seus itens devem ser persistidos juntos.
- Um erro de persistência deve reverter a operação.

Não implemente estoque nesta etapa.

Não invente uma regra de disponibilidade baseada em estoque inexistente.

## 8.6. Não criar listagem administrativa de pedidos

Não implementar:

```text
GET /api/orders
```

Não existe painel administrativo no escopo.

Não disponibilize o histórico geral de pedidos publicamente.

O resultado da criação do pedido já deverá fornecer o resumo necessário ao frontend.

Uma futura consulta individual poderá ser considerada em outra fase, mediante definição explícita de regras de acesso.

---

# 9. VALIDAÇÃO DE DADOS

Use Zod para validar as entradas da API.

A validação deverá ocorrer antes da execução das regras de negócio.

Crie schemas reutilizáveis.

## 9.1. Validação de produtos

Verificar:

- Identificador válido.
- Filtro de categoria.
- Filtro booleano de destaque.
- Parâmetros de rota.

## 9.2. Validação do pedido

Verificar:

- `items` deve ser um array.
- Array não pode estar vazio.
- Cada item deve possuir `productId`.
- `productId` deve ser um UUID válido.
- `quantity` deve ser inteiro.
- `quantity` deve ser maior que zero.
- Limite máximo de quantidade deve ser definido e documentado.
- Não aceitar atributos financeiros enviados pelo cliente como fonte de verdade.

Retorne mensagens compreensíveis.

Não exponha detalhes internos das bibliotecas utilizadas.

Utilize validação defensiva também na camada de serviço sempre que necessária para proteger regras críticas.

---

# 10. TRATAMENTO DE ERROS

Implemente um sistema centralizado de tratamento de erros.

Não espalhe respostas HTTP inconsistentes pelos controllers.

Utilize uma estrutura padronizada.

Modelo sugerido:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "A requisição contém dados inválidos.",
    "details": []
  }
}
```

Trate pelo menos:

| Situação | HTTP |
|---|---:|
| Requisição inválida | 400 |
| Validação de dados | 400 ou 422, conforme padrão adotado |
| Recurso inexistente | 404 |
| Conflito de dados | 409 |
| Erro inesperado | 500 |
| Limite de requisições | 429 |

Defina uma convenção consistente para erros de validação.

Não exponha:

- Stack traces em produção.
- Senhas.
- URLs de conexão completas.
- Credenciais.
- Informações internas do banco.
- Detalhes sensíveis de execução.

Em desenvolvimento, registre informações suficientes para diagnosticar falhas.

Considere erros conhecidos do Sequelize e do PostgreSQL.

Utilize o tratamento assíncrono compatível com Express 5.

Não duplique blocos try/catch de maneira desnecessária.

---

# 11. SEGURANÇA E CONFIGURAÇÃO

Mesmo sendo um projeto acadêmico, a API deverá seguir boas práticas.

## 11.1. Variáveis de ambiente

Não deixe credenciais dentro do código.

Crie:

```text
backend/.env.example
```

Considere variáveis como:

```env
NODE_ENV=development
PORT=3001

DATABASE_URL=postgres://usuario:senha@localhost:5432/cardapio_dev

FRONTEND_ORIGIN=http://localhost:3000
```

Os valores deverão ser ajustados à configuração real do projeto.

Valide as variáveis no início da aplicação com Zod.

Se uma variável obrigatória estiver ausente ou inválida, interrompa a inicialização com uma mensagem clara.

Nunca exponha `.env` no GitHub.

## 11.2. CORS

Configure o CORS para aceitar apenas as origens previstas no ambiente.

Não utilize `origin: '*'` indiscriminadamente.

O endereço do frontend deverá ser configurável.

Não presuma que o frontend sempre utilizará a mesma porta.

Inspecione sua configuração atual.

## 11.3. Helmet

Utilize Helmet para configurar cabeçalhos de segurança HTTP.

## 11.4. Rate limiting

Utilize limitação de requisições especialmente no endpoint:

```text
POST /api/orders
```

O limite deverá proteger contra abuso sem atrapalhar o funcionamento normal da aplicação.

Configure de forma apropriada por ambiente.

## 11.5. Corpo das requisições

Configure limite razoável de tamanho para JSON.

Não permita requisições excessivamente grandes.

## 11.6. Banco de dados

Utilize usuário próprio para desenvolvimento.

Não use credenciais de produção em testes.

Não coloque senhas reais no repositório.

---

# 12. CONEXÃO COM O POSTGRESQL

Centralize a conexão com o banco.

Crie uma camada responsável por:

- Instanciar Sequelize.
- Configurar conexão.
- Definir parâmetros do PostgreSQL.
- Testar conexão.
- Encerrar conexão corretamente.
- Tratar falhas de inicialização.

O servidor só deverá começar a aceitar requisições depois que a conexão necessária estiver disponível.

Não esconda falhas de conexão.

Não utilize configurações silenciosas que permitam iniciar uma API incapaz de cumprir suas responsabilidades.

## 12.1. Migrations

Defina comandos para executar migrations.

Exemplo conceitual:

```bash
bun run db:migrate
```

## 12.2. Seeders

Defina comandos para popular os dados iniciais.

Exemplo:

```bash
bun run db:seed
```

A execução deverá ser idempotente.

## 12.3. Docker

Avalie a criação de um `docker-compose.yml` somente para facilitar a inicialização local do PostgreSQL.

Caso seja criado:

- Utilize uma imagem oficial do PostgreSQL.
- Crie volume persistente.
- Configure variáveis.
- Exponha a porta necessária.
- Não armazene credenciais pessoais.
- Documente os comandos.

Não torne Docker uma dependência obrigatória para executar a API, caso o PostgreSQL já esteja instalado localmente.

---

# 13. INTEGRAÇÃO COM O FRONTEND

Esta etapa é obrigatória.

Não basta criar uma API funcionando isoladamente.

O frontend deverá utilizá-la de verdade.

Analise a implementação atual antes de modificar os arquivos.

Priorize:

```text
src/data/products.ts
src/lib/cart.ts
src/routes/index.tsx
src/components/cart/cart-content.tsx
src/components/products/product-card.tsx
```

## 13.1. Catálogo

O frontend deverá buscar produtos pela API.

Substitua a utilização do catálogo estático como fonte de dados de execução.

O banco será a fonte oficial do catálogo.

Preserve os tipos TypeScript e a organização dos componentes.

Implemente estados de:

- Carregamento.
- Sucesso.
- Erro.
- Catálogo vazio.

Não apresente uma lista vazia como se fosse um catálogo sem produtos quando, na verdade, a API estiver indisponível.

Apresente uma mensagem compreensível em caso de falha.

Não simule respostas de sucesso.

## 13.2. Categorias

As categorias deverão ser obtidas pela API.

Mantenha a opção Todos na interface, sem exigir uma categoria correspondente no banco.

A filtragem poderá utilizar a API ou ocorrer sobre os dados carregados, desde que a regra de negócio seja consistente e documentada.

Não permita divergência entre categoria selecionada e produtos apresentados.

## 13.3. Carrinho

Preserve a experiência do carrinho existente.

O usuário deverá continuar podendo:

- Adicionar produtos.
- Aumentar quantidade.
- Diminuir quantidade.
- Remover produtos.
- Visualizar subtotais.
- Visualizar total.

O carrinho poderá continuar em memória no frontend.

Não implemente persistência local ou autenticação sem necessidade.

Refatore o reducer apenas se necessário para trabalhar com produtos carregados da API.

Evite acoplamento do carrinho a uma lista estática de produtos.

## 13.4. Confirmação

O fluxo de confirmação deverá passar a utilizar:

```text
POST /api/orders
```

Envie somente:

```json
{
  "items": [
    {
      "productId": "uuid",
      "quantity": 2
    }
  ]
}
```

Não envie preços como fonte confiável.

Ao receber a resposta:

1. Verifique se a operação foi concluída.
2. Utilize os valores retornados pelo backend.
3. Apresente o resumo do pedido.
4. Exiba os itens confirmados.
5. Exiba quantidades.
6. Exiba subtotais.
7. Exiba o total persistido.
8. Apresente a identificação do pedido, se disponível.
9. Limpe o carrinho somente após a confirmação bem-sucedida.

**Nunca limpe o carrinho antes de receber a confirmação da API.**

Se houver falha:

- Preserve os itens.
- Preserve as quantidades.
- Não apresente uma confirmação falsa.
- Exiba uma mensagem de erro compreensível.
- Permita nova tentativa.

Não duplique pedidos automaticamente em tentativas que possam ter ocorrido após uma resposta perdida. Avalie a necessidade de uma chave de idempotência para evitar duplicidade e implemente-a somente se houver uma estratégia consistente, documentada e testada.

## 13.5. Cliente HTTP

Crie uma camada centralizada para comunicação com a API.

Não espalhe chamadas `fetch` por todos os componentes.

Considere:

```text
src/lib/api/
    client.ts
    products.ts
    categories.ts
    orders.ts
    types.ts
```

A estrutura poderá ser adaptada ao padrão existente.

Crie tratamento consistente para:

- URL base.
- Headers.
- Respostas JSON.
- Erros HTTP.
- Falhas de conexão.
- Timeouts.
- Tipagem de respostas.

Utilize uma variável de ambiente apropriada para o endereço da API.

Exemplo:

```env
VITE_API_URL=http://localhost:3001/api
```

Não coloque segredos no frontend.

Não utilize variáveis privadas no código cliente.

## 13.6. Responsabilidades

O frontend continua responsável por:

- Apresentação.
- Interação.
- Estado visual.
- Carrinho temporário.
- Exibição dos valores.
- Experiência do usuário.

O backend é responsável por:

- Consulta dos dados persistidos.
- Validação.
- Regras de negócio críticas.
- Cálculos definitivos.
- Registro dos pedidos.
- Persistência.
- Integridade dos dados.

Não permita que a interface seja a única responsável por garantir a integridade financeira de um pedido.

---

# 14. TESTES AUTOMATIZADOS DO BACKEND

Implemente testes que demonstrem o funcionamento real da API.

Utilize Vitest e Supertest, respeitando a arquitetura adotada.

Separe testes unitários de testes de integração.

## 14.1. Testes de categorias

Verifique:

- Listagem.
- Formato da resposta.
- Ausência de duplicidade.
- Ordenação, quando definida.

## 14.2. Testes de produtos

Verifique:

- Listagem.
- Consulta individual.
- Filtro por categoria.
- Filtro por destaque.
- Combinação de filtros.
- Produto inexistente.
- Produto inativo.
- Categoria inexistente.
- Formato de preço em centavos.
- Inclusão da categoria.

## 14.3. Testes de pedidos

Verifique:

1. Pedido válido com um item.
2. Pedido válido com vários itens.
3. Cálculo correto do subtotal.
4. Cálculo correto do total.
5. Pedido vazio.
6. Array inválido.
7. Identificador inválido.
8. Produto inexistente.
9. Produto inativo.
10. Quantidade zero.
11. Quantidade negativa.
12. Quantidade fracionária.
13. Quantidade excessiva.
14. Valores financeiros adulterados no corpo da requisição.
15. Produto repetido.
16. Persistência do pedido.
17. Persistência dos itens.
18. Rollback em caso de falha.
19. Preservação do preço histórico.
20. Resposta HTTP adequada.

## 14.4. Teste financeiro obrigatório

Reproduza:

```text
2 × R$ 25,00 = R$ 50,00
1 × R$ 8,00  = R$ 8,00
2 × R$ 12,00 = R$ 24,00
```

Resultado:

```text
R$ 82,00
```

O teste deverá comprovar que o backend calculou esse valor utilizando os preços do banco.

Tente enviar um preço adulterado pelo cliente e comprove que ele não influencia o resultado.

## 14.5. Banco de testes

Não execute testes destrutivos utilizando o banco de desenvolvimento ou produção.

Crie uma configuração isolada de testes.

Utilize uma variável específica, por exemplo:

```env
DATABASE_URL_TEST=
```

Se ela estiver ausente, interrompa os testes de integração com uma mensagem clara.

Não utilize silenciosamente `DATABASE_URL` como alternativa.

Garanta que migrations, seeds e limpeza do banco de testes não atinjam outro ambiente.

---

# 15. DOCUMENTAÇÃO DO BACKEND

Preencha o documento:

```text
docs/spec-backend.md
```

Ele atualmente está vazio e deverá se tornar a especificação técnica oficial do backend.

O documento deverá explicar:

1. Objetivo.
2. Escopo.
3. Arquitetura.
4. Tecnologias.
5. Estrutura de diretórios.
6. Modelagem de dados.
7. Relacionamentos.
8. Regras de negócio.
9. Endpoints.
10. Contratos de requisição.
11. Contratos de resposta.
12. Códigos HTTP.
13. Tratamento de erros.
14. Variáveis de ambiente.
15. Migrations.
16. Seeders.
17. Segurança.
18. Testes.
19. Integração com o frontend.
20. Limitações conhecidas.

Não use conteúdo genérico.

Documente a implementação efetivamente criada.

## 15.1. README do backend

Crie:

```text
backend/README.md
```

Ele deverá permitir que outro desenvolvedor compreenda e execute o backend sem precisar perguntar como configurá-lo.

Inclua:

- Pré-requisitos.
- Instalação.
- Configuração.
- Variáveis de ambiente.
- Criação do banco.
- Execução de migrations.
- Execução de seeders.
- Inicialização da API.
- Testes.
- Build.
- Endpoints.
- Exemplos de requisições.
- Solução de problemas.

## 15.2. README principal

Atualize o README da raiz do projeto.

Documente a nova arquitetura:

```text
AvaliacaoIA/
├── backend/
├── src/
├── public/
├── docs/
├── prompts/
└── README.md
```

Explique claramente a separação entre frontend e backend.

Inclua os comandos necessários para executar ambos.

Não remova informações relevantes da documentação anterior.

## 15.3. Registro de testes

Atualize:

```text
docs/testes.md
```

Registre os testes executados no backend, com:

- Data.
- Ambiente.
- Comando.
- Quantidade de testes.
- Resultados.
- Falhas.
- Observações.

Diferencie testes do frontend e do backend.

Não invente resultados.

## 15.4. Registro do prompt

Crie:

```text
prompts/prompt-backend-copilot.md
```

Registre este prompt e sua finalidade.

Documente a etapa de desenvolvimento assistida por IA.

Não invente respostas do Copilot.

---

# 16. EXECUÇÃO E SCRIPTS

Mantenha os ambientes separados.

O frontend está na raiz do projeto.

O backend está em:

```text
backend/
```

Defina scripts claros para o backend.

Exemplo de referência:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/server.js",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit",
    "db:migrate": "...",
    "db:seed": "..."
  }
}
```

Adapte os comandos ao mecanismo de migrations escolhido.

Não copie scripts fictícios.

O backend deverá ser executado independentemente do frontend.

Documente a execução em dois terminais.

Exemplo:

Terminal 1:

```bash
bun run dev
```

Na raiz do projeto.

Terminal 2:

```bash
cd backend
bun install
bun run dev
```

Ajuste os comandos conforme a configuração final.

Não altere o gerenciador de pacotes do frontend sem necessidade.

Não crie lockfiles conflitantes.

---

# 17. QUALIDADE DE CÓDIGO E BOAS PRÁTICAS

A implementação deverá obedecer aos seguintes princípios:

- Responsabilidade única.
- Separação de camadas.
- Tipagem explícita.
- Validação na entrada.
- Regras de negócio centralizadas.
- Imutabilidade quando apropriada.
- Reutilização sem abstrações artificiais.
- Tratamento centralizado de erros.
- Consultas eficientes.
- Integridade referencial.
- Transações em operações críticas.
- Variáveis de ambiente.
- Logs adequados.
- Nomenclatura consistente.
- Funções pequenas e compreensíveis.

Evite:

- Controllers gigantes.
- Services com responsabilidades diferentes.
- Consultas ao banco diretamente nas rotas.
- Regras financeiras no frontend como fonte de verdade.
- Duplicação de código.
- Tipos `any` desnecessários.
- Dependências excessivas.
- Código morto.
- Comentários que apenas repetem o código.
- Arquivos genéricos sem responsabilidade.
- Camadas criadas apenas para aparentar arquitetura avançada.

Não introduza microserviços.

Não introduza filas.

Não implemente arquitetura distribuída.

O projeto deve continuar sendo uma aplicação acadêmica de porte pequeno ou médio.

A arquitetura deverá ser suficientemente profissional sem transformar o MVP em um sistema empresarial desnecessariamente complexo.

---

# 18. ORDEM OBRIGATÓRIA DE IMPLEMENTAÇÃO

Execute o trabalho na seguinte sequência:

### Fase 1 — Análise

- Ler a SPEC atual.
- Inspecionar o frontend.
- Identificar os produtos e categorias.
- Analisar o `package.json`.
- Identificar os requisitos de integração.
- Analisar as imagens e seus caminhos.
- Definir o contrato da API.

### Fase 2 — Planejamento

- Apresentar a arquitetura proposta.
- Definir as entidades.
- Definir os relacionamentos.
- Definir os endpoints.
- Definir as regras de negócio.
- Definir os testes.
- Identificar riscos de integração.

### Fase 3 — Estrutura do backend

- Criar o diretório.
- Configurar TypeScript.
- Configurar Express.
- Configurar Sequelize.
- Configurar PostgreSQL.
- Configurar variáveis de ambiente.
- Configurar middleware.
- Configurar inicialização do servidor.

### Fase 4 — Banco de dados

- Criar models.
- Criar migrations.
- Criar seeders.
- Criar relacionamentos.
- Validar integridade.

### Fase 5 — API

- Criar módulos.
- Criar schemas.
- Criar services.
- Criar controllers.
- Criar rotas.
- Criar middleware de erros.
- Implementar endpoints.

### Fase 6 — Testes do backend

- Testes unitários.
- Testes de integração.
- Testes financeiros.
- Testes de validação.
- Testes de transações.
- Testes de erros.

### Fase 7 — Integração frontend

- Criar cliente HTTP.
- Buscar categorias.
- Buscar produtos.
- Adaptar o reducer.
- Integrar confirmação de pedidos.
- Tratar erros.
- Preservar o estado do carrinho em falhas.
- Preservar a identidade visual.

### Fase 8 — Documentação

- Preencher `docs/spec-backend.md`.
- Criar `backend/README.md`.
- Atualizar README principal.
- Atualizar `docs/testes.md`.
- Registrar o prompt utilizado.

### Fase 9 — Validação final

Executar todas as verificações necessárias.

Corrigir os problemas encontrados.

Repetir os testes após as correções.

### Fase 10 — Relatório

Apresentar o relatório técnico final.

Não pule etapas apenas para acelerar a implementação.

---

# 19. CRITÉRIOS DE ACEITAÇÃO

O backend será considerado concluído quando os critérios abaixo forem comprovados.

## Arquitetura

- [ ] Backend independente na pasta `backend/`.
- [ ] Express 5 configurado.
- [ ] TypeScript configurado.
- [ ] PostgreSQL conectado.
- [ ] Sequelize configurado.
- [ ] Variáveis de ambiente validadas.
- [ ] Separação adequada de responsabilidades.

## Banco

- [ ] Model de Category.
- [ ] Model de Product.
- [ ] Model de Order.
- [ ] Model de OrderItem.
- [ ] Relacionamentos.
- [ ] Migrations.
- [ ] Seeders idempotentes.
- [ ] Integridade referencial.
- [ ] Snapshots históricos de pedidos.

## API

- [ ] Health check.
- [ ] Listagem de categorias.
- [ ] Listagem de produtos.
- [ ] Filtro de categorias.
- [ ] Filtro de destaques.
- [ ] Consulta de produto.
- [ ] Registro de pedidos.
- [ ] Validação de requisições.
- [ ] Respostas HTTP consistentes.
- [ ] Tratamento de erros.

## Regras de negócio

- [ ] Pedido vazio rejeitado.
- [ ] Quantidade inválida rejeitada.
- [ ] Produto inexistente rejeitado.
- [ ] Produto inativo rejeitado.
- [ ] Preços obtidos do banco.
- [ ] Cálculos realizados no servidor.
- [ ] Valores armazenados em centavos.
- [ ] Pedido persistido em transação.
- [ ] Rollback em caso de falha.
- [ ] Histórico financeiro preservado.

## Integração

- [ ] Frontend consome a API.
- [ ] Catálogo carregado do backend.
- [ ] Categorias carregadas do backend.
- [ ] Carrinho continua funcionando.
- [ ] Confirmação envia dados à API.
- [ ] Resumo utiliza a resposta do servidor.
- [ ] Falhas preservam o carrinho.
- [ ] Não existe confirmação simulada local quando a API falha.

## Testes

- [ ] Testes unitários do backend.
- [ ] Testes de integração.
- [ ] Testes de pedidos.
- [ ] Testes financeiros.
- [ ] Testes de transação.
- [ ] Testes de validação.
- [ ] Testes do frontend preservados.
- [ ] Testes completos executados.

## Documentação

- [ ] SPEC do backend preenchida.
- [ ] README do backend criado.
- [ ] README principal atualizado.
- [ ] Testes registrados.
- [ ] Prompt documentado.
- [ ] Variáveis de ambiente explicadas.
- [ ] Comandos de execução documentados.

---

# 20. VALIDAÇÃO FINAL E RELATÓRIO TÉCNICO

Ao concluir, apresente um relatório técnico detalhado.

## 20.1. Arquitetura implementada

Explique:

- Organização das pastas.
- Responsabilidades das camadas.
- Fluxo de uma requisição.
- Comunicação com o banco.
- Comunicação com o frontend.

## 20.2. Banco de dados

Apresente:

- Tabelas.
- Campos relevantes.
- Tipos.
- Relacionamentos.
- Chaves.
- Índices.
- Regras de integridade.

## 20.3. Endpoints

Apresente uma tabela:

| Método | Endpoint | Finalidade | Status |
|---|---|---|---|
| GET | `/api/health` | Verificar API | |
| GET | `/api/categories` | Consultar categorias | |
| GET | `/api/products` | Consultar produtos | |
| GET | `/api/products/:id` | Consultar produto | |
| POST | `/api/orders` | Registrar pedido | |

## 20.4. Testes

Apresente:

- Quantidade executada.
- Quantidade aprovada.
- Quantidade reprovada.
- Testes unitários.
- Testes de integração.
- Limitações.

## 20.5. Integração frontend

Explique:

- Quais arquivos foram modificados.
- Como o frontend consulta produtos.
- Como o carrinho funciona.
- Como o pedido é enviado.
- Como a resposta é exibida.
- Como os erros são tratados.

## 20.6. Documentação

Liste os documentos criados ou atualizados.

## 20.7. Pendências

Separe:

- Problemas bloqueadores.
- Problemas não bloqueadores.
- Melhorias futuras.

Não esconda problemas.

## 20.8. Git

Ao terminar:

```bash
git status
```

Apresente os arquivos modificados.

Não crie commits.

Não faça push.

Não altere o histórico.

---

# 21. DIRETRIZ FINAL

Você está implementando o backend de um projeto que já possui uma interface funcional.

A implementação deverá ampliar o sistema sem destruir o que já funciona.

A prioridade não é transformar a Taverna do Bosque em um sistema comercial complexo.

A prioridade é criar uma API real, com persistência e responsabilidades bem definidas, adequada ao escopo acadêmico e tecnicamente consistente.

**O backend deve ser a autoridade sobre os dados persistidos e os cálculos definitivos dos pedidos.**

**O frontend deve consumir a API, não fingir que está integrado a ela.**

**O banco deve preservar a integridade e o histórico dos pedidos.**

**A documentação deve explicar exatamente o que foi implementado.**

**Os testes devem provar que as regras de negócio funcionam.**

Não considere o trabalho concluído apenas porque o servidor iniciou ou porque um endpoint retornou JSON.

O resultado deverá ser uma integração funcional de ponta a ponta:

```text
CLIENTE
   |
   v
FRONTEND REACT
   |
   | HTTP / JSON
   v
API EXPRESS
   |
   v
VALIDAÇÃO
   |
   v
SERVICES
   |
   v
SEQUELIZE
   |
   v
POSTGRESQL
   |
   v
PEDIDO PERSISTIDO
   |
   v
RESPOSTA DA API
   |
   v
CONFIRMAÇÃO NO FRONTEND
```

Implemente, valide, documente e apresente evidências reais de funcionamento.

Quando encontrar uma decisão técnica que não esteja especificada, escolha a solução mais simples, segura e coerente com a arquitetura existente, documentando a decisão.

Não interrompa o trabalho por dúvidas secundárias que possam ser resolvidas pela análise do código.

Entregue uma implementação compreensível, sustentável e pronta para revisão.