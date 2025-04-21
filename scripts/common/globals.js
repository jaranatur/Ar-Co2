export let earth, hintText, sceneSelection, arrow;

// ⬅️ Neue globale Antwort-Sammlung
export const answers = {};

export function initGlobals() {
  console.log("🌍 initGlobals() wird ausgeführt...");

  earth = document.getElementById("earth");
  hintText = document.getElementById("hint-text");
  sceneSelection = document.getElementById("scene-selection");
  arrow = document.getElementById("arrow-icon-entity");

  if (!earth) {
    console.error("❌ Fehler: 'earth' konnte nicht gefunden werden! Warte 500ms und versuche erneut...");
    setTimeout(initGlobals, 500);
    return;
  }

  console.log("✅ initGlobals erfolgreich! Earth:", earth);
}

let co2Total = 0;

export function updateCO2Value(amount) {
  co2Total += amount;
  const bar = document.getElementById('co2-bar');
  if (bar) {
    bar.style.width = `${Math.min(co2Total, 100)}%`;
  }
}
