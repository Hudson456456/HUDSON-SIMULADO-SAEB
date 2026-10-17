// ============================================================
// src/models/Usuario.js
// ============================================================
// Este arquivo já está pronto (BASE FORNECIDA).
// ============================================================

const { conectarComBancoDeDados } = require("../db/conexao");

class UsuarioModel {
    async buscarPorLogin(login) {
        const conexaoComBanco = await conectarComBancoDeDados();

        const usuario = await conexaoComBanco.get(
            "SELECT * FROM usuarios WHERE login = ?",
            [login]
        );

        return usuario;
    }
}

module.exports = {
    UsuarioModel
}
