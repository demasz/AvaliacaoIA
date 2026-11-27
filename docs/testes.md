# Validação do cardápio digital

Data do registro histórico: 26/11/2026. Ambiente: aplicação local em Chromium e Vitest.

> Os fluxos de navegador e verificações desta seção são registros históricos, anteriores à integração dos recortes em `public/images/`. Naquele estado, nove metadados `.asset.json` apontavam para `/__l5e/...` sem os binários correspondentes. Consulte a seção de validação posterior para o estado atual.

## Validação anterior: independência operacional do frontend

- Instalação com `bun install --frozen-lockfile`: concluída sem alterações no lockfile.
- `bun run test`: **15 testes aprovados** em 2 arquivos.
- `bun run typecheck`: aprovado.
- `bun run lint`: 0 erros e 6 avisos preexistentes `react-refresh/only-export-components`.
- `bun run build`: aprovado; Vite gerou os ambientes cliente e SSR e Nitro gerou o preset `node-server`.
- Servidor de produção `node .output/server/index.mjs`: página inicial respondeu HTTP 200.
- Navegador no servidor de produção: adicionar produto, abrir sacola, confirmar pedido e limpar o contador funcionaram.
- Layout: sem rolagem horizontal em 1440×900, 1366×768, 768×1024, 390×844 e 360×800; o diálogo da sacola ficou dentro da viewport em 360×800.
- Imagens naquele estado: **pendente**; os binários não estavam presentes. O sucesso do build não validava o carregamento visual dos arquivos.
- Requisições de imagem no navegador: naquela execução, os nove caminhos `/__l5e/...` retornaram 404 e geraram erros de carregamento no console.

## Testes automatizados anteriores à integração com a API

`bunx vitest run src/test/cart.test.ts src/test/app-routing.test.tsx`: **15 testes aprovados** (14 regras + 1 correspondência da página inicial). Este resultado é histórico e antecede a substituição do catálogo estático pela API.

Cobertura: catálogo completo com oito identificadores únicos, preços inteiros não negativos, categorias e destaques centralizados; adição repetida; incremento; decremento; remoção; remoção na última unidade; validação de quantidades; total vazio; rejeição de pedido vazio; confirmação com cópia independente e carrinho limpo; nova compra; filtros sem alteração do carrinho; identificador inválido.

Exemplo da especificação validado: 2 × R$ 25,00 + R$ 8,00 + 2 × R$ 12,00 = **R$ 82,00**, com subtotais de R$ 50,00, R$ 8,00 e R$ 24,00. Os nomes de produtos ligados à franquia foram substituídos por nomes originais, mantendo os valores do exemplo.

## Fluxos reais no navegador

| Cenários | Resultado observado                                                                                                                                                                                               |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T01–T02  | Registro histórico: página inicial abriu e exibiu oito produtos. A afirmação histórica de que não havia imagens quebradas não se aplica à auditoria atual, que encontrou somente referências sem binários locais. |
| T03–T04  | Bebidas mostrou dois produtos; Todos restaurou oito.                                                                                                                                                              |
| T05–T06  | Adição repetida reuniu unidades na mesma linha; contador chegou a cinco.                                                                                                                                          |
| T07–T08  | Incremento da Poção Azul mudou total de R$ 82,00 para R$ 90,00; redução restaurou R$ 82,00.                                                                                                                       |
| T09–T10  | Três produtos apareceram no carrinho; remoção completa funcionou.                                                                                                                                                 |
| T11–T12  | Subtotais e total de R$ 82,00 conferidos no diálogo e na confirmação.                                                                                                                                             |
| T13–T14  | Remoção do último produto mostrou estado vazio e total zero; não havia botão de confirmação disponível.                                                                                                           |
| T15–T17  | Confirmação exibiu sucesso, quantidades, subtotais e total preservados; retorno fechou o diálogo.                                                                                                                 |
| T18      | Feedback de adição, remoção e atualização implementado e exibido durante as ações.                                                                                                                                |
| T19–T20  | Validação em 1440×900, 1366×768, 768×1024, 390×844 e 360×800: sem rolagem horizontal; botão introdutório visível; modal preenchido dentro da tela e confirmação funcional.                                        |
| T21      | Doze passos de Tab por tamanho mantiveram foco dentro do diálogo.                                                                                                                                                 |
| T22      | Filtragem para bebidas manteve cinco unidades no carrinho.                                                                                                                                                        |
| T23–T24  | Fechar e reabrir preservou R$ 82,00; Escape fechou e restaurou foco no botão da sacola. Fechamento pelo botão e pela área externa também validado.                                                                |
| T25      | Confirmação zerou o contador; nova compra e remoção funcionaram.                                                                                                                                                  |

