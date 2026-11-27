# SPEC.md — Cardápio Digital

# 1. VISÃO GERAL DO PROJETO

## 1.1. Objetivo

Desenvolver uma aplicação web de cardápio digital interativo para modernizar o atendimento de uma lanchonete, permitindo que os clientes consultem produtos, visualizem informações, selecionem itens, organizem um carrinho de compras e confirmem pedidos de maneira simulada.

A aplicação deverá proporcionar uma experiência intuitiva, visualmente atrativa, responsiva e consistente.

O desenvolvimento utilizará ferramentas de Inteligência Artificial para auxiliar no planejamento, prototipação, implementação e validação.

## 1.2. Problema identificado

Atualmente, os clientes precisam consultar os produtos diretamente com os atendentes. A empresa deseja disponibilizar uma aplicação web que centralize o catálogo e permita que o próprio cliente monte seu pedido de maneira independente.

## 1.3. Perfil do usuário

A aplicação é destinada aos clientes da lanchonete.

O usuário deverá conseguir consultar produtos, filtrar categorias, adicionar itens ao carrinho, modificar quantidades, conferir valores e confirmar seu pedido.

Não será necessário criar contas ou fornecer informações pessoais.

---

# 2. ESCOPO DO MVP

## 2.1. Funcionalidades incluídas

- Catálogo com pelo menos seis produtos fictícios.
- Organização por categorias.
- Filtragem de produtos.
- Seção de produtos em destaque.
- Visualização de informações dos produtos.
- Adição de produtos ao carrinho.
- Controle de quantidades.
- Remoção de produtos.
- Cálculo automático de subtotais e total.
- Carrinho apresentado em modal central.
- Finalização simulada.
- Resumo do pedido confirmado.
- Validação de pedidos vazios.
- Feedback visual.
- Interface responsiva.

## 2.2. Funcionalidades não incluídas

- Autenticação ou login.
- Cadastro de clientes.
- Pagamentos reais.
- Integração com gateways de pagamento.
- Entrega ou rastreamento.
- Gerenciamento de estoque.
- Painel administrativo.
- Cadastro de produtos pela interface.
- Integrações externas.
- Cupons de desconto.
- Sistema de fidelidade.
- Aplicativos de delivery.
- Banco de dados remoto, salvo decisão técnica posterior documentada.

## 2.3. Diretriz de escopo

Priorizar o funcionamento completo do fluxo principal de compra.

Não implementar funcionalidades fora do escopo apenas para aumentar a complexidade do projeto.

A prioridade é entregar um MVP funcional, consistente e validado, não somente uma interface visualmente elaborada.

---

# 3. REQUISITOS FUNCIONAIS

## RF01 — Catálogo de produtos

A aplicação deverá apresentar pelo menos seis produtos fictícios.

Cada produto deverá possuir:

- Identificador único.
- Nome.
- Preço.
- Descrição.
- Categoria.
- Imagem ilustrativa.

### Regras

1. Todos os produtos deverão possuir informações completas.
2. Os preços deverão ser apresentados em reais.
3. Os produtos deverão utilizar informações fictícias.
4. As imagens deverão ser compatíveis com os produtos.
5. Os dados deverão permanecer centralizados.
6. Os produtos deverão ser apresentados em cartões reutilizáveis.

### Critérios de aceitação

- [ ] Existem pelo menos seis produtos.
- [ ] Todos apresentam nome, preço, descrição e categoria.
- [ ] Os produtos possuem representação visual.
- [ ] Os preços estão formatados em reais.

## RF02 — Categorias

Os produtos deverão estar organizados em pelo menos duas categorias.

O usuário deverá conseguir filtrar o catálogo selecionando uma categoria.

### Categorias sugeridas

- Hambúrgueres.
- Bebidas.
- Acompanhamentos.
- Sobremesas.

### Regras

1. Cada produto deverá pertencer a uma categoria.
2. Deverá existir uma opção para visualizar todos os produtos.
3. A seleção de uma categoria deverá atualizar a listagem.
4. A categoria selecionada deverá apresentar identificação visual.
5. A filtragem não deverá modificar o carrinho.
6. Categorias sem produtos deverão apresentar um estado vazio compreensível.

