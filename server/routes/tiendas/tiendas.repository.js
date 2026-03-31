import { pool } from "../../db.js";

export class TiendasRepository {
    getTiendas = async () => {
        const result = await pool.query("SELECT * FROM tiendas");
        return result.rows;
    };

    getTiendaById = async (id) => {
        const result = await pool.query("SELECT * FROM tiendas WHERE id_tienda = $1", [id]);
        return result.rows[0];
    };

    updateEstado = async (id, estado) => {
        const result = await pool.query("UPDATE tiendas SET estado = $1 WHERE id_tienda = $2 RETURNING *", [estado, id]);
        return result.rows[0];
    };
}
