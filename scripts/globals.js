export let earth, hintText, infoBox, sceneSelection;

export function initGlobals() {
    console.log("⏳ Warte auf das Laden der DOM-Elemente...");

    const checkExist = setInterval(() => {
        earth = document.getElementById("earth");
        hintText = document.getElementById("hint-text");
        infoBox = document.getElementById("info-box");
        sceneSelection = document.getElementById("scene-selection");

        if (earth && hintText && infoBox && sceneSelection) {
            clearInterval(checkExist);
            console.log("✅ initGlobals() erfolgreich ausgeführt! Earth:", earth);
        }
    }, 100);  // Prüfe alle 100ms, ob `earth` geladen ist
}
