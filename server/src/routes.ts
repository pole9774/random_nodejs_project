import express from "express";
import { Application, Request, Response } from "express";
import DocumentRoutes from "./routes/documentRoutes";
import Authenticator from "./routes/auth";
import { AuthRoutes, UserRoutes } from "./routes/userRoutes";
const morgan = require("morgan");

function initRoutes(app: Application): void {
  app.use(morgan("dev"));
  app.use(express.json());

  const authenticator = new Authenticator(app);
  const authRoutes = new AuthRoutes(authenticator);
  const userRoutes = new UserRoutes(authenticator);
  const documentRoutes = new DocumentRoutes(authenticator);

  app.use(`/api/sessions`, authRoutes.getRouter());
  app.use(`/api/users`, userRoutes.getRouter());
  app.use(`/api/documents`, documentRoutes.getRouter());
}

export default initRoutes;
