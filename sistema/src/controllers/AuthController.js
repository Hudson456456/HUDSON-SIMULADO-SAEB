const { UsuarioModel } = require("../models/Usuario");
const { compararSenha } = require("../utils/criptografia");

class AuthController {
    async entrar(req, res) {
        const { login, senha } = req.body;

        if (!login || !senha) {
            return res.status(400).json({ erro: "Informe usuário e senha." });
        }

        try {
            const usuario = await new UsuarioModel().buscarPorLogin(login);

            if (!usuario) {
                return res.status(401).json({ erro: "Usuário ou senha inválidos." });
            }

            const senhaConfere = await compararSenha(senha, usuario.senha);

            if (!senhaConfere) {
                return res.status(401).json({ erro: "Usuário ou senha inválidos." });
            }

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

    async buscarUsuarioDaSessao(req, res) {
        if (req.session && req.session.usuario) {
            return res.status(200).json({ usuario: req.session.usuario });
        }

        return res.status(401).json({ erro: "Sessão expirada ou usuário não autenticado." });
    }

    async sair(req, res) {
        req.session.destroy((erro) => {
            if (erro) {
                return res.status(500).json({ erro: "Erro ao sair do sistema." });
            }

            res.clearCookie("connect.sid");
            return res.status(200).json({ mensagem: "Logout realizado com sucesso." });
        });
    }
}

module.exports = {
    AuthController
}