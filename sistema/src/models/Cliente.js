// ============================================================
// src/models/Cliente.js
// ============================================================
// ESTE ARQUIVO É COM VOCÊS (ALUNO DESENVOLVE).
//
// O model só conversa com o banco (SQL). Validação, criptografia
// do CPF e resposta para o front-end ficam no ClienteController.
//
// Lembre dos métodos da conexão (ver src/db/conexao.js):
//   all -> lista | get -> um registro | run -> INSERT/UPDATE/DELETE
// ============================================================

const { conectarComBancoDeDados } = require("../db/conexao");

class ClienteModel {
    // Lista todos os clientes. Se termoBusca vier preenchido,
    // traz só os que correspondem ao termo.
    async buscarTodos(termoBusca) {
        const conexaoComBanco = await conectarComBancoDeDados();

        // TODO: se termoBusca estiver preenchido, filtre pelo nome.
        // Dica: no SQLite, LIKE já não diferencia maiúsculas de
        // minúsculas (para letras sem acento):
        //   WHERE nome LIKE '%' || ? || '%'

        const clientes = await conexaoComBanco.all("SELECT * FROM clientes"); // TODO: ajustar

        return clientes;
    }

    // Insere um cliente (o CPF já chega aqui criptografado).
    async criar(nome, cpf, telefone) {
        const conexaoComBanco = await conectarComBancoDeDados();

        // TODO: montar o INSERT com conexaoComBanco.run(...)
        // e devolver o id do registro criado (resultado.lastID)
    }

    // Atualiza um cliente (o CPF já chega aqui criptografado).
    async editar(id, nome, cpf, telefone) {
        const conexaoComBanco = await conectarComBancoDeDados();

        // TODO: montar o UPDATE ... SET ... WHERE id = ?
        // e devolver quantas linhas foram alteradas (resultado.changes)
    }

    async excluir(id) {
        const conexaoComBanco = await conectarComBancoDeDados();

        // TODO: montar o DELETE ... WHERE id = ?
        // e devolver quantas linhas foram removidas (resultado.changes)
    }
}

module.exports = {
    ClienteModel
}
