import { sequelize } from "./connection.ts";
import { seedCatalog } from "./seeders/catalog.ts";

try {
  await sequelize.authenticate();
  await seedCatalog();
} finally {
  await sequelize.close();
}
