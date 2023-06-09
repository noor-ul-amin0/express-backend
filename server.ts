import express, { Express, Request, Response } from "express";
import cors from "cors";
import expressWinston from "express-winston";
import winston from "winston";
import routes from "./src/routes";
import { connectDB } from "./src/config/db";

const app: Express = express();
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// express-winston logger
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
);

// Routes
app.use("/", routes);

app.use("*", (req: Request, res: Response) => {
  res.status(404).send(`${req.originalUrl} not found`);
});

const port = 8080 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
