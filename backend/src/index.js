// backend/src/index.js (CommonJS)
const express = require("express");
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { scrapeExample } = require("./scrape/example");
const { listCourses, getSchedule } = require("./schedule/store");
const { dayNameCA, tomorrowNameCA, weekNamesCA } = require("./schedule/dates");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ===== Memoria simple: userId -> { course, semester } =====
const userCourseMap = new Map();

// ======= Funciones auxiliares para almacenamiento =======
const DATA_PATH = path.join(__dirname, "../data/state.json");

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  } catch {
    return { tasks: [] };
  }
}

function saveState(state) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(state, null, 2));
}

// ----- Endpoint de prueba de salud -----
app.get("/health", (req, res) => {
  res.json({ ok: true, service: "smart-unibot-backend" });
});

// ----- Scrape de ejemplo (Puppeteer simulado) -----
app.get("/scrape/ejemplo", async (req, res) => {
  try {
    const data = await scrapeExample();
    res.json(data);
  } catch (err) {
    console.error("Scrape error:", err);
    res.status(500).json({ ok: false, error: "SCRAPE_FAILED" });
  }
});

// ----- Lista de cursos -----
app.get("/courses", (req, res) => {
  res.json({ ok: true, courses: listCourses() });
});

// ----- Horario por curso/semestre -----
app.get("/schedule", (req, res) => {
  let { userId, course, semester } = req.query;

  if (userId && (!course || !semester)) {
    const saved = userCourseMap.get(String(userId));
    if (saved) {
      course = course || saved.course;
      semester = semester || saved.semester;
    }
  }

  course = course || "eti-1";
  semester = String(semester || "1");

  const items = getSchedule(course, semester);
  if (!items)
    return res
      .status(404)
      .json({ ok: false, error: "COURSE_NOT_FOUND" });

  res.status(200).json({ ok: true, schedule: items });
});

// ----- Lista de tareas -----
app.get("/api/tasks", (req, res) => {
  const state = loadState();
  res.json({ ok: true, tasks: state.tasks || [] });
});

// ----- Crear nueva tarea -----
app.post("/api/tasks", (req, res) => {
  const state = loadState();
  const task = { id: Date.now(), ...req.body };
  state.tasks.push(task);
  saveState(state);
  res.status(201).json({ ok: true, task });
});

// ----- Briefing diario (demo) -----
app.get("/api/briefings", (req, res) => {
  const studentId = req.query.studentId || "demo";
  res.json({
    ok: true,
    studentId,
    briefing: [
      { type: "class", text: "Clase de Macroeconomía a las 10:00" },
      { type: "deadline", text: "Entrega de Innovación el viernes" },
      { type: "news", text: "Nuevo calendario académico publicado" },
    ],
  });
});

// ----- Resumen de apuntes con IA -----
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/documents/summary", async (req, res) => {
  const { text } = req.body;
  if (!text)
    return res
      .status(400)
      .json({ ok: false, error: "MISSING_TEXT" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Resume el texto y genera 3 preguntas tipo test relacionadas con el contenido.",
        },
        { role: "user", content: text },
      ],
    });

    res.json({ ok: true, summary: completion.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res
      .status(500)
      .json({ ok: false, error: "AI_SUMMARY_FAILED" });
  }
});

// ----- Endpoint de estado general -----
app.get("/api/status", (req, res) => {
  res.json({
    ok: true,
    service: "smart-unibot",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ======== Lanzar servidor ========
app.listen(PORT, () => {
  console.log(`✅ Smart UniBot backend running on port ${PORT}`);
});

