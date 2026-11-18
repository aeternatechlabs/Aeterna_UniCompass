import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectToDB from "./config/db.js";
import countryRouter from "./routes/country.routes.js";
import costRouter from "./routes/cost.routes.js";
import pathwayRouter from "./routes/pathway.routes.js";
import aiRouter from "./routes/ai.routes.js";
import currencyRouter from "./routes/currency.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.status(200).send("Aeterna UniCompass API is running");
});

app.use("/api/countries", countryRouter);
app.use("/api/costs", costRouter);
app.use("/api/pathways", pathwayRouter);
app.use("/api", aiRouter);
app.use("/api/currency", currencyRouter);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

const startServer = async () => {
  try {
    await connectToDB();

    const port = Number(process.env.PORT) || 3000;

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

void startServer();
