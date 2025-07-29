const agentes = [];

function findAll() {
  return agentes;
}
function findById(id) {
  return agentes.find((a) => a.id === id);
}
function create(agente) {
  agentes.push(agente);
}
function update(id, newAgente) {
  const idx = agentes.findIndex((a) => a.id === id);
  if (idx !== -1) agentes[idx] = newAgente;
}
function deleteAgente(id) {
  const idx = agentes.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  agentes.splice(idx, 1);
  return true;
}

export { findAll, findById, create, update, deleteAgente as delete };
