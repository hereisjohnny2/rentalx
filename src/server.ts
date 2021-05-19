import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./database";
import "./shared/container";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.listen(3333, () =>
  console.log("Server is running on port http://localhost:3333")
);
