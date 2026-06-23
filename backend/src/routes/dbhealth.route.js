import { pool } from "./config/db.js";

app.get("/health/db", async (req,res)=>{

    const result =
        await pool.query(
            "SELECT NOW()"
        );

    res.json(result.rows);
});