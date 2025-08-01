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
  const { dataDeIncorporacao, sort, cargo } = req.query;
  if (cargo) {
    agentes = agentes.filter(
      (agente) => agente.cargo.toLowerCase() === cargo.toLowerCase()
    );
  }
  if (dataDeIncorporacao) {
    agentes = agentes.filter(
      (a) => new Date(a.dataDeIncorporacao) >= new Date(dataDeIncorporacao)
    );
  }
  if (sort === "asc") {
    agentes = agentes
      .slice()
      .sort(
        (a, b) =>
          new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao)
      );
  } else if (sort === "desc") {
    agentes = agentes
      .slice()
      .sort(
        (a, b) =>
          new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao)
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
  const errors = [];
  if (!nome)
    errors.push({ field: "nome", message: "Campo 'nome' é obrigatório" });
  if (!dataDeIncorporacao || !/^\d{4}-\d{2}-\d{2}$/.test(dataDeIncorporacao)) {
    errors.push({
      field: "dataDeIncorporacao",
      message: "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD'",
    });
  } else {
    const hoje = new Date().toISOString().split("T")[0];
    if (dataDeIncorporacao > hoje) {
      errors.push({
        field: "dataDeIncorporacao",
        message: "Data de incorporação não pode ser no futuro",
      });
    }
  }
  if (!cargo)
    errors.push({ field: "cargo", message: "Campo 'cargo' é obrigatório" });
  if (errors.length) {
    return errorResponse(res, 400, "Parâmetros inválidos", errors);
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
  if (Object.keys(req.body).length === 0) {
    return errorResponse(res, 400, "Payload vazio para atualização");
  }
  if ("id" in req.body) {
    return errorResponse(res, 400, "Não é permitido alterar o campo 'id'");
  }
  // Só permitir campos válidos
  const camposPermitidos = ["nome", "dataDeIncorporacao", "cargo"];
  const camposInvalidos = Object.keys(req.body).filter(
    (campo) => !camposPermitidos.includes(campo)
  );
  if (camposInvalidos.length > 0) {
    return errorResponse(
      res,
      400,
      `Campos não permitidos: ${camposInvalidos.join(", ")}`
    );
  }
  const agente = findById(id);
  if (!agente) return errorResponse(res, 404, "Agente não encontrado");
  const { nome, dataDeIncorporacao, cargo } = req.body;
  const errors = [];
  if (nome !== undefined && (typeof nome !== "string" || !nome.trim())) {
    errors.push({ field: "nome", message: "Campo 'nome' inválido" });
  }
  if (dataDeIncorporacao !== undefined) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataDeIncorporacao)) {
      errors.push({
        field: "dataDeIncorporacao",
        message:
          "Campo dataDeIncorporacao deve seguir a formatação 'YYYY-MM-DD'",
      });
    } else {
      const hoje = new Date().toISOString().split("T")[0];
      if (dataDeIncorporacao > hoje) {
        errors.push({
          field: "dataDeIncorporacao",
          message: "Data de incorporação não pode ser no futuro",
        });
      }
    }
  }
  if (cargo !== undefined && (typeof cargo !== "string" || !cargo.trim())) {
    errors.push({ field: "cargo", message: "Campo 'cargo' inválido" });
  }
  if (errors.length) {
    return errorResponse(res, 400, "Parâmetros inválidos", errors);
  }
  if (nome !== undefined) agente.nome = nome;
  if (dataDeIncorporacao !== undefined)
    agente.dataDeIncorporacao = dataDeIncorporacao;
  if (cargo !== undefined) agente.cargo = cargo;
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