Na execução histórica não foi capturado erro de execução no fluxo então testado. As observações acima não representam a validação da integração com PostgreSQL documentada a seguir.

## Arquivos e decisões

- `src/data/products.ts`: filtros e formatação monetária; os dados de execução agora vêm da API.
- `src/lib/api/`: cliente HTTP, tipos e funções de acesso a categorias, produtos e pedidos.
- `src/lib/cart.ts`: estado, validação, cálculos e operações do carrinho.
- `src/components/products/product-card.tsx`: cartões reutilizáveis e alternativa para falha de imagem.
- `src/components/cart/cart-content.tsx`: carrinho e resumo confirmado.
- `src/routes/index.tsx`: experiência principal e metadados próprios.
- `src/routes/__root.tsx`: fontes, idioma e identificação do aplicativo.
- `src/styles.css`: identidade visual e adaptação às telas.
- `src/components/ui/button.tsx` e `dialog.tsx`: variantes e diálogo acessível.
- `public/images/`: seis recortes locais usados pelos pratos do catálogo.
- `src/assets/*.asset.json`: metadados legados do protótipo, não usados pelo catálogo atual.
- `src/test/cart.test.ts`: regras automatizadas.
- `AGENTS.md` e `roadmap.md`: decisões e escopo de trabalho.

## Limitações

- O carrinho permanece em memória; recarregar a página reinicia a sacola.
- O pedido é persistido, mas é apenas demonstrativo: não há pagamento, envio à cozinha, entrega ou cadastro.
- Seis pratos têm imagens locais em `public/images/`; as duas bebidas sem imagem própria usam o fallback.
- Os fluxos abaixo foram validados em Chromium; leitores de tela, outros navegadores e aparelhos físicos não foram testados.
- Os testes detalhados de teclado e nos demais tamanhos listados acima pertencem à validação histórica.

## Validação da integração com o backend

Data: **26/11/2026**. Ambiente local: Node.js 24, Bun 1.4.5, PostgreSQL 18 isolado em `127.0.0.1:55432`, Vitest 4.1.12 e Chromium. O banco utilizado foi `cardapio_test`, separado de qualquer banco de desenvolvimento.

### Comandos e resultados

| Componente         | Comando                                                                                        | Resultado                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Frontend           | `npm run typecheck`                                                                            | Aprovado                                                                                        |
| Frontend           | `npm test`                                                                                     | **17 testes aprovados** em 3 arquivos                                                           |
| Frontend           | `npm run build`                                                                                | Aprovado; build cliente, SSR e Nitro `node-server` concluídos                                   |
| Frontend e backend | `npm run lint`                                                                                 | **0 erros**; 6 avisos preexistentes `react-refresh/only-export-components` em componentes de UI |
| Backend            | `npm run typecheck`                                                                            | Aprovado para código e testes                                                                   |
| Backend            | `npm run test`                                                                                 | **15 testes unitários aprovados** em 2 arquivos                                                 |
| Backend            | `DATABASE_URL_TEST=postgres://postgres@127.0.0.1:55432/cardapio_test bun run test:integration` | **8 testes de integração aprovados** em 1 arquivo                                               |
| Backend            | `npm run build`                                                                                | Aprovado; compilação TypeScript para `dist/` concluída                                          |

O total de testes automatizados nesta execução foi **40 aprovados e 0 reprovados**. O banco de integração exige `DATABASE_URL_TEST` e valida que o nome termine em `_test`; não utiliza `DATABASE_URL` como fallback.

### Verificações HTTP e no navegador

