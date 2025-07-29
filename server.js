import express, { json } from "express";
import agentesRouter from "./routes/agentesRoutes.js";
import casosRouter from "./routes/casosRoutes.js";
import setupSwagger from "./docs/swagger.js";

const app = express();
const PORT = 3000;


app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "API do Departamento de Polícia ativa. Consulte /docs para documentação." });
});

setupSwagger(app);
app.use("/agentes", agentesRouter);
app.use("/casos", casosRouter);

app.listen(PORT, () => {
  console.log(
    `Servidor do Departamento de Polícia rodando em http://localhost:${PORT} em modo de desenvolvimento`
  );
});
