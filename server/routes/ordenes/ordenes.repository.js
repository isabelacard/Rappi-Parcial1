import { pool } from "../../db.js";

const agruparOrdenesConProductos = (rows) => {
    const ordenesMap = new Map();

    for (const row of rows) {
        if (!ordenesMap.has(row.id_orden)) {
            ordenesMap.set(row.id_orden, {
                id_orden: row.id_orden,
                direccion_entrega: row.direccion_entrega,
                metodo_pago: row.metodo_pago,
                estado: row.estado,
                tienda: row.tienda,
                productos: [],
            });
        }

        const orden = ordenesMap.get(row.id_orden);
        const existente = orden.productos.find((p) => p.id_producto === row.id_producto);

        if (existente) {
            existente.cantidad += Number(row.cantidad);
        } else {
            orden.productos.push({
                id_producto: row.id_producto,
                nombre: row.nombre,
                cantidad: Number(row.cantidad),
                precio: Number(row.precio),
            });
        }
    }

    return Array.from(ordenesMap.values()).map((orden) => ({
        ...orden,
        productos: orden.productos.map(({ id_producto, ...producto }) => producto),
    }));
};

export class OrdenesRepository {
    getOrdenesByUsuario = async (id_usuario) => {
        const result = await pool.query(
            `SELECT o.id_orden, o.direccion_entrega, o.metodo_pago, o.estado,
                    t.nombre AS tienda,
                    p.id_producto, p.nombre, p.precio, op.cantidad
             FROM ordenes o
             JOIN tiendas t ON o.id_tienda = t.id_tienda
             JOIN orden_productos op ON o.id_orden = op.id_orden
             JOIN productos p ON op.id_producto = p.id_producto
             WHERE o.id_usuario = $1
             ORDER BY o.id_orden DESC, p.id_producto`,
            [id_usuario]
        );
        return agruparOrdenesConProductos(result.rows);
    };

    getOrdenesDisponibles = async () => {
        const result = await pool.query(
            `SELECT o.id_orden, o.direccion_entrega, o.metodo_pago, o.estado,
                    t.nombre AS tienda,
                    p.id_producto, p.nombre, p.precio, op.cantidad
             FROM ordenes o
             JOIN tiendas t ON o.id_tienda = t.id_tienda
             JOIN orden_productos op ON o.id_orden = op.id_orden
             JOIN productos p ON op.id_producto = p.id_producto
             WHERE o.estado = 'pendiente'
             ORDER BY o.id_orden DESC, p.id_producto`
        );
        return agruparOrdenesConProductos(result.rows);
    };

    getOrdenById = async (id_orden) => {
        const result = await pool.query(
            `SELECT o.id_orden, o.direccion_entrega, o.metodo_pago, o.estado,
                    t.nombre AS tienda,
                    p.id_producto, p.nombre, p.precio, op.cantidad
             FROM ordenes o
             JOIN tiendas t ON o.id_tienda = t.id_tienda
             JOIN orden_productos op ON o.id_orden = op.id_orden
             JOIN productos p ON op.id_producto = p.id_producto
             WHERE o.id_orden = $1
             ORDER BY p.id_producto`,
            [id_orden]
        );
        return agruparOrdenesConProductos(result.rows)[0] ?? null;
    };

    createOrden = async (id_usuario, id_tienda, direccion_entrega, metodo_pago, productos) => {
        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            const orden = await client.query("INSERT INTO ordenes (id_usuario, id_tienda, direccion_entrega, metodo_pago, estado) VALUES ($1, $2, $3, $4, 'pendiente') RETURNING *", [id_usuario, id_tienda, direccion_entrega, metodo_pago]);
            const id_orden = orden.rows[0].id_orden;

            for (const p of productos) {
                await client.query("INSERT INTO orden_productos (id_orden, id_producto, cantidad) VALUES ($1, $2, $3)", [id_orden, p.id_producto, p.cantidad]);
            }

            await client.query("DELETE FROM carrito_products WHERE id_carrito IN (SELECT id_carrito FROM carrito WHERE id_usuario = $1)", [id_usuario]);

            await client.query("COMMIT");
            return orden.rows[0];
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    };

    updateEstado = async (id_orden, estado) => {
        const result = await pool.query("UPDATE ordenes SET estado = $1 WHERE id_orden = $2 RETURNING *", [estado, id_orden]);
        return result.rows[0];
    };

    aceptarOrden = async (id_repartidor, id_orden) => {
        await pool.query("INSERT INTO repartidores_ordenes (id_repartidor, id_orden) VALUES ($1, $2)", [id_repartidor, id_orden]);
        const result = await pool.query("UPDATE ordenes SET estado = 'en_camino' WHERE id_orden = $1 RETURNING *", [id_orden]);
        return result.rows[0];
    };

    getOrdenesByRepartidor = async (id_repartidor) => {
        const result = await pool.query(
            `SELECT o.id_orden, o.direccion_entrega, o.metodo_pago, o.estado,
                    t.nombre AS tienda,
                    p.id_producto, p.nombre, p.precio, op.cantidad
             FROM ordenes o
             JOIN tiendas t ON o.id_tienda = t.id_tienda
             JOIN orden_productos op ON o.id_orden = op.id_orden
             JOIN productos p ON op.id_producto = p.id_producto
             JOIN repartidores_ordenes ro ON o.id_orden = ro.id_orden
             WHERE ro.id_repartidor = $1
             ORDER BY o.id_orden DESC, p.id_producto`,
            [id_repartidor]
        );
        return agruparOrdenesConProductos(result.rows);
    };
}