### Critérios de aceitação

- [ ] Existem pelo menos duas categorias.
- [ ] Todos os produtos estão associados a uma categoria.
- [ ] A filtragem funciona corretamente.
- [ ] A opção de visualizar todos funciona.
- [ ] O carrinho permanece inalterado durante a filtragem.

## RF03 — Carrinho de compras

O usuário deverá conseguir adicionar produtos ao carrinho.

O carrinho será apresentado em um modal central sobre a interface do cardápio.

### Informações de cada item

- Nome do produto.
- Preço unitário.
- Quantidade.
- Subtotal.
- Controles de quantidade.
- Ação de remoção.

### Regras

1. Ao adicionar um produto, ele deverá ser inserido no carrinho.
2. Caso já exista, sua quantidade deverá ser incrementada.
3. O indicador do carrinho deverá ser atualizado imediatamente.
4. O usuário deverá conseguir abrir e fechar o modal.
5. A abertura do modal não deverá reinicializar os dados.
6. A filtragem do catálogo não deverá afetar o carrinho.
7. O modal deverá apresentar os itens e valores atualizados.

### Critérios de aceitação

- [ ] É possível adicionar produtos.
- [ ] Produtos repetidos incrementam sua quantidade.
- [ ] Os itens aparecem corretamente.
- [ ] O indicador de quantidade é atualizado.
- [ ] O modal abre e fecha corretamente.
- [ ] O carrinho preserva seus dados durante a navegação.

## RF04 — Controle de quantidades

O usuário deverá conseguir aumentar ou diminuir quantidades e remover itens.

### Regras

1. O botão de adicionar incrementa uma unidade.
2. O botão de diminuir reduz uma unidade.
3. Não permitir quantidades negativas ou inválidas.
4. Ao atingir a quantidade mínima, uma nova diminuição poderá remover o item ou ser impedida claramente.
5. A remoção deverá excluir completamente o produto.
6. Toda alteração deverá atualizar os subtotais e o total.

### Critérios de aceitação

- [ ] O incremento funciona.
- [ ] A redução funciona.
- [ ] Não existem quantidades inválidas.
- [ ] A remoção funciona.
- [ ] Os valores são atualizados.

## RF05 — Cálculo automático

A aplicação deverá calcular corretamente os subtotais e o total do pedido.

### Fórmulas

Subtotal = Preço unitário × Quantidade.

Total = Soma dos subtotais.

### Exemplo

| Produto | Preço | Quantidade | Subtotal |
|---|---:|---:|---:|
| Hambúrguer da Floresta | R$ 25,00 | 2 | R$ 50,00 |
| Poção Azul | R$ 8,00 | 1 | R$ 8,00 |
| Batatas Goron | R$ 12,00 | 2 | R$ 24,00 |

Total esperado: R$ 82,00.

### Regras

1. Utilizar valores inteiros em centavos durante os cálculos.
2. Utilizar formatação monetária brasileira.
3. Atualizar subtotais automaticamente.
4. Atualizar o total após qualquer alteração.
5. O total de um carrinho vazio deverá ser zero.
6. A interface não poderá apresentar valores divergentes da lógica de cálculo.

### Critérios de aceitação

- [ ] Subtotais corretos.
- [ ] Total correto.
- [ ] Alterações atualizam os cálculos.
- [ ] Valores formatados em reais.
- [ ] Sem erros de precisão perceptíveis.

## RF06 — Finalização simulada

O usuário deverá conseguir confirmar o pedido e visualizar uma mensagem de confirmação contendo o resumo dos itens selecionados.

### Fluxo

1. O usuário abre o carrinho.
2. Confere os produtos.
3. Confere quantidades e valores.
4. Seleciona confirmar pedido.
5. O sistema valida o carrinho.
6. O sistema registra a confirmação simulada.
7. O modal do carrinho é substituído ou sucedido por uma apresentação de confirmação.
8. O resumo apresenta os produtos, quantidades, subtotais e total.
9. O usuário consegue retornar ao catálogo.

