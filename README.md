# Cardápio Digital

Aplicação web desenvolvida para modernizar o atendimento de uma lanchonete por meio de um cardápio digital interativo. O sistema permite que os clientes consultem produtos disponíveis, filtrem categorias, selecionem itens e montem seus pedidos diretamente pela interface.

O projeto consiste no desenvolvimento de um MVP funcional, utilizando ferramentas de Inteligência Artificial para auxiliar no planejamento, prototipação, implementação e validação da solução.

## Funcionalidades

- Catálogo de produtos com nome, preço, descrição e categoria.
- Organização dos produtos em diferentes categorias.
- Filtragem do catálogo por categoria.
- Adição de produtos ao carrinho de compras.
- Controle de quantidades dos itens selecionados.
- Remoção de produtos do carrinho.
- Cálculo automático dos subtotais e do valor total do pedido.
- Registro persistente de pedidos demonstrativos com resumo retornado pela API.
- Validação de pedidos vazios.
- Mensagens de feedback para orientar o usuário durante as operações.
- Interface responsiva para computadores, tablets e dispositivos móveis.

## Escopo do MVP

A aplicação contempla o fluxo principal de consulta do catálogo, montagem do carrinho e registro de um pedido demonstrativo no PostgreSQL.

Os produtos são fictícios. A API calcula os valores finais e persiste os pedidos; não há cobrança real.

Não fazem parte do escopo:

- Autenticação ou gerenciamento de usuários.
- Processamento de pagamentos reais.
- Integração com serviços de entrega.
- Gerenciamento de estoque.
- Painel administrativo.
- Integrações externas com sistemas comerciais.
- Consulta pública ou administrativa do histórico geral de pedidos.

## Tecnologias e ferramentas

As ferramentas de desenvolvimento e apoio à implementação estão organizadas conforme suas respectivas finalidades.

| Ferramenta         | Finalidade                                                         |
| ------------------ | ------------------------------------------------------------------ |
| Lovable            | Prototipação histórica da interface; não é dependência de execução |
| GitHub Copilot     | Assistência na implementação, análise e correção do código         |
| Visual Studio Code | Ambiente de desenvolvimento e edição do código-fonte               |
| Git                | Controle de versão e histórico de alterações                       |
| GitHub             | Hospedagem e gerenciamento do repositório                          |

### Tecnologias da aplicação

| Tecnologia              | Versão declarada        | Finalidade                                                          |
| ----------------------- | ----------------------- | ------------------------------------------------------------------- |
| React                   | 19.2                    | Interface da aplicação                                              |
| TypeScript              | 5.8                     | Tipagem estática                                                    |
| TanStack Start / Router | 1.168.61 / 1.170.42     | Aplicação com renderização no servidor e rotas baseadas em arquivos |
| Vite                    | 8.1                     | Desenvolvimento e build                                             |
| Tailwind CSS            | 4.3                     | Estilos e utilitários CSS                                           |
| Radix UI e Lucide React | conforme `Frontend/package.json` | Componentes acessíveis e ícones                          |
| Vitest                  | 4.1                     | Testes automatizados                                                |

O backend independente usa Node.js 24+, Express 5, TypeScript, PostgreSQL, Sequelize, Zod, Umzug, Vitest e Supertest. Suas dependências e scripts ficam em `backend/package.json`.

As dependências e comandos do frontend estão declarados em `Frontend/package.json`; `Frontend/bun.lock` registra a resolução usada pelo Bun. O backend possui seu próprio manifesto e lockfile em `backend/`.

### Independência operacional e imagens

A configuração usa os plugins oficiais de Vite, TanStack Start, React, Tailwind CSS e Nitro. O build e o servidor não dependem do wrapper, da telemetria nem de credenciais do Lovable.

Seis recortes de pratos, criados por IA e fornecidos em `Frontend/Assets/`, foram copiados para `Frontend/public/images/` e são servidos localmente. As duas bebidas não têm imagens próprias e usam o fallback da interface. Os metadados antigos em `Frontend/src/assets/*.asset.json`, que apontam para caminhos `/__l5e/...`, não são usados pelo catálogo atual.

## Estrutura do projeto

A documentação de planejamento, especificação e utilização de Inteligência Artificial permanece separada do código-fonte.

```text
.
|-- Frontend/
|   |-- src/
|   |   |-- components/      # Componentes do catálogo, carrinho e UI
|   |   |-- data/            # Tipos, filtros e formatação do catálogo
|   |   |-- assets/          # Metadados legados das imagens do protótipo
|   |   |-- lib/             # Regras do carrinho e cliente HTTP da API
|   |   |-- routes/          # Rotas TanStack Start
|   |   `-- test/            # Testes Vitest
|   |-- public/              # Imagens dos pratos e arquivos estáticos
|   |-- package.json         # Dependências e comandos do frontend
|   |-- vite.config.ts       # Plugins oficiais Vite/TanStack/Nitro
|   `-- ...                  # Configurações TypeScript, ESLint e Vitest
|-- backend/
|   |-- src/                 # API Express, models, migrations e services
|   `-- tests/               # Testes unitários e de integração
|-- docs/                    # Especificações, testes e decisões técnicas
|-- prompts/                 # Prompts de implementação e auditoria
`-- README.md                # Documentação principal
```

