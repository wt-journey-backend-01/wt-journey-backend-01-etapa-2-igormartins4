import {
  findAll,
  findById,
  create,
  update,
  delete as deleteAgente,
} from "../repositories/agentesRepository.js";
import { errorResponse } from "../utils/errorHandler.js";

function getAllAgentes(req, res) {
  const agentes = findAll();
  res.json(agentes);
}

function getAgenteById(req, res) {
  const agente = findById(req.params.id);
  if (!agente) {
    return errorResponse(res, 404, "Agente não encontrado");
  }
  res.json(agente);
}

function createAgente(req, res) {
  const { id, nome, dataDeIncorporacao, cargo } = req.body;
  const errors = [];
  if (!id) errors.push({ id: "Campo 'id' é obrigatório" });
  if (!nome) errors.push({ nome: "Campo 'nome' é obrigatório" });
  if (!dataDeIncorporacao || !/^\d{4}-\d{2}-\d{2}$/.test(dataDeIncorporacao))
    errors.push({
      dataDeIncorporacao:
        "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD' ",
    });
  if (!cargo) errors.push({ cargo: "Campo 'cargo' é obrigatório" });
  if (errors.length)
    return errorResponse(res, 400, "Parâmetros inválidos", errors);
  const agente = { id, nome, dataDeIncorporacao, cargo };
  create(agente);
  res.status(201).json(agente);
}

function updateAgente(req, res) {
  const { id } = req.params;
  const { nome, dataDeIncorporacao, cargo } = req.body;
  const agente = findById(id);
  if (!agente) return errorResponse(res, 404, "Agente não encontrado");
  if (!nome || !dataDeIncorporacao || !cargo)
    return errorResponse(res, 400, "Parâmetros inválidos");
  agente.nome = nome;
  agente.dataDeIncorporacao = dataDeIncorporacao;
  agente.cargo = cargo;
  update(id, agente);
  res.json(agente);
}

function patchAgente(req, res) {
  const { id } = req.params;
  const agente = findById(id);
  if (!agente) return errorResponse(res, 404, "Agente não encontrado");
  const { nome, dataDeIncorporacao, cargo } = req.body;
  if (nome !== undefined) agente.nome = nome;
  if (dataDeIncorporacao !== undefined)
    agente.dataDeIncorporacao = dataDeIncorporacao;
  if (cargo !== undefined) agente.cargo = cargo;
  update(id, agente);
  res.json(agente);
}

function deleteAgenteController(req, res) {
  const { id } = req.params;
  const deleted = deleteAgente(id);
  if (!deleted) return errorResponse(res, 404, "Agente não encontrado");
  res.status(204).send();
}

export default {
  getAllAgentes,
  getAgenteById,
  createAgente,
  updateAgente,
  patchAgente,
  deleteAgente: deleteAgenteController,
};
