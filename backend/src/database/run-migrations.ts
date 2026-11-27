import { sequelize } from "./connection.ts";
import { migrator } from "./migrator.ts";

try {
  await sequelize.authenticate();
  const command = process.argv[2] ?? "up";
  if (command === "up") {
    await migrator.up();
  } else if (command === "down") {
    await migrator.down();
  } else {
    throw new Error(`Comando de migration inválido: ${command}. Use "up" ou "down".`);
  }
} finally {
  await sequelize.close();
}
