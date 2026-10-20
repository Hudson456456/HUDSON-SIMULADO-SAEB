const { conectarComBancoDeDados } = require("../db/conexao");

class VeiculoModel {
    async criar(placa, modelo, cliente_id) {
        const conexaoComBanco = await conectarComBancoDeDados();

        const resultado = await conexaoComBanco.run(
            "INSERT INTO veiculos (placa, modelo, cliente_id) VALUES (?, ?, ?)",
            [placa, modelo, cliente_id]
        );

        return resultado.lastID;
    }
}

module.exports = {
    VeiculoModel
}