### Regras

1. Somente carrinhos válidos poderão ser confirmados.
2. O resumo deverá utilizar os dados existentes no momento da confirmação.
3. A confirmação deverá preservar os dados do pedido mesmo após a limpeza do carrinho.
4. Não deverá existir integração com pagamentos.
5. Não deverá ser simulada uma entrega real.
6. Após a confirmação, o carrinho deverá ser reinicializado.
7. O usuário deverá conseguir iniciar uma nova compra.

### Critérios de aceitação

- [ ] É possível confirmar pedidos válidos.
- [ ] A confirmação apresenta mensagem de sucesso.
- [ ] O resumo apresenta todos os produtos.
- [ ] Quantidades e valores estão corretos.
- [ ] O carrinho é reinicializado.
- [ ] É possível retornar ao catálogo.

## RF07 — Interface responsiva

A aplicação deverá funcionar adequadamente em computadores, tablets e smartphones.

### Regras

1. O catálogo deverá ajustar sua quantidade de colunas.
2. Os cartões deverão preservar legibilidade.
3. O modal deverá se adaptar às dimensões da tela.
4. Os controles deverão permanecer acessíveis.
5. Não deverá existir rolagem horizontal indevida.
6. Os botões deverão possuir dimensões adequadas para toque.
7. O conteúdo deverá manter hierarquia visual.

### Resoluções de referência

- Desktop: 1440 × 900.
- Notebook: 1366 × 768.
- Tablet: 768 × 1024.
- Smartphone: 390 × 844.
- Smartphone compacto: 360 × 800.

### Critérios de aceitação

- [ ] Layout funcional em desktop.
- [ ] Layout funcional em tablet.
- [ ] Layout funcional em smartphone.
- [ ] Modal adaptado para telas menores.
- [ ] Sem rolagem horizontal indevida.

## RF08 — Validação

O sistema deverá impedir a confirmação de pedidos vazios e apresentar mensagens compreensíveis.

### Regras

1. Não permitir confirmação de carrinho vazio.
2. Apresentar mensagem explicativa.
3. Manter integridade das quantidades.
4. Garantir consistência dos valores.
5. Apresentar estados vazios.
6. Apresentar feedback visual após ações relevantes.

### Mensagens sugeridas

| Situação | Mensagem |
|---|---|
| Carrinho vazio | Seu carrinho está vazio. Adicione alguns produtos para continuar. |
| Produto adicionado | Produto adicionado ao carrinho! |
| Produto removido | Produto removido do carrinho. |
| Pedido confirmado | Pedido confirmado com sucesso! |
| Categoria vazia | Nenhum produto encontrado nesta categoria. |

### Critérios de aceitação

- [ ] Pedidos vazios não podem ser confirmados.
- [ ] Mensagens compreensíveis.
- [ ] Feedback após operações.
- [ ] Estados vazios tratados.
- [ ] Carrinho sempre válido.

---

# 4. REGRAS DE NEGÓCIO

## 4.1. Produtos

Cada produto deverá possuir:

- `id`: identificador único.
- `name`: nome.
- `description`: descrição.
- `price`: preço em centavos.
- `category`: categoria.
- `image`: referência da imagem.

Os dados deverão permanecer centralizados.

## 4.2. Categorias

Utilizar identificadores consistentes para as categorias.

A filtragem deverá considerar a categoria associada ao produto, não apenas o texto visual apresentado.

## 4.3. Carrinho

Cada item deverá manter:

- Identificador do produto.
- Referência do produto.
- Quantidade.

Não duplicar a lógica de cálculo entre componentes.

## 4.4. Integridade

Garantir:

- Identificadores únicos.
- Quantidades inteiras e positivas.
- Preços não negativos.
- Subtotais corretos.
- Total correto.
- Ausência de duplicações desnecessárias.

## 4.5. Estado da aplicação

