import { Pool } from "pg";

export const pool = new Pool({
    user: "postgres.xxbmibngzxgpmxinnzoi",
    host: "aws-1-us-east-1.pooler.supabase.com",
    database: "postgres",
    password: "Danielitomipuki",
    port: 5432,
    keepAlive: true,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
