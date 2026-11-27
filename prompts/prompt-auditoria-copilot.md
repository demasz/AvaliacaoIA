# AUDITORIA TÉCNICA E FINALIZAÇÃO — CARDÁPIO DIGITAL

## 1. CONTEXTO E OBJETIVO
Atue como um Engenheiro de Software Sênior, com experiência em arquitetura frontend, React, TypeScript, Vite, qualidade de software, testes automatizados, documentação técnica, acessibilidade e controle de versão com Git.

Você será responsável por realizar uma auditoria técnica completa e uma etapa de refinamento do projeto **Cardápio Digital**, preparando-o para uma entrega acadêmica e uma apresentação profissional.

O objetivo não é adicionar funcionalidades novas, mas elevar a qualidade do que já foi desenvolvido.

O projeto já possui uma implementação funcional gerada inicialmente com Lovable e posteriormente integrada ao repositório principal.

Sua missão é:

1. Eliminar dependências desnecessárias da infraestrutura do Lovable.
2. Garantir que o projeto funcione de maneira independente.
3. Corrigir problemas de portabilidade de imagens e recursos.
4. Revisar e consolidar toda a documentação.
5. Conferir a correspondência entre a SPEC e a implementação.
6. Fortalecer a validação e os testes existentes.
7. Preparar o README para apresentação.
8. Registrar corretamente a utilização das ferramentas de IA.
9. Garantir que o repositório esteja organizado, consistente e reproduzível.
A prioridade absoluta é preservar o funcionamento e a identidade visual da aplicação.

**Não transforme esta tarefa em uma reconstrução do projeto. Não adicione funcionalidades fora do escopo do MVP.**

---

# 2. IDENTIFICAÇÃO DO PROJETO

## 2.1. Repositório principal
Projeto: `AvaliacaoIA`

