// ============================================================
// src/middlewares/autenticacao.js
// ============================================================
// Este arquivo já está pronto (BASE FORNECIDA).
//
// Roda ANTES da rota e decide se a requisição pode seguir
// (return next()) ou se já volta com erro.
//
// Ele confere se existe um usuário guardado na SESSÃO
// (req.session.usuario - criada no login, ver AuthController).
// É isso que faz a "sessão com tempo de expiração" ter efeito de
// verdade: quando o tempo (maxAge, em src/index.js) acaba, o
// express-session apaga os dados da sessão e este middleware
// passa a barrar as rotas.
//
// COMO USAR: coloque o middleware na rota, antes do controller
// (já está assim em todos os arquivos de src/routes/):
//
//   roteadorClientes.get("/api/clientes", verificarSessao, new ClienteController().listar)
//
// No front-end (public/js/), sempre que fizer um fetch numa rota
// protegida, trate o 401 assim:
//
//   const resposta = await fetch("/api/clientes");
//   if (resposta.status === 401) {
//       window.location.href = "/";
//       return;
//   }
// ============================================================

function verificarSessao(req, res, next) {
    if (req.session && req.session.usuario) {
        return next();
    }

    return res.status(401).json({ erro: "Sessão expirada ou usuário não autenticado." });
}

module.exports = {
    verificarSessao
}
