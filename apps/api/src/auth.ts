import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";

import { database } from "./database.js";
import { env } from "./env.js";

export const auth = betterAuth({
  baseURL: env.betterAuthUrl,
  secret: env.betterAuthSecret,
  database,

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: [
    "http://localhost:8081",
    "http://127.0.0.1:8081",
    "deporteapp://",
    "deporteapp://*",
  ],

  plugins: [expo()],

  advanced: {
    database: {
      joins: true,
    },
  },
});