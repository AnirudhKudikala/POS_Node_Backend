import { db } from "./database";

export const testConnection = async () => {
  try {
    const result = await db.query(
      "SELECT NOW()"
    );

    console.log(
      "PostgreSQL Connected"
    );

    console.log(result.rows[0]);
  } catch (error) {
    console.error(
      "Database Connection Failed"
    );

    console.error(error);

    process.exit(1);
  }
};