
import express, { json } from "express";
import agentesRouter from "./routes/agentesRoutes.js";
import casosRouter from "./routes/casosRoutes.js";
import setupSwagger from "./docs/swagger.js";
import { seed } from "./seed.js";

const app = express();
const PORT = 3000;

// Popula dados de teste
seed();

app.use(json());

setupSwagger(app);
app.use("/agentes", agentesRouter);
app.use("/casos", casosRouter);

app.listen(PORT, () => {
  console.log(
    `Servidor do Departamento de Polícia rodando em http://localhost:${PORT} em modo de desenvolvimento`
  );
});
