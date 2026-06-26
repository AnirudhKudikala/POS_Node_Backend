import app from "./app";
import { testConnection } from "./database/testConnection";
import { env } from "./config/env";

const startServer = async () => {
    await testConnection();

    app.listen(env.port, () => {
        console.log(`🚀 Server running on port ${env.port}`);
    });
};

startServer();
