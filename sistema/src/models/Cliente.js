const { conectarComBancoDeDados } = require("../db/conexao");

class ClienteModel {
    async buscarTodos(termoBusca) {
        const conexaoComBanco = await conectarComBancoDeDados();

        if (termoBusca) {
            return await conexaoComBanco.all(
                "SELECT * FROM clientes WHERE nome LIKE '%' || ? || '%'",
                [termoBusca]
            );
        }

        return await conexaoComBanco.all("SELECT * FROM clientes");
    }

    async criar(nome, cpf, telefone) {
        const conexaoComBanco = await conectarComBancoDeDados();

        const resultado = await conexaoComBanco.run(
            "INSERT INTO clientes (nome, cpf, telefone) VALUES (?, ?, ?)",
            [nome, cpf, telefone]
        );

        return resultado.lastID;
    }

    async editar(id, nome, cpf, telefone) {
        const conexaoComBanco = await conectarComBancoDeDados();

        const resultado = await conexaoComBanco.run(
            "UPDATE clientes SET nome = ?, cpf = ?, telefone = ? WHERE id = ?",
            [nome, cpf, telefone, id]
        );

        return resultado.changes;
    }

    async excluir(id) {
        const conexaoComBanco = await conectarComBancoDeDados();

        const resultado = await conexaoComBanco.run(
            "DELETE FROM clientes WHERE id = ?",
            [id]
        );

        return resultado.changes;
    }
}

module.exports = {
    ClienteModel
}