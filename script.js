document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Seite geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    const choices = document.getElementById("choices");

    let started = false;

    function startExperience() {
        if (!started) {
            console.log("🌍 Erde wurde angeklickt! Startszene verschwindet, Optionen erscheinen.");
            earth.setAttribute("scale", "0.4 0.4 0.4"); // Noch etwas kleiner für mobile Ansicht
            hintText.setAttribute("visible", "false");
            choices.setAttribute("visible", "true");

            // Stelle sicher, dass das Objekt nicht bewegt werden kann
            earth.setAttribute("static-body", "");
            earth.setAttribute("dynamic-body", "mass: 0;");

            started = true;
        }
    }

    // Sicherstellen, dass Klicks auf das `gltf-model` registriert werden
    earth.addEventListener("click", startExperience);
    earth.addEventListener("touchstart", startExperience);
});
