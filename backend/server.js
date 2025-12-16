import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/api/data", async (req, res) => {
  try {
    const sql = `
      SELECT
        name,
        mpg,
        cylinders,
        displacement,
        horsepower,
        weight,
        acceleration,
        model_year,
        origin
      FROM automobile
      LIMIT 50000;
    `;

    const { rows } = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`API running on http://localhost:${process.env.PORT || 4000}`);
});