O estado do carrinho deverá possuir uma fonte centralizada.

As atualizações deverão refletir imediatamente no indicador, modal, subtotais e total.

## 4.6. Persistência

O MVP não exige banco de dados.

Os dados poderão permanecer em memória ou utilizar armazenamento local, caso exista justificativa técnica.

A confirmação será uma simulação local.

---

# 5. FLUXO DO USUÁRIO

## 5.1. Fluxo principal

1. Cliente acessa a aplicação.
2. Visualiza o cardápio e a seção de destaques.
3. Consulta os produtos.
4. Seleciona uma categoria.
5. Adiciona produtos ao carrinho.
6. Indicador do carrinho é atualizado.
7. Abre o modal central.
8. Modifica quantidades ou remove produtos.
9. Confere os valores.
10. Confirma o pedido.
11. Visualiza a confirmação.
12. Retorna ao catálogo.

## 5.2. Fluxo alternativo: carrinho vazio

1. Cliente abre o carrinho.
2. Sistema apresenta o estado vazio.
3. Confirmação permanece desabilitada ou é impedida.
4. Existe uma ação para retornar ao catálogo.

## 5.3. Fluxo alternativo: remoção do último produto

1. Cliente remove o último item.
2. Quantidade total é atualizada.
3. Total passa a ser R$ 0,00.
4. Estado vazio é apresentado.
5. Confirmação fica indisponível.

## 5.4. Fluxo alternativo: filtragem

1. Cliente seleciona uma categoria.
2. Listagem é atualizada.
3. Carrinho permanece inalterado.
4. Cliente continua adicionando produtos.

---

# 6. COMPONENTES DA INTERFACE

## 6.1. Página principal — Cardápio

Responsável pela apresentação geral.

Componentes:

- Cabeçalho.
- Identidade visual da lanchonete.
- Área de apresentação.
- Seção de produtos em destaque.
- Navegação de categorias.
- Catálogo completo.
- Indicador do carrinho.
- Rodapé discreto, se necessário.

A organização deverá priorizar a descoberta dos produtos e a facilidade de compra.

## 6.2. Cabeçalho

Deverá apresentar:

- Identidade visual.
- Nome da lanchonete.
- Navegação para o catálogo.
- Acesso ao carrinho.
- Indicador da quantidade de itens.

O cabeçalho deverá adaptar sua estrutura para dispositivos menores.

## 6.3. Seção de destaques

Responsável por apresentar produtos selecionados com maior evidência visual.

Características:

- Imagens maiores.
- Identificação de destaque.
- Nome do produto.
- Descrição resumida.
- Preço.
- Ação de adicionar ao carrinho.

Os produtos em destaque também deverão fazer parte do catálogo completo.

Não duplicar produtos na fonte de dados ou criar versões independentes dos mesmos itens.

## 6.4. Navegação de categorias

Deverá apresentar:

- Opção de todos os produtos.
- Categorias disponíveis.
- Categoria selecionada.
- Identificação visual da seleção.

Poderá utilizar botões segmentados ou chips de navegação.

## 6.5. Cartão de produto

Deverá apresentar:

- Imagem.
- Nome.
- Descrição.
- Preço.
- Categoria, quando pertinente.
- Botão de adicionar.

Os cartões deverão manter dimensões e hierarquia consistentes.

## 6.6. Modal do carrinho

O carrinho deverá ser apresentado em um modal central sobre o cardápio.

### Estrutura

- Cabeçalho com título.
- Botão de fechar.
- Lista de produtos selecionados.
- Controles de quantidade.
- Ações de remoção.
- Subtotais.
- Valor total.
- Botão de confirmação.
- Ação de retornar ao catálogo.

### Comportamento

1. Abrir ao clicar no indicador do carrinho.
2. Fechar pelo botão de fechar.
3. Fechar ao clicar na área externa, quando apropriado.
4. Permitir fechamento pela tecla Escape.
5. Impedir que interações dentro do modal fechem o modal.
6. Preservar os dados do carrinho após fechar e reabrir.
7. Apresentar rolagem interna quando o conteúdo ultrapassar a altura disponível.
8. Adaptar dimensões para dispositivos móveis.
9. Bloquear a interação com o conteúdo de fundo enquanto aberto.
10. Gerenciar corretamente o foco do teclado, incluindo retorno do foco ao elemento que abriu o modal.

