import { Router } from "express";
const router = Router();
import agentesController from "../controllers/agentesController.js";

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Lista todos os agentes
 *     tags: [Agentes]
 *     responses:
 *       200:
 *         description: Lista de agentes
 *   post:
 *     summary: Cadastra um novo agente
 *     tags: [Agentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       201:
 *         description: Agente criado
 */

router.get("/", agentesController.getAllAgentes);
router.post("/", agentesController.createAgente);
router.get("/:id", agentesController.getAgenteById);
router.put("/:id", agentesController.updateAgente);
router.patch("/:id", agentesController.patchAgente);
router.delete("/:id", agentesController.deleteAgente);

export default router;
