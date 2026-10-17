// ============================================================
// exemplos/exemplo-exibir-dados-sessao.js
// ============================================================
// Só para consulta (front-end) - não faz parte das telas da oficina.
//
// Mostra o padrão para pegar um dado que está guardado na
// SESSÃO do servidor (ex: nome do usuário logado) e exibir no
// HTML. Isso é necessário porque o JavaScript do FRONT-END não
// tem acesso direto à sessão do back-end - por isso é preciso
// fazer uma requisição (fetch) numa rota que devolve esse dado.
//
// No sistema de vocês, essa "rota que devolve o dado da sessão"
// já existe pronta: GET /api/auth/sessao
// (AuthController.buscarUsuarioDaSessao). Ela devolve algo como:
//   { usuario: { id: 1, nome: "Fulano", login: "fulano" } }
// ------------------------------------------------------------

async function exibirDadoDaSessao() {
    try {
        const resposta = await fetch("/rota-que-devolve-dado-da-sessao");

        if (resposta.status === 401) {
            // sessão expirada ou usuário nunca logou
            window.location.href = "/";
            return;
        }

        const dados = await resposta.json();

        // Suponha que "dados" seja { usuario: { nome: "Fulano" } }
        // Para exibir isso num elemento HTML (ex: <span id="algum-elemento-na-tela">):

        document.getElementById("algum-elemento-na-tela").textContent = dados.usuario.nome;

    } catch (erro) {
        console.error("Erro ao buscar dado da sessão:", erro);
    }
}

// ------------------------------------------------------------
// No sistema de vocês, public/js/principal.js já tem o fetch
// pronto para /api/auth/sessao, dentro da função
// carregarUsuarioLogado(). Falta só usar o dado retornado para
// preencher o elemento #nome-usuario, seguindo esse mesmo padrão
// acima (fetch -> pegar o campo do JSON -> textContent do elemento).
// ------------------------------------------------------------
