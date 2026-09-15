import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";

import { auth } from "./auth.js";
import { env } from "./env.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:8081",
      "http://127.0.0.1:8081",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({
    status: "ok",
  });
});

app.listen(env.port, () => {
  console.log(`API disponible en ${env.betterAuthUrl}`);
});