export class OrdenesController {
    constructor(repository) {
        this.repository = repository;
    }

    getOrdenesByUsuario = async (req, res) => {
        try {
            const id_usuario = Number(req.params.id_usuario);
            const ordenes = await this.repository.getOrdenesByUsuario(id_usuario);
            res.send({ ordenes });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    getOrdenesDisponibles = async (req, res) => {
        try {
            const ordenes = await this.repository.getOrdenesDisponibles();
            res.send({ ordenes });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    getOrdenById = async (req, res) => {
        try {
            const id_orden = Number(req.params.id_orden);
            const orden = await this.repository.getOrdenById(id_orden);
            if (!orden) {
                res.status(404).send({ message: "Orden no encontrada" });
                return;
            }
            res.send({ orden });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    createOrden = async (req, res) => {
        try {
            const { id_usuario, id_tienda, direccion_entrega, metodo_pago, productos } = req.body;
            const orden = await this.repository.createOrden(id_usuario, id_tienda, direccion_entrega, metodo_pago, productos);
            res.status(201).send({ orden });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    updateEstado = async (req, res) => {
        try {
            const id_orden = Number(req.params.id_orden);
            const { estado } = req.body;
            const orden = await this.repository.updateEstado(id_orden, estado);
            res.send({ orden });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    aceptarOrden = async (req, res) => {
        try {
            const id_orden = Number(req.params.id_orden);
            const { id_repartidor } = req.body;
            const orden = await this.repository.aceptarOrden(id_repartidor, id_orden);
            res.send({ orden });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    getOrdenesByRepartidor = async (req, res) => {
        try {
            const id_repartidor = Number(req.params.id_repartidor);
            const ordenes = await this.repository.getOrdenesByRepartidor(id_repartidor);
            res.send({ ordenes });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };
}
