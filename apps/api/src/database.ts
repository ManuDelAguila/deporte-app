import { Pool } from "pg";

import { env } from "./env.js";

export const database = new Pool({
  connectionString: env.databaseUrl,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
});

database.on("error", (error) => {
  console.error("Error inesperado en la conexión con PostgreSQL:", error);
});