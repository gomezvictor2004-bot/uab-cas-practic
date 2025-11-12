// backend/src/schedule/store.js
// items: { day, start, end, code, subject, type, room }

function listCourses() {
  return [
    { id: 'eit-1', name: '1r Curs Grau Empresa i Tecnologia', group: 'G20 Matí' },
    { id: 'eit-2', name: '2n Curs Grau Empresa i Tecnologia', group: 'G20 Matí' },
    { id: 'eit-3', name: '3r Curs Grau Empresa i Tecnologia', group: 'G20 Matí' },
    { id: 'eit-4', name: '4t Curs Grau Empresa i Tecnologia', group: 'G20 (Matí+Tarda)' },
  ];
}


// ===== Dies (CA) =====
/*
Dilluns, Dimarts, Dimecres, Dijous, Divendres
*/

// ========= 1r CURS =========
// S1
const EIT_1_S1 = [
  { day: 'Dilluns',   start: '09:00', end: '11:00', code: '102173', subject: "Economia de l'Empresa", type: 'TE',   room: '' },
  { day: 'Dilluns',   start: '11:15', end: '12:15', code: '102120', subject: "Introducció a l'Economia",           type: 'TE',   room: '' },
  { day: 'Dilluns',   start: '12:15', end: '13:15', code: '102120', subject: "Introducció a l'Economia",           type: 'PAUL', room: '' },

  { day: 'Dimarts',   start: '09:00', end: '11:00', code: '102151', subject: 'IRP-DA',                              type: 'TE',   room: '' },
  { day: 'Dimarts',   start: '11:15', end: '12:15', code: '102097', subject: 'Matemàtiques I',                      type: 'TE',   room: '' },
  { day: 'Dimarts',   start: '12:15', end: '13:15', code: '102097', subject: 'Matemàtiques I',                      type: 'PAUL', room: '' },

  { day: 'Dimecres',  start: '09:00', end: '11:00', code: '102120', subject: "Introducció a l'Economia",           type: 'TE',   room: '' },
  { day: 'Dimecres',  start: '11:15', end: '12:15', code: '102183', subject: 'Dret Empresarial',                    type: 'TE',   room: '' },
  { day: 'Dimecres',  start: '12:15', end: '13:15', code: '102183', subject: 'Dret Empresarial',                    type: 'PAUL', room: '202' },

  { day: 'Dijous',    start: '09:00', end: '11:00', code: '102097', subject: 'Matemàtiques I',                      type: 'TE',   room: '' },
  { day: 'Dijous',    start: '11:15', end: '12:15', code: '102173', subject: "Economia de l'Empresa",               type: 'TE',   room: '' },
  { day: 'Dijous',    start: '12:15', end: '13:15', code: '102173', subject: "Economia de l'Empresa",               type: 'PAUL', room: '201-202' },

  { day: 'Divendres', start: '09:00', end: '11:00', code: '102183', subject: 'Dret Empresarial',                    type: 'TE',   room: '' },
  { day: 'Divendres', start: '11:15', end: '13:15', code: '102151', subject: 'IRP-DA',                              type: 'PAUL', room: '201-202' },
];

