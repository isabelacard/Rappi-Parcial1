export class CarritoController {
    constructor(repository) {
        this.repository = repository;
    }

    getCarrito = async (req, res) => {
        try {
            const id_usuario = Number(req.params.id_usuario);
            const carrito = await this.repository.getCarrito(id_usuario);
            res.send({ carrito });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    agregarProducto = async (req, res) => {
        try {
            const id_usuario = Number(req.params.id_usuario);
            const { id_producto, cantidad } = req.body;
            const item = await this.repository.agregarProducto(id_usuario, id_producto, cantidad);
            res.status(201).send({ item });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    eliminarProducto = async (req, res) => {
        try {
            const id_usuario = Number(req.params.id_usuario);
            const id_producto = Number(req.params.id_producto);
            const item = await this.repository.eliminarProducto(id_usuario, id_producto);
            res.send({ item });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };
}
