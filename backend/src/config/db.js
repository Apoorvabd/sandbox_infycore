import "dotenv/config";
import pg from "pg";


const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Add it to backend/.env or your shell environment.");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();

    const result = await client.query("SELECT NOW()");

    console.log("✅ Database Connected");
    console.log("🕒 DB Time:", result.rows[0].now);

    client.release();
  }catch (error) {
    console.error("❌ Database Connection Failed");
    console.error(error.message);
    console.error(error.code);
    console.log("Please check your DATABASE_URL and database server status.");
    process.exit(1);
}
};
