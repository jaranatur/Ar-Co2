// globals.js
export let earth, hintText, infoBox, sceneSelection, arrow;

export function initGlobals() {
    console.log("🌍 initGlobals() wird ausgeführt...");

    // Elemente abrufen und prüfen
    earth = document.getElementById("earth");
    hintText = document.getElementById("hint-text");
    infoBox = document.getElementById("info-box");
    sceneSelection = document.getElementById("scene-selection");
    bike = document.getElementById("scene-bike");
    arrow = document.getElementById("arrow");

    if (!earth) {
        console.error("❌ Fehler: 'earth' konnte nicht gefunden werden! Warte 500ms und versuche erneut...");
        setTimeout(initGlobals, 500);
        return;
    }

    console.log("✅ initGlobals erfolgreich! Earth:", earth);
}
