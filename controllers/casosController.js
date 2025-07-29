import {
  findAll,
  findById,
  create,
  update,
  delete as deleteCaso,
} from "../repositories/casosRepository.js";
import { findById as findAgenteById } from "../repositories/agentesRepository.js";
import { errorResponse } from "../utils/errorHandler.js";

function getAllCasos(req, res) {
  let casos = findAll();
  const { agente_id, status, q } = req.query;
  if (agente_id) casos = casos.filter((c) => c.agente_id === agente_id);
  if (status) casos = casos.filter((c) => c.status === status);
  if (q)
    casos = casos.filter(
      (c) => c.titulo.includes(q) || c.descricao.includes(q)
    );
  res.json(casos);
}

function getCasoById(req, res) {
  const caso = findById(req.params.id);
  if (!caso) return errorResponse(res, 404, "Caso não encontrado");
  res.json(caso);
}

function createCaso(req, res) {
  const { id, titulo, descricao, status, agente_id } = req.body;
  const errors = [];
  if (!id) errors.push({ id: "Campo 'id' é obrigatório" });
  if (!titulo) errors.push({ titulo: "Campo 'titulo' é obrigatório" });
  if (!descricao) errors.push({ descricao: "Campo 'descricao' é obrigatório" });
  if (!status || !["aberto", "solucionado"].includes(status))
    errors.push({
      status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado' ",
    });
  if (!agente_id) errors.push({ agente_id: "Campo 'agente_id' é obrigatório" });
  if (errors.length)
    return errorResponse(res, 400, "Parâmetros inválidos", errors);
  const caso = { id, titulo, descricao, status, agente_id };
  create(caso);
  res.status(201).json(caso);
}

function updateCaso(req, res) {
  const { id } = req.params;
  const { titulo, descricao, status, agente_id } = req.body;
  const caso = findById(id);
  if (!caso) return errorResponse(res, 404, "Caso não encontrado");
  if (!titulo || !descricao || !status || !agente_id)
    return errorResponse(res, 400, "Parâmetros inválidos");
  caso.titulo = titulo;
  caso.descricao = descricao;
  caso.status = status;
  caso.agente_id = agente_id;
  update(id, caso);
  res.json(caso);
}

function patchCaso(req, res) {
  const { id } = req.params;
  const caso = findById(id);
  if (!caso) return errorResponse(res, 404, "Caso não encontrado");
  const { titulo, descricao, status, agente_id } = req.body;
  if (titulo !== undefined) caso.titulo = titulo;
  if (descricao !== undefined) caso.descricao = descricao;
  if (status !== undefined) caso.status = status;
  if (agente_id !== undefined) caso.agente_id = agente_id;
  update(id, caso);
  res.json(caso);
}

function deleteCasoController(req, res) {
  const { id } = req.params;
  const deleted = deleteCaso(id);
  if (!deleted) return errorResponse(res, 404, "Caso não encontrado");
  res.status(204).send();
}

function getAgenteDoCaso(req, res) {
  const caso = findById(req.params.caso_id);
  if (!caso) return errorResponse(res, 404, "Caso não encontrado");
  const agente = findAgenteById(caso.agente_id);
  if (!agente) return errorResponse(res, 404, "Agente não encontrado");
  res.json(agente);
}

export default {
  getAllCasos,
  getCasoById,
  createCaso,
  updateCaso,
  patchCaso,
  deleteCaso: deleteCasoController,
  getAgenteDoCaso,
};
