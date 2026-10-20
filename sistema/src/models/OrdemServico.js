const { conectarComBancoDeDados } = require("../db/conexao");

class OrdemServicoModel {
    async buscarTodas() {
        const conexaoComBanco = await conectarComBancoDeDados();

        const ordens = await conexaoComBanco.all(
            `SELECT ordens_servico.*,
                    veiculos.placa AS veiculo_placa,
                    veiculos.modelo AS veiculo_modelo,
                    clientes.id AS cliente_id,
                    clientes.nome AS cliente_nome,
                    clientes.telefone AS cliente_telefone
             FROM ordens_servico
             INNER JOIN veiculos ON ordens_servico.veiculo_id = veiculos.id
             INNER JOIN clientes ON veiculos.cliente_id = clientes.id
             ORDER BY ordens_servico.data_abertura`
        );

        return ordens;
    }

    async atualizarDataAbertura(id, data_abertura) {
        const conexaoComBanco = await conectarComBancoDeDados();

        const resultado = await conexaoComBanco.run(
            "UPDATE ordens_servico SET data_abertura = ? WHERE id = ?",
            [data_abertura, id]
        );

        return resultado.changes;
    }
}

module.exports = {
    OrdemServicoModel
}