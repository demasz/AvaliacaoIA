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
| Lovable | Prototipação e geração das interfaces da aplicação |
| GitHub Copilot | Assistência na implementação, análise e correção do código |
| Visual Studio Code | Ambiente de desenvolvimento e edição do código-fonte |
| Git | Controle de versão e histórico de alterações |
| GitHub | Hospedagem e gerenciamento do repositório |

As tecnologias utilizadas na aplicação, incluindo framework frontend, linguagem, bibliotecas e eventuais tecnologias de backend, serão documentadas após a definição e validação da estrutura gerada durante o desenvolvimento.

## Estrutura do projeto

A documentação de planejamento, especificação e utilização de Inteligência Artificial será mantida separadamente do código-fonte.

```text
.
|-- docs/
|   |-- prompt-lovable.md    # Prompts utilizados na prototipação
|   |-- prompt-copilot.md    # Prompts utilizados na implementação
|   |-- spec.md              # Especificação funcional do projeto
|   |-- spec-backend.md      # Especificação técnica do backend
|   `-- testes.md            # Registro dos testes e resultados
|
|-- src/                     # Código-fonte da aplicação (a definir)
|
|-- public/                  # Arquivos públicos e recursos estáticos (se aplicável)
|
|-- README.md                # Documentação principal
`-- .gitignore               # Arquivos e diretórios ignorados pelo Git
```

A organização interna das pastas de implementação poderá ser ajustada conforme as tecnologias e a arquitetura efetivamente adotadas.

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

Os requisitos de ambiente, incluindo versões de runtime, gerenciador de pacotes e dependências, serão definidos conforme a stack tecnológica adotada.

### Instalação

Após a definição da estrutura do projeto, serão documentados os comandos necessários para instalação das dependências.

### Execução

As instruções para iniciar a aplicação localmente serão atualizadas após a implementação.

O objetivo é disponibilizar um MVP funcional que possa ser executado localmente ou acessado por meio de um link público.

## API

Caso o backend seja implementado como uma API independente, seus endpoints serão documentados nesta seção após a definição e implementação das rotas.

A documentação deverá apresentar:

- Método HTTP e endereço da rota.
- Finalidade de cada operação.
- Parâmetros e dados necessários.
- Estrutura das respostas.
- Códigos de status e possíveis erros.

As rotas efetivamente disponibilizadas serão registradas após a validação do backend. Nenhum endpoint é considerado implementado antes dessa etapa.

## Utilização de Inteligência Artificial

A Inteligência Artificial será utilizada como ferramenta de apoio em diferentes etapas do desenvolvimento.

| Etapa | Aplicação |
| --- | --- |
| Planejamento | Análise dos requisitos, organização das funcionalidades e definição da estrutura do projeto |
| Prototipação e implementação | Geração das interfaces com Lovable e assistência ao desenvolvimento com GitHub Copilot |
| Validação e correção | Análise do código gerado, identificação de problemas, correções e execução de testes |

Os prompts utilizados serão preservados na pasta `docs/`, acompanhados de uma breve descrição de suas finalidades.

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

Os procedimentos executados, resultados obtidos e eventuais correções serão registrados em `docs/testes.md`.

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