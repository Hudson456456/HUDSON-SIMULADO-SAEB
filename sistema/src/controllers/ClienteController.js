// ============================================================
// src/controllers/ClienteController.js
// ============================================================
// ESTE ARQUIVO É COM VOCÊS (ALUNO DESENVOLVE).
//
// A estrutura de cada método já está pronta. O que falta é a
// lógica específica (marcada com TODO).
//
// Lembretes:
//   - CPF deve ser CRIPTOGRAFADO ao salvar/atualizar e
//     DESCRIPTOGRAFADO ao listar (src/utils/criptografia.js)
//   - As rotas já passam pelo middleware verificarSessao
// ============================================================

const { ClienteModel } = require("../models/Cliente");
const { criptografarCPF, descriptografarCPF } = require("../utils/criptografia");

class ClienteController {
    // ─────────────────────────────────────────
    // GET /api/clientes            -> listar clientes
    // GET /api/clientes?busca=termo -> listar clientes filtrados
    // ─────────────────────────────────────────
    async listar(req, res) {
        try {
            const termoBusca = req.query.busca;

            const clientes = await new ClienteModel().buscarTodos(termoBusca);

            // TODO: descriptografar o CPF de cada cliente antes de
            // responder (percorra a lista e troque cliente.cpf pelo
            // valor de descriptografarCPF(cliente.cpf))

            return res.status(200).json(clientes);
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    // ─────────────────────────────────────────
    // POST /api/clientes -> inserir novo cliente
    // ─────────────────────────────────────────
    async criar(req, res) {
        try {
            const { nome, cpf, telefone } = req.body;

            // TODO: validar campos obrigatórios (nome e cpf).
            // Se faltar algum: return res.status(400).json({ erro: "..." })

            // TODO: criptografar o CPF antes de salvar

            // TODO: chamar new ClienteModel().criar(...)

            return res.status(201).json({}); // TODO: devolver o cliente criado (com o id)
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    // ─────────────────────────────────────────
    // PUT /api/clientes/:id -> editar cliente existente
    // ─────────────────────────────────────────
    async editar(req, res) {
        try {
            const { id } = req.params;
            const { nome, cpf, telefone } = req.body;

            // TODO: validar campos obrigatórios

            // TODO: criptografar o CPF recebido

            // TODO: chamar new ClienteModel().editar(...)
            // Se nenhuma linha foi alterada, o cliente não existe:
            //   return res.status(404).json({ erro: "Cliente não encontrado." })

            return res.status(200).json({}); // TODO: devolver uma confirmação
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    // ─────────────────────────────────────────
    // DELETE /api/clientes/:id -> excluir cliente
    // ─────────────────────────────────────────
    async excluir(req, res) {
        try {
            const { id } = req.params;

            // TODO: chamar new ClienteModel().excluir(id)
            // Se nenhuma linha foi removida -> 404
            //
            // Atenção: um cliente que tem veículo cadastrado não pode
            // ser excluído (chave estrangeira). Nesse caso o SQLite
            // gera um erro, que cai no catch abaixo.

            return res.status(200).json({ mensagem: "Cliente removido com sucesso." });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }
}

module.exports = {
    ClienteController
}