// S2
const EIT_1_S2 = [
  { day: 'Dilluns',   start: '09:00', end: '11:00', code: '102115', subject: 'Estadística I',                       type: 'TE',   room: '' },
  { day: 'Dilluns',   start: '11:15', end: '12:15', code: '102143', subject: 'Economia Internacional',              type: 'TE',   room: 'TE20/T30' },
  { day: 'Dilluns',   start: '12:15', end: '13:15', code: '102143', subject: 'Economia Internacional',              type: 'PAUL', room: '' },

  { day: 'Dimarts',   start: '09:00', end: '11:00', code: '102196', subject: 'Comptabilitat Bàsica',                type: 'TE',   room: '' },
  { day: 'Dimarts',   start: '11:15', end: '12:15', code: '102154', subject: 'Fonaments de Programació',            type: 'PAUL', room: '201' },
  { day: 'Dimarts',   start: '12:15', end: '13:15', code: '102154', subject: 'Fonaments de Programació',            type: 'PAUL', room: '202' },

  { day: 'Dimecres',  start: '09:00', end: '11:00', code: '102143', subject: 'Economia Internacional (tarda)',      type: 'TE',   room: '' },
  { day: 'Dimecres',  start: '11:15', end: '12:15', code: '102096', subject: 'Matemàtiques II',                     type: 'TE',   room: '' },
  { day: 'Dimecres',  start: '12:15', end: '13:15', code: '102096', subject: 'Matemàtiques II',                     type: 'PAUL', room: '' },

  { day: 'Dijous',    start: '09:00', end: '11:00', code: '102154', subject: 'Fonaments de Programació',            type: 'TE',   room: '' },
  { day: 'Dijous',    start: '11:15', end: '12:15', code: '102115', subject: 'Estadística I',                       type: 'TE',   room: '' },
  { day: 'Dijous',    start: '12:15', end: '13:15', code: '102115', subject: 'Estadística I',                       type: 'PAUL-PLAB', room: '' },

  { day: 'Divendres', start: '09:00', end: '11:00', code: '102096', subject: 'Matemàtiques II',                     type: 'TE',   room: '' },
  { day: 'Divendres', start: '11:15', end: '12:15', code: '102196', subject: 'Comptabilitat Bàsica',                type: 'TE',   room: '' },
  { day: 'Divendres', start: '12:15', end: '13:15', code: '102196', subject: 'Comptabilitat Bàsica',                type: 'PAUL', room: '201' },
  { day: 'Divendres', start: '13:15', end: '14:15', code: '102196', subject: 'Comptabilitat Bàsica',                type: 'PAUL', room: '202' },
];

// ========= 2n CURS =========
// S1
const EIT_2_S1 = [
  { day: 'Dilluns',   start: '09:00', end: '11:00', code: '102144', subject: 'Economia Espanyola',                  type: 'TE',   room: '' },
  { day: 'Dilluns',   start: '11:15', end: '12:15', code: '106398', subject: 'Fonaments dels sistemes informàtics', type: 'PAUL', room: '201' },
  { day: 'Dilluns',   start: '12:15', end: '13:15', code: '106398', subject: 'Fonaments dels sistemes informàtics', type: 'PAUL', room: '202' },

  { day: 'Dimarts',   start: '09:00', end: '11:00', code: '102119', subject: 'Microeconomia',                       type: 'TE',   room: '' },
  { day: 'Dimarts',   start: '11:15', end: '12:15', code: '102114', subject: 'Estadística II',                      type: 'TE',   room: '' },
  { day: 'Dimarts',   start: '12:15', end: '13:15', code: '102114', subject: 'Estadística II',                      type: 'PAUL-PLAB', room: 'PLAB201-PLAB202' },

  { day: 'Dimecres',  start: '09:00', end: '11:00', code: '106398', subject: 'Fonaments dels sistemes informàtics', type: 'TE',   room: '' },
  { day: 'Dimecres',  start: '11:15', end: '12:15', code: '102186', subject: 'Base de Dades',                       type: 'PAUL', room: '201' },
  { day: 'Dimecres',  start: '12:15', end: '13:15', code: '102186', subject: 'Base de Dades',                       type: 'PAUL', room: '202' },

  { day: 'Dijous',    start: '09:00', end: '11:00', code: '102114', subject: 'Estadística II',                      type: 'TE',   room: '' },
  { day: 'Dijous',    start: '11:15', end: '12:15', code: '102144', subject: 'Economia Espanyola',                  type: 'TE',   room: '' },
  { day: 'Dijous',    start: '12:15', end: '13:15', code: '102144', subject: 'Economia Espanyola',                  type: 'PAUL-PLAB', room: '' },

  { day: 'Divendres', start: '09:00', end: '11:00', code: '102186', subject: 'Base de Dades',                       type: 'TE',   room: '' },
  { day: 'Divendres', start: '11:15', end: '12:15', code: '102119', subject: 'Microeconomia',                       type: 'TE',   room: '' },
  { day: 'Divendres', start: '12:15', end: '13:15', code: '102119', subject: 'Microeconomia',                       type: 'PAUL', room: '' },
];

