import express, { json } from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

import agentesRouter from "./routes/agentesRoutes.js";
import casosRouter from "./routes/casosRoutes.js";
import setupSwagger from "./docs/swagger.js";
setupSwagger(app);
app.use(agentesRouter);
app.use(casosRouter);

app.listen(PORT, () => {
  console.log(
    `Servidor do Departamento de Polícia rodando em http://localhost:${PORT} em modo de desenvolvimento`
  );
});
