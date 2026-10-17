// ============================================================
// src/db/conexao.js
// ============================================================
// Este arquivo já está pronto (BASE FORNECIDA).
// Cada model chama conectarComBancoDeDados() e usa a conexão
// devolvida para rodar os comandos SQL:
//
//   conexao.all("SELECT ...", [parametros])  -> lista de registros
//   conexao.get("SELECT ...", [parametros])  -> um registro (ou undefined)
//   conexao.run("INSERT/UPDATE/DELETE ...", [parametros])
//       -> devolve { lastID, changes }
//          lastID  = id do registro inserido (INSERT)
//          changes = quantas linhas foram afetadas (UPDATE/DELETE)
//
// Os "?" dentro do SQL são substituídos, na ordem, pelos valores
// do array de parâmetros. Nunca concatene o texto digitado pelo
// usuário direto na string do SQL (risco de SQL Injection).
// ============================================================

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

async function conectarComBancoDeDados() {
    const minhaConexaoComBancoDeDados = await open({
        filename: "./src/db/oficina.db",
        driver: sqlite3.Database
    })

    // No SQLite as chaves estrangeiras só são conferidas se isso
    // for ligado em cada conexão.
    await minhaConexaoComBancoDeDados.exec("PRAGMA foreign_keys = ON");

    return minhaConexaoComBancoDeDados;
}

module.exports = {
    conectarComBancoDeDados
}
