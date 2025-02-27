document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Seite geladen!");

    const earth = document.getElementById("earth");

    // Sicherstellen, dass die Erde fixiert bleibt
    function fixEarthPosition() {
        earth.setAttribute("position", "0 -0.05 0");
        earth.setAttribute("constraint", "lock");
    }

    // Falls AR.js das Modell doch bewegt, nach 500ms erneut fixieren
    setTimeout(fixEarthPosition, 500);

    earth.addEventListener("click", () => {
        console.log("🌍 Erde wurde angeklickt!");
    });

    earth.addEventListener("touchstart", () => {
        console.log("🌍 Erde wurde angetippt!");
    });
});
