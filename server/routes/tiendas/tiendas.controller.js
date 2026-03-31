export class TiendasController {
    constructor(repository) {
        this.repository = repository;
    }

    getTiendas = async (req, res) => {
        try {
            const tiendas = await this.repository.getTiendas();
            res.send({ tiendas });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    getTiendaById = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const tienda = await this.repository.getTiendaById(id);
            if (!tienda) {
                res.status(404).send({ message: "Tienda no encontrada" });
                return;
            }
            res.send({ tienda });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    updateEstado = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { estado } = req.body;
            const tienda = await this.repository.updateEstado(id, estado);
            res.send({ tienda });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };
}
