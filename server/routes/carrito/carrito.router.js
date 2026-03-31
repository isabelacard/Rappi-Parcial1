import express from "express";
import { CarritoController } from "./carrito.controller.js";
import { CarritoRepository } from "./carrito.repository.js";

const repository = new CarritoRepository();
const controller = new CarritoController(repository);

const router = express.Router();

router.get("/:id_usuario", controller.getCarrito);
router.post("/:id_usuario", controller.agregarProducto);
router.delete("/:id_usuario/:id_producto", controller.eliminarProducto);

export default router;
