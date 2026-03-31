export class ProductosController {
    constructor(repository) {
        this.repository = repository;
    }

    getProductosByTienda = async (req, res) => {
        try {
            const id_tienda = Number(req.params.id_tienda);
            const productos = await this.repository.getProductosByTienda(id_tienda);
            res.send({ productos });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };

    createProducto = async (req, res) => {
        try {
            const { nombre, descripcion, precio, id_tienda } = req.body;
            const producto = await this.repository.createProducto(nombre, descripcion, precio, id_tienda);
            res.status(201).send({ producto });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    };
}
