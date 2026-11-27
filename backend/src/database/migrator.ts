import { Umzug, SequelizeStorage } from "umzug";
import { sequelize } from "./connection.ts";
import { down, up } from "./migrations/20261126-initial-schema.ts";

export const migrator = new Umzug({
  migrations: [{ name: "20261126-initial-schema", up, down }],
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});
