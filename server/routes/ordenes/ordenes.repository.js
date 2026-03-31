import { pool } from "../../db.js";

export class OrdenesRepository {
    getOrdenesByUsuario = async (id_usuario) => {
        const result = await pool.query(
            `SELECT o.id_orden, o.direccion_entrega, o.metodo_pago, o.estado,
                    t.nombre AS tienda,
                    json_agg(json_build_object('nombre', p.nombre, 'cantidad', op.cantidad, 'precio', p.precio)) AS productos
             FROM ordenes o
             JOIN tiendas t ON o.id_tienda = t.id_tienda
             JOIN orden_productos op ON o.id_orden = op.id_orden
             JOIN productos p ON op.id_producto = p.id_producto
             WHERE o.id_usuario = $1
             GROUP BY o.id_orden, t.nombre`,
            [id_usuario]
        );
        return result.rows;
    };

    getOrdenesDisponibles = async () => {
        const result = await pool.query(
            `SELECT o.id_orden, o.direccion_entrega, o.metodo_pago, o.estado,
                    t.nombre AS tienda,
                    json_agg(json_build_object('nombre', p.nombre, 'cantidad', op.cantidad, 'precio', p.precio)) AS productos
             FROM ordenes o
             JOIN tiendas t ON o.id_tienda = t.id_tienda
             JOIN orden_productos op ON o.id_orden = op.id_orden
             JOIN productos p ON op.id_producto = p.id_producto
             WHERE o.estado = 'pendiente'
             GROUP BY o.id_orden, t.nombre`
        );
        return result.rows;
    };

    getOrdenById = async (id_orden) => {
        const result = await pool.query(
            `SELECT o.id_orden, o.direccion_entrega, o.metodo_pago, o.estado,
                    t.nombre AS tienda,
                    json_agg(json_build_object('nombre', p.nombre, 'cantidad', op.cantidad, 'precio', p.precio)) AS productos
             FROM ordenes o
             JOIN tiendas t ON o.id_tienda = t.id_tienda
             JOIN orden_productos op ON o.id_orden = op.id_orden
             JOIN productos p ON op.id_producto = p.id_producto
             WHERE o.id_orden = $1
             GROUP BY o.id_orden, t.nombre`,
            [id_orden]
        );
        return result.rows[0];
    };

    createOrden = async (id_usuario, id_tienda, direccion_entrega, metodo_pago, productos) => {
        const orden = await pool.query("INSERT INTO ordenes (id_usuario, id_tienda, direccion_entrega, metodo_pago, estado) VALUES ($1, $2, $3, $4, 'pendiente') RETURNING *", [id_usuario, id_tienda, direccion_entrega, metodo_pago]);
        const id_orden = orden.rows[0].id_orden;

        for (const p of productos) {
            await pool.query("INSERT INTO orden_productos (id_orden, id_producto, cantidad) VALUES ($1, $2, $3)", [id_orden, p.id_producto, p.cantidad]);
        }

        return orden.rows[0];
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
                    json_agg(json_build_object('nombre', p.nombre, 'cantidad', op.cantidad, 'precio', p.precio)) AS productos
             FROM ordenes o
             JOIN tiendas t ON o.id_tienda = t.id_tienda
             JOIN orden_productos op ON o.id_orden = op.id_orden
             JOIN productos p ON op.id_producto = p.id_producto
             JOIN repartidores_ordenes ro ON o.id_orden = ro.id_orden
             WHERE ro.id_repartidor = $1
             GROUP BY o.id_orden, t.nombre`,
            [id_repartidor]
        );
        return result.rows;
    };
}
