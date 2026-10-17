// ============================================================
// src/routes/clientes.js
// ============================================================
// Este arquivo já está pronto (BASE FORNECIDA).
// O que falta está em ClienteController e ClienteModel.
// Todas as rotas já passam pelo middleware verificarSessao.
// ============================================================

const express = require("express");
const { ClienteController } = require("../controllers/ClienteController");
const { verificarSessao } = require("../middlewares/autenticacao");

const roteadorClientes = express.Router();

roteadorClientes.get("/api/clientes", verificarSessao, new ClienteController().listar)
roteadorClientes.post("/api/clientes", verificarSessao, new ClienteController().criar)
roteadorClientes.put("/api/clientes/:id", verificarSessao, new ClienteController().editar)
roteadorClientes.delete("/api/clientes/:id", verificarSessao, new ClienteController().excluir)

module.exports = {
    roteadorClientes
}
