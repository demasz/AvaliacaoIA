# PROMPT-LOVABLE.md — Desenvolvimento do Cardápio Digital

## 1. CONTEXTO E OBJETIVO

Você atuará como um desenvolvedor frontend sênior, especialista em React, TypeScript, interfaces comerciais, UX/UI e design de produtos digitais.

Sua tarefa é desenvolver a interface de um cardápio digital interativo para uma lanchonete fictícia.

O objetivo é modernizar o atendimento, permitindo que os clientes visualizem produtos, consultem categorias, adicionem itens ao carrinho, alterem quantidades e confirmem pedidos de maneira simulada.

O projeto deverá ser desenvolvido como um MVP funcional, não como uma landing page estática.

### DOCUMENTO DE REFERÊNCIA

A especificação oficial do projeto está no arquivo `SPEC.md`.

Antes de iniciar a implementação:

1. Leia integralmente o `SPEC.md`, caso esteja disponível no contexto do projeto.
2. Compreenda os oito requisitos funcionais.
3. Identifique as regras de negócio.
4. Respeite as restrições do MVP.
5. Utilize este prompt como orientação de implementação visual e experiência do usuário.

Em caso de conflito, o `SPEC.md` possui prioridade sobre decisões estéticas deste prompt.

---

# 2. CONCEITO DO PRODUTO

Desenvolva um cardápio digital com identidade própria, inspirado na atmosfera de fantasia medieval de:

- The Legend of Zelda: Ocarina of Time.
- The Legend of Zelda: Majora's Mask.

A aplicação deverá transmitir a sensação de uma lanchonete temática situada em um universo de fantasia.

A proposta é combinar:

- Atmosfera medieval.
- Elementos naturais.
- Artefatos antigos.
- Madeira e pedra.
- Pergaminhos.
- Detalhes ornamentais.
- Interface comercial moderna.
- Navegação simples e intuitiva.

IMPORTANTE:

A inspiração deverá ser estética. Não reproduza personagens, logotipos, interfaces oficiais, ilustrações protegidas ou elementos que façam a aplicação parecer um produto oficial da Nintendo.

Crie uma identidade visual original.

---

# 3. DIREÇÃO DE DESIGN

## 3.1. Identidade híbrida

A interface deverá combinar superfícies escuras e claras.

A base visual será composta por:

- Verde-floresta profundo.
- Verde-musgo.
- Madeira escura.
- Pergaminho envelhecido.
- Creme e marfim.
- Dourado envelhecido.
- Marrom profundo.

A distribuição deverá manter equilíbrio entre os materiais.

### Fundos

Utilize verde-floresta profundo como base das principais áreas da aplicação.

Evite utilizar preto absoluto como fundo predominante.

### Superfícies

Utilize tons de pergaminho e creme em áreas de conteúdo que precisam de maior legibilidade.

Os cartões poderão apresentar superfícies claras com bordas sutis e detalhes dourados.

### Destaques

Utilize dourado envelhecido para:

- Preços em destaque.
- Ícones selecionados.
- Divisórias ornamentais.
- Botões principais.
- Pequenos detalhes decorativos.

Não utilizar dourado em excesso.

### Textos

Textos sobre fundos escuros deverão utilizar tons de marfim.

Textos sobre superfícies claras deverão utilizar tons de marrom profundo.

Garantir contraste adequado.

## 3.2. Tipografia

Utilize uma combinação de duas famílias tipográficas:

1. Uma fonte serifada com personalidade medieval para títulos.
2. Uma fonte moderna e legível para descrições, preços, botões e informações gerais.

A tipografia deverá transmitir fantasia sem prejudicar a leitura.

Não utilizar fontes excessivamente ornamentadas em textos longos.

## 3.3. Materiais e texturas

Poderão ser utilizados:

- Texturas sutis de pergaminho.
- Aparência de madeira.
- Bordas inspiradas em molduras antigas.
- Pequenos ornamentos.
- Detalhes de pedra.
- Sombras naturais.
- Divisórias temáticas.

Evite excesso de texturas, ruído visual, gradientes e animações.

A interface deve parecer refinada, não caricata.

## 3.4. Linguagem visual

A aplicação deverá transmitir:

- Aventura.
- Natureza.
- Acolhimento.
- Fantasia.
- Qualidade.
- Organização.

Evite aparência infantil, excesso de elementos de RPG ou interface de inventário de videogame.

O produto continua sendo um cardápio comercial.

---

# 4. ARQUITETURA VISUAL DA PÁGINA

A página principal deverá seguir esta organização:

1. Cabeçalho.
2. Seção de apresentação do estabelecimento.
3. Seção de produtos em destaque.
4. Navegação por categorias.
5. Catálogo completo em grid.
6. Rodapé discreto.

