const dayjs = require('dayjs');

const caDays = ["Diumenge","Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte"];

function dayNameCA(date = new Date()) {
  return caDays[dayjs(date).day()];
}

function tomorrowNameCA() {
  return caDays[dayjs().add(1, 'day').day()];
}

function weekNamesCA() {
  // Lunes a Viernes (cat: Dilluns..Divendres)
  return ["Dilluns","Dimarts","Dimecres","Dijous","Divendres"];
}

module.exports = { dayNameCA, tomorrowNameCA, weekNamesCA };
