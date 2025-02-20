document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Seite geladen!");

    const earthHitbox = document.getElementById("earth-hitbox");
    const choices = document.getElementById("choices");
    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");
    const co2Display = document.getElementById("co2-display");

    let currentScene = 0;
    let co2Score = 0;

    // Rotation der Erde
    function rotateEarth() {
        let earth = document.getElementById("earth");
        let rotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
        rotation.y += 1;
        earth.setAttribute("rotation", rotation);
    }
    setInterval(rotateEarth, 50);

    // Funktion zum Anzeigen der Auswahlmöglichkeiten
    function showChoices() {
        console.log("🌍 Erde wurde angeklickt!");
        choices.setAttribute("visible", "true");
        nextButton.setAttribute("visible", "true");
        backButton.setAttribute("visible", "true");
    }

    // Event-Listener für Erde-Klick
    earthHitbox.addEventListener("click", showChoices);
    earthHitbox.addEventListener("touchstart", showChoices);

    // Funktion zur Aktualisierung der CO₂-Anzeige
    function updateCO2(amount) {
        co2Score += amount;
        co2Display.setAttribute("text", `value: CO₂-Bilanz: ${co2Score}kg`);
    }

    // Event-Listener für Szenenauswahl
    document.getElementById("mobility").addEventListener("click", () => {
        console.log("🚗 Auto gewählt – Smog erscheint!");
        updateCO2(5);
    });

    document.getElementById("food").addEventListener("click", () => {
        console.log("🥗 Vegan gewählt – Baum wächst!");
        updateCO2(-3);
    });

    document.getElementById("drink").addEventListener("click", () => {
        console.log("💧 Wasser gewählt – Kein Müll!");
        updateCO2(-2);
    });

    // Funktion zum Wechseln der Szenen
    function changeScene(next) {
        if (next) {
            currentScene++;
        } else {
            currentScene--;
        }

        console.log(`🔄 Szene gewechselt: ${currentScene}`);

        if (currentScene >= 3) {
            console.log("🎉 Endszene erreicht!");
            co2Display.setAttribute("text", `value: Finale CO₂-Bilanz: ${co2Score}kg`);
        }
    }

    nextButton.addEventListener("click", () => changeScene(true));
    backButton.addEventListener("click", () => changeScene(false));
});
