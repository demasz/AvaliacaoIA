# Backend, runtime e implantação

## Escopo do MVP

O cardápio não possui backend de negócio, banco de dados, autenticação, pagamentos ou integração com entrega. Catálogo, carrinho e confirmação demonstrativa são locais; recarregar a página reinicia o carrinho.

## Runtime do servidor

- TanStack Start fornece roteamento e renderização no servidor.
- `src/start.ts` registra o middleware de erros e a proteção CSRF para server functions.
- `src/server.ts` normaliza respostas de erro SSR e exporta o handler usado pelo build.
- Vite usa os plugins oficiais do Tailwind CSS, TanStack Start, React e Nitro.
- Nitro está configurado com preset `node-server`; o build da aplicação é gerado em `.output/`.

O uso do Lovable foi apenas parte da prototipação. Não há integração operacional, telemetria nem credenciais Lovable necessárias para instalar, desenvolver ou compilar.

## Variáveis e recursos externos

Não há configuração de variáveis de ambiente necessária para o fluxo local do MVP.

As nove referências de imagem em `src/assets/*.asset.json` contêm metadados e caminhos `/__l5e/...`, não os arquivos de imagem. Esses caminhos dependiam do proxy do ambiente Lovable, removido nesta integração. A aplicação compila, mas a portabilidade visual só estará concluída quando os binários originais, com autorização de uso, forem adicionados localmente ou substituídos por recursos autorizados.

## Fora do escopo atual

- Persistência de pedidos ou catálogo.
- API de negócio e painel administrativo.
- Autenticação, pagamentos ou dados pessoais.
- Hospedagem e domínio de produção.