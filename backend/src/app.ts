import express, { Request, Response, NextFunction, RequestHandler } from "express";
import { config } from "./config";
import router from "./routes";
import cors from "cors";
import mongoose from "mongoose";
import { ValidationError } from "express-validation";

import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from './docs/swagger'


const app = express();
const port = config.PORT ?? 8008;

mongoose.connect(config.DB_URL_ADMIN, { ssl: true });
mongoose.connection.on("connected", function () {
  console.log("Connection to db success!");
});

mongoose.connection.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

if (process.env.NODE_ENV !== "production") {
  app.use("/docs", ...swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);

app.use((
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    const messages = err.details.body?.map(e => e.message) 
                   || err.details.query?.map(e => e.message)
                   || err.details.params?.map(e => e.message)
                   || [];
    return res.status(err.statusCode).json({
      status: false,
      errors: messages,
    });
  }

  if (err.status === 429) {
    return res.status(429).json({
      status: false,
      error: err.message || 'Too Many Requests',
    });
  }

  res.status(err.status || 500).json({
    status: false,
    error: err.message || 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`Server API is running on port ${port}`);
});