A experiência deverá ser organizada em uma página principal de cardápio.

O carrinho será apresentado em modal central, sobreposto à página.

Não criar páginas ou funcionalidades desnecessárias.

---

# 5. CABEÇALHO

Criar um cabeçalho visualmente consistente com a identidade da aplicação.

Deverá apresentar:

- Logotipo tipográfico original ou símbolo próprio.
- Nome fictício da lanchonete.
- Navegação para o cardápio.
- Botão do carrinho.
- Indicador da quantidade de itens.

O nome da lanchonete poderá ser criado por você, desde que combine com o universo de fantasia.

Sugestões de direção para nomes:

- Taverna do Bosque.
- Hearth of Hyrule — evitar associação direta com marcas oficiais.
- Taverna do Cogumelo.
- Refúgio da Floresta.

Prefira um nome original e independente da franquia.

### Comportamento

- O botão do carrinho deverá abrir o modal.
- O indicador deverá apresentar a quantidade total de unidades selecionadas.
- O cabeçalho deverá funcionar em dispositivos móveis.
- A navegação deverá possuir estados visuais de interação.

Não adicionar links sem funcionalidade.

---

# 6. SEÇÃO DE APRESENTAÇÃO

Criar uma área introdutória que estabeleça a identidade da lanchonete.

Ela deverá apresentar:

- Uma chamada principal.
- Uma descrição curta.
- Uma composição visual temática.
- Uma ação para explorar o cardápio.

A seção deverá ser visualmente interessante, mas não poderá ocupar espaço excessivo.

Não transformar o projeto em uma landing page extensa.

A apresentação deverá conduzir naturalmente o usuário aos produtos.

---

# 7. SEÇÃO DE PRODUTOS EM DESTAQUE

Esta seção é obrigatória.

Criar uma área de destaque antes do catálogo completo.

Ela deverá apresentar produtos selecionados com maior evidência visual.

### Composição

Utilizar uma composição assimétrica ou cartões maiores, respeitando a identidade visual.

Cada produto em destaque deverá apresentar:

- Imagem de boa qualidade.
- Nome.
- Descrição resumida.
- Preço.
- Identificação de destaque.
- Botão de adicionar ao carrinho.

Os cartões poderão possuir diferentes dimensões, desde que mantenham consistência visual.

### Regras

1. Os produtos destacados deverão existir no catálogo.
2. Não duplicar dados.
3. A ação de adicionar deverá utilizar a mesma lógica do restante da aplicação.
4. A seção deverá ser responsiva.
5. Não criar botões decorativos.
6. Evitar banners genéricos sem relação com os produtos.

A seção deverá valorizar visualmente os produtos sem prejudicar o fluxo de compra.

---

# 8. NAVEGAÇÃO POR CATEGORIAS

Criar uma área de navegação simples e intuitiva.

Categorias iniciais:

- Todos.
- Hambúrgueres.
- Bebidas.
- Acompanhamentos.
- Sobremesas.

As categorias deverão ser representadas por chips ou botões segmentados.

### Comportamento

- A categoria selecionada deverá possuir destaque visual.
- Ao selecionar uma categoria, o catálogo deverá ser filtrado.
- A opção Todos deverá restaurar a listagem completa.
- O estado selecionado deverá permanecer claro.
- A filtragem não deverá afetar o carrinho.

As categorias deverão utilizar identificadores consistentes.

---

# 9. CATÁLOGO DE PRODUTOS

Criar um catálogo organizado em grid responsivo.

A aplicação deverá apresentar pelo menos seis produtos fictícios.

Recomenda-se utilizar oito produtos para demonstrar melhor as categorias.

### Categorias sugeridas

- Hambúrgueres.
- Bebidas.
- Acompanhamentos.
- Sobremesas.

### Produtos ilustrativos sugeridos

| Produto | Categoria | Preço |
|---|---|---:|
| Hambúrguer da Floresta | Hambúrgueres | R$ 25,00 |
| Smash Goron | Hambúrgueres | R$ 29,00 |
| Poção Azul | Bebidas | R$ 8,00 |
| Elixir de Fogo | Bebidas | R$ 10,00 |
| Batatas Goron | Acompanhamentos | R$ 12,00 |
| Anéis de Cebola | Acompanhamentos | R$ 14,00 |
| Doce da Fada | Sobremesas | R$ 11,00 |
| Torta do Bosque | Sobremesas | R$ 16,00 |

Todos os nomes, descrições, preços e informações deverão ser tratados como fictícios.

### Cartões de produtos

Cada cartão deverá apresentar:

1. Imagem.
2. Nome.
3. Descrição.
4. Preço.
5. Botão de adicionar.

### Design dos cartões

