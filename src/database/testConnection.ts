import { pool } from "./database";

export const testConnection = async () => {
    try {
        const result = await pool.query("SELECT NOW()");

        console.log(result.rows[0]);
    } catch (error) {
        console.error("Database Connection Failed", error);

        process.exit(1);
    }
};
