// ============================================================
// src/index.js
// ============================================================
// Este arquivo já está pronto (BASE FORNECIDA).
// Além de registrar as rotas, ele configura:
//   - express.json(): faz o req.body funcionar (dados enviados
//     pelo front-end em JSON, nos POST/PUT)
//   - express.static("public"): entrega as telas HTML/CSS/JS
//   - session(): cria a sessão do usuário com tempo de expiração
// ============================================================

const path = require("path");
const express = require("express");
const session = require("express-session");
const { roteadorAuth } = require("./routes/auth");
const { roteadorClientes } = require("./routes/clientes");
const { roteadorVeiculos } = require("./routes/veiculos");
const { roteadorOrdens } = require("./routes/ordens");

const servidor = express();

servidor.use(express.json());

servidor.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

servidor.use(express.static("public"));

servidor.use(session({
    secret: "simulado-saep-oficina-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 15 * 60 * 1000 // 15 minutos
    }
}));

servidor.use(roteadorAuth)
servidor.use(roteadorClientes)
servidor.use(roteadorVeiculos)
servidor.use(roteadorOrdens)

servidor.listen(3000, () => {
    console.log("Servidor iniciado em http://localhost:3000/")
});
