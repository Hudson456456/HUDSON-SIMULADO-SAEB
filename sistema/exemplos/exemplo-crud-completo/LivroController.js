// ============================================================
// exemplos/exemplo-crud-completo/LivroController.js  (CONTROLLER)
// ============================================================
// Só para consulta - não importe este arquivo no sistema da oficina.
// No sistema, um arquivo como este ficaria em src/controllers/.
//
// O controller recebe a requisição (req), valida os dados, chama
// o model e devolve a resposta (res) com o status certo:
//   200 OK | 201 criado | 400 dados inválidos | 404 não encontrado
//   500 erro no servidor
// ============================================================

const { LivroModel } = require("./Livro");

class LivroController {
    // GET /api/livros  ou  GET /api/livros?busca=termo
    async listar(req, res) {
        try {
            const termoBusca = req.query.busca;

            const livros = await new LivroModel().buscarTodos(termoBusca);

            return res.status(200).json(livros);
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    // GET /api/livros/categorias -> para popular o <select>
    async listarCategorias(req, res) {
        try {
            const categorias = await new LivroModel().buscarCategorias();

            return res.status(200).json(categorias);
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    // POST /api/livros
    async criar(req, res) {
        try {
            const { titulo, autor, categoria_id } = req.body;

            if (!titulo || !categoria_id) {
                return res.status(400).json({ erro: "Título e categoria são obrigatórios." });
            }

            const id = await new LivroModel().criar(titulo, autor, categoria_id);

            return res.status(201).json({ id, titulo, autor, categoria_id });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    // PUT /api/livros/:id
    async editar(req, res) {
        try {
            const { id } = req.params;
            const { titulo, autor, categoria_id } = req.body;

            if (!titulo || !categoria_id) {
                return res.status(400).json({ erro: "Título e categoria são obrigatórios." });
            }

            const linhasAlteradas = await new LivroModel().editar(id, titulo, autor, categoria_id);

            if (linhasAlteradas === 0) {
                return res.status(404).json({ erro: "Livro não encontrado." });
            }

            return res.status(200).json({ mensagem: "Livro atualizado com sucesso." });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    // DELETE /api/livros/:id
    async excluir(req, res) {
        try {
            const { id } = req.params;

            const linhasRemovidas = await new LivroModel().excluir(id);

            if (linhasRemovidas === 0) {
                return res.status(404).json({ erro: "Livro não encontrado." });
            }

            return res.status(200).json({ mensagem: "Livro removido com sucesso." });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }
}

module.exports = {
    LivroController
}
