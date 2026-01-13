import express from "express";
import { Application, Request, Response } from "express";
import DocumentRoutes from "./routes/documentRoutes";

function initRoutes(app: Application): void {
  app.use(express.json());

  const documentRoutes = new DocumentRoutes();

  app.use(`/api/documents`, documentRoutes.getRouter());
}

export default initRoutes;
