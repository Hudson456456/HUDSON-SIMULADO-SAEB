const { ClienteModel } = require("../models/Cliente");
const { criptografarCPF, descriptografarCPF } = require("../utils/criptografia");

class ClienteController {
    async listar(req, res) {
        try {
            const termoBusca = req.query.busca;

            const clientes = await new ClienteModel().buscarTodos(termoBusca);

            clientes.forEach((cliente) => {
                cliente.cpf = descriptografarCPF(cliente.cpf);
            });

            return res.status(200).json(clientes);
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    async criar(req, res) {
        try {
            const { nome, cpf, telefone } = req.body;

            if (!nome || !cpf) {
                return res.status(400).json({ erro: "Informe nome e CPF." });
            }

            const cpfCriptografado = criptografarCPF(cpf);

            const id = await new ClienteModel().criar(nome, cpfCriptografado, telefone);

            return res.status(201).json({ id, nome, cpf, telefone });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    async editar(req, res) {
        try {
            const { id } = req.params;
            const { nome, cpf, telefone } = req.body;

            if (!nome || !cpf) {
                return res.status(400).json({ erro: "Informe nome e CPF." });
            }

            const cpfCriptografado = criptografarCPF(cpf);

            const alteradas = await new ClienteModel().editar(id, nome, cpfCriptografado, telefone);

            if (!alteradas) {
                return res.status(404).json({ erro: "Cliente não encontrado." });
            }

            return res.status(200).json({ mensagem: "Cliente atualizado com sucesso." });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params;

            const removidas = await new ClienteModel().excluir(id);

            if (!removidas) {
                return res.status(404).json({ erro: "Cliente não encontrado." });
            }

            return res.status(200).json({ mensagem: "Cliente removido com sucesso." });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }
}

module.exports = {
    ClienteController
}