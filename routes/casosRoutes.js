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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caso'
 *   post:
 *     summary: Cria um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CasoInput'
 *           example:
 *             titulo: "Roubo de carro"
 *             descricao: "Veículo roubado no centro da cidade."
 *             status: "aberto"
 *             agente_id: "uuid-do-agente"
 *     responses:
 *       201:
 *         description: Caso criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
 */
router.get("/", casosController.getAllCasos);
router.post("/", casosController.createCaso);
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caso'
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
 * /casos/{id}/agente:
 *   get:
 *     summary: Retorna os dados completos do agente responsável por um caso específico
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do agente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agente'
 *       404:
 *         description: Caso ou agente não encontrado
 */
 
/**
 * @swagger
 * components:
 *   schemas:
 *     Caso:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "b1a7e7e2-8c2e-4b7a-9c2e-123456789abc"
 *         titulo:
 *           type: string
 *           example: "Roubo de carro"
 *         descricao:
 *           type: string
 *           example: "Veículo roubado no centro da cidade."
 *         status:
 *           type: string
 *           enum: [aberto, solucionado]
 *           example: "aberto"
 *         agente_id:
 *           type: string
 *           format: uuid
 *           example: "c2b7e7e2-8c2e-4b7a-9c2e-abcdef123456"
 *     CasoInput:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *           example: "Roubo de carro"
 *         descricao:
 *           type: string
 *           example: "Veículo roubado no centro da cidade."
 *         status:
 *           type: string
 *           enum: [aberto, solucionado]
 *           example: "aberto"
 *         agente_id:
 *           type: string
 *           format: uuid
 *           example: "c2b7e7e2-8c2e-4b7a-9c2e-abcdef123456"
 */


// Rota mais específica primeiro
router.get(":id/agente", casosController.getAgenteDoCaso);
router.get(":id", casosController.getCasoById);
router.put(":id", casosController.updateCaso);
router.patch(":id", casosController.patchCaso);
router.delete(":id", casosController.deleteCaso);

export default router;
