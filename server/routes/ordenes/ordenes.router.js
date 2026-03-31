import express from "express";
import { OrdenesController } from "./ordenes.controller.js";
import { OrdenesRepository } from "./ordenes.repository.js";

const repository = new OrdenesRepository();
const controller = new OrdenesController(repository);

const router = express.Router();

router.get("/disponibles", controller.getOrdenesDisponibles);
router.get("/usuario/:id_usuario", controller.getOrdenesByUsuario);
router.get("/repartidor/:id_repartidor", controller.getOrdenesByRepartidor);
router.get("/:id_orden", controller.getOrdenById);
router.post("/", controller.createOrden);
router.put("/:id_orden/estado", controller.updateEstado);
router.put("/:id_orden/aceptar", controller.aceptarOrden);

export default router;