// S2
const EIT_2_S2 = [
  { day: 'Dilluns',   start: '09:00', end: '11:00', code: '104609', subject: 'Gestió per processos',                type: 'TE',   room: '' },
  { day: 'Dilluns',   start: '11:15', end: '12:15', code: '102141', subject: 'Història Econòmica',                  type: 'TE',   room: '' },
  { day: 'Dilluns',   start: '12:15', end: '13:15', code: '102141', subject: 'Història Econòmica',                  type: 'PAUL', room: '' },

  { day: 'Dimarts',   start: '09:00', end: '11:00', code: '102148', subject: "Introducció als sistemes d'informació", type: 'TE', room: '' },
  { day: 'Dimarts',   start: '11:15', end: '12:15', code: '102150', subject: 'Investigació Operativa',              type: 'TE',   room: '' },
  { day: 'Dimarts',   start: '12:15', end: '13:15', code: '102150', subject: 'Investigació Operativa',              type: 'PAUL', room: '' },

  { day: 'Dimecres',  start: '09:00', end: '11:00', code: '102141', subject: 'Història Econòmica',                  type: 'TE',   room: '' },
  { day: 'Dimecres',  start: '11:15', end: '12:15', code: '102180', subject: 'Finances',                            type: 'TE',   room: '' },
  { day: 'Dimecres',  start: '12:15', end: '13:15', code: '102180', subject: 'Finances',                            type: 'PAUL', room: '' },

  { day: 'Dijous',    start: '09:00', end: '11:00', code: '102150', subject: 'Investigació Operativa',              type: 'TE',   room: '' },
  { day: 'Dijous',    start: '11:15', end: '12:15', code: '104609', subject: 'Gestió per processos',                type: 'TE',   room: '' },
  { day: 'Dijous',    start: '12:15', end: '13:15', code: '104609', subject: 'Gestió per processos',                type: 'PAUL', room: '' },

  { day: 'Divendres', start: '09:00', end: '11:00', code: '102180', subject: 'Finances',                            type: 'TE',   room: '' },
  { day: 'Divendres', start: '11:15', end: '12:15', code: '102148', subject: "Introducció als sistemes d'informació", type: 'TE', room: '' },
  { day: 'Divendres', start: '12:15', end: '13:15', code: '102148', subject: "Introducció als sistemes d'informació", type: 'PAUL', room: '' },
];

// ========= 3r CURS =========
// S1
const EIT_3_S1 = [
  // Dilluns
  { day: 'Dilluns',   start: '09:00', end: '11:00', code: '104608', subject: 'Sistemes de Gestió de costos',        type: 'TE',   room: '' },
  { day: 'Dilluns',   start: '11:15', end: '12:15', code: '102118', subject: 'Macroeconomia',                       type: 'TE',   room: '' },
  { day: 'Dilluns',   start: '12:15', end: '13:15', code: '102118', subject: 'Macroeconomia',                       type: 'PAUL', room: '' },

  // Dimarts
  { day: 'Dimarts',   start: '09:00', end: '11:00', code: '102181', subject: "Direcció Estratègica de l'Empresa",   type: 'TE',   room: '' },
  { day: 'Dimarts',   start: '11:15', end: '12:15', code: '102182', subject: "Direcció d'Operacions",               type: 'TE',   room: '' },
  { day: 'Dimarts',   start: '12:15', end: '13:15', code: '102182', subject: "Direcció d'Operacions",               type: 'PAUL', room: '' },

  // Dimecres
  { day: 'Dimecres',  start: '09:00', end: '11:00', code: '102118', subject: 'Macroeconomia',                       type: 'TE',   room: '' },
  { day: 'Dimecres',  start: '11:15', end: '12:15', code: '102179', subject: 'Gestió de Recursos Humans',           type: 'TE',   room: '' },
  { day: 'Dimecres',  start: '12:15', end: '13:15', code: '102179', subject: 'Gestió de Recursos Humans',           type: 'PAUL', room: '' },

  // Dijous
  { day: 'Dijous',    start: '09:00', end: '11:00', code: '102182', subject: "Direcció d'Operacions",               type: 'TE',   room: '' },
  { day: 'Dijous',    start: '11:15', end: '12:15', code: '104608', subject: 'Sistemes de Gestió de costos',        type: 'TE',   room: '' },
  { day: 'Dijous',    start: '12:15', end: '13:15', code: '104608', subject: 'Sistemes de Gestió de costos',        type: 'PAUL', room: '' },

  // Divendres
  { day: 'Divendres', start: '09:00', end: '11:00', code: '102179', subject: 'Gestió de Recursos Humans',           type: 'TE',   room: '' },
  { day: 'Divendres', start: '11:15', end: '12:15', code: '102181', subject: "Direcció Estratègica de l'Empresa",   type: 'TE',   room: '' },
  { day: 'Divendres', start: '12:15', end: '13:15', code: '102181', subject: "Direcció Estratègica de l'Empresa",   type: 'PAUL', room: '' },
];

