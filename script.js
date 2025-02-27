document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Seite geladen!");

    const earth = document.getElementById("earth");

    // Sicherstellen, dass die Erde fixiert bleibt
    function fixEarthPosition() {
        earth.setAttribute("position", "0 0 0");
        earth.setAttribute("anchor", "true");
    }

    // Falls AR.js das Modell doch bewegt, nach 500ms erneut fixieren
    setTimeout(fixEarthPosition, 500);
});
