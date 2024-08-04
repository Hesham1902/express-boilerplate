import { pino } from "pino";
import express, {
  NextFunction,
  Request,
  Response,
  type Express,
} from "express";
import { env } from "./config/envConfig.js";
import helmet from "helmet";
import cors from "cors";
import rateLimiter from "./config/rateLimitter.js";
import errorHandler from "./config/errorHandler.js";

const logger = pino({ name: "server start" });

logger.info("Starting server");
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Routes

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  next(new Error("TTTTTTTTT"));
});

// Error handlers
app.use(errorHandler());

export { app, logger };
