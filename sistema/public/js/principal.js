// ============================================================
// public/js/principal.js
// ============================================================
// ESTE ARQUIVO É COM VOCÊ (ALUNO DESENVOLVE).
//
// O que falta aqui:
//   - recuperar o nome do usuário autenticado e exibir no
//     elemento #nome-usuario
//   - implementar o logout no botão #btn-sair
//
// A navegação para Clientes, Veículos e Ordens de Serviço já está
// pronta no HTML (são apenas links <a>), vocês não precisam
// mexer nisso.
// ============================================================

const nomeUsuarioEl = document.getElementById("nome-usuario");
const btnSair = document.getElementById("btn-sair");

inicializar();

async function inicializar() {
    await carregarUsuarioLogado();
}

async function carregarUsuarioLogado() {
    try {
        const resposta = await fetch("/api/auth/sessao");

        if (resposta.status === 401) {
            // sessão expirada ou usuário não logado
            window.location.href = "/";
            return;
        }

        const dados = await resposta.json();

        // TODO: usar dados.usuario.nome para preencher o conteúdo
        // de nomeUsuarioEl (ex: nomeUsuarioEl.textContent = ...)
        // Dica: veja exemplos/exemplo-exibir-dados-sessao.js

    } catch (erro) {
        console.error("Erro ao verificar sessão:", erro);
    }
}

btnSair.addEventListener("click", async () => {
    // TODO: chamar a rota POST /api/auth/logout via fetch,
    // e depois redirecionar o usuário para /
    // Dica: veja exemplos/exemplo-logout.js
});
