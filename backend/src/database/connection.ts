import { Sequelize } from "sequelize";
import { env, getDatabaseUrl } from "../config/env.ts";

export const sequelize = new Sequelize(getDatabaseUrl(), {
  dialect: "postgres",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 10_000,
    idle: 10_000,
  },
  dialectOptions:
    env.NODE_ENV === "production" ? { ssl: { require: true, rejectUnauthorized: true } } : {},
});
