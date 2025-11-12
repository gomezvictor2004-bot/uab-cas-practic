# Smart UniBot (backend)
Horaris UAB via Telegram (Express + Webhook)
# Smart UniBot

Inicial commit 🚀
Asistente Universitario Inteligente que centraliza la información académica y administrativa para estudiantes. Este repositorio contiene el backend en Node.js/Express y la definición de los servicios clave: scraping académico con Puppeteer, automatizaciones con n8n, resúmenes con IA y notificaciones multi-canal.

## 🌐 Arquitectura general

```text
[Portales UAB / Moodle / PDFs]
           │
           ▼
     Puppeteer Scraper ─────────────┐
           │                        │
           ▼                        │
      API Express (Node.js)         │
           │                        │
           ├── n8n (automations)    │
           │                        │
           ├── IA (OpenAI/Perplexity)
           │                        │
           ├── Integraciones (Telegram/Discord/Web)
           │                        │
           ▼                        │
      Comet (monitorización) ◀──────┘
```

- **Puppeteer** obtiene horarios, avisos, noticias y apuntes desde los portales oficiales.
- **Node.js/Express** expone una API REST con endpoints para tareas, documentos, briefing diario y estado del sistema.
- **n8n** consume la API (o recibe webhooks) para generar recordatorios y sincronizaciones con Google Calendar, Trello u otras herramientas.
- **IA (OpenAI/Perplexity)** resume apuntes, genera preguntas tipo test y responde a consultas del chat.
- **Comet** registra métricas de uso, latencias y errores para mejorar el asistente.

## 📁 Estructura del proyecto

```
├── data/
│   └── state.json              # Persistencia ligera en JSON (demo)
├── scripts/
│   └── check-format.js         # Script de formato
├── src/
│   ├── config/
│   │   └── env.js              # Gestión de variables de entorno
│   ├── controllers/            # Lógica HTTP
│   ├── routes/                 # Rutas de Express
│   ├── services/               # Casos de uso (scraping, IA, cron…)
│   ├── utils/                  # Utilidades comunes (logger, middleware)
│   ├── server.js               # Bootstrap de Express
│   └── index.js                # Punto de entrada (inicia cron y servidor)
└── README.md
```

## 🚀 Puesta en marcha

```bash
# Instalar dependencias
npm install

# Variables de entorno opcionales (.env)
PORT=3000
OPENAI_API_KEY="tu_api_key"
N8N_WEBHOOK_URL="https://n8n.example/webhook"
CAMPUS_NEWS_URL="https://campus.uab.cat/noticias"
MOCK_SCRAPER=true
DAILY_BRIEF_CRON="0 6 * * *"

# Ejecutar en desarrollo (requiere Node.js 18+)
npm run dev
```

> **Nota:** con `MOCK_SCRAPER=true` el backend devuelve datos de ejemplo sin lanzar Chrome. Para producción, establece `MOCK_SCRAPER=false` y ajusta los selectores en `scrapingService`.

## 🧠 Endpoints principales

| Método | Ruta                  | Descripción |
| ------ | --------------------- | ----------- |
| GET    | `/api/status`         | Salud del servicio. |
| GET    | `/api/briefings`      | Briefing diario consolidado (`studentId` como query). |
| POST   | `/api/documents/summary` | Genera resumen y preguntas a partir de apuntes. |
| GET    | `/api/tasks`          | Lista de tareas filtradas por estudiante/estado. |
| POST   | `/api/tasks`          | Crea una nueva tarea manualmente. |

Los datos se guardan en `data/state.json` para simplificar la demo. En producción se recomienda sustituirlo por una base de datos (PostgreSQL, MongoDB, etc.).

## 📋 Información que necesitamos para personalizarlo a la UAB

Para que el Smart UniBot refleje fielmente los portales y procesos de la UAB necesitamos los siguientes insumos:

1. **Portales y autenticación**
   - URLs de acceso a los servicios oficiales (SIGMA, Moodle, Campus Virtual, calendario académico, tablones de noticias).
   - Método de autenticación (SSO corporativo, login clásico, MFA) y, si es posible, un usuario de pruebas o credenciales temporales.
   - Restricciones de uso (horarios, IPs permitidas, políticas de rate limiting).

2. **Estructura de datos académicos**
   - Formato de horarios (campos que aparecen en cada clase: aula, edificio, tipo, docente, etc.).
   - Estructura del calendario de exámenes y entregas.
   - Cómo se identifican las asignaturas (códigos oficiales, cursos, grupos).

3. **Fuentes de noticias y avisos**
   - URLs RSS/Atom o páginas donde se publican novedades.
   - Criterios de relevancia o categorías prioritarias.
   - Frecuencia con la que se actualizan.

4. **Política de documentos y apuntes**
   - Tipos de archivos habituales (PDF, DOCX, presentaciones) y tamaños máximos previstos.
   - Idiomas predominantes para afinar los prompts de resumen.
   - Requisitos de privacidad o retención de datos.

5. **Canales de notificación y automatización**
   - Herramientas que ya utilicéis (correo institucional, Telegram, Teams, app móvil) y cómo integrarlas (webhooks, bots, API keys).
   - Flujo deseado para n8n: triggers, plantillas de mensajes, calendarios con los que sincronizar.

6. **Métricas y seguimiento**
   - Indicadores que os interesen (uso diario, tasa de apertura de recordatorios, satisfacción, incidencias).
   - Cualquier requisito de reporting para Comet u otra plataforma de analítica.

Con esta información podremos adaptar los scrapers, workflows y resúmenes de IA al contexto real de la UAB y dejar el proyecto listo para ser utilizado por el equipo.

## 🔄 Automatizaciones con n8n

1. **Scraping diario**: `schedulerService` ejecuta `syncAcademicData()` a la hora configurada (`DAILY_BRIEF_CRON`).
2. **Briefing diario**: tras sincronizar datos, se genera un resumen por estudiante y se envía a n8n (`sendBriefingNotification`).
3. **n8n** distribuye el briefing por correo, Telegram, Discord o sincroniza con calendarios según los flujos diseñados.

```
cron (node-cron) → syncAcademicData → dispatchDailyBriefings → n8n webhook → canales destino
```

## 🤖 Integración con chatbots

- La API puede exponerse detrás de un bot de Telegram/Discord mediante webhooks.
- Ejemplo de flujo: el bot recibe "¿Qué tareas tengo esta semana?" → consulta `GET /api/tasks?studentId=...` → responde con la lista ordenada.

## 📊 Monitorización con Comet

Integra un agente de Comet en los servicios críticos (scraping, resumen, envíos) para registrar métricas:

- Latencia de respuestas de IA.
- Número de recordatorios enviados.
- Errores de scraping.

Esto permite detectar cuellos de botella y priorizar mejoras.

## ✅ Próximos pasos sugeridos

1. Sustituir `data/state.json` por una base de datos persistente.
2. Añadir autenticación (JWT o SSO universitario) para estudiantes y profesores.
3. Implementar websockets/notificaciones push en el frontend.
4. Añadir pruebas automatizadas (Jest) y pipeline CI/CD.
5. Crear un panel web que consuma la API y muestre dashboards personalizados.

Con esta base tienes un backend funcional y extensible para el Smart UniBot listo para integrarse en tus herramientas diarias.
