// ============================================================
// src/routes/auth.js
// ============================================================
// Este arquivo já está pronto (BASE FORNECIDA).
// ============================================================

const express = require("express");
const { AuthController } = require("../controllers/AuthController");

const roteadorAuth = express.Router();

roteadorAuth.post("/api/auth/login", new AuthController().entrar)
roteadorAuth.get("/api/auth/sessao", new AuthController().buscarUsuarioDaSessao)
roteadorAuth.post("/api/auth/logout", new AuthController().sair)

module.exports = {
    roteadorAuth
}
