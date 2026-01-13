const cors = require("cors");
import express, { Application, Request, Response } from "express";
import initRoutes from "./routes";
const morgan = require("morgan");

const app: Application = express();
const PORT: number = 3001;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
initRoutes(app);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

export { app };
