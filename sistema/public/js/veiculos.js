// ============================================================
// public/js/veiculos.js
// ============================================================
// A função carregarClientes() abaixo já está pronta (BASE
// FORNECIDA) - só serve para preencher o <select> de clientes.
// Ela depende da rota GET /api/clientes, que vocês desenvolvem.
//
// O QUE VOCÊ DESENVOLVE: o envio do formulário de cadastro do
// veículo, associando-o ao cliente selecionado.
// ============================================================

const formVeiculo = document.getElementById("form-veiculo");
const veiculoPlacaInput = document.getElementById("veiculo-placa");
const veiculoModeloInput = document.getElementById("veiculo-modelo");
const selectCliente = document.getElementById("veiculo-cliente");
const mensagemVeiculo = document.getElementById("mensagem-veiculo");

inicializar();

async function inicializar() {
    await carregarClientes();
}

// ------------------------------------------------------------
// BASE FORNECIDA - popula o <select> de clientes
// ------------------------------------------------------------
async function carregarClientes() {
    try {
        const resposta = await fetch("/api/clientes");

        if (resposta.status === 401) {
            window.location.href = "/";
            return;
        }

        const clientes = await resposta.json();

        selectCliente.innerHTML = '<option value="">Selecione um cliente...</option>';
        clientes.forEach((cliente) => {
            const option = document.createElement("option");
            option.value = cliente.id;
            option.textContent = cliente.nome;
            selectCliente.appendChild(option);
        });

    } catch (erro) {
        console.error("Erro ao carregar clientes:", erro);
        selectCliente.innerHTML = '<option value="">Erro ao carregar clientes</option>';
    }
}

// ------------------------------------------------------------
// Cadastrar veículo associado a um cliente
// ------------------------------------------------------------
formVeiculo.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const veiculo = {
        placa: veiculoPlacaInput.value.trim(),
        modelo: veiculoModeloInput.value.trim(),
        cliente_id: selectCliente.value
    };

    try {
        // TODO: faça o fetch POST /api/veiculos, enviando "veiculo"
        // como JSON no body. Confira resposta.ok e mostre uma
        // mensagem de sucesso ou erro em mensagemVeiculo.textContent
        // (use mensagemVeiculo.className = "texto-sucesso" ou
        // "texto-erro" para mudar a cor).
        // Se der certo, limpe o formulário (formVeiculo.reset()).

    } catch (erro) {
        mensagemVeiculo.textContent = "Erro ao cadastrar veículo.";
        mensagemVeiculo.className = "texto-erro";
        console.error(erro);
    }
});