### Acessibilidade

- Identificação semântica de diálogo.
- `aria-modal` quando aplicável.
- Título acessível.
- Foco inicial adequado.
- Navegação por teclado.
- Foco contido dentro do modal enquanto aberto.
- Fechamento por Escape.

O modal deverá apresentar o estado vazio quando não houver produtos.

## 6.7. Confirmação do pedido

Deverá apresentar:

- Identificação visual de sucesso.
- Mensagem de confirmação.
- Resumo dos produtos.
- Quantidades.
- Subtotais.
- Valor total.
- Botão de retorno ao catálogo.

A confirmação deverá preservar os dados do pedido independentemente da reinicialização do carrinho.

## 6.8. Feedback visual

Apresentar feedback adequado para:

- Produto adicionado.
- Produto removido.
- Quantidade atualizada.
- Pedido confirmado.
- Carrinho vazio.
- Categoria sem produtos.

Evitar mensagens excessivas.

---

# 7. ESTADOS DA INTERFACE

A aplicação deverá contemplar:

- Carregamento inicial, quando necessário.
- Catálogo carregado.
- Categoria selecionada.
- Categoria sem produtos.
- Seção de destaques.
- Carrinho fechado.
- Carrinho aberto.
- Carrinho vazio.
- Carrinho com produtos.
- Produto adicionado.
- Produto removido.
- Quantidade atualizada.
- Confirmação de pedido.
- Validação de pedido vazio.
- Feedback de sucesso.
- Feedback de erro.

Não utilizar telas vazias ou elementos sem função.

---

# 8. REQUISITOS NÃO FUNCIONAIS

## RNF01 — Usabilidade

A interface deverá ser intuitiva, com fluxo de compra simples e sem etapas desnecessárias.

## RNF02 — Responsividade

A aplicação deverá funcionar em desktops, tablets e smartphones.

## RNF03 — Acessibilidade

Contemplar:

- Contraste adequado.
- Navegação por teclado.
- Indicadores de foco.
- HTML semântico.
- Labels associados aos campos.
- Descrições acessíveis para ícones.
- Identificação de estados independente de cores.
- Botões com áreas adequadas para toque.
- Modal acessível.

## RNF04 — Consistência visual

Manter padrões consistentes de tipografia, cores, espaçamento, bordas, sombras e interações.

## RNF05 — Desempenho

As atualizações do carrinho e os filtros deverão apresentar resposta imediata.

## RNF06 — Manutenibilidade

Utilizar componentes reutilizáveis, separação de responsabilidades, nomenclatura clara e centralização das regras de negócio.

## RNF07 — Confiabilidade

Garantir consistência nos cálculos e nas operações do carrinho.

---

# 9. DIRETRIZES VISUAIS E IDENTIDADE DO PROJETO

## 9.1. Conceito visual

A identidade visual deverá combinar a atmosfera fantasiosa de:

- The Legend of Zelda: Ocarina of Time.
- The Legend of Zelda: Majora's Mask.

A proposta é criar uma lanchonete temática situada em um universo de fantasia medieval, combinando natureza, aventura, artefatos antigos e ambientação mística com uma interface comercial moderna.

A inspiração será estética, sem reproduzir diretamente a interface dos jogos.

## 9.2. Direção artística: identidade híbrida

A interface deverá combinar dois estilos:

**Base escura — fantasia medieval**

- Verde-floresta profundo.
- Tons de madeira escura.
- Sombras suaves.
- Elementos inspirados em pedra e natureza.

**Superfícies claras — pergaminho e materiais antigos**

- Tons de creme e marfim.
- Bege envelhecido.
- Texturas sutis.
- Detalhes em dourado envelhecido.

