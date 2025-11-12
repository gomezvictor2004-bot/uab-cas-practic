// backend/src/index.js (CommonJS)
const express = require("express");
require("dotenv").config();

const { scrapeExample } = require("./scrape/example");
const { listCourses, getSchedule } = require("./schedule/store");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Salud
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "smart-unibot-backend" });
});

// Scrape de ejemplo (Puppeteer)
app.get("/scrape/ejemplo", async (req, res) => {
  try {
    const data = await scrapeExample();
    res.json(data);
  } catch (err) {
    console.error("Scrape error:", err);
    res.status(500).json({ ok: false, error: "SCRAPE_FAILED" });
  }
});

// Lista de cursos disponibles
app.get("/courses", (req, res) => {
  res.json({ ok: true, courses: listCourses() });
});

// Horario por curso y semestre
// Ej: GET /schedule?course=eit-2&semester=1
app.get("/schedule", (req, res) => {
  const { course = "eit-1", semester = "1" } = req.query;
  const data = getSchedule(course, semester);
  if (!data) {
    return res.status(404).json({ ok: false, error: "COURSE_NOT_FOUND" });
  }
  res.json({ ok: true, course, semester: String(semester), items: data });
});

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});
