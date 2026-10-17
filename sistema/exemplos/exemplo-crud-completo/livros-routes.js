// ============================================================
// exemplos/exemplo-crud-completo/livros-routes.js  (ROTAS)
// ============================================================
// Só para consulta - não importe este arquivo no sistema da oficina.
// No sistema, um arquivo como este ficaria em src/routes/.
//
// Repare que a rota "/api/livros/categorias" vem ANTES de
// "/api/livros/:id" - senão o Express acharia que "categorias"
// é um :id.
// ============================================================

const express = require("express");
const { LivroController } = require("./LivroController");

const roteadorLivros = express.Router();

roteadorLivros.get("/api/livros", new LivroController().listar)
roteadorLivros.get("/api/livros/categorias", new LivroController().listarCategorias)
roteadorLivros.post("/api/livros", new LivroController().criar)
roteadorLivros.put("/api/livros/:id", new LivroController().editar)
roteadorLivros.delete("/api/livros/:id", new LivroController().excluir)

module.exports = {
    roteadorLivros
}