O objetivo é equilibrar a atmosfera misteriosa de Majora's Mask com o caráter natural e aventureiro de Ocarina of Time.

## 9.3. Paleta de cores sugerida

| Elemento | Direção visual |
|---|---|
| Fundo principal | Verde-floresta profundo |
| Superfícies principais | Pergaminho e creme |
| Superfícies secundárias | Madeira escura |
| Destaques | Dourado envelhecido |
| Elementos secundários | Verde-musgo |
| Texto em fundo escuro | Marfim |
| Texto em superfície clara | Marrom profundo |
| Ações positivas | Verde natural |
| Alertas | Tons quentes discretos |

Os valores exatos deverão ser definidos em tokens de design e centralizados no projeto.

## 9.4. Tipografia

Combinar:

- Fontes serifadas com personalidade medieval para títulos.
- Fontes modernas e legíveis para descrições e informações.
- Destaque tipográfico para preços.
- Hierarquia clara entre títulos, subtítulos e informações secundárias.

Evitar fontes excessivamente ornamentadas em textos longos.

## 9.5. Elementos decorativos

Poderão ser utilizados:

- Molduras ornamentais.
- Divisórias temáticas.
- Texturas sutis de pergaminho.
- Detalhes de madeira e pedra.
- Símbolos de fantasia.
- Ornamentos dourados.
- Pequenos elementos inspirados em artefatos antigos.

Os elementos decorativos não deverão prejudicar a leitura.

## 9.6. Seção de produtos em destaque

A página inicial deverá possuir uma seção de destaques visualmente diferenciada.

Características:

- Produtos com imagens de maior dimensão.
- Cartões com composição mais elaborada.
- Identificação de produto em destaque.
- Nome, descrição e preço.
- Botão de adicionar ao carrinho.
- Coerência com a identidade visual.

A seção deverá ocupar uma posição de destaque no início do cardápio, antes da listagem completa.

Não utilizar um banner genérico sem relação com os produtos.

## 9.7. Catálogo em grid

A listagem completa deverá utilizar cartões organizados em grid responsivo.

Diretrizes:

- Três ou quatro colunas em telas desktop, conforme espaço disponível.
- Duas colunas em tablets, quando adequado.
- Uma ou duas colunas em smartphones, conforme largura e legibilidade.
- Imagens com proporções consistentes.
- Preços visualmente destacados.
- Botões de adicionar facilmente identificáveis.
- Espaçamento consistente entre cartões.

## 9.8. Modal do carrinho

O modal deverá seguir a identidade híbrida.

Diretrizes:

- Fundo ou superfície com aparência de pergaminho.
- Moldura ou detalhes discretos em dourado.
- Tipografia legível.
- Contraste adequado.
- Botões com estados visuais claros.
- Sombras para destacar o modal.
- Fundo externo escurecido.
- Dimensões adaptáveis.

Não utilizar efeitos excessivos de transparência ou glassmorphism que prejudiquem a leitura.

## 9.9. Referências de identidade

Criar uma identidade visual própria.

Não utilizar diretamente:

- Logotipos oficiais da Nintendo.
- Personagens dos jogos.
- Imagens oficiais protegidas.
- Interfaces reproduzidas integralmente.
- Recursos que induzam o usuário a acreditar que se trata de um produto oficial da franquia.

Utilizar imagens originais ou devidamente licenciadas.

## 9.10. Experiência visual

A interface deverá priorizar:

1. Identificação rápida dos produtos.
2. Clareza dos preços.
3. Facilidade de navegação.
4. Destaque para produtos selecionados.
5. Acesso intuitivo ao carrinho.
6. Facilidade de alteração de quantidades.
7. Visibilidade do valor total.
8. Facilidade de confirmação.

A identidade temática deverá complementar a experiência, nunca competir com ela.

---

# 10. TECNOLOGIAS E IMPLEMENTAÇÃO

## 10.1. Definição tecnológica

A stack deverá respeitar a estrutura existente no repositório e as decisões tomadas durante a prototipação no Lovable.

Antes de implementar, analisar:

