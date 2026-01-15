import express, { Router } from "express";
import { body, param, query } from "express-validator";
import DocumentController from "../controllers/documentController";
import Authenticator from "./auth";
import ErrorHandler from "../helper";

class DocumentRoutes {
    private router: Router;
    private errorHandler: ErrorHandler;
    private controller: DocumentController;
    private authenticator: Authenticator;

    constructor(authenticator: Authenticator) {
        this.router = express.Router();
        this.errorHandler = new ErrorHandler();
        this.controller = new DocumentController();
        this.authenticator = authenticator;
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

        this.router.post(
            "/",
            this.authenticator.isLoggedIn,
            body("title").notEmpty().isString(),
            body("description").notEmpty().isString(),
            this.errorHandler.validateRequest,
            (req: any, res: any, next: any) => {
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
