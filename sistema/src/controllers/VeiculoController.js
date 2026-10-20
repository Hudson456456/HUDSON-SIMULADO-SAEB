const { VeiculoModel } = require("../models/Veiculo");

class VeiculoController {
    async criar(req, res) {
        try {
            const { placa, modelo, cliente_id } = req.body;

            if (!placa || !cliente_id) {
                return res.status(400).json({ erro: "Informe a placa e o cliente." });
            }

            const id = await new VeiculoModel().criar(placa, modelo, cliente_id);

            return res.status(201).json({ id, placa, modelo, cliente_id });
        } catch (erro) {
            return res.status(500).json({ erro: erro.message });
        }
    }
}

module.exports = {
    VeiculoController
}