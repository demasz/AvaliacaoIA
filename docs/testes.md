# Validação do cardápio digital

Data: 26/11/2026. Ambiente: aplicação local em Chromium e Vitest.

## Testes automatizados

`bunx vitest run src/test/cart.test.ts src/test/app-routing.test.tsx`: **15 testes aprovados** (14 regras + 1 correspondência da página inicial).

Cobertura: catálogo completo com oito identificadores únicos, preços inteiros não negativos, categorias e destaques centralizados; adição repetida; incremento; decremento; remoção; remoção na última unidade; validação de quantidades; total vazio; rejeição de pedido vazio; confirmação com cópia independente e carrinho limpo; nova compra; filtros sem alteração do carrinho; identificador inválido.

Exemplo da especificação validado: 2 × R$ 25,00 + R$ 8,00 + 2 × R$ 12,00 = **R$ 82,00**, com subtotais de R$ 50,00, R$ 8,00 e R$ 24,00. Os nomes de produtos ligados à franquia foram substituídos por nomes originais, mantendo os valores do exemplo.

## Fluxos reais no navegador

| Cenários | Resultado observado |
|---|---|
| T01–T02 | Página inicial abriu, oito produtos completos no catálogo e nenhuma imagem quebrada. |
| T03–T04 | Bebidas mostrou dois produtos; Todos restaurou oito. |
| T05–T06 | Adição repetida reuniu unidades na mesma linha; contador chegou a cinco. |
| T07–T08 | Incremento da Poção Azul mudou total de R$ 82,00 para R$ 90,00; redução restaurou R$ 82,00. |
| T09–T10 | Três produtos apareceram no carrinho; remoção completa funcionou. |
| T11–T12 | Subtotais e total de R$ 82,00 conferidos no diálogo e na confirmação. |
| T13–T14 | Remoção do último produto mostrou estado vazio e total zero; não havia botão de confirmação disponível. |
| T15–T17 | Confirmação exibiu sucesso, quantidades, subtotais e total preservados; retorno fechou o diálogo. |
| T18 | Feedback de adição, remoção e atualização implementado e exibido durante as ações. |
| T19–T20 | Validação em 1440×900, 1366×768, 768×1024, 390×844 e 360×800: sem rolagem horizontal; botão introdutório visível; modal preenchido dentro da tela e confirmação funcional. |
| T21 | Doze passos de Tab por tamanho mantiveram foco dentro do diálogo. |
| T22 | Filtragem para bebidas manteve cinco unidades no carrinho. |
| T23–T24 | Fechar e reabrir preservou R$ 82,00; Escape fechou e restaurou foco no botão da sacola. Fechamento pelo botão e pela área externa também validado. |
| T25 | Confirmação zerou o contador; nova compra e remoção funcionaram. |

Nenhum erro de execução capturado no fluxo completo. Compilação automática final sem erros.

## Arquivos e decisões

- `src/data/products.ts`: catálogo, categorias e formatação monetária.
- `src/lib/cart.ts`: estado, validação, cálculos e operações do carrinho.
- `src/components/products/product-card.tsx`: cartões reutilizáveis e alternativa para falha de imagem.
- `src/components/cart/cart-content.tsx`: carrinho e resumo confirmado.
- `src/routes/index.tsx`: experiência principal e metadados próprios.
- `src/routes/__root.tsx`: fontes, idioma e identificação do aplicativo.
- `src/styles.css`: identidade visual e adaptação às telas.
- `src/components/ui/button.tsx` e `dialog.tsx`: variantes e diálogo acessível.
- `src/assets/*.asset.json`: referências das nove imagens originais.
- `src/test/cart.test.ts`: regras automatizadas.
- `AGENTS.md` e `roadmap.md`: decisões e escopo de trabalho.

## Limitações

- Dados em memória: recarregar a página reinicia a sacola. Esta decisão atende ao MVP sem persistência obrigatória.
- Confirmação exclusivamente local e demonstrativa: sem pagamento, envio à cozinha, entrega ou cadastro.
- Categorias vazias e falha de imagem têm tratamento; filtro desconhecido foi testado na lógica, mas as quatro categorias públicas possuem produtos.
- Validação feita em Chromium; leitores de tela, outros navegadores e aparelhos físicos não foram testados.
- As imagens usam distribuição de arquivos do projeto; as fontes são carregadas pelo Google Fonts.