// S2
const EIT_3_S2 = [
  // Dilluns
  { day: 'Dilluns',   start: '09:00', end: '11:00', code: '107570', subject: 'Introducció a la Gestió de la Innovació', type: 'TE',   room: '' },
  { day: 'Dilluns',   start: '11:15', end: '12:15', code: '107571', subject: 'Sistemes Integrats de Gestió',            type: 'TE',   room: '' },
  { day: 'Dilluns',   start: '12:15', end: '13:15', code: '107571', subject: 'Sistemes Integrats de Gestió',            type: 'PAUL', room: '' },

  // Dimarts
  { day: 'Dimarts',   start: '09:00', end: '11:00', code: '102191', subject: "Projectes d'Innovació Tecnològica",   type: 'TE',   room: '' },
  { day: 'Dimarts',   start: '11:15', end: '12:15', code: '106685', subject: 'Màrqueting digital',                  type: 'TE',   room: '' },
  { day: 'Dimarts',   start: '12:15', end: '13:15', code: '106685', subject: 'Màrqueting digital',                  type: 'PAUL', room: '' },

  // Dimecres
  { day: 'Dimecres',  start: '09:00', end: '11:00', code: '107571', subject: 'Sistemes Integrats de Gestió',        type: 'TE',   room: '' },
  { day: 'Dimecres',  start: '11:15', end: '12:15', code: '107563', subject: 'Business Intelligence',               type: 'TE',   room: '' },
  { day: 'Dimecres',  start: '12:15', end: '13:15', code: '107536', subject: 'Business Intelligence',               type: 'PLAB', room: '' },

  // Dijous
  { day: 'Dijous',    start: '09:00', end: '11:00', code: '106685', subject: 'Màrqueting digital',                  type: 'TE',   room: '' },
  { day: 'Dijous',    start: '11:15', end: '12:15', code: '107570', subject: 'Introducció a la Gestió de la Innovació', type: 'TE', room: '' },
  { day: 'Dijous',    start: '12:15', end: '13:15', code: '107570', subject: 'Introducció a la Gestió de la Innovació', type: 'PAUL', room: '' },

  // Divendres
  { day: 'Divendres', start: '09:00', end: '11:00', code: '107563', subject: 'Business Intelligence',               type: 'TE',   room: '' },
  { day: 'Divendres', start: '11:15', end: '12:15', code: '102191', subject: "Projectes d'Innovació Tecnològica",   type: 'TE',   room: '' },
  { day: 'Divendres', start: '12:15', end: '13:15', code: '102191', subject: "Projectes d'Innovació Tecnològica",   type: 'PAUL', room: '' },
];

// ====== 4t CURS — G20 ======

