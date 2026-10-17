// ============================================================
// src/db/criarBanco.js
// ============================================================
// Este arquivo já está pronto (BASE FORNECIDA).
// Recria o arquivo src/db/oficina.db a partir do script
// oficina_db.sql (que fica na raiz do projeto, fora de sistema/).
//
// Rode de dentro da pasta sistema/:  npm run criar-banco
// Sempre que alterar o oficina_db.sql, rode de novo.
// ============================================================

const fs = require("fs");
const { conectarComBancoDeDados } = require("./conexao");

async function criarBanco() {
    const script = fs.readFileSync("../oficina_db.sql", "utf-8");

    const conexao = await conectarComBancoDeDados();

    await conexao.exec("PRAGMA foreign_keys = OFF");
    await conexao.exec(script);
    await conexao.close();

    console.log("Banco de dados criado em src/db/oficina.db");
}

criarBanco();
