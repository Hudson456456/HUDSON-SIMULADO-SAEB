# Guia de Desenvolvimento - Simulado

O sistema segue o padrão **rota → controller → model**:

- **routes/** (prontos): dizem qual método do controller atende cada
  URL. Já passam pelo middleware `verificarSessao`.
- **controllers/**: recebem `req`, validam os dados, criptografam o
  CPF, chamam o model e respondem com `res.status(...).json(...)`.
- **models/**: só o SQL, usando a conexão de `src/db/conexao.js`
  (`all`, `get`, `run`, com `?` no lugar dos valores).
- **public/js/**: o front-end, que chama a API com `fetch`.

Exemplo completo desse caminho inteiro (rota, controller, model,
tela): `exemplos/exemplo-crud-completo/`.

Ordem recomendada:

1. Funcionalidade Principal (nome do usuário + logout)
2. Cliente (listar → inserir → excluir → editar → buscar)
3. Veículo (inserir)
4. Ordem de Serviço (listar com join → atualizar data)

## Funcionalidade Principal

- Nome do usuário: `public/js/principal.js` já busca
  `/api/auth/sessao` - falta usar o resultado para preencher
  `#nome-usuario`. Veja `exemplos/exemplo-exibir-dados-sessao.js`.
- Logout: implemente o método `sair()` em
  `src/controllers/AuthController.js` (veja
  `exemplos/exemplo-logout.js`) e chame a rota
  `POST /api/auth/logout` a partir do botão `#btn-sair`.

## Cliente

`src/models/Cliente.js`, `src/controllers/ClienteController.js` e
`public/js/clientes.js`.

- Listar (`GET /api/clientes`): não esqueça de descriptografar o CPF
  antes de responder.
- Inserir (`POST /api/clientes`): criptografe o CPF antes de salvar.
- Editar (`PUT /api/clientes/:id`): mesma lógica do inserir, mas com
  UPDATE.
- Excluir (`DELETE /api/clientes/:id`): direto. Cliente com veículo
  cadastrado não pode ser excluído (chave estrangeira).
- Busca: pode ser filtrando no JavaScript (lista já carregada) ou com
  `LIKE` no banco (`?busca=termo` na URL, lido em `req.query.busca`).
  A busca é pelo **nome** - o CPF está criptografado no banco, então
  um `LIKE` nele não funciona.

## Veículo

`src/models/Veiculo.js`, `src/controllers/VeiculoController.js` e
`public/js/veiculos.js`.

- Inserir (`POST /api/veiculos`): sempre vinculado a um `cliente_id`.
- O `<select>` de clientes da tela usa `GET /api/clientes` - ele só
  funciona depois que a listagem de clientes estiver pronta.

## Ordem de Serviço

`src/models/OrdemServico.js`,
`src/controllers/OrdemServicoController.js` e `public/js/ordens.js`.

- Listar (`GET /api/ordens`): JOIN `ordens_servico -> veiculos ->
  clientes`, `ORDER BY data_abertura`. Veja
  `exemplos/exemplo-join-multiplas-tabelas.sql`.
- Atualizar data (`PUT /api/ordens/:id`): veja o `editar()` de
  `exemplos/exemplo-crud-completo/Livro.js`.
- A data é guardada como texto no formato `AAAA-MM-DD` - o mesmo
  formato que o `<input type="date">` usa, então dá para passar o
  valor direto.

## Pontos de atenção

- Todas as rotas (exceto login e sessão) já passam pelo middleware
  `verificarSessao` - não precisa mexer nisso.
- CPF: sempre criptografar antes de salvar, descriptografar antes de
  exibir (`src/utils/criptografia.js`).
- Rode o servidor com `npm run rodar` (nodemon): ele reinicia sozinho
  a cada arquivo salvo. Como a sessão fica na memória do servidor,
  cada reinício desloga todo mundo - depois de salvar um arquivo do
  back-end, faça login de novo.
- Testar a API sem a tela: dá para usar Postman/Insomnia/Thunder
  Client, mas como as rotas exigem sessão, faça primeiro o
  `POST /api/auth/login` na mesma ferramenta (ela guarda o cookie).
