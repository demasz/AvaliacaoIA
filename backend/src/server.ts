import { createServer } from "node:http";
import { createApp } from "./app.ts";
import { env } from "./config/env.ts";
import { sequelize } from "./database/connection.ts";
import { apiServices } from "./modules/api-services.ts";

async function startServer(): Promise<void> {
  await sequelize.authenticate();
  const app = createApp(apiServices);
  const server = createServer(app);

  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(env.PORT, () => {
      server.removeListener("error", reject);
      console.info(`cardapio-api escutando na porta ${env.PORT}`);
      resolve();
    });
  });

  const shutdown = (signal: NodeJS.Signals) => {
    console.info(`Encerrando API após ${signal}.`);
    server.close((error) => {
      if (error) {
        console.error("Falha ao encerrar o servidor HTTP:", error);
        process.exitCode = 1;
      }
      void sequelize.close();
    });
  };

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}

try {
  await startServer();
} catch (error) {
  console.error("Não foi possível iniciar a API.", error);
  await sequelize.close();
  process.exitCode = 1;
}
