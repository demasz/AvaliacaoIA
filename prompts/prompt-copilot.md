# TAREFA: Unificação do projeto Cardápio Digital

Atue como um desenvolvedor sênior responsável por integrar dois projetos em um único repositório, preservando a implementação funcional, a organização dos arquivos e a documentação existente.

## 1. Diretórios envolvidos

**PROJETO DE ORIGEM — código gerado pelo Lovable:**
```text
C:\Users\guilherme62395006\Documents\Frontend-cardapio\pixel-perfect-replica
```

**PROJETO DE DESTINO — repositório principal:**
```text
C:\Users\guilherme62395006\Documents\AvaliacaoIA
```

O objetivo é transferir e integrar a implementação do Lovable ao projeto `AvaliacaoIA`, deixando este último como a estrutura principal e independente do projeto.

A aplicação deve funcionar diretamente na raiz do diretório de destino, sem precisar executar o frontend dentro de uma subpasta.

## 2. Etapa inicial: análise obrigatória

Antes de modificar qualquer arquivo:

1. Analise toda a estrutura do projeto de origem.
2. Identifique a arquitetura, tecnologias, dependências, componentes, páginas, estilos, dados e testes existentes.
3. Analise a estrutura atual do projeto de destino.
4. Identifique arquivos já existentes nos dois projetos.
5. Verifique possíveis conflitos entre configurações e dependências.
6. Identifique os documentos e prompts que já pertencem ao destino.

O projeto do Lovable utiliza uma estrutura baseada em React e TypeScript, com ferramentas como Vite, Tailwind CSS e Vitest. Entretanto, confirme as versões e configurações diretamente nos arquivos antes de realizar a integração.

Não assuma que os dois projetos possuem a mesma estrutura.

## 3. Integração dos arquivos

Integre a implementação do projeto de origem à raiz do projeto de destino.

Priorize a preservação dos seguintes elementos do Lovable, caso estejam presentes:

- `src/`
- `public/`
- `package.json`
- Arquivos de configuração do TypeScript.
- Configurações do Vite.
- Configurações do Tailwind.
- Configurações do ESLint e Prettier.
- Configurações e arquivos de testes.
- Componentes, páginas, rotas, estilos e dados.
- Dependências necessárias à execução da aplicação.

A integração deve preservar a organização original do frontend sempre que possível.

**Importante:** Não crie uma pasta `pixel-perfect-replica` dentro de `AvaliacaoIA`. Os arquivos da aplicação devem ficar organizados diretamente na raiz do destino.

## 4. Preservação do destino

O diretório `AvaliacaoIA` é o projeto principal e pode conter documentos e arquivos desenvolvidos anteriormente.

Preserve integralmente os seguintes materiais, caso existam:

- `README.md` personalizado.
- `docs/`
- `prompts/`
- `docs/spec.md` e documentos de especificação.
- Registros de testes.
- Outros arquivos de planejamento e documentação.

Não substitua documentos personalizados por versões genéricas do projeto do Lovable.

Se houver arquivos com o mesmo nome, analise o conteúdo dos dois antes de decidir como integrá-los.

Quando necessário, combine as informações relevantes, sem apagar conteúdo útil.

## 5. Cuidados com Git e arquivos locais

Esta integração deve manter o repositório Git do destino.

**Nunca copie ou substitua:**

- A pasta `.git/` do projeto de origem.
- A pasta `.git/` do projeto de destino.
- `node_modules/`.
- Arquivos de cache.
- Credenciais, tokens ou arquivos `.env` com informações sensíveis.

Preserve o histórico e a configuração Git do diretório `AvaliacaoIA`.

Analise o `.gitignore` dos dois projetos e consolide as regras necessárias, sem remover proteções existentes.

Não execute `git init`, não altere o repositório remoto, não crie commits e não execute `git push`.

## 6. Dependências e configurações

Analise cuidadosamente os arquivos `package.json` dos dois projetos.

O objetivo é garantir que o destino possua todas as dependências necessárias para executar a aplicação integrada.

- Preserve dependências necessárias ao frontend.
- Preserve scripts já úteis no projeto de destino.
- Incorpore scripts necessários do projeto de origem.
- Evite dependências duplicadas ou incompatíveis.
- Não atualize versões sem necessidade.
- Identifique qual gerenciador de pacotes deve ser utilizado.
- Preserve o arquivo de lock correspondente ao gerenciador escolhido.
- Ajuste caminhos e referências que deixem de funcionar após a integração.

Não substitua um `package.json` existente sem antes avaliar seu conteúdo.

## 7. Validação da aplicação

Após a integração, execute as verificações disponíveis no projeto.

Priorize:

1. Instalação ou verificação das dependências.
2. Testes automatizados.
3. Verificação de tipos TypeScript, caso configurada.
4. ESLint.
5. Build de produção.

Corrija problemas introduzidos pela integração.

Não modifique funcionalidades apenas para fazer os testes passarem. Investigue a causa dos erros e preserve o comportamento esperado.

Verifique também se os caminhos de imagens, fontes, estilos e demais recursos continuam funcionando.

## 8. Critérios de conclusão

A integração será considerada concluída quando:

- O frontend estiver na raiz de `AvaliacaoIA`.
- A estrutura original da aplicação estiver preservada.
- Os documentos e prompts do destino continuarem intactos.
- As dependências estiverem corretamente configuradas.
- Os caminhos e imports estiverem funcionando.
- Os testes existentes tiverem sido executados.
- O projeto conseguir gerar o build, ou apresentar claramente os problemas que impedem isso.
- O destino continuar sendo um repositório Git independente, com seu próprio histórico.

## 9. Relatório final obrigatório

Ao terminar, apresente um relatório com:

**Arquivos integrados:** principais pastas e arquivos transferidos.

**Arquivos preservados:** documentos e configurações do destino que foram mantidos.

**Arquivos modificados:** arquivos que precisaram ser combinados ou ajustados.

**Conflitos resolvidos:** explique brevemente as decisões tomadas.

**Validação:** apresente os resultados reais dos testes, lint, TypeScript e build. Não marque verificações como aprovadas se não foram executadas.

**Pendências:** informe qualquer problema que ainda dependa de intervenção manual.

**Comandos para execução:** informe os comandos corretos para instalar as dependências e iniciar a aplicação.

## Orientação final

Trate `pixel-perfect-replica` como a fonte da implementação visual e funcional do Cardápio Digital, e `AvaliacaoIA` como o repositório definitivo.

Não faça uma simples cópia indiscriminada. Realize uma integração consciente, preservando o trabalho existente nos dois projetos.

Antes de qualquer operação destrutiva ou substituição irreversível, interrompa e informe o conflito encontrado.