const casos = [];

function findAll() {
  return casos;
}
function findById(id) {
  return casos.find((c) => c.id === id);
}
function create(caso) {
  casos.push(caso);
}
function update(id, newCaso) {
  const idx = casos.findIndex((c) => c.id === id);
  if (idx !== -1) casos[idx] = newCaso;
}
function deleteCaso(id) {
  const idx = casos.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  casos.splice(idx, 1);
  return true;
}

export { findAll, findById, create, update, deleteCaso as delete };