// --- 4º curso · 1er semestre (matí + tarda) ---
const EIT_4_S1 = [
  // MATÍ — Dilluns (Xarxes)
  { day: 'Dilluns', start: '09:00', end: '11:00', code: '102169', subject: 'Xarxes', type: 'TE', room: '' },
  { day: 'Dilluns', start: '11:15', end: '12:15', code: '102169', subject: 'Xarxes', type: 'TE', room: '' },
  { day: 'Dilluns', start: '12:15', end: '13:15', code: '102169', subject: 'Xarxes', type: 'PLAB', room: '' },
  { day: 'Dilluns', start: '13:15', end: '14:15', code: '102169', subject: 'Xarxes', type: 'Activitats de suport', room: '' },

  // MATÍ — Divendres (Societat de la Informació)
  { day: 'Divendres', start: '09:00', end: '11:00', code: '107571', subject: 'Societat de la Informació', type: 'TE', room: '' },
  { day: 'Divendres', start: '11:15', end: '12:15', code: '107571', subject: 'Societat de la Informació', type: 'TE', room: '' },
  { day: 'Divendres', start: '12:15', end: '13:15', code: '107571', subject: 'Societat de la Informació', type: 'PAUL', room: '' },
  { day: 'Divendres', start: '13:15', end: '14:15', code: '107571', subject: 'Societat de la Informació', type: 'Activitats de suport', room: '' },

  // TARDA — 15:30–17:30 (TE)
  { day: 'Dilluns',   start: '15:30', end: '17:30', code: '102170', subject: 'Tecnologia Web', type: 'TE', room: '' },
  { day: 'Dimarts',   start: '15:30', end: '17:30', code: '102161', subject: 'Gestió Seguretat dels Sistemes Informació', type: 'TE', room: '' },
  { day: 'Dimecres',  start: '15:30', end: '17:30', code: '102192', subject: 'Sistemes de suport a la presa de decisions', type: 'TE', room: '' },
  { day: 'Dijous',    start: '15:30', end: '17:30', code: '107563', subject: 'Business Intelligence', type: 'TE', room: '' },
  { day: 'Divendres', start: '15:30', end: '17:30', code: '107565', subject: "Tecnologies Intel·ligents i Arquitectura d'Empresa", type: 'TE', room: '' },

  // TARDA — 17:45–18:45 (pràctiques 1)
  { day: 'Dilluns',   start: '17:45', end: '18:45', code: '102170', subject: 'Tecnologia Web', type: 'PLAB', room: '' },
  { day: 'Dimarts',   start: '17:45', end: '18:45', code: '102161', subject: 'Gestió Seguretat dels Sistemes Informació', type: 'PAUL', room: '' },
  { day: 'Dimecres',  start: '17:45', end: '18:45', code: '102192', subject: 'Sistemes de suport a la presa de decisions', type: 'PAUL', room: '' },
  { day: 'Dijous',    start: '17:45', end: '18:45', code: '107563', subject: 'Business Intelligence', type: 'PAUL', room: '' },
  { day: 'Divendres', start: '17:45', end: '18:45', code: '107565', subject: "Tecnologies Intel·ligents i Arquitectura d'Empresa", type: 'PAUL', room: '' },

  // TARDA — 18:45–19:45 (pràctiques 2)
  { day: 'Dilluns',   start: '18:45', end: '19:45', code: '102170', subject: 'Tecnologia Web', type: 'PLAB', room: '' },
  { day: 'Dimarts',   start: '18:45', end: '19:45', code: '102161', subject: 'Gestió Seguretat dels Sistemes Informació', type: 'PAUL', room: '' },
  { day: 'Dimecres',  start: '18:45', end: '19:45', code: '102192', subject: 'Sistemes de suport a la presa de decisions', type: 'PLAB', room: '' },
  { day: 'Dijous',    start: '18:45', end: '19:45', code: '107563', subject: 'Business Intelligence', type: 'PLAB', room: '' },
  { day: 'Divendres', start: '18:45', end: '19:45', code: '107565', subject: "Tecnologies Intel·ligents i Arquitectura d'Empresa", type: 'PAUL', room: '' },

  // TARDA — 19:45–20:45 (suport)
  { day: 'Dilluns',   start: '19:45', end: '20:45', code: '102170', subject: 'Tecnologia Web', type: 'Activitats de suport', room: '' },
  { day: 'Dimarts',   start: '19:45', end: '20:45', code: '102161', subject: 'Gestió Seguretat dels Sistemes Informació', type: 'Activitats de suport', room: '' },
  { day: 'Dimecres',  start: '19:45', end: '20:45', code: '107536', subject: 'Business Intelligence', type: 'Activitats de suport', room: '' },
  { day: 'Dijous',    start: '19:45', end: '20:45', code: '107564', subject: 'Emprenedoria digital', type: 'Activitats de suport', room: '' },
  { day: 'Divendres', start: '19:45', end: '20:45', code: '107565', subject: "Tecnologies Intel·ligents i Arquitectura d'Empresa", type: 'Activitats de suport', room: '' },
];

