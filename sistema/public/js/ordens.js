// ============================================================
// public/js/ordens.js
// ============================================================
// ESTE ARQUIVO É COM VOCÊ (ALUNO DESENVOLVE).
//
// Sugestão de estrutura por linha: cada linha mostra os dados da
// ordem, e na coluna "Ações" um campo de data (já preenchido com
// a data atual da ordem) mais um botão "Salvar" para atualizar.
// ============================================================

const corpoTabela = document.getElementById("corpo-tabela-ordens");
const tabela = document.getElementById("tabela-ordens");
const mensagemOrdens = document.getElementById("mensagem-ordens");

inicializar();

async function inicializar() {
    await carregarOrdens();
}

// ------------------------------------------------------------
// Listar ordens de serviço ordenadas por data, com dados de
// veículo e cliente (join)
// ------------------------------------------------------------
async function carregarOrdens() {
    try {
        // TODO: fetch GET /api/ordens
        // Trate resposta.status === 401 (redirecionar para /)
        // Pegue o JSON e chame renderizarOrdens(ordens)

    } catch (erro) {
        mensagemOrdens.textContent = "Erro ao carregar ordens de serviço.";
        console.error(erro);
    }
}

function renderizarOrdens(ordens) {
    // TODO: se a lista estiver vazia, mantenha a mensagem visível
    // e a tabela escondida (classe "escondido")

    // TODO: caso contrário, monte uma linha <tr> para cada ordem
    // com: data, veículo, placa, cliente, telefone, descrição, e
    // uma célula de ação com:
    //   <input type="date" value="${ordem.data_abertura}" data-id="${ordem.id}">
    //   <button data-id="${ordem.id}">Salvar</button>
    //
    // Adicione os addEventListener nos botões "Salvar" depois de
    // montar as linhas.
}

// ------------------------------------------------------------
// Atualizar a data de abertura de uma ordem
// ------------------------------------------------------------
async function atualizarDataOrdem(id, novaData) {
    try {
        // TODO: fetch PUT /api/ordens/{id}, enviando
        // { data_abertura: novaData } como JSON no body.
        // Se der certo, chame carregarOrdens() de novo (a ordem da
        // lista pode mudar, já que ela é ordenada pela data).

    } catch (erro) {
        alert("Erro ao atualizar data da ordem de serviço.");
        console.error(erro);
    }
}
