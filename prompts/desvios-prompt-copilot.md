# Desvios e decisões da integração

- A implementação foi integrada na raiz do repositório principal; não foi criada uma subpasta `pixel-perfect-replica`.
- O wrapper `@lovable.dev/vite-tanstack-config` foi substituído por plugins oficiais de Vite, TanStack Start, React, Tailwind CSS e Nitro. A execução não depende de credenciais, telemetria ou ambiente Lovable.
- O servidor usa o preset `node-server` do Nitro e preserva os middlewares de erro e CSRF.
- Dependências diretas comprovadamente não usadas pelo código da aplicação foram removidas; `bun.lock` permanece como lockfile e foi verificado com instalação congelada.
- Os nove arquivos `.asset.json` contêm apenas metadados e rotas `/__l5e/...`; os binários de imagem não foram encontrados. Não foram inventadas URLs nem usados arquivos não relacionados para preencher essa lacuna.
- O arquivo `Assets/TOTK food.webp` não faz parte dos recursos originais identificados e não foi usado ou alterado.
- A documentação de testes distingue os resultados históricos no navegador das verificações automatizadas executadas nesta auditoria.