- `GET /api/health`: HTTP 200 com o status `ok`.
- `GET /api/products`: 8 produtos carregados do PostgreSQL.
- CORS: a origem `http://127.0.0.1:3000` foi aceita pelo backend.
- Fluxo Chromium: adicionados 2 Hambúrgueres da Floresta, 1 Poção Azul e 2 porções de Batatas da Montanha. O carrinho mostrou subtotais de R$ 50,00, R$ 8,00 e R$ 24,00 e total de **R$ 82,00**.
- Confirmação: a API retornou o identificador do pedido, os snapshots e o total; a interface mostrou os mesmos dados e zerou o contador. A consulta ao banco isolado confirmou um pedido de 8200 centavos com três itens.
- Falha e nova tentativa: com a API parada, a interface mostrou erro de conexão e manteve uma Poção Azul no carrinho. Após reiniciar a API, a nova tentativa persistiu o pedido de R$ 8,00 e então zerou o contador.
- Responsividade no navegador: em 390×844 e 360×800 não houve rolagem horizontal; em 360×800, o diálogo vazio ficou dentro da viewport (332×481 px).
- Imagens naquela execução: os produtos vieram com `imageUrl: null` e os placeholders foram exibidos sem dependência de rotas Lovable. Nenhum binário de imagem foi recuperado ou criado naquele estado.
- A mensagem `ERR_CONNECTION_REFUSED` observada no navegador ocorreu durante o teste intencional de indisponibilidade da API; o erro visível ao usuário foi compreensível e o carrinho foi preservado.

### Cobertura comprovada

Os testes de backend exercitam categorias, catálogo, filtros combinados, consulta individual, seed idempotente, cálculo financeiro no servidor, rejeição de entradas inválidas e campos financeiros, produtos ausentes/inativos, snapshots históricos e rollback transacional. Os testes frontend cobrem o cliente HTTP, o estado/cálculos do carrinho, os limites de quantidade e a conversão para o corpo da API.

## Validação após a integração das imagens

Seis recortes individuais fornecidos na pasta `Assets/` foram copiados para `public/images/` e associados aos seis pratos do catálogo. As duas bebidas foram mantidas e continuam usando o fallback; a imagem composta não é necessária.

### Comandos e resultados

| Componente         | Comando                           | Resultado                                                                                   |
| ------------------ | --------------------------------- | ------------------------------------------------------------------------------------------- |
| Frontend           | `npm run test`                    | **17 testes aprovados** em 3 arquivos                                                       |
| Frontend           | `npm run typecheck`               | Aprovado                                                                                    |
| Frontend           | `npm run build`                   | Aprovado; build cliente, SSR e Nitro `node-server` concluídos                               |
| Frontend e backend | `npm run lint`                    | **0 erros**; 6 avisos preexistentes `react-refresh/only-export-components`                  |
| Backend            | `npm run typecheck`               | Aprovado para código e testes                                                               |
| Backend            | `npm run test`                    | **15 testes unitários aprovados** em 2 arquivos                                             |
| Backend            | `npm run test:integration`        | **8 testes de integração aprovados** com PostgreSQL isolado (`cardapio_test`)               |
| Backend            | `npm run build`                   | Aprovado; compilação TypeScript concluída                                                   |

Total: **40 testes aprovados e 0 reprovados**. O seed foi reexecutado sobre os registros anteriores, atualizando nomes e slugs pelos IDs estáveis e mantendo quatro categorias e oito produtos.

### Verificações HTTP e no navegador

- `GET /api/products` retornou oito produtos; seis têm URLs locais de imagem e as duas bebidas mantêm `imageUrl: null`.
- As seis URLs em `/images/` responderam HTTP 200 com `Content-Type: image/jpeg`.
- No build de produção aberto em Chromium, as seis imagens apareceram com `naturalWidth` maior que zero e os cartões exibiram nomes, descrições e categorias atualizados.
- A categoria antiga de hambúrgueres foi substituída por “Pratos principais”; acompanhamentos, bebidas e sobremesas continuam disponíveis.
- O seed preservou os IDs dos produtos e das categorias, atualizando os registros existentes em vez de criar duplicatas.
