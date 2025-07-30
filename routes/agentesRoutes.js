import { Router } from "express";
const router = Router();
import agentesController from "../controllers/agentesController.js";

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Lista todos os agentes
 *     tags: [Agentes]
 *     parameters:
 *       - in: query
 *         name: dataDeIncorporacao
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtra agentes com data de incorporação igual ou posterior a esta data (YYYY-MM-DD)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Ordena agentes pela data de incorporação em ordem ascendente ou descendente
 *       - in: query
 *         name: cargo
 *         schema:
 *           type: string
 *         description: Filtra agentes pelo cargo
 *     responses:
 *       200:
 *         description: Lista de agentes
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Parâmetros inválidos
 *               errors:
 *                 - field: dataDeIncorporacao
 *                   message: Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD'
 *       404:
 *         description: Agente não encontrado
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Agente não encontrado
 *               errors: []
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
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Parâmetros inválidos
 *               errors:
 *                 - field: nome
 *                   message: Campo 'nome' é obrigatório
 *       404:
 *         description: Agente não encontrado
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Agente não encontrado
 *               errors: []
 * /agentes/{id}:
 *   put:
 *     summary: Atualiza um agente por completo
 *     tags: [Agentes]
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
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       200:
 *         description: Agente atualizado
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Parâmetros inválidos
 *               errors:
 *                 - field: nome
 *                   message: Campo 'nome' é obrigatório
 *       404:
 *         description: Agente não encontrado
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Agente não encontrado
 *               errors: []
 *   patch:
 *     summary: Atualiza parcialmente um agente
 *     tags: [Agentes]
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
 *             $ref: '#/components/schemas/Agente'
 *     responses:
 *       200:
 *         description: Agente atualizado
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Parâmetros inválidos
 *               errors:
 *                 - field: nome
 *                   message: Campo 'nome' inválido
 *       404:
 *         description: Agente não encontrado
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Agente não encontrado
 *               errors: []
 *   delete:
 *     summary: Remove um agente do sistema
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Agente removido
 *       404:
 *         description: Agente não encontrado
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Agente não encontrado
 *               errors: []
 */

router.get("/", agentesController.getAllAgentes);
router.post("/", agentesController.createAgente);
router.get("/:id", agentesController.getAgenteById);
router.put("/:id", agentesController.updateAgente);
router.patch("/:id", agentesController.patchAgente);
router.delete("/:id", agentesController.deleteAgente);

export default router;
