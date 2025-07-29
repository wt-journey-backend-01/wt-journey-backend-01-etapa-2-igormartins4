import {
  findAll,
  findById,
  create,
  update,
  delete as deleteAgente,
} from "../repositories/agentesRepository.js";
import { errorResponse } from "../utils/errorHandler.js";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

function getAllAgentes(req, res) {
  let agentes = findAll();
  const { dataDeIncorporacao, sort } = req.query;
  if (dataDeIncorporacao) {
    agentes = agentes.filter(
      (a) => a.dataDeIncorporacao === dataDeIncorporacao
    );
  }
  if (sort === "asc") {
    agentes.sort((a, b) =>
      a.dataDeIncorporacao.localeCompare(b.dataDeIncorporacao)
    );
  } else if (sort === "desc") {
    agentes.sort((a, b) =>
      b.dataDeIncorporacao.localeCompare(a.dataDeIncorporacao)
    );
  }
  res.json(agentes);
}

function getAgenteById(req, res) {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return errorResponse(res, 400, "ID inválido. Deve ser um UUID.");
  }
  const agente = findById(id);
  if (!agente) {
    return errorResponse(res, 404, "Agente não encontrado");
  }
  res.json(agente);
}

function createAgente(req, res) {
  const { nome, dataDeIncorporacao, cargo } = req.body;
  const errors = [];
  if (!nome) errors.push({ nome: "Campo 'nome' é obrigatório" });
  if (!dataDeIncorporacao || !/^\d{4}-\d{2}-\d{2}$/.test(dataDeIncorporacao)) {
    errors.push({
      dataDeIncorporacao:
        "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD' ",
    });
  } else {
    const hoje = new Date().toISOString().split("T")[0];
    if (dataDeIncorporacao > hoje) {
      errors.push({
        dataDeIncorporacao: "Data de incorporação não pode ser no futuro",
      });
    }
  }
  if (!cargo) errors.push({ cargo: "Campo 'cargo' é obrigatório" });
  if (errors.length)
    return errorResponse(res, 400, "Parâmetros inválidos", errors);
  const id = uuidv4();
  const agente = { id, nome, dataDeIncorporacao, cargo };
  create(agente);
  res.status(201).json(agente);
}

function updateAgente(req, res) {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return errorResponse(res, 400, "ID inválido. Deve ser um UUID.");
  }
  if ("id" in req.body) {
    return errorResponse(res, 400, "Não é permitido alterar o campo 'id'");
  }
  const { nome, dataDeIncorporacao, cargo } = req.body;
  const agente = findById(id);
  if (!agente) return errorResponse(res, 404, "Agente não encontrado");
  if (!nome || !dataDeIncorporacao || !cargo)
    return errorResponse(res, 400, "Parâmetros inválidos");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dataDeIncorporacao)) {
    return errorResponse(
      res,
      400,
      "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD'"
    );
  }
  const hoje = new Date().toISOString().split("T")[0];
  if (dataDeIncorporacao > hoje) {
    return errorResponse(
      res,
      400,
      "Data de incorporação não pode ser no futuro"
    );
  }
  agente.nome = nome;
  agente.dataDeIncorporacao = dataDeIncorporacao;
  agente.cargo = cargo;
  update(id, agente);
  res.json(agente);
}

function patchAgente(req, res) {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return errorResponse(res, 400, "ID inválido. Deve ser um UUID.");
  }
  if ("id" in req.body) {
    return errorResponse(res, 400, "Não é permitido alterar o campo 'id'");
  }
  const agente = findById(id);
  if (!agente) return errorResponse(res, 404, "Agente não encontrado");
  const { nome, dataDeIncorporacao, cargo } = req.body;
  if (nome !== undefined) {
    if (typeof nome !== "string" || !nome.trim()) {
      return errorResponse(res, 400, "Campo 'nome' inválido");
    }
    agente.nome = nome;
  }
  if (dataDeIncorporacao !== undefined) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataDeIncorporacao)) {
      return errorResponse(
        res,
        400,
        "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD'"
      );
    }
    const hoje = new Date().toISOString().split("T")[0];
    if (dataDeIncorporacao > hoje) {
      return errorResponse(
        res,
        400,
        "Data de incorporação não pode ser no futuro"
      );
    }
    agente.dataDeIncorporacao = dataDeIncorporacao;
  }
  if (cargo !== undefined) {
    if (typeof cargo !== "string" || !cargo.trim()) {
      return errorResponse(res, 400, "Campo 'cargo' inválido");
    }
    agente.cargo = cargo;
  }
  update(id, agente);
  res.json(agente);
}

function deleteAgenteController(req, res) {
  const { id } = req.params;
  if (!uuidValidate(id)) {
    return errorResponse(res, 400, "ID inválido. Deve ser um UUID.");
  }
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
