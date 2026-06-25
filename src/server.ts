import app from "./app";
import dotenv from "dotenv";
import { testConnection } from "./config/testConnection";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await testConnection();

  app.listen(PORT, () => {
    console.log(
      `🚀 Server running on port ${PORT}`
    );
  });
};

startServer();