GitHub:
[https://github.com/demasz/AvaliacaoIA](https://github.com/demasz/AvaliacaoIA)

Branch principal: `main`

Diretório local:

```
C:\Users\guilherme62395006\Documents\AvaliacaoIA
```
Este é o repositório definitivo do projeto.

## 2.2. Repositório de origem
O frontend foi inicialmente desenvolvido pelo Lovable neste repositório:

```
https://github.com/demasz/pixel-perfect-replica
```
Considere-o apenas como referência histórica e fonte de comparação, caso necessário.

Não faça modificações no repositório de origem.

Não transfira seu histórico Git para o repositório principal.

Não mantenha dependências operacionais desnecessárias entre os dois projetos.

## 2.3. Tecnologias existentes
A implementação utiliza tecnologias como:

- React 19.
- TypeScript.
- TanStack Start.
- TanStack Router.
- Vite.
- Tailwind CSS 4.
- Radix UI.
- Lucide React.
- Vitest.
- Testing Library.
- Bun.
As versões efetivamente utilizadas deverão ser verificadas nos arquivos de configuração e no arquivo `package.json`.

Não atualize versões indiscriminadamente.

---

# 3. REGRAS FUNDAMENTAIS DE EXECUÇÃO
Antes de iniciar qualquer alteração, leia e compreenda a estrutura completa do projeto.

Trabalhe em etapas, seguindo rigorosamente a sequência estabelecida neste documento.

### 3.1. Preservação
Preserve:

- A identidade visual da Taverna do Bosque.
- As cores e a tipografia.
- A disposição dos elementos.
- Os componentes existentes.
- A lógica do catálogo.
- A lógica de filtragem.
- O funcionamento do carrinho.
- Os cálculos financeiros.
- A confirmação simulada.
- A responsividade.
- As especificações e decisões previamente documentadas.
Não substitua a implementação existente por uma versão simplificada.

Não remova componentes apenas por parecerem desnecessários sem investigar suas referências e responsabilidades.

### 3.2. Restrições
Não:

- Adicione funcionalidades fora do MVP.
- Crie autenticação.
- Implemente backend.
- Adicione banco de dados.
- Implemente pagamentos reais.
- Implemente entrega ou rastreamento.
- Crie painel administrativo.
- Modifique o comportamento funcional sem justificativa.
- Remova testes apenas para obter uma execução aprovada.
- Atualize bibliotecas sem necessidade.
- Introduza dependências sem justificativa técnica.
- Utilize imagens externas aleatórias como substituição das imagens originais.
- Declare verificações aprovadas sem executá-las.

### 3.3. Segurança do Git
Não execute:

```
git reset --hard
git clean -fd
git push --force
git rebase
git commit
git push
```
Não altere o histórico de commits.

Não substitua a pasta `.git`.

Não altere o repositório remoto.

Não faça operações destrutivas sobre arquivos existentes.

Antes de começar, execute:

```
git status
git branch --show-current
git remote -v
```
Registre o estado encontrado.

Caso existam alterações locais não commitadas, preserve-as integralmente.

Ao terminar, deixe as modificações disponíveis para revisão, sem criar commit ou realizar push.

---

# 4. ETAPA 1 — AUDITORIA DA ESTRUTURA
Faça uma análise completa da estrutura atual.

Examine especialmente:

```
AvaliacaoIA/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── cart/
│   │   ├── products/
│   │   └── ui/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── routes/
│   ├── test/
│   ├── router.tsx
│   ├── server.ts
│   ├── start.ts
│   └── styles.css
│
├── public/
│
├── docs/
│   ├── spec.md
│   ├── spec-backend.md
│   └── testes.md
│
├── prompts/
│   ├── prompt-lovable.md
│   ├── prompt-copilot.md
│   └── desvios-prompt-copilot.md
│
├── package.json
├── bun.lock
├── bunfig.toml
├── components.json
├── eslint.config.js
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── roadmap.md
└── README.md
```
A estrutura acima é uma referência. Confirme a estrutura efetivamente existente.

Verifique:

1. Se existem arquivos desnecessários.
2. Se existem arquivos duplicados.
3. Se há arquivos vazios.
4. Se existem referências a caminhos inexistentes.
5. Se há imports não utilizados.
6. Se há dependências não utilizadas.
7. Se existem arquivos gerados automaticamente.
8. Se há código de infraestrutura do Lovable.
9. Se os caminhos de imagens e recursos correspondem aos arquivos existentes.
10. Se a documentação representa a estrutura real do projeto.
Não faça alterações nesta etapa sem antes identificar os problemas.

---

# 5. ETAPA 2 — INDEPENDÊNCIA DO LOVABLE
Esta é uma das etapas mais importantes.

O projeto deverá funcionar localmente e em uma hospedagem independente, sem depender da infraestrutura privada ou dos mecanismos internos do Lovable.

A simples integração dos arquivos ao GitHub não garante essa independência.

Investigue todos os pontos de acoplamento.

## 5.1. Auditoria de dependências
Verifique especialmente:

- `@lovable.dev/vite-tanstack-config`.
- Arquivos de configuração criados especificamente pelo Lovable.
- Serviços de monitoramento de erros.
- Integrações de telemetria.
- Referências ao gateway do Lovable.
- Referências a variáveis de ambiente exclusivas.
- Arquivos de identificação de projeto.
- Referências a URLs internas.
- Middleware de desenvolvimento.
- Recursos que dependem de servidores externos do Lovable.
Pesquise na aplicação por termos como:

```
lovable
LOVABLE
__l5e
asset_id
r2_key
lovable.dev
lovable-error
@lovable.dev
```
Analise cada ocorrência e identifique se ela pertence:

- Ao funcionamento da aplicação.
- À configuração de build.
- À geração de recursos.
- Ao monitoramento de erros.
- À documentação histórica.
- A comentários e instruções antigas.
Não remova indiscriminadamente todas as ocorrências.

Documentações e prompts históricos podem mencionar o Lovable legitimamente.

A preocupação principal é eliminar dependências operacionais desnecessárias.

## 5.2. Configuração do Vite e TanStack
Analise cuidadosamente o arquivo:

```
vite.config.ts
```
Atualmente existe uma configuração associada ao pacote:

```
@lovable.dev/vite-tanstack-config
```
Investigue quais responsabilidades esse pacote fornece ao projeto.

Verifique especialmente:

- Plugin do React.
- Plugin do TanStack Start.
- Plugin do TanStack Router.
- Integração com Tailwind CSS.
- Resolução de aliases.
- Configuração de TypeScript.
- Configuração de Nitro.
- Inicialização do servidor.
- Configuração do SSR.
- Tratamento de erros.
- Configurações de desenvolvimento e produção.
O objetivo é substituir a configuração proprietária por configurações próprias ou oficiais das tecnologias utilizadas, quando tecnicamente viável.

**Não remova o pacote antes de identificar e substituir todas as suas responsabilidades necessárias.**

Use as APIs efetivamente disponíveis nas versões instaladas.

Consulte os tipos, documentação instalada e exemplos oficiais compatíveis com as versões atuais do projeto.

Não invente configurações ou misture APIs de versões diferentes.

Preserve o funcionamento do TanStack Start, SSR, rotas, servidor, Vite e Tailwind.

Após qualquer modificação nessa área, execute o build de produção.

## 5.3. Monitoramento e tratamento de erros
Examine:

```
src/lib/error-capture.ts
src/lib/error-page.ts
src/lib/lovable-error-reporting.ts
src/routes/__root.tsx
src/server.ts
```
Identifique se existe envio de informações para serviços externos do Lovable.

Caso exista:

1. Remova integrações de telemetria que não sejam necessárias ao MVP.
2. Preserve os mecanismos úteis de tratamento de erros.
3. Preserve a página de erro.
4. Preserve o Error Boundary.
5. Mantenha mensagens compreensíveis ao usuário.
6. Evite exposição de informações sensíveis.
7. Não introduza um serviço externo de monitoramento.
A aplicação deverá continuar apresentando comportamento adequado diante de erros.

Não remova a estrutura de tratamento de exceções somente porque ela contém uma referência ao Lovable.

---

# 6. ETAPA 3 — PORTABILIDADE DAS IMAGENS
Esta etapa exige atenção especial.

Foi identificado que o projeto utiliza arquivos de referência:

```
src/assets/*.asset.json
```
Esses arquivos contêm metadados e endereços associados ao armazenamento de imagens do Lovable.

Algumas referências utilizam caminhos semelhantes a:

```
/__l5e/assets-v1/...
```
Isso pode comprometer a exibição das imagens quando a aplicação for executada fora da infraestrutura original.

O objetivo é tornar todas as imagens utilizadas pelo cardápio independentes do Lovable.

## 6.1. Inventário
Identifique todas as imagens utilizadas.

A implementação atualmente possui referências relacionadas a:

- Hambúrguer da Floresta.
- Smash da Montanha.
- Poção Azul.
- Elixir de Fogo.
- Batatas da Montanha.
- Anéis de Cebola.
- Doce da Fada.
- Torta do Bosque.
- Imagem de apresentação da Taverna.
Confirme a quantidade efetiva de arquivos e seus nomes.

## 6.2. Localização das imagens originais
Antes de substituir qualquer imagem, procure os arquivos originais em:

- `public/`.
- `src/assets/`.
- Diretórios locais do projeto.
- Histórico de arquivos já transferidos.
- Recursos originais acessíveis por referências válidas já existentes.
Se os arquivos binários originais estiverem disponíveis, preserve-os.

Se for necessário recuperar uma imagem por um endereço existente, verifique se o recurso é realmente a imagem original do projeto e se pode ser obtido sem credenciais privadas ou exposição de informações sensíveis.

Não invente URLs.

Não utilize imagens aleatórias da internet.

Não substitua imagens originais por emojis, gradientes ou imagens genéricas.

Não declare que uma imagem foi migrada quando apenas sua referência foi alterada.

## 6.3. Nova organização
Quando os arquivos originais estiverem disponíveis, organize-os preferencialmente em:

```
public/
└── images/
    ├── tavern-hero.webp
    ├── forest-burger.webp
    ├── double-burger.webp
    ├── blue-potion.webp
    ├── red-elixir.webp
    ├── fries.webp
    ├── onion-rings.webp
    ├── fairy-dessert.webp
    └── forest-pie.webp
```
A nomenclatura é uma sugestão. Preserve os nomes existentes quando houver motivo para isso.

Atualize os imports e os caminhos utilizados em:

```
src/data/products.ts
src/routes/index.tsx
src/components/products/product-card.tsx
```
A aplicação deverá utilizar recursos locais.

## 6.4. Validação das imagens
Verifique:

- Existência física de cada imagem.
- Caminho correto.
- Formato compatível.
- Arquivo não vazio.
- Integridade do recurso.
- Ausência de caminhos internos do Lovable.
- Carregamento no navegador.
- Funcionamento do fallback de imagem.
Não considere o fallback uma comprovação de que a imagem original está funcionando.

O resultado esperado é que as imagens originais sejam exibidas normalmente.

Caso algum recurso não possa ser recuperado, não o substitua silenciosamente.

Documente o arquivo ausente, seu identificador, sua referência original e a intervenção necessária.

A independência das imagens só poderá ser declarada concluída quando todos os recursos necessários estiverem efetivamente disponíveis localmente e validados.

---

# 7. ETAPA 4 — AUDITORIA DA LÓGICA E DOS COMPONENTES
Faça uma revisão técnica sem reconstruir a aplicação.

## 7.1. Catálogo
Analise:

```
src/data/products.ts
```
Verifique:

- Identificadores únicos.
- Nome de todos os produtos.
- Descrição.
- Preço.
- Categoria.
- Imagem.
- Produtos em destaque.
- Categorias existentes.
- Formatação monetária.
Confirme que os produtos destacados são os mesmos produtos utilizados no catálogo.

Evite duplicar dados.

Mantenha o preço armazenado em centavos.

Mantenha a formatação monetária brasileira.

## 7.2. Carrinho
Analise:

```
src/lib/cart.ts
src/components/cart/cart-content.tsx
```
Verifique:

- Adição de produtos.
- Adição repetida.
- Incremento.
- Decremento.
- Remoção.
- Quantidade mínima.
- Impedimento de quantidades inválidas.
- Subtotais.
- Total.
- Carrinho vazio.
- Confirmação.
- Preservação do resumo confirmado.
- Limpeza após confirmação.
- Possibilidade de iniciar uma nova compra.
Priorize funções puras, imutabilidade e separação entre interface e regras de negócio.

Não altere o comportamento do carrinho sem identificar um defeito reproduzível.

## 7.3. Componentes
Revise:

```
src/components/products/product-card.tsx
src/components/cart/cart-content.tsx
src/components/ui/button.tsx
src/components/ui/dialog.tsx
```
Verifique:

- Reutilização.
- Responsabilidades.
- Tipagem.
- Acessibilidade.
- Propriedades obrigatórias.
- Estados de carregamento e erro.
- Rótulos acessíveis.
- Botões com ações reais.
- Ausência de código duplicado desnecessário.
Não refatore componentes apenas por preferência estética.

## 7.4. Página principal
Revise:

```
src/routes/index.tsx
src/routes/__root.tsx
src/styles.css
```
Preserve integralmente a identidade da Taverna do Bosque.

Verifique:

- Semântica HTML.
- Hierarquia de títulos.
- Metadados.
- Navegação.
- Foco.
- Contraste.
- Responsividade.
- Comportamento do modal.
- Feedback ao usuário.
- Compatibilidade com movimento reduzido.
Não redesenhe a aplicação.

---

# 8. ETAPA 5 — REVISÃO DA SPEC
O arquivo oficial da especificação é:

```
docs/spec.md
```
Ele contém os requisitos e critérios de aceitação do projeto.

Atualmente, foram identificados diversos critérios com caixas de seleção desmarcadas, apesar da existência de registros de testes concluídos.

Sua tarefa é reconciliar a especificação com a implementação real.

## 8.1. Conferência dos requisitos
Analise os oito requisitos funcionais:

Requisito | Descrição

RF01 | Catálogo de produtos

RF02 | Categorias e filtragem

RF03 | Carrinho

RF04 | Controle de quantidades

RF05 | Cálculos automáticos

RF06 | Finalização simulada

RF07 | Responsividade

RF08 | Validação e feedback
Para cada critério:

1. Localize a implementação.
2. Identifique o teste relacionado.
3. Verifique se existe evidência documentada.
4. Determine se está realmente atendido.
5. Atualize a caixa de seleção somente quando houver evidência suficiente.
Use:

```
- [x] Critério efetivamente implementado e validado.
- [ ] Critério ainda não implementado ou sem validação suficiente.
```
Não marque todos os critérios automaticamente.

Não confunda implementação aparente com validação efetiva.

## 8.2. Rastreabilidade
Sempre que possível, mantenha uma relação clara entre:

- Código.
- Requisito.
- Teste.
- Resultado.
Caso seja útil, acrescente uma tabela de rastreabilidade em `docs/testes.md`.

Exemplo:

Requisito | Arquivos envolvidos | Evidência | Situação

RF01 | `src/data/products.ts` | Teste de catálogo | Validado

RF02 | `src/routes/index.tsx` | Teste de filtragem | Validado

RF03 | `src/lib/cart.ts` | Testes do reducer | Validado
Utilize apenas resultados efetivamente comprovados.

---

# 9. ETAPA 6 — ORGANIZAÇÃO DA DOCUMENTAÇÃO
A documentação é parte central desta entrega acadêmica.

Ela precisa representar fielmente o projeto atual.

Revise todos os documentos existentes.

## 9.1. README.md
O README atual deverá ser refinado para funcionar como documentação principal do projeto e apresentação do repositório.

Preserve as informações úteis já existentes.

Organize o documento com as seguintes seções:

### Identificação

- Nome: Cardápio Digital.
- Descrição do projeto.
- Objetivo.
- Problema que busca solucionar.
- Contexto acadêmico.

### Funcionalidades
Descreva as funcionalidades realmente implementadas.

Não apresente ideias futuras como se fossem recursos disponíveis.

### Identidade visual
Explique brevemente a proposta da Taverna do Bosque e a combinação entre fantasia e usabilidade comercial moderna.

### Tecnologias
Liste as tecnologias realmente utilizadas e suas versões declaradas.

Separe:

- Ferramentas de desenvolvimento.
- Bibliotecas.
- Frameworks.
- Ferramentas de testes.
- Ferramentas de inteligência artificial.

### Estrutura
A árvore de diretórios deve corresponder exatamente à estrutura real do repositório.

Corrija referências a pastas inexistentes.

Em especial, verifique a referência atual a:

```
documentos/
```
Não mantenha essa referência se a pasta não existir no projeto entregue.

### Instalação
Apresente os comandos funcionais para:

- Instalação de dependências.
- Execução local.
- Execução dos testes.
- Verificação de tipos.
- Lint.
- Build de produção.
- Pré-visualização do build.
Prefira o gerenciador de pacotes efetivamente utilizado pelo projeto.

Atualmente existe `bun.lock`, portanto Bun deve ser tratado como caminho principal, caso a auditoria confirme essa decisão.

### API e backend
Esclareça que o MVP atual não possui backend de negócio, banco de dados ou processamento real de pedidos.

O carrinho utiliza estado local e a confirmação é demonstrativa.

### Inteligência Artificial
Explique a aplicação de IA nas três etapas:

1. Planejamento.
2. Prototipação e implementação.
3. Validação e correção.
Apresente os prompts existentes em `prompts/`, com seus objetivos.

### Testes
Apresente os testes automatizados e os cenários manuais efetivamente executados.

Não use resultados antigos como se fossem uma nova execução.

### Limitações conhecidas
Registre somente limitações reais.

### Critérios de conclusão
Apresente os critérios de conclusão do MVP.

## 9.2. docs/spec-backend.md
O arquivo:

```
docs/spec-backend.md
```
está vazio na versão anteriormente auditada.

O projeto não possui backend de negócio no escopo do MVP.

Não invente uma API ou arquitetura de servidor para preencher esse documento.

Transforme-o em um documento curto, esclarecendo:

- Ausência de backend no MVP.
- Ausência de banco de dados.
- Catálogo estático.
- Carrinho em memória.
- Confirmação demonstrativa.
- Ausência de pagamento e envio de pedidos.
- Possíveis necessidades futuras, claramente identificadas como fora do escopo.
Mantenha coerência com `docs/spec.md` e `README.md`.

## 9.3. docs/testes.md
Revise integralmente:

```
docs/testes.md
```
O documento deverá apresentar:

1. Ambiente utilizado.
2. Data efetiva da validação.
3. Comandos executados.
4. Testes automatizados.
5. Resultados.
6. Cenários manuais.
7. Matriz de rastreabilidade.
8. Limitações da validação.
Diferencie claramente:

- Testes executados automaticamente.
- Testes manuais.
- Inspeções estáticas.
- Testes não executados.
Mantenha o histórico de resultados anteriores quando útil, mas não apresente resultados antigos como se fossem testes desta nova auditoria.

Registre os novos resultados depois de executar os comandos.

## 9.4. roadmap.md
Revise o roadmap.

Ele deverá representar o estado atual do projeto.

Marque como concluídas somente tarefas comprovadas.

Não adicione novas funcionalidades ao planejamento.

Se necessário, acrescente uma etapa de finalização técnica relacionada a:

- Portabilidade de recursos.
- Independência do Lovable.
- Documentação.
- Validação final.

---

# 10. ETAPA 7 — DOCUMENTAÇÃO DOS PROMPTS DE IA
O projeto exige o registro de pelo menos três prompts utilizados durante seu desenvolvimento.

A pasta atual é:

```
prompts/
```
Foram identificados:

```
prompts/prompt-lovable.md
prompts/prompt-copilot.md
prompts/desvios-prompt-copilot.md
```
Os dois primeiros estão preenchidos, enquanto o terceiro foi encontrado vazio.

## 10.1. Preservar os prompts existentes
Revise os arquivos:

- `prompt-lovable.md`.
- `prompt-copilot.md`.
Corrija referências antigas ao diretório `AulaExemploIA`.

O repositório principal correto é:

```
AvaliacaoIA
```
Corrija também referências incorretas à localização da SPEC.

O documento oficial é:

```
docs/spec.md
```
Não descaracterize o conteúdo histórico dos prompts.

## 10.2. Registrar o terceiro prompt
Crie:

```
prompts/prompt-auditoria-copilot.md
```
O documento deverá registrar integralmente o prompt utilizado para esta auditoria e etapa de finalização.

Inclua:

- Objetivo.
- Contexto.
- Ferramenta utilizada.
- Etapa do desenvolvimento.
- Instruções fornecidas.
- Resultado esperado.
- Resultados efetivamente obtidos, após a execução.
Não invente interações ou respostas da IA.

## 10.3. Registro de desvios
Revise:

```
prompts/desvios-prompt-copilot.md
```
Utilize esse arquivo para documentar diferenças reais entre as instruções fornecidas ao Copilot e o que foi efetivamente realizado.

Registre:

- Instrução original.
- Alteração realizada.
- Motivo.
- Impacto.
- Decisão final.
Se não houver desvios, registre isso claramente.

Não invente divergências apenas para preencher o arquivo.

## 10.4. README e prompts
Atualize a seção de Inteligência Artificial no README.

Os três prompts deverão ser listados, com finalidade e etapa correspondente.

A documentação deverá deixar claro que os resultados gerados por IA foram revisados e validados.

---

# 11. ETAPA 8 — QUALIDADE DO PROJETO E CONFIGURAÇÕES
Revise os arquivos de configuração existentes.

Priorize:

```
package.json
bun.lock
bunfig.toml
vite.config.ts
vitest.config.ts
tsconfig.json
eslint.config.js
.prettierrc
.prettierignore
.gitignore
```

## 11.1. package.json
Verifique:

- Dependências utilizadas.
- Dependências não utilizadas.
- Scripts.
- Compatibilidade de versões.
- Dependências exclusivas do Lovable.
- Ferramentas de desenvolvimento.
- Consistência dos comandos.
Remova dependências somente quando tiver certeza de que não são utilizadas.

Preserve os comandos necessários.

Se não existir um comando de verificação TypeScript, considere adicionar:

```
"typecheck": "tsc --noEmit"
```
Confirme a compatibilidade com a configuração atual.

## 11.2. Bun e lockfile
O projeto utiliza:

```
bun.lock
```
Não edite o arquivo manualmente.

Se houver alterações nas dependências, utilize o próprio Bun para atualizar o lockfile.

Não mantenha múltiplos lockfiles conflitantes.

## 11.3. ESLint e Prettier
Verifique a consistência das configurações.

Corrija problemas reais de lint e formatação.

Não reformate indiscriminadamente arquivos fora do escopo.

Preserve a legibilidade do código.

## 11.4. TypeScript
Execute uma verificação de tipos.

Identifique problemas de:

- Tipagem.
- Imports.
- Tipos incompatíveis.
- Propriedades inexistentes.
- Possíveis valores indefinidos.
- Retornos inconsistentes.
Não utilize `any` como solução automática para problemas de tipagem.

Não desative regras de TypeScript apenas para esconder erros.

## 11.5. .gitignore
Verifique se estão protegidos:

- `node_modules/`.
- Arquivos `.env`.
- Arquivos locais de ambiente.
- `dist/`.
- Diretórios de cache.
- Relatórios de testes.
- Arquivos temporários.
Preserve as proteções existentes.

Não ignore arquivos necessários à execução ou entrega.

---

# 12. ETAPA 9 — TESTES E VALIDAÇÃO FINAL
Depois das alterações, execute as verificações disponíveis.

Utilize prioritariamente Bun, conforme o lockfile do projeto.

## 12.1. Instalação

```
bun install
```
Confirme se as dependências podem ser instaladas sem erros.

## 12.2. Testes automatizados

```
bun run test
```
Verifique todos os testes existentes.

Identifique:

- Quantidade de testes.
- Testes aprovados.
- Testes reprovados.
- Testes ignorados.
- Erros de execução.
Não exclua testes para obter aprovação.

## 12.3. TypeScript

```
bun run typecheck
```
Caso o script não exista, execute o comando equivalente:

```
bunx tsc --noEmit
```

## 12.4. ESLint

```
bun run lint
```
Corrija os problemas encontrados que estejam relacionados ao projeto.

## 12.5. Build de produção

```
bun run build
```
O projeto deverá gerar uma compilação de produção sem erros.

Verifique também se o processo não depende de mecanismos exclusivos do Lovable.

## 12.6. Pré-visualização
Quando o build estiver concluído:

```
bun run preview
```
Verifique o comportamento básico da aplicação compilada.

## 12.7. Validação funcional no navegador
Sempre que houver navegador disponível, valide:

- Abertura da página inicial.
- Carregamento das imagens.
- Exibição do catálogo.
- Filtragem por categorias.
- Adição de produtos.
- Incremento e decremento.
- Remoção.
- Cálculos.
- Carrinho vazio.
- Confirmação.
- Resumo do pedido.
- Responsividade.
- Modal.
- Navegação por teclado.
Utilize como referência as resoluções já documentadas:

- 1440 × 900.
- 1366 × 768.
- 768 × 1024.
- 390 × 844.
- 360 × 800.
Se não houver navegador disponível, registre a limitação.

Não afirme que uma verificação visual foi executada se apenas o build foi realizado.

---

# 13. ETAPA 10 — AUDITORIA DE REFERÊNCIAS E INDEPENDÊNCIA
Após as alterações, faça uma nova busca por referências ao Lovable.

Verifique especialmente o código operacional e os arquivos de configuração.

O resultado esperado é:

- Nenhuma imagem necessária hospedada exclusivamente na infraestrutura do Lovable.
- Nenhum caminho interno `__l5e` necessário para renderizar o catálogo.
- Nenhum serviço de telemetria do Lovable necessário para executar a aplicação.
- Nenhuma dependência de gateway ou segredo do Lovable.
- Nenhum pacote proprietário necessário ao funcionamento, caso sua substituição tenha sido concluída com sucesso.
- Nenhuma configuração de execução que exija o projeto original.
- Nenhuma necessidade de conectar o repositório principal à conta Lovable para iniciar a aplicação.
Documentações históricas e prompts podem continuar mencionando o Lovable.

O objetivo é independência operacional, não apagar o histórico de desenvolvimento com IA.

Caso algum acoplamento não possa ser removido com segurança, documente-o e explique a razão.

---

# 14. ETAPA 11 — REVISÃO FINAL DA ENTREGA
Antes de concluir, faça uma última inspeção.

Confira os seguintes critérios:

### Código e arquitetura

- Aplicação preservada.
- Catálogo funcionando.
- Carrinho funcionando.
- Cálculos corretos.
- Confirmação simulada funcionando.
- Componentes organizados.
- Configurações consistentes.
- Sem dependência operacional desnecessária do Lovable.

### Recursos

- Todas as imagens originais disponíveis localmente.
- Caminhos de imagens revisados.
- Nenhum recurso necessário com URL interna do Lovable.
- Fallback de imagem funcionando.

### Documentação

- README atualizado.
- SPEC revisada.
- Backend fora do escopo documentado.
- Testes atualizados.
- Roadmap atualizado.
- Pelo menos três prompts documentados.
- Desvios registrados sem inventar informações.
- Estrutura do README correspondente ao repositório real.

### Qualidade

- Dependências verificadas.
- TypeScript validado.
- ESLint executado.
- Testes automatizados executados.
- Build de produção executado.
- Pré-visualização verificada quando disponível.
- Limitações registradas.

---

# 15. RELATÓRIO FINAL OBRIGATÓRIO
Ao concluir, apresente um relatório técnico organizado.

Não responda apenas que a tarefa foi concluída.

## 15.1. Resumo executivo
Informe:

- Estado inicial.
- Principais problemas identificados.
- Alterações realizadas.
- Estado final.

## 15.2. Arquivos modificados
Apresente uma relação dos arquivos modificados, agrupados por finalidade.

Exemplo:

Arquivo | Alteração | Justificativa

`README.md` | Atualização | Documentação

`vite.config.ts` | Ajuste | Independência

`src/data/products.ts` | Ajuste | Portabilidade de imagens

`docs/testes.md` | Atualização | Evidências
Utilize apenas arquivos realmente modificados.

## 15.3. Dependências do Lovable
Apresente:

- Dependências removidas.
- Dependências preservadas.
- Integrações substituídas.
- Integrações que permanecem.
- Justificativa técnica.

## 15.4. Imagens
Informe:

- Quantidade de imagens identificadas.
- Quantidade recuperada.
- Quantidade armazenada localmente.
- Quantidade validada.
- Pendências.

## 15.5. Testes
Apresente uma tabela:

Verificação | Resultado | Observação

Instalação |  |

Testes automatizados |  |

TypeScript |  |

ESLint |  |

Build |  |

Preview |  |

Navegador |  |
Utilize apenas os resultados reais.

## 15.6. Documentação
Informe quais documentos foram modificados ou criados.

Explique como ficou o registro dos três prompts de IA.

## 15.7. Pendências
Informe todos os problemas não resolvidos.

Não esconda limitações.

Diferencie:

- Problemas bloqueadores.
- Problemas não bloqueadores.
- Melhorias opcionais.

## 15.8. Estado final do Git
Apresente:

```
git status
```
Informe os arquivos modificados e não commitados.

Não crie commit.

Não realize push.

---

# 16. DIRETRIZ FINAL
A qualidade desta entrega deverá ser medida pela consistência entre especificação, implementação, testes e documentação.

O projeto já possui uma identidade visual e um fluxo funcional definidos.

Não há necessidade de criar um novo produto.

O trabalho é transformar a implementação atual em uma aplicação:

- Tecnicamente consistente.
- Independente do Lovable.
- Reproduzível em outro computador.
- Organizada.
- Testável.
- Documentada.
- Fácil de apresentar.
- Preparada para manutenção.
**Priorize evidências, não suposições.**

**Priorize portabilidade, não dependência de ferramentas.**

**Priorize qualidade, não quantidade de funcionalidades.**

**Preserve tudo que já funciona.**

Execute as etapas nesta ordem, faça as alterações necessárias e valide cada uma delas antes de avançar.

Caso encontre uma operação potencialmente destrutiva, um recurso original indisponível ou uma migração técnica que não possa ser realizada com segurança, não invente uma solução: preserve o estado atual, registre o problema e explique a intervenção necessária.

O resultado esperado é uma versão final confiável do `AvaliacaoIA`, pronta para avaliação acadêmica e apresentação técnica.