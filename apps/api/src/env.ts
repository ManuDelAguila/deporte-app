import "dotenv/config";

function requireEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}`);
  }

  return value;
}

const port = Number(process.env.PORT ?? "3000");

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT debe ser un número de puerto válido");
}

export const env = {
  port,
  databaseUrl: requireEnvironmentVariable("DATABASE_URL"),
  betterAuthSecret: requireEnvironmentVariable("BETTER_AUTH_SECRET"),
  betterAuthUrl: requireEnvironmentVariable("BETTER_AUTH_URL"),
};