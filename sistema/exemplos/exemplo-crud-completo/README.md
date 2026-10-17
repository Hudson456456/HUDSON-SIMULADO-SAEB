# Exemplo completo - Sistema de Biblioteca (LIVROS)

Este é um exemplo completo (back-end + front-end), num cenário
DIFERENTE do sistema de vocês (uma biblioteca, com livros e
categorias, em vez de oficina mecânica). A ideia é que vocês possam
ler, entender o padrão, e depois adaptar o raciocínio para as
entidades do sistema de vocês (Cliente, Veículo, Ordem de Serviço).

O código segue o mesmo padrão do sistema da oficina:
**rota → controller → model**, com classes, `require`/`module.exports`
e SQLite.

## Cenário

- Uma `categoria` tem: id, nome (ex: "Ficção", "Técnico")
- Um `livro` tem: id, titulo, autor, categoria_id (associado a uma categoria)

Ou seja, a relação `livro -> categoria` é exatamente do mesmo tipo
que `veiculo -> cliente` ou `ordem de serviço -> veiculo` no sistema
de vocês: uma tabela que referencia outra através de uma chave
estrangeira.

## O que cada arquivo mostra

| Arquivo | Camada | No sistema ficaria em |
|---|---|---|
| `livros-routes.js` | Rotas (URL + método HTTP → controller) | `src/routes/` |
| `LivroController.js` | Validação, status HTTP e resposta JSON | `src/controllers/` |
| `Livro.js` | SQL: SELECT com busca (`LIKE`) e JOIN, INSERT, UPDATE, DELETE | `src/models/` |
| `livros.html` | Tela com busca + formulário + tabela | `public/` |
| `livros.js` | Front-end: buscar, listar, editar (preencher formulário), excluir | `public/js/` |
| `schema-exemplo.sql` | Tabelas do exemplo | `oficina_db.sql` |

Pontos que mais se parecem com o que falta no sistema da oficina:

- `buscarTodos()` em `Livro.js`: busca com `LIKE` + JOIN.
- `editar()` em `Livro.js` e `LivroController.js`: o UPDATE e o 404
  quando nenhuma linha foi alterada.
- `livros.js`: o fluxo inteiro do front-end.

## Como usar este exemplo

Você **não precisa rodar** este exemplo - ele é só para
consulta/leitura (as tabelas `livros` e `categorias` não existem no
banco da oficina). O importante é ler o código, entender o padrão, e
aplicar o mesmo raciocínio nos arquivos de `src/controllers/`,
`src/models/` e `public/js/`, trocando os nomes das tabelas/campos
pelos do sistema de vocês.
