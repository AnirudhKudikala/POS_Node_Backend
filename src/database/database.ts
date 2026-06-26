import { Pool } from "pg";
import { env } from "../config/env";

export const pool = new Pool(env.db);

pool.on("connect", () => {
    console.log("PostgreSQL Connected");
});

pool.on("error", error => {
    console.error("Database Error:", error);
});