- Estrutura atual.
- `package.json`.
- Dependências.
- Arquivos de configuração.
- Componentes.
- Rotas.
- Padrões existentes.

Não substituir tecnologias ou reestruturar o projeto sem necessidade justificada.

## 10.2. Diretrizes de implementação

Priorizar:

- Componentização.
- Reutilização de código.
- Separação de responsabilidades.
- Organização modular.
- Tipagem adequada.
- Centralização dos dados.
- Centralização das regras de cálculo.
- Tratamento dos estados.
- Código legível e sustentável.

## 10.3. Gerenciamento de estado

O carrinho deverá possuir uma fonte centralizada.

Operações esperadas:

- `addToCart(product)`
- `removeFromCart(productId)`
- `increaseQuantity(productId)`
- `decreaseQuantity(productId)`
- `clearCart()`
- `getSubtotal(productId)`
- `getTotal()`
- `confirmOrder()`

Os nomes são referências e poderão ser adaptados à arquitetura.

## 10.4. Dados fictícios

Os dados deverão permanecer centralizados.

Utilizar imagens locais ou fontes confiáveis.

A aplicação deverá apresentar alternativa visual caso uma imagem não carregue.

## 10.5. Restrições técnicas

- Não adicionar dependências sem justificativa.
- Não criar serviços externos desnecessários.
- Não implementar autenticação.
- Não criar endpoints fictícios.
- Não simular pagamentos reais.
- Não duplicar regras de negócio.
- Não armazenar preços como textos para realizar cálculos.
- Não deixar botões sem comportamento.
- Não utilizar dados reais de clientes.
- Não comprometer funcionalidades existentes.

---

# 11. CRITÉRIOS DE ACEITAÇÃO

## Catálogo

- [ ] Pelo menos seis produtos.
- [ ] Nome, preço, descrição e categoria em todos.
- [ ] Imagens disponíveis.
- [ ] Formatação monetária correta.
- [ ] Seção de destaques funcional.

## Categorias

- [ ] Pelo menos duas categorias.
- [ ] Visualização de todos os produtos.
- [ ] Filtragem funcional.
- [ ] Carrinho preservado durante a filtragem.

## Carrinho

- [ ] Adição de produtos.
- [ ] Incremento de produtos repetidos.
- [ ] Aumento de quantidade.
- [ ] Redução de quantidade.
- [ ] Remoção de itens.
- [ ] Indicador atualizado.
- [ ] Modal abre e fecha.
- [ ] Dados preservados ao fechar e reabrir.

## Cálculos

- [ ] Subtotais corretos.
- [ ] Total correto.
- [ ] Atualização automática.
- [ ] Valores formatados em reais.
- [ ] Total zerado quando vazio.

## Finalização

- [ ] Confirmação de pedido válido.
- [ ] Mensagem de sucesso.
- [ ] Resumo completo.
- [ ] Quantidades corretas.
- [ ] Subtotais corretos.
- [ ] Total correto.
- [ ] Carrinho reinicializado.
- [ ] Retorno ao catálogo.

## Validação

- [ ] Pedidos vazios impedidos.
- [ ] Mensagens compreensíveis.
- [ ] Estados vazios apresentados.
- [ ] Feedback adequado.

## Responsividade e acessibilidade

- [ ] Desktop funcional.
- [ ] Tablet funcional.
- [ ] Smartphone funcional.
- [ ] Modal responsivo.
- [ ] Sem rolagem horizontal indevida.
- [ ] Navegação por teclado.
- [ ] Controles acessíveis.

## Qualidade técnica

- [ ] Sem erros críticos no console.
- [ ] Regras centralizadas.
- [ ] Componentes com responsabilidades definidas.
- [ ] Cálculos testados.
- [ ] Documentação atualizada.

---

# 12. TESTES FUNCIONAIS

