// ============================================================
// src/models/Veiculo.js
// ============================================================
// ESTE ARQUIVO É COM VOCÊS (ALUNO DESENVOLVE).
// ============================================================

const { conectarComBancoDeDados } = require("../db/conexao");

class VeiculoModel {
    async criar(placa, modelo, cliente_id) {
        const conexaoComBanco = await conectarComBancoDeDados();

        // TODO: montar o INSERT com conexaoComBanco.run(...)
        // e devolver o id do registro criado (resultado.lastID)
    }
}

module.exports = {
    VeiculoModel
}
