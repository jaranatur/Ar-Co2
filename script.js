document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Seite geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    const choices = document.getElementById("choices");
    const co2Display = document.getElementById("co2-display");
    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");

    let co2Score = 0;

    // Ensures Earth stays fixed in place
    function fixEarthPosition() {
        earth.setAttribute("position", "0 0 0");
        earth.setAttribute("rotation", "0 0 0");
        
    }

    // Force Earth to reset every 500ms in case AR.js moves it
    setInterval(fixEarthPosition, 500);

    // 🌍 Click event on Earth
    earth.addEventListener("click", () => {
        console.log("🌍 Erde wurde angeklickt!");
        hintText.setAttribute("visible", "false");
        choices.setAttribute("visible", "true");
    });

    // 🚗 Event listeners for choices
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

    // 📊 Update CO₂ Display
    function updateCO2(amount) {
        co2Score += amount;
        co2Display.setAttribute("text", `value: CO₂-Bilanz: ${co2Score}kg`);
    }

    // 🔄 Scene switching
    nextButton.addEventListener("click", () => changeScene(true));
    backButton.addEventListener("click", () => changeScene(false));

    function changeScene(next) {
        console.log(`🔄 Szene gewechselt!`);
    }

    // 🛠 Adjust Earth Size for Mobile
    function adjustScale() {
        earth.setAttribute("scale", "2 2 2"); 
    }
    

    window.addEventListener("resize", adjustScale);
    adjustScale(); // Run on load
});
