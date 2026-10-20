const { OrdemServicoModel } = require("../models/OrdemServico");

class OrdemServicoController {
    async listar(req, res) {
        try {
            const ordens = await new OrdemServicoModel().buscarTodas();

            return res.status(200).json(ordens);
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }

    async atualizarDataAbertura(req, res) {
        try {
            const { id } = req.params;
            const { data_abertura } = req.body;

            if (!data_abertura) {
                return res.status(400).json({ erro: "Informe a data de abertura." });
            }

            const alteradas = await new OrdemServicoModel().atualizarDataAbertura(id, data_abertura);

            if (!alteradas) {
                return res.status(404).json({ erro: "Ordem de serviço não encontrada." });
            }

            return res.status(200).json({ mensagem: "Data de abertura atualizada com sucesso." });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }
}

module.exports = {
    OrdemServicoController
}