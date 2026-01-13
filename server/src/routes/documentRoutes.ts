import express, { Router } from "express";
import DocumentController from "../controllers/documentController";

class DocumentRoutes {
    private router: Router;
    private controller: DocumentController;

    constructor() {
        this.router = express.Router();
        this.controller = new DocumentController();
        this.initRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    initRoutes() {
        this.router.get("/", (req: any, res: any, next: any) => {
            this.controller
                .getDocuments()
                .then((documents: any) => res.status(200).json(documents))
                .catch((error: any) => next(error));
        });

        this.router.post("/", (req: any, res: any, next: any) => {
            this.controller
                .createDocument(
                    req.body.title,
                    req.body.description
                )
                .then((data: any) => res.status(201).json(data))
                .catch((error: any) => next(error));
        });
    }
}

export default DocumentRoutes;
