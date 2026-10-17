// ============================================================
// src/controllers/AuthController.js
// ============================================================
// QUASE TODO PRONTO (BASE FORNECIDA).
//
// entrar() e buscarUsuarioDaSessao() já funcionam. O que vocês
// desenvolvem aqui é só o método sair() (logout).
// ============================================================

const { UsuarioModel } = require("../models/Usuario");
const { compararSenha } = require("../utils/criptografia");

class AuthController {
    // ─────────────────────────────────────────
    // POST /api/auth/login
    // ─────────────────────────────────────────
    async entrar(req, res) {
        const { login, senha } = req.body;

        if (!login || !senha) {
            return res.status(400).json({ erro: "Informe usuário e senha." });
        }

        try {
            const usuario = await new UsuarioModel().buscarPorLogin(login);

            // Validação de falha de autenticação: usuário não
            // encontrado ou senha incorreta. Se quiserem, podem
            // melhorar a mensagem ou a forma de exibir no front-end
            // (public/js/login.js) - não é obrigatório.
            if (!usuario) {
                return res.status(401).json({ erro: "Usuário ou senha inválidos." });
            }

            const senhaConfere = await compararSenha(senha, usuario.senha);

            if (!senhaConfere) {
                return res.status(401).json({ erro: "Usuário ou senha inválidos." });
            }

            // Login OK - cria a sessão do usuário autenticado.
            // É esse objeto (req.session.usuario) que o middleware
            // verificarSessao confere, e é dele que sai o nome do
            // usuário exibido na tela Principal.
            req.session.usuario = {
                id: usuario.id,
                nome: usuario.nome,
                login: usuario.login
            };

            return res.status(200).json({ mensagem: "Login realizado com sucesso.", nome: usuario.nome });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    // ─────────────────────────────────────────
    // GET /api/auth/sessao
    // Usada pela tela Principal para descobrir quem está logado
    // (o front-end não tem acesso direto à sessão do servidor,
    // por isso existe essa rota).
    // ─────────────────────────────────────────
    async buscarUsuarioDaSessao(req, res) {
        if (req.session && req.session.usuario) {
            return res.status(200).json({ usuario: req.session.usuario });
        }

        return res.status(401).json({ erro: "Sessão expirada ou usuário não autenticado." });
    }

    // ─────────────────────────────────────────
    // POST /api/auth/logout
    // ─────────────────────────────────────────
    // TODO: implemente aqui a destruição da sessão.
    // Dica: veja como a sessão foi CRIADA no entrar()
    // (req.session.usuario = ...). Destruir a sessão segue a lógica
    // contrária - existe um método pronto do express-session para
    // isso. Veja exemplos/exemplo-logout.js
    // ─────────────────────────────────────────
    async sair(req, res) {
        // implemente aqui
    }
}

module.exports = {
    AuthController
}
