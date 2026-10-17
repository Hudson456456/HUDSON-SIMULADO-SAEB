// ============================================================
// src/controllers/OrdemServicoController.js
// ============================================================
// ESTE ARQUIVO É COM VOCÊS (ALUNO DESENVOLVE).
// ============================================================

const { OrdemServicoModel } = require("../models/OrdemServico");

class OrdemServicoController {
    // ─────────────────────────────────────────
    // GET /api/ordens -> listar ordens de serviço ordenadas por
    // data de abertura, com dados do veículo e do cliente
    // ─────────────────────────────────────────
    async listar(req, res) {
        try {
            const ordens = await new OrdemServicoModel().buscarTodas();

            return res.status(200).json(ordens);
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    // ─────────────────────────────────────────
    // PUT /api/ordens/:id -> atualizar a data de abertura de uma ordem
    // ─────────────────────────────────────────
    async atualizarDataAbertura(req, res) {
        try {
            const { id } = req.params;
            const { data_abertura } = req.body;

            // TODO: validar que data_abertura foi informada (400)

            // TODO: chamar new OrdemServicoModel().atualizarDataAbertura(...)
            // Se nenhuma linha foi alterada -> 404

            return res.status(200).json({}); // TODO: devolver uma confirmação
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }
}

module.exports = {
    OrdemServicoController
}