- Superfícies em pergaminho ou creme.
- Bordas sutis.
- Detalhes dourados discretos.
- Imagens com proporções consistentes.
- Preços visualmente destacados.
- Botões facilmente identificáveis.
- Espaçamento interno equilibrado.
- Hover sutil.

### Imagens

As imagens deverão possuir boa qualidade e coerência com os produtos.

Priorizar imagens originais, licenciadas ou recursos disponíveis para uso.

Não utilizar imagens oficiais de Zelda.

Não deixar cartões com imagens quebradas.

Caso uma imagem não esteja disponível, utilizar um fallback visual coerente.

### Responsividade do grid

- Desktop: três ou quatro colunas, conforme largura disponível.
- Tablet: duas colunas.
- Smartphone: uma ou duas colunas, conforme legibilidade.

Não reduzir excessivamente os cartões.

---

# 10. MODAL CENTRAL DO CARRINHO

O carrinho deverá abrir em um modal central sobre a interface principal.

Não utilizar painel lateral como padrão.

Não direcionar o usuário para uma página exclusiva do carrinho.

## 10.1. Aparência

O modal deverá seguir a identidade visual híbrida.

Características:

- Superfície clara inspirada em pergaminho.
- Detalhes em dourado envelhecido.
- Tipografia legível.
- Bordas refinadas.
- Sombras suaves.
- Fundo externo escurecido.
- Composição centralizada.

O modal deverá possuir dimensões adequadas para diferentes telas.

## 10.2. Conteúdo

Apresentar:

- Título do carrinho.
- Quantidade de itens.
- Botão de fechar.
- Lista de produtos.
- Preço unitário.
- Quantidade.
- Subtotal por item.
- Controle de incremento.
- Controle de decremento.
- Ação de remoção.
- Valor total.
- Botão de confirmar pedido.

## 10.3. Comportamento

1. Abrir ao clicar no botão do carrinho.
2. Fechar pelo botão de fechar.
3. Fechar com Escape.
4. Fechar ao clicar fora do conteúdo, quando apropriado.
5. Não fechar ao interagir dentro do modal.
6. Preservar dados ao fechar e reabrir.
7. Atualizar os cálculos imediatamente.
8. Impedir a confirmação de pedidos vazios.
9. Apresentar estado vazio quando necessário.
10. Restaurar o foco ao elemento que abriu o modal.

## 10.4. Carrinho vazio

Apresentar:

- Ilustração ou símbolo temático discreto.
- Mensagem: "Sua sacola está vazia".
- Orientação para explorar o cardápio.
- Ação para retornar aos produtos.

Não apresentar um botão de confirmação funcional quando não existirem produtos.

## 10.5. Responsividade

Em smartphones, o modal poderá ocupar uma área maior da tela, mantendo margens e controles acessíveis.

Se necessário, poderá utilizar uma apresentação quase em tela cheia.

A lista de itens deverá possuir rolagem interna quando necessário.

---

# 11. FINALIZAÇÃO DO PEDIDO

Ao confirmar um pedido válido, apresentar uma experiência de sucesso.

A confirmação poderá substituir o conteúdo do modal ou ser apresentada em uma etapa visual própria.

### Conteúdo

- Símbolo de confirmação.
- Mensagem de sucesso.
- Resumo dos produtos.
- Quantidades.
- Subtotais.
- Total.
- Botão para voltar ao cardápio.

Mensagem sugerida:

"Seu pedido foi confirmado com sucesso!"

A confirmação é exclusivamente demonstrativa.

Não apresentar mensagens que indiquem pagamento, envio à cozinha, entrega ou processamento real.

O resumo deverá utilizar uma cópia dos dados do carrinho no momento da confirmação.

Após a confirmação:

- Limpar o carrinho.
- Atualizar o indicador.
- Preservar o resumo apresentado.
- Permitir iniciar uma nova compra.

---

# 12. FUNCIONALIDADES E ESTADO

A aplicação deverá ser funcional.

Não criar somente uma representação visual.

Implementar:

- Adição de produtos.
- Incremento de quantidades.
- Decremento de quantidades.
- Remoção de produtos.
- Filtragem de categorias.
- Abertura e fechamento do carrinho.
- Cálculo de subtotais.
- Cálculo do total.
- Validação de carrinho vazio.
- Confirmação simulada.
- Limpeza do carrinho após confirmação.

### Regras de estado

O carrinho deverá possuir uma fonte centralizada de estado.

Não manter estados independentes e inconsistentes em diferentes componentes.

A quantidade apresentada no cabeçalho deverá corresponder à soma das quantidades dos produtos no carrinho.

Os valores deverão ser calculados a partir dos dados dos produtos.

Utilizar centavos para os cálculos monetários.

Não duplicar regras de negócio.

---

# 13. RESPONSIVIDADE

