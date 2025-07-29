import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Departamento de Polícia",
      version: "1.0.0",
    },
    components: {
      schemas: {
        Agente: {
          type: "object",
          required: ["id", "nome", "dataDeIncorporacao", "cargo"],
          properties: {
            id: {
              type: "string",
              example: "401bccf5-cf9e-489d-8412-446cd169a0f1",
            },
            nome: {
              type: "string",
              example: "Rommel Carneiro",
            },
            dataDeIncorporacao: {
              type: "string",
              format: "date",
              example: "1992-10-04",
            },
            cargo: {
              type: "string",
              example: "delegado",
            },
          },
        },
        Caso: {
          type: "object",
          required: ["id", "titulo", "descricao", "status", "agente_id"],
          properties: {
            id: {
              type: "string",
              example: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
            },
            titulo: {
              type: "string",
              example: "homicidio",
            },
            descricao: {
              type: "string",
              example:
                "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
            },
            status: {
              type: "string",
              enum: ["aberto", "solucionado"],
              example: "aberto",
            },
            agente_id: {
              type: "string",
              example: "401bccf5-cf9e-489d-8412-446cd169a0f1",
            },
          },
        },
      },
    },
  },
  apis: [
    "./routes/*.js",
    "../routes/*.js",
    "routes/*.js",
    "../**/routes/*.js",
    "**/routes/*.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use("/docs", serve, setup(swaggerSpec));
}

export default setupSwagger;
