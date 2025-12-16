import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // Vite default
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // if you use SSL locally, configure here; usually not needed for local
});

app.get("/api/data", async (req, res) => {
  try {
    // ✅ Start simple: return a “pivot-friendly” dataset (denormalized)
    // Replace this with your table/view:
    const sql = `
      SELECT
        provider,
        governorate,
        indicator,
        sub_indicator,
        year,
        month,
        value
      FROM kpi_fact
      LIMIT 50000;
    `;

    const { rows } = await pool.query(sql);
    res.json(rows); // array of objects => perfect for react-pivottable
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`API running on http://localhost:${process.env.PORT || 4000}`);
});
