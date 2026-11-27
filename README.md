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
- Finalização simulada com confirmação e resumo dos itens selecionados.
- Validação de pedidos vazios.
- Mensagens de feedback para orientar o usuário durante as operações.
- Interface responsiva para computadores, tablets e dispositivos móveis.

## Escopo do MVP

A aplicação contempla o fluxo principal de consulta de produtos e montagem de pedidos, desde a visualização do catálogo até a confirmação simulada da compra.

Serão utilizados produtos e informações fictícias para demonstrar o funcionamento do sistema.

Não fazem parte do escopo:

- Autenticação ou gerenciamento de usuários.
- Processamento de pagamentos reais.
- Integração com serviços de entrega.
- Gerenciamento de estoque.
- Painel administrativo.
- Integrações externas com sistemas comerciais.

## Tecnologias e ferramentas

As ferramentas de desenvolvimento e apoio à implementação estão organizadas conforme suas respectivas finalidades.

| Ferramenta | Finalidade |
| --- | --- |
| Lovable | Prototipação histórica da interface; não é dependência de execução |
| GitHub Copilot | Assistência na implementação, análise e correção do código |
| Visual Studio Code | Ambiente de desenvolvimento e edição do código-fonte |
| Git | Controle de versão e histórico de alterações |
| GitHub | Hospedagem e gerenciamento do repositório |

### Tecnologias da aplicação

| Tecnologia | Versão declarada | Finalidade |
| --- | --- | --- |
| React | 19.2 | Interface da aplicação |
| TypeScript | 5.8 | Tipagem estática |
| TanStack Start / Router | 1.168.61 / 1.170.42 | Aplicação com renderização no servidor e rotas baseadas em arquivos |
| Vite | 8.1 | Desenvolvimento e build |
| Tailwind CSS | 4.3 | Estilos e utilitários CSS |
| Radix UI e Lucide React | conforme `package.json` | Componentes acessíveis e ícones |
| Vitest | 4.1 | Testes automatizados |

As versões completas e demais dependências estão declaradas em `package.json`; `bun.lock` registra a resolução usada pelo Bun.

### Independência operacional e imagens

A configuração usa os plugins oficiais de Vite, TanStack Start, React, Tailwind CSS e Nitro. O build e o servidor não dependem do wrapper, da telemetria nem de credenciais do Lovable.

As imagens ainda não estão autocontidas: os nove arquivos `src/assets/*.asset.json` guardam metadados e caminhos `/__l5e/...`, mas os binários não estão no repositório. Como o proxy específico do ambiente Lovable foi removido, obtenha os arquivos originais com licença adequada ou substitua-os por imagens locais autorizadas antes de considerar a experiência visual independente.

## Estrutura do projeto

A documentação de planejamento, especificação e utilização de Inteligência Artificial permanece separada do código-fonte.

```text
.
|-- src/
|   |-- components/          # Componentes do catálogo, carrinho e UI
|   |-- data/                # Catálogo e categorias
|   |-- assets/              # Metadados das imagens; binários pendentes
|   |-- lib/                 # Regras do carrinho e utilitários
|   |-- routes/              # Rotas TanStack Start
|   |-- test/                # Testes Vitest
|   |-- server.ts            # Adaptação de erros do SSR
|   |-- start.ts             # Middlewares do servidor
|   `-- styles.css           # Design system e estilos responsivos
|-- public/                  # Favicon e arquivos públicos
|-- docs/                    # Especificações, testes e decisões técnicas
|-- prompts/                 # Prompts de implementação e auditoria
|-- package.json             # Dependências e comandos da aplicação
|-- vite.config.ts           # Plugins oficiais Vite/TanStack/Nitro
|-- vitest.config.ts         # Configuração dos testes
`-- README.md                # Documentação principal
```

O frontend é executado diretamente na raiz deste repositório, sem uma pasta de projeto aninhada.

## Requisitos

Os requisitos funcionais do projeto estão organizados em oito funcionalidades principais:

| Identificação | Requisito |
| --- | --- |
| RF01 | Catálogo de produtos |
| RF02 | Organização e filtragem por categorias |
| RF03 | Adição de produtos ao carrinho |
| RF04 | Controle de quantidades e remoção de itens |
| RF05 | Cálculo automático de subtotais e valor total |
| RF06 | Finalização simulada do pedido |
| RF07 | Interface responsiva |
| RF08 | Validação de pedidos e mensagens de feedback |

A especificação detalhada dos requisitos, regras de negócio e critérios de aceitação está disponível em `docs/spec.md`.

As definições relacionadas ao backend, quando aplicáveis, estão documentadas em `docs/spec-backend.md`.

## Instalação e execução

### Pré-requisitos

É necessário ter Node.js e Bun instalados. Bun é o gerenciador recomendado porque `bun.lock` é o lockfile versionado.

### Instalação

Na raiz do repositório:

```sh
bun install
```

### Execução e validação

```sh
bun run dev       # inicia o servidor de desenvolvimento
bun run build     # gera o build de produção
bun run test      # executa os testes automatizados
bun run typecheck # verifica os tipos TypeScript
bun run lint      # verifica o código com ESLint
```

O comando `bun run preview` permite conferir o build de produção. O uso de npm é possível, mas não reproduz o lockfile Bun.

## API

O MVP não possui API de negócio nem integração com banco de dados. TanStack Start/Nitro executam a renderização no servidor; o catálogo é local e a confirmação é demonstrativa, sem cobrança nem persistência do carrinho. As decisões e limitações estão em `docs/spec-backend.md`.

## Utilização de Inteligência Artificial

A Inteligência Artificial será utilizada como ferramenta de apoio em diferentes etapas do desenvolvimento.

| Etapa | Aplicação |
| --- | --- |
| Planejamento | Análise dos requisitos, organização das funcionalidades e definição da estrutura do projeto |
| Prototipação e implementação | Prototipação histórica com Lovable e assistência ao desenvolvimento com GitHub Copilot |
| Validação e correção | Análise do código gerado, identificação de problemas, correções e execução de testes |

Os prompts originais estão preservados em `prompts/`, acompanhados de uma breve descrição de suas finalidades.

O código gerado por ferramentas de IA deverá ser analisado, compreendido e testado antes de sua incorporação à aplicação.

## Testes e validação

A validação do MVP deverá contemplar os requisitos funcionais e os principais fluxos de utilização.

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