-- ============================================================
-- exemplos/exemplo-join-multiplas-tabelas.sql
-- ============================================================
-- Só para consulta. Não usa as tabelas da oficina - mostra o
-- padrão de um JOIN com mais de uma tabela.
--
-- Cenário do exemplo: uma escola com ALUNOS matriculados em
-- TURMAS, e cada TURMA pertence a um PROFESSOR.
--
--   alunos.turma_id      -> turmas.id
--   turmas.professor_id  -> professores.id
--
-- Ou seja, para trazer, numa mesma listagem, o nome do aluno,
-- o nome da turma E o nome do professor, é preciso "atravessar"
-- duas tabelas a partir de alunos.
-- ============================================================

-- Estrutura de exemplo (SQLite - não precisa criar isso no banco
-- de verdade, é só ilustrativo):
--
-- CREATE TABLE professores (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT);
-- CREATE TABLE turmas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, professor_id INTEGER, FOREIGN KEY (professor_id) REFERENCES professores(id));
-- CREATE TABLE alunos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, turma_id INTEGER, FOREIGN KEY (turma_id) REFERENCES turmas(id));

-- ------------------------------------------------------------
-- O JOIN em si: repare que cada INNER JOIN "soma" mais uma
-- tabela, e cada um usa um apelido curto (a, t, p) para facilitar
-- a leitura e evitar repetir o nome completo da tabela toda hora.
--
-- Quando duas tabelas têm colunas com o mesmo nome (ex: "nome"),
-- use AS para dar nomes diferentes no resultado - senão uma
-- coluna "apaga" a outra no objeto que chega no JavaScript.
-- ------------------------------------------------------------
SELECT
    a.id,
    a.nome        AS nome_aluno,
    t.nome        AS nome_turma,
    p.nome        AS nome_professor
FROM alunos a
INNER JOIN turmas t       ON a.turma_id = t.id
INNER JOIN professores p  ON t.professor_id = p.id
ORDER BY a.nome;

-- ------------------------------------------------------------
-- Como isso se aplica ao sistema de vocês: pensem em qual
-- tabela precisa "passar por outra" para chegar ao dado que
-- falta. No exemplo acima, alunos -> turmas -> professores.
-- Na oficina, a ordem de serviço só conhece o veículo, e é o
-- veículo que conhece o cliente.
-- ------------------------------------------------------------
