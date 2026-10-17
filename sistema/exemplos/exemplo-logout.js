// ============================================================
// exemplos/exemplo-logout.js
// ============================================================
// Servidor Express isolado, só para consulta, mostrando como
// destruir uma sessão criada com express-session.
//
// Não precisa importar nem rodar isso.
// É só para consulta de como o "destroy" funciona, já que vocês
// viram como CRIAR uma sessão (em src/controllers/AuthController.js),
// mas talvez não tenham praticado como encerrar uma.
// ============================================================

const express = require("express");
const session = require("express-session");

const servidor = express();

servidor.use(session({ secret: "exemplo", resave: false, saveUninitialized: false }));

class ExemploController {
    // "Login" fictício só para ilustrar a criação da sessão
    // (isso já está pronto de verdade no AuthController do sistema)
    async entrar(req, res) {
        req.session.usuario = { nome: "Fulano" };

        return res.status(200).json({ mensagem: "Sessão criada." });
    }

    // ------------------------------------------------------------
    // Isto é o que importa: destruir a sessão.
    // req.session.destroy() remove os dados da sessão do lado do
    // servidor. O callback (a função passada para ele) roda quando
    // a operação terminou.
    // ------------------------------------------------------------
    async sair(req, res) {
        req.session.destroy((erro) => {
            if (erro) {
                return res.status(500).json({ erro: "Erro ao encerrar a sessão." });
            }

            return res.status(200).json({ mensagem: "Sessão encerrada com sucesso." });
        });
    }
}

servidor.post("/exemplo-login", new ExemploController().entrar)
servidor.post("/exemplo-logout", new ExemploController().sair)

// No lado do front-end (JS), depois de chamar essa rota, o
// padrão é redirecionar o usuário para a tela de login:
//
//   await fetch("/exemplo-logout", { method: "POST" });
//   window.location.href = "/";