| ID | Cenário | Resultado esperado |
|---|---|---|
| T01 | Acessar aplicação | Catálogo apresentado. |
| T02 | Visualizar produtos | Informações completas. |
| T03 | Selecionar categoria | Produtos filtrados. |
| T04 | Selecionar todos | Todos os produtos apresentados. |
| T05 | Adicionar produto | Item inserido no carrinho. |
| T06 | Adicionar produto repetido | Quantidade incrementada. |
| T07 | Aumentar quantidade | Subtotal atualizado. |
| T08 | Diminuir quantidade | Subtotal atualizado. |
| T09 | Remover produto | Item removido. |
| T10 | Adicionar vários produtos | Todos aparecem corretamente. |
| T11 | Verificar subtotal | Cálculo correto. |
| T12 | Verificar total | Soma correta. |
| T13 | Remover último produto | Carrinho vazio e total zerado. |
| T14 | Confirmar carrinho vazio | Operação impedida. |
| T15 | Confirmar pedido válido | Confirmação apresentada. |
| T16 | Conferir resumo | Produtos e valores corretos. |
| T17 | Retornar ao catálogo | Catálogo acessível. |
| T18 | Verificar feedback | Mensagens adequadas. |
| T19 | Acessar em desktop | Layout adaptado. |
| T20 | Acessar em smartphone | Layout adaptado. |
| T21 | Navegar por teclado | Controles acessíveis. |
| T22 | Filtrar com carrinho preenchido | Carrinho preservado. |
| T23 | Fechar e reabrir modal | Dados preservados. |
| T24 | Fechar modal por Escape | Modal fechado e foco restaurado. |
| T25 | Confirmar pedido e iniciar nova compra | Carrinho reinicializado corretamente. |

Os resultados reais deverão ser registrados em `docs/testes.md`.

---

# 13. DIRETRIZES PARA UTILIZAÇÃO DO GITHUB COPILOT

Este documento representa a especificação oficial do MVP.

## 13.1. Antes de implementar

1. Ler integralmente a especificação.
2. Analisar a estrutura existente.
3. Identificar tecnologias e dependências.
4. Verificar componentes e funcionalidades.
5. Identificar conflitos.
6. Planejar alterações.

## 13.2. Durante a implementação

1. Implementar requisitos incrementalmente.
2. Preservar funcionalidades corretas.
3. Reutilizar componentes.
4. Manter consistência visual.
5. Respeitar regras de negócio.
6. Evitar duplicações.
7. Não criar funcionalidades fora do escopo.
8. Garantir funcionamento dos controles.
9. Não considerar interface criada como funcionalidade concluída.

## 13.3. Ao encontrar ambiguidades

- Priorizar requisitos explícitos.
- Não inventar funcionalidades.
- Identificar decisões técnicas necessárias.
- Explicar conflitos.
- Sugerir soluções simples.
- Evitar alterações desnecessárias.

## 13.4. Após implementar

1. Verificar os requisitos.
2. Executar testes.
3. Corrigir erros.
4. Validar responsividade.
5. Validar cálculos.
6. Identificar funcionalidades incompletas.
7. Informar arquivos modificados.
8. Apresentar resumo das alterações.
9. Informar testes e resultados.
10. Identificar limitações.

## 13.5. Integridade

Um requisito não deverá ser considerado atendido sem verificar seu comportamento real.

Uma interface visualmente correta não representa, isoladamente, uma implementação funcional.

---

# 14. RESTRIÇÕES GERAIS

Esta especificação representa o contrato funcional e visual do MVP.

Todas as decisões deverão respeitar:

- Os oito requisitos funcionais.
- As regras de negócio.
- Os requisitos não funcionais.
- A identidade visual híbrida.
- O catálogo em grid com destaques.
- O carrinho em modal central.
- O escopo acadêmico.

Não adicionar funcionalidades, integrações ou serviços externos sem necessidade justificada.

Priorizar simplicidade, qualidade, funcionalidade e facilidade de manutenção.

Alterações relevantes deverão ser documentadas antes de serem incorporadas.

O objetivo final é entregar um cardápio digital funcional, intuitivo, responsivo e visualmente consistente, demonstrando utilização crítica de ferramentas de Inteligência Artificial.