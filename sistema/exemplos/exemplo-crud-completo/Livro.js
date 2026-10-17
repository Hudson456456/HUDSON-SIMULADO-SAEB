// ============================================================
// exemplos/exemplo-crud-completo/Livro.js  (MODEL)
// ============================================================
// Só para consulta - não importe este arquivo no sistema da oficina.
// No sistema, um arquivo como este ficaria em src/models/.
//
// O model só conversa com o banco. Repare nos três métodos da
// conexão:
//   all -> devolve uma LISTA de registros (SELECT)
//   get -> devolve UM registro (SELECT ... WHERE id = ?)
//   run -> INSERT / UPDATE / DELETE, devolve { lastID, changes }
// ============================================================

const { conectarComBancoDeDados } = require("../../src/db/conexao");

class LivroModel {
    // Lista os livros com o nome da categoria (JOIN). Se termoBusca
    // vier preenchido, filtra pelo título.
    async buscarTodos(termoBusca) {
        const conexaoComBanco = await conectarComBancoDeDados();

        if (termoBusca) {
            // "%" antes e depois do termo encontra a palavra em
            // qualquer parte do título. O "?" evita SQL Injection
            // (nunca concatene o texto digitado direto no SQL).
            const livros = await conexaoComBanco.all(`
                SELECT
                    l.id,
                    l.titulo,
                    l.autor,
                    l.categoria_id,
                    c.nome AS categoria
                FROM livros l
                INNER JOIN categorias c ON l.categoria_id = c.id
                WHERE l.titulo LIKE '%' || ? || '%'
                ORDER BY l.titulo
            `, [termoBusca]);

            return livros;
        }

        const livros = await conexaoComBanco.all(`
            SELECT
                l.id,
                l.titulo,
                l.autor,
                l.categoria_id,
                c.nome AS categoria
            FROM livros l
            INNER JOIN categorias c ON l.categoria_id = c.id
            ORDER BY l.titulo
        `);

        return livros;
    }

    async buscarCategorias() {
        const conexaoComBanco = await conectarComBancoDeDados();

        const categorias = await conexaoComBanco.all("SELECT * FROM categorias ORDER BY nome");

        return categorias;
    }

    async criar(titulo, autor, categoria_id) {
        const conexaoComBanco = await conectarComBancoDeDados();

        const resultado = await conexaoComBanco.run(
            "INSERT INTO livros (titulo, autor, categoria_id) VALUES (?, ?, ?)",
            [titulo, autor, categoria_id]
        );

        return resultado.lastID;
    }

    // Bem parecido com o INSERT, só muda para UPDATE ... SET ... WHERE
    async editar(id, titulo, autor, categoria_id) {
        const conexaoComBanco = await conectarComBancoDeDados();

        const resultado = await conexaoComBanco.run(
            "UPDATE livros SET titulo = ?, autor = ?, categoria_id = ? WHERE id = ?",
            [titulo, autor, categoria_id, id]
        );

        return resultado.changes;
    }

    async excluir(id) {
        const conexaoComBanco = await conectarComBancoDeDados();

        const resultado = await conexaoComBanco.run(
            "DELETE FROM livros WHERE id = ?",
            [id]
        );

        return resultado.changes;
    }
}

module.exports = {
    LivroModel
}
