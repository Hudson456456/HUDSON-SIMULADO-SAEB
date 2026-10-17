// ============================================================
// src/routes/veiculos.js
// ============================================================
// Este arquivo já está pronto (BASE FORNECIDA).
// O que falta está em VeiculoController e VeiculoModel.
// ============================================================

const express = require("express");
const { VeiculoController } = require("../controllers/VeiculoController");
const { verificarSessao } = require("../middlewares/autenticacao");

const roteadorVeiculos = express.Router();

roteadorVeiculos.post("/api/veiculos", verificarSessao, new VeiculoController().criar)

module.exports = {
    roteadorVeiculos
}
