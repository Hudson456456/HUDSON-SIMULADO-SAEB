// ============================================================
// src/routes/ordens.js
// ============================================================
// Este arquivo já está pronto (BASE FORNECIDA).
// O que falta está em OrdemServicoController e OrdemServicoModel.
// ============================================================

const express = require("express");
const { OrdemServicoController } = require("../controllers/OrdemServicoController");
const { verificarSessao } = require("../middlewares/autenticacao");

const roteadorOrdens = express.Router();

roteadorOrdens.get("/api/ordens", verificarSessao, new OrdemServicoController().listar)
roteadorOrdens.put("/api/ordens/:id", verificarSessao, new OrdemServicoController().atualizarDataAbertura)

module.exports = {
    roteadorOrdens
}
