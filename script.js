document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Seite geladen!");

    const scene = document.querySelector("a-scene");
    const camera = document.querySelector("a-camera");
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

    function handleClick(event) {
        if (event.target.id === "earth") {
            startExperience();
        }
    }

    window.addEventListener("click", handleClick);
});