O frontend e o backend são projetos separados dentro do mesmo repositório. Os comandos do frontend devem ser executados na pasta `Frontend/`; os comandos da API, em `backend/`.

## Requisitos

Os requisitos funcionais do projeto estão organizados em oito funcionalidades principais:

| Identificação | Requisito                                     |
| ------------- | --------------------------------------------- |
| RF01          | Catálogo de produtos                          |
| RF02          | Organização e filtragem por categorias        |
| RF03          | Adição de produtos ao carrinho                |
| RF04          | Controle de quantidades e remoção de itens    |
| RF05          | Cálculo automático de subtotais e valor total |
| RF06          | Finalização simulada do pedido                |
| RF07          | Interface responsiva                          |
| RF08          | Validação de pedidos e mensagens de feedback  |

A especificação detalhada dos requisitos, regras de negócio e critérios de aceitação está disponível em `docs/spec.md`.

As definições relacionadas ao backend, quando aplicáveis, estão documentadas em `docs/spec-backend.md`.

Para uma visão completa da arquitetura, catálogo, API, modelo de dados, execução e limitações, consulte o [guia de documentação do projeto](./docs/documentacao-projeto.md).

## Instalação e execução

### Pré-requisitos

É necessário ter Node.js 24 ou superior, Bun e PostgreSQL instalados. Bun é o gerenciador recomendado para o frontend porque `Frontend/bun.lock` é o lockfile versionado. O backend possui lockfile próprio.

### Instalação

No terminal do frontend:

```powershell
Set-Location Frontend
bun install
bun run dev
```

O frontend usa `http://localhost:3001/api` por padrão. Para outra URL, defina `VITE_API_URL` no ambiente do Vite.

Em outro terminal, configure e inicie o backend:

```powershell
Set-Location backend
bun install
```

```powershell
Copy-Item .env.example .env
```

Edite `backend/.env` com uma URL PostgreSQL local válida e configure `FRONTEND_ORIGINS` com a origem do frontend. Em seguida, crie o banco indicado por `DATABASE_URL` e execute:

```sh
bun run db:migrate
bun run db:seed
bun run dev
```

O backend e o frontend são processos independentes. Execute os comandos de validação do frontend (`bun run build`, `bun run test`, `bun run typecheck`, `bun run lint` e `bun run preview`) dentro de `Frontend/`.

Consulte [backend/README.md](./backend/README.md) para configuração completa, testes, migrações e exemplos de chamadas.

## API e persistência

O frontend consulta categorias e produtos ativos em `GET /api/categories` e `GET /api/products`. A confirmação envia somente identificadores e quantidades a `POST /api/orders`; o backend valida os dados, busca os preços atuais, calcula os subtotais e o total e salva o pedido e seus snapshots em uma transação. Não há endpoint público para listar pedidos nem processamento de pagamento.

As configurações e limitações da API estão em [docs/spec-backend.md](./docs/spec-backend.md). A especificação original enviada para implementação foi preservada em [prompts/prompt-backend-copilot.md](./prompts/prompt-backend-copilot.md).

## Utilização de Inteligência Artificial

A Inteligência Artificial será utilizada como ferramenta de apoio em diferentes etapas do desenvolvimento.

| Etapa                        | Aplicação                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| Planejamento                 | Análise dos requisitos, organização das funcionalidades e definição da estrutura do projeto |
| Prototipação e implementação | Prototipação histórica com Lovable e assistência ao desenvolvimento com GitHub Copilot      |
| Validação e correção         | Análise do código gerado, identificação de problemas, correções e execução de testes        |

Os prompts originais estão preservados em `prompts/`, acompanhados de uma breve descrição de suas finalidades.

O código gerado por ferramentas de IA deverá ser analisado, compreendido e testado antes de sua incorporação à aplicação.

## Testes e validação

A validação do MVP deverá contemplar os requisitos funcionais e os principais fluxos de utilização. Execute os comandos do frontend em `Frontend/` e os comandos da API em `backend/`.

Os cenários de teste deverão verificar:

- Exibição correta dos produtos e suas informações.
- Filtragem dos produtos por categoria.
- Adição de produtos ao carrinho.
- Aumento, diminuição e remoção de quantidades.
- Cálculo correto dos subtotais e do valor total.
- Confirmação do pedido com resumo dos itens.
- Impedimento da confirmação de pedidos vazios.
- Apresentação de mensagens de feedback.
- Adaptação da interface a diferentes tamanhos de tela.

Os testes executados e suas limitações estão registrados em `docs/testes.md`.

## Critérios de conclusão

O MVP será considerado concluído quando:

- Todos os oito requisitos funcionais forem atendidos.
- O fluxo de montagem e confirmação de pedidos funcionar corretamente.
- Os cálculos realizados pelo carrinho forem validados.
- A interface apresentar comportamento responsivo.
- As validações e mensagens de feedback estiverem implementadas.
- A aplicação puder ser executada localmente ou acessada por um link público.
- A documentação estiver atualizada.
- Pelo menos três prompts utilizados no desenvolvimento estiverem registrados.
- Os testes realizados e seus respectivos resultados estiverem documentados.

## Licença e finalidade

Projeto desenvolvido para fins acadêmicos, com o propósito de demonstrar a utilização de ferramentas de Inteligência Artificial no processo de planejamento, prototipação, implementação e validação de uma aplicação web.
