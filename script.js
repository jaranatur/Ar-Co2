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

    // Stelle sicher, dass A-Frame Klicks auf `gltf-models` erkennt
    earth.addEventListener("click", startExperience);
});
