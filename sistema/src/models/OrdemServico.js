// ============================================================
// src/models/OrdemServico.js
// ============================================================
// ESTE ARQUIVO É COM VOCÊS (ALUNO DESENVOLVE).
//
// Lembrete sobre o JOIN: o cliente não está diretamente ligado à
// ordem de serviço - o caminho é ordens_servico -> veiculos ->
// clientes. Veja exemplos/exemplo-join-multiplas-tabelas.sql.
// ============================================================

const { conectarComBancoDeDados } = require("../db/conexao");

class OrdemServicoModel {
    // Lista as ordens ordenadas pela data de abertura, trazendo
    // também os dados do veículo e do cliente.
    async buscarTodas() {
        const conexaoComBanco = await conectarComBancoDeDados();

        // TODO: montar a query com JOIN (ordens_servico -> veiculos
        // -> clientes) e ORDER BY pela data de abertura

        const ordens = await conexaoComBanco.all("SELECT * FROM ordens_servico"); // TODO: ajustar

        return ordens;
    }

    async atualizarDataAbertura(id, data_abertura) {
        const conexaoComBanco = await conectarComBancoDeDados();

        // TODO: montar o UPDATE, filtrando por WHERE id = ?
        // e devolver quantas linhas foram alteradas (resultado.changes)
    }
}

module.exports = {
    OrdemServicoModel
}
