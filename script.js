document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Seite geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    const choices = document.getElementById("choices");

    let started = false;

    function startExperience() {
        if (!started) {
            console.log("🌍 Erde wurde angeklickt! Startszene verschwindet, Optionen erscheinen.");
            earth.setAttribute("scale", "0.5 0.5 0.5");
            hintText.setAttribute("visible", "false");
            choices.setAttribute("visible", "true");
            started = true;
        }
    }

    // Sicherstellen, dass Klicks auf das `gltf-model` registriert werden
    earth.addEventListener("click", startExperience);

    // Extra Fix für Touchscreens (falls nötig)
    earth.addEventListener("touchstart", startExperience);
});
