import {
  findAll,
  findById,
  create,
  update,
  delete as deleteCaso,
} from "../repositories/casosRepository.js";
import { findById as findAgenteById } from "../repositories/agentesRepository.js";
import { errorResponse } from "../utils/errorHandler.js";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

function getAllCasos(req, res) {
  let casos = findAll();
  const { agente_id, status, q } = req.query;
  if (agente_id) casos = casos.filter((c) => c.agente_id === agente_id);
  if (status) casos = casos.filter((c) => c.status === status);
  if (q) {
    const query = q.toLowerCase();
    casos = casos.filter(
      (c) =>
        c.titulo.toLowerCase().includes(query) ||
        c.descricao.toLowerCase().includes(query)
    );
  }
  res.json(casos);
}

function getCasoById(req, res) {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return errorResponse(res, 400, "ID inválido. Deve ser um UUID.");
  }
  const caso = findById(id);
  if (!caso) return errorResponse(res, 404, "Caso não encontrado");
  res.json(caso);
}

function createCaso(req, res) {
  const { titulo, descricao, status, agente_id } = req.body;
  const errors = [];
  if (!titulo) errors.push({ titulo: "Campo 'titulo' é obrigatório" });
  if (!descricao) errors.push({ descricao: "Campo 'descricao' é obrigatório" });
  if (!status || !["aberto", "solucionado"].includes(status))
    errors.push({
      status: "O campo 'status' pode ser somente 'aberto' ou 'solucionado' ",
    });
  if (!agente_id) errors.push({ agente_id: "Campo 'agente_id' é obrigatório" });
  if (agente_id && !uuidValidate(agente_id)) {
    errors.push({ agente_id: "agente_id deve ser um UUID válido" });
  }
  if (errors.length) {
    return errorResponse(res, 400, "Parâmetros inválidos", errors);
  }
  if (agente_id && uuidValidate(agente_id)) {
    const agenteExiste = findAgenteById(agente_id);
    if (!agenteExiste) {
      return errorResponse(
        res,
        404,
        "Agente não encontrado para o agente_id fornecido"
      );
    }
  }
  const id = uuidv4();
  const caso = { id, titulo, descricao, status, agente_id };
  create(caso);
  res.status(201).json(caso);
}

function updateCaso(req, res) {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return errorResponse(res, 400, "ID inválido. Deve ser um UUID.");
  }
  if ("id" in req.body) {
    return errorResponse(res, 400, "Não é permitido alterar o campo 'id'");
  }
  const { titulo, descricao, status, agente_id } = req.body;
  const caso = findById(id);
  if (!caso) return errorResponse(res, 404, "Caso não encontrado");
  if (!titulo || !descricao || !status || !agente_id)
    return errorResponse(res, 400, "Parâmetros inválidos");
  if (!uuidValidate(agente_id)) {
    return errorResponse(res, 400, "agente_id deve ser um UUID válido");
  }
  const agenteExiste = findAgenteById(agente_id);
  if (!agenteExiste) {
    return errorResponse(
      res,
      404,
      "Agente não encontrado para o agente_id fornecido"
    );
  }
  caso.titulo = titulo;
  caso.descricao = descricao;
  caso.status = status;
  caso.agente_id = agente_id;
  update(id, caso);
  res.json(caso);
}

function patchCaso(req, res) {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return errorResponse(res, 400, "ID inválido. Deve ser um UUID.");
  }
  if ("id" in req.body) {
    return errorResponse(res, 400, "Não é permitido alterar o campo 'id'");
  }
  const caso = findById(id);
  if (!caso) return errorResponse(res, 404, "Caso não encontrado");
  const { titulo, descricao, status, agente_id } = req.body;
  if (titulo !== undefined) {
    if (typeof titulo !== "string" || !titulo.trim()) {
      return errorResponse(res, 400, "Campo 'titulo' inválido");
    }
    caso.titulo = titulo;
  }
  if (descricao !== undefined) {
    if (typeof descricao !== "string" || !descricao.trim()) {
      return errorResponse(res, 400, "Campo 'descricao' inválido");
    }
    caso.descricao = descricao;
  }
  if (status !== undefined) {
    if (!["aberto", "solucionado"].includes(status)) {
      return errorResponse(
        res,
        400,
        "O campo 'status' pode ser somente 'aberto' ou 'solucionado'"
      );
    }
    caso.status = status;
  }
  if (agente_id !== undefined) {
    if (!uuidValidate(agente_id)) {
      return errorResponse(res, 400, "agente_id deve ser um UUID válido");
    }
    const agenteExiste = findAgenteById(agente_id);
    if (!agenteExiste) {
      return errorResponse(
        res,
        404,
        "Agente não encontrado para o agente_id fornecido"
      );
    }
    caso.agente_id = agente_id;
  }
  update(id, caso);
  res.json(caso);
}

function deleteCasoController(req, res) {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return errorResponse(res, 400, "ID inválido. Deve ser um UUID.");
  }
  const deleted = deleteCaso(id);
  if (!deleted) return errorResponse(res, 404, "Caso não encontrado");
  res.status(204).send();
}

function getAgenteDoCaso(req, res) {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return errorResponse(res, 400, "ID inválido. Deve ser um UUID.");
  }
  const caso = findById(id);
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