Validar a interface em:

- 1440 × 900.
- 1366 × 768.
- 768 × 1024.
- 390 × 844.
- 360 × 800.

### Desktop

Priorizar:

- Grid com múltiplas colunas.
- Boa distribuição do conteúdo.
- Seção de destaques bem dimensionada.
- Cabeçalho organizado.

### Tablet

Priorizar:

- Grid com duas colunas.
- Navegação acessível.
- Modal adaptado.

### Smartphone

Priorizar:

- Cabeçalho compacto.
- Catálogo legível.
- Botões adequados para toque.
- Categorias acessíveis.
- Modal adaptado.
- Ausência de rolagem horizontal indevida.

Não utilizar simplesmente uma versão desktop reduzida.

A composição deverá ser pensada para cada dimensão.

---

# 14. ACESSIBILIDADE E USABILIDADE

Implementar:

- HTML semântico.
- Contraste adequado.
- Navegação por teclado.
- Indicadores de foco.
- Botões com nomes acessíveis.
- Imagens com textos alternativos apropriados.
- Identificação de estados independente de cores.
- Modal acessível.
- Foco gerenciado corretamente.
- Áreas de toque adequadas.

Não utilizar elementos clicáveis sem semântica adequada.

Não deixar ícones sem identificação acessível.

---

# 15. ORGANIZAÇÃO DO CÓDIGO

Respeite a estrutura existente do projeto.

Antes de criar ou alterar arquivos:

1. Analise o projeto.
2. Identifique o framework e as dependências.
3. Verifique os componentes existentes.
4. Preserve configurações válidas.
5. Reutilize componentes quando apropriado.

Priorize uma organização semelhante a:

- `components/`: componentes reutilizáveis.
- `components/products/`: componentes relacionados aos produtos.
- `components/cart/`: componentes do carrinho.
- `data/`: produtos e categorias fictícios.
- `hooks/`: gerenciamento de estado e comportamentos reutilizáveis.
- `lib/`: funções auxiliares.
- `pages/` ou `routes/`: páginas da aplicação.
- `types/`: tipos e interfaces, caso necessário.

A estrutura é uma referência, não uma exigência de reorganização.

Não criar diretórios desnecessários.

Não instalar dependências sem justificativa.

Não substituir tecnologias já configuradas sem necessidade.

---

# 16. RESTRIÇÕES IMPORTANTES

Não implementar:

- Login.
- Cadastro de usuários.
- Pagamento.
- Entrega.
- Estoque.
- Administração.
- Cupons.
- Integrações externas.
- APIs fictícias.
- Funcionalidades não previstas no MVP.

Não deixar botões sem ação.

Não criar links sem destino.

Não utilizar informações reais.

Não implementar elementos visuais que simulem funcionalidades inexistentes.

Não sacrificar a usabilidade em troca de decoração.

Não considerar o projeto concluído somente porque a página principal foi criada.

---

# 17. VALIDAÇÃO OBRIGATÓRIA

Após implementar a interface, verificar:

1. Catálogo com pelo menos seis produtos.
2. Produtos com todas as informações.
3. Filtragem por categoria.
4. Seção de destaques.
5. Adição ao carrinho.
6. Incremento de quantidades.
7. Decremento de quantidades.
8. Remoção de produtos.
9. Cálculo de subtotais.
10. Cálculo do total.
11. Abertura do modal.
12. Fechamento do modal.
13. Preservação dos dados após fechar e reabrir.
14. Impedimento de confirmação vazia.
15. Confirmação simulada.
16. Apresentação do resumo.
17. Limpeza do carrinho após confirmação.
18. Responsividade.
19. Acessibilidade básica.
20. Ausência de erros críticos.

Não afirmar que um teste foi aprovado sem executá-lo.

---

# 18. ORIENTAÇÕES FINAIS

Desenvolva a aplicação com atenção especial à qualidade visual, coerência estética e funcionalidade.

A interface deverá apresentar uma identidade visual memorável, mas permanecer intuitiva para qualquer cliente.

Priorize a experiência de compra.

O resultado esperado é um cardápio digital que pareça um produto comercial real, com uma identidade de fantasia medieval original e acabamento profissional.

Antes de finalizar:

- Verifique os requisitos do `SPEC.md`.
- Identifique requisitos não implementados.
- Corrija inconsistências visuais.
- Verifique todos os controles.
- Teste o fluxo completo de compra.
- Informe quais arquivos foram criados ou modificados.
- Informe limitações existentes.
- Não declare funcionalidades como concluídas sem validação.

**Resultado esperado: um MVP de cardápio digital funcional, responsivo, com identidade visual híbrida inspirada em fantasia medieval, catálogo em grid com produtos destacados e carrinho apresentado em modal central.**