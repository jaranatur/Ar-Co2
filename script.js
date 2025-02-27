document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Seite geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    const choices = document.getElementById("choices");
    const co2Display = document.getElementById("co2-display");
    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");

    let co2Score = 0;

    // Stelle sicher, dass die Erde sich NICHT bewegt
    function fixEarthPosition() {
        earth.setAttribute("position", "0 0 0");
        earth.setAttribute("rotation", "0 0 0"); // Falls Rotation passiert
        earth.setAttribute("scale", "0.7 0.7 0.7"); // Falls die Skalierung verloren geht
    }

    // Falls AR.js das Modell doch bewegt, nach 500ms erneut fixieren
    setTimeout(fixEarthPosition, 500);

    // 🌍 Event-Listener für das Anklicken der Erde
    earth.addEventListener("click", () => {
        console.log("🌍 Erde wurde angeklickt!");
        hintText.setAttribute("visible", "false");
        choices.setAttribute("visible", "true");
    });

    // 🚗 Event-Listener für Szenenauswahl
    document.getElementById("mobility").addEventListener("click", () => {
        console.log("🚗 Auto gewählt – Mehr CO₂!");
        updateCO2(5);
    });

    document.getElementById("food").addEventListener("click", () => {
        console.log("🥗 Vegan gewählt – Weniger CO₂!");
        updateCO2(-3);
    });

    document.getElementById("drink").addEventListener("click", () => {
        console.log("💧 Wasser gewählt – Kein Müll!");
        updateCO2(-2);
    });

    // 📊 CO₂-Anzeige aktualisieren
    function updateCO2(amount) {
        co2Score += amount;
        co2Display.setAttribute("text", `value: CO₂-Bilanz: ${co2Score}kg`);
    }

    // 🔄 Szenenwechsel
    nextButton.addEventListener("click", () => changeScene(true));
    backButton.addEventListener("click", () => changeScene(false));

    function changeScene(next) {
        console.log(`🔄 Szene gewechselt!`);
    }
});
