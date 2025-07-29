import { Router } from "express";
const router = Router();
import casosController from "../controllers/casosController.js";

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Lista todos os casos registrados
 *     tags: [Casos]
 *     responses:
 *       200:
 *         description: Lista de casos
 *   post:
 *     summary: Cria um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       201:
 *         description: Caso criado
 */
router.get("/casos", casosController.getAllCasos);
router.post("/casos", casosController.createCaso);
/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Retorna os detalhes de um caso específico
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Caso encontrado
 *       404:
 *         description: Caso não encontrado
 *   put:
 *     summary: Atualiza um caso por completo
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       200:
 *         description: Caso atualizado
 *   patch:
 *     summary: Atualiza parcialmente um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Caso'
 *     responses:
 *       200:
 *         description: Caso atualizado
 *   delete:
 *     summary: Remove um caso do sistema
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Caso removido
 *       404:
 *         description: Caso não encontrado
 */
/**
 * @swagger
 * /casos/{caso_id}/agente:
 *   get:
 *     summary: Retorna os dados completos do agente responsável por um caso específico
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: caso_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do agente
 *       404:
 *         description: Caso ou agente não encontrado
 */
// ...existing code...

router.get("/casos/:id", casosController.getCasoById);
router.put("/casos/:id", casosController.updateCaso);
router.patch("/casos/:id", casosController.patchCaso);
router.delete("/casos/:id", casosController.deleteCaso);
router.get("/casos/:caso_id/agente", casosController.getAgenteDoCaso);

export default router;
