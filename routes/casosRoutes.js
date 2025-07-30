import { Router } from "express";
const router = Router();
import casosController from "../controllers/casosController.js";

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Lista todos os casos registrados
 *     tags: [Casos]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Filtra casos pelo título ou descrição que contenham a palavra-chave.
 *     responses:
 *       200:
 *         description: Lista de casos
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Parâmetros inválidos
 *               errors:
 *                 - field: q
 *                   message: Parâmetro de busca inválido
 *   post:
 *     summary: Cria um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CasoInput'
 *     responses:
 *       201:
 *         description: Caso criado
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Parâmetros inválidos
 *               errors:
 *                 - field: titulo
 *                   message: Campo 'titulo' é obrigatório
 *       404:
 *         description: Agente não encontrado
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Agente não encontrado para o agente_id fornecido
 *               errors: []
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
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: ID inválido. Deve ser um UUID.
 *               errors: []
 *       404:
 *         description: Caso não encontrado
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Caso não encontrado
 *               errors: []
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
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Parâmetros inválidos
 *               errors:
 *                 - field: titulo
 *                   message: Campo 'titulo' é obrigatório
 *       404:
 *         description: Caso ou agente não encontrado
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Caso não encontrado
 *               errors: []
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
 *       400:
 *         description: Parâmetros inválidos
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Parâmetros inválidos
 *               errors:
 *                 - field: titulo
 *                   message: Campo 'titulo' inválido
 *       404:
 *         description: Caso ou agente não encontrado
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Caso não encontrado
 *               errors: []
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
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Caso não encontrado
 *               errors: []
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
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: ID inválido. Deve ser um UUID.
 *               errors: []
 *       404:
 *         description: Caso ou agente não encontrado
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Caso ou agente não encontrado
 *               errors: []
 */

router.get("/", casosController.getAllCasos);
router.post("/", casosController.createCaso);

router.get("/:id/agente", casosController.getAgenteDoCaso);
router.get("/:id", casosController.getCasoById);
router.put("/:id", casosController.updateCaso);
router.patch("/:id", casosController.patchCaso);
router.delete("/:id", casosController.deleteCaso);

export default router;