// --- 4º curso · 2º semestre (tarda) ---
const EIT_4_S2 = [
  // 15:30–17:00 (TE)
  { day: 'Dilluns',   start: '15:30', end: '17:00', code: '106399', subject: "Programació d'aplicacions per dispositius mòbils", type: 'TE', room: '' },
  { day: 'Dimarts',   start: '15:30', end: '17:00', code: '101764', subject: 'Intel·ligència Artificial', type: 'TE', room: '' },
  { day: 'Dimecres',  start: '15:30', end: '17:00', code: '107566', subject: 'Estratègia i lideratge digital', type: 'TE', room: '' },
  { day: 'Dijous',    start: '15:30', end: '17:00', code: '102175', subject: 'Projectes de desenvolupament de software corporatiu', type: 'TE', room: '' },
  { day: 'Divendres', start: '15:30', end: '17:00', code: '102167', subject: "Sistemes d'Informació per a la Gestió d'Operacions", type: 'TE', room: '' },

  // 17:45–18:45
  { day: 'Dilluns',   start: '17:45', end: '18:45', code: '106399', subject: "Programació d'aplicacions per dispositius mòbils", type: 'TE', room: '' },
  { day: 'Dimarts',   start: '17:45', end: '18:45', code: '101764', subject: 'Intel·ligència Artificial', type: 'PAUL', room: '11' },
  { day: 'Dimecres',  start: '17:45', end: '18:45', code: '107566', subject: 'Estratègia i lideratge digital', type: 'TE', room: '' },
  { day: 'Dijous',    start: '17:45', end: '18:45', code: '102175', subject: 'Projectes de desenvolupament de software corporatiu', type: 'TE', room: '' },
  { day: 'Divendres', start: '17:45', end: '18:45', code: '102167', subject: "Sistemes d'Informació per a la Gestió d'Operacions", type: 'TE', room: '' },

  // 18:00–18:45 / franja següent (algunes pràctiques)
  { day: 'Dimarts',   start: '18:00', end: '18:45', code: '101764', subject: 'Intel·ligència Artificial', type: 'PAUL', room: '12' },

  // 18:45–19:45 (pràctiques)
  { day: 'Dilluns',   start: '18:45', end: '19:45', code: '106399', subject: "Programació d'aplicacions per dispositius mòbils", type: 'PLAB', room: '' },
  { day: 'Dimecres',  start: '18:45', end: '19:45', code: '107566', subject: 'Estratègia i lideratge digital', type: 'PAUL', room: '' },
  { day: 'Dijous',    start: '18:45', end: '19:45', code: '102175', subject: 'Projectes de desenvolupament de software corporatiu', type: 'PLAB', room: '' },
  { day: 'Divendres', start: '18:45', end: '19:45', code: '102167', subject: "Sistemes d'Informació per a la Gestió d'Operacions", type: 'PLAB', room: '' },

  // 19:00–19:45 (pràctica addicional dilluns)
  { day: 'Dilluns',   start: '19:00', end: '19:45', code: '106399', subject: "Programació d'aplicacions per dispositius mòbils", type: 'PLAB', room: '' },

  // 19:45–20:45 (suport)
  { day: 'Dilluns',   start: '19:45', end: '20:45', code: '106399', subject: "Programació d'aplicacions per dispositius mòbils", type: 'Activitats de suport', room: '' },
  { day: 'Dimarts',   start: '19:45', end: '20:45', code: '101764', subject: 'Intel·ligència Artificial', type: 'PAUL', room: '34' },
  { day: 'Dimecres',  start: '19:45', end: '20:45', code: '107566', subject: 'Estratègia i lideratge digital', type: 'Activitats de suport', room: '' },
  { day: 'Dijous',    start: '19:45', end: '20:45', code: '102175', subject: 'Projectes de desenvolupament de software corporatiu', type: 'Activitats de suport', room: '' },
  { day: 'Divendres', start: '19:45', end: '20:45', code: '102167', subject: "Sistemes d'Informació per a la Gestió d'Operacions", type: 'Activitats de suport', room: '' },
];


// ======= MAPA =======
const SCHEDULE = {
  'eit-1': { '1': EIT_1_S1, '2': EIT_1_S2 },
  'eit-2': { '1': EIT_2_S1, '2': EIT_2_S2 },
  'eit-3': { '1': EIT_3_S1, '2': EIT_3_S2 },
  'eit-4': { '1': EIT_4_S1, '2': EIT_4_S2 },
};

function getSchedule(course, semester) {
  const c = SCHEDULE[course];
  if (!c) return null;
  const s = c[String(semester)];
  if (!s || !Array.isArray(s)) return null;
  return s;
}

module.exports = { listCourses, getSchedule };
