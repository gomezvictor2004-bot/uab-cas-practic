const statusIndicator = document.querySelector('.status-indicator');
const statusMessage = document.getElementById('status-message');
const briefingContent = document.getElementById('briefing-content');
const tasksContent = document.getElementById('tasks-content');
const refreshBriefing = document.getElementById('refresh-briefing');
const refreshTasks = document.getElementById('refresh-tasks');
const summaryForm = document.getElementById('summary-form');
const documentText = document.getElementById('document-text');
const documentLanguage = document.getElementById('document-language');
const summaryResult = document.getElementById('summary-result');
const taskTemplate = document.getElementById('task-template');
const briefingTemplate = document.getElementById('briefing-template');

const apiBase = '/api';

const parseError = async (response) => {
  try {
    const payload = await response.json();
    if (payload?.error?.message) {
      return payload.error.message;
    }
  } catch (_) {
    /* noop */
  }
  return `Error ${response.status}`;
};

const setStatus = (online, message) => {
  statusIndicator.dataset.status = online ? 'online' : 'offline';
  statusMessage.textContent = message;
};

const renderTasks = (tasks = []) => {
  tasksContent.innerHTML = '';

  if (!tasks.length) {
    tasksContent.innerHTML = '<p class="empty">Sin tareas pendientes.</p>';
    return;
  }

  tasks
    .sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0))
    .forEach((task) => {
      const instance = taskTemplate.content.cloneNode(true);
      instance.querySelector('.task-title').textContent = task.title;
      instance.querySelector('.task-status').textContent = task.status ?? 'sin estado';
      instance.querySelector('.task-course').textContent = task.course ? `Asignatura: ${task.course}` : '';
      instance.querySelector('.task-due').textContent = task.dueDate
        ? `Entrega: ${new Date(task.dueDate).toLocaleString()}`
        : '';
      tasksContent.appendChild(instance);
    });
};

const renderBriefing = (briefing) => {
  briefingContent.innerHTML = '';

  if (!briefing || !Object.keys(briefing).length) {
    briefingContent.innerHTML = '<p class="empty">Sin datos disponibles.</p>';
    return;
  }

  Object.entries(briefing).forEach(([section, items]) => {
    const instance = briefingTemplate.content.cloneNode(true);
    instance.querySelector('h3').textContent = section;
    const list = instance.querySelector('ul');

    if (Array.isArray(items) && items.length) {
      items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
      });
    } else if (typeof items === 'string') {
      const li = document.createElement('li');
      li.textContent = items;
      list.appendChild(li);
    } else {
      const li = document.createElement('li');
      li.textContent = 'Sin detalles disponibles.';
      list.appendChild(li);
    }

    briefingContent.appendChild(instance);
  });
};

const fetchStatus = async () => {
  try {
    const response = await fetch(`${apiBase}/status`);
    if (!response.ok) {
      const message = await parseError(response);
      setStatus(false, message);
      return;
    }
    const data = await response.json();
    setStatus(true, data.message ?? 'Servicio operativo');
  } catch (error) {
    setStatus(false, 'No se pudo conectar con la API');
  }
};

const fetchTasks = async () => {
  tasksContent.innerHTML = '<p class="empty">Cargando tareas...</p>';
  try {
    const response = await fetch(`${apiBase}/tasks`);
    if (!response.ok) {
      const message = await parseError(response);
      tasksContent.innerHTML = `<p class="empty">${message}</p>`;
      return;
    }
    const { tasks } = await response.json();
    renderTasks(tasks);
  } catch (error) {
    tasksContent.innerHTML = '<p class="empty">No se pudo obtener la información.</p>';
  }
};

const fetchBriefing = async () => {
  briefingContent.innerHTML = '<p class="empty">Generando briefing...</p>';
  try {
    const response = await fetch(`${apiBase}/briefings/daily`);
    if (!response.ok) {
      const message = await parseError(response);
      briefingContent.innerHTML = `<p class="empty">${message}</p>`;
      return;
    }
    const { briefing } = await response.json();
    renderBriefing(briefing);
  } catch (error) {
    briefingContent.innerHTML = '<p class="empty">No se pudo obtener el briefing.</p>';
  }
};

summaryForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  summaryResult.classList.add('hidden');
  summaryResult.innerHTML = '';

  const content = documentText.value.trim();
  if (!content) {
    summaryResult.classList.remove('hidden');
    summaryResult.innerHTML = '<p class="empty">Introduce algún texto para generar el resumen.</p>';
    return;
  }

  const payload = {
    content,
    language: documentLanguage.value,
  };

  summaryResult.classList.remove('hidden');
  summaryResult.innerHTML = '<p class="empty">Generando resumen...</p>';

  try {
    const response = await fetch(`${apiBase}/documents/summary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const message = await parseError(response);
      summaryResult.innerHTML = `<p class="empty">${message}</p>`;
      return;
    }

    const data = await response.json();
    summaryResult.innerHTML = '';
    const { summary, keyPoints = [] } = data;
    const summaryParagraph = document.createElement('p');
    summaryParagraph.textContent = summary ?? 'No se generó resumen.';
    summaryResult.appendChild(summaryParagraph);

    if (keyPoints.length) {
      const listTitle = document.createElement('h4');
      listTitle.textContent = 'Puntos clave';
      summaryResult.appendChild(listTitle);

      const list = document.createElement('ul');
      keyPoints.forEach((point) => {
        const li = document.createElement('li');
        li.textContent = point;
        list.appendChild(li);
      });
      summaryResult.appendChild(list);
    }
  } catch (error) {
    summaryResult.innerHTML = '<p class="empty">No se pudo obtener el resumen.</p>';
  }
});

refreshBriefing?.addEventListener('click', fetchBriefing);
refreshTasks?.addEventListener('click', fetchTasks);

fetchStatus();
fetchBriefing();
fetchTasks();
