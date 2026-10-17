// ============================================================
// src/controllers/VeiculoController.js
// ============================================================
// ESTE ARQUIVO É COM VOCÊS (ALUNO DESENVOLVE).
//
// Lembrete: o cadastro de veículo é obrigatoriamente vinculado
// a um cliente (cliente_id não pode ser nulo).
// ============================================================

const { VeiculoModel } = require("../models/Veiculo");

class VeiculoController {
    // ─────────────────────────────────────────
    // POST /api/veiculos -> inserir novo veículo, associado a um cliente
    // ─────────────────────────────────────────
    async criar(req, res) {
        try {
            const { placa, modelo, cliente_id } = req.body;

            // TODO: validar que placa e cliente_id foram informados
            // (se não: status 400)

            // TODO: chamar new VeiculoModel().criar(...)

            return res.status(201).json({}); // TODO: devolver o veículo criado (com o id)
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }
}

module.exports = {
    VeiculoController
}
