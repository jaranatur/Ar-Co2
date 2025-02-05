document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Seite geladen!");

    const startScreen = document.getElementById("start-screen");
    const startButton = document.getElementById("start-button");
    const arContainer = document.getElementById("ar-container");

    if (!startButton) {
        console.error("❌ FEHLER: Start-Button nicht gefunden!");
        return;
    }

    startButton.addEventListener("click", () => {
        console.log("🚀 AR gestartet!");
        startScreen.style.display = "none";
        arContainer.style.display = "block";
    });

    // Hiro Marker Debugging
    const marker = document.querySelector("a-marker");

    if (marker) {
        marker.addEventListener("markerFound", () => {
            console.log("📍 Hiro-Marker erkannt!");
        });

        marker.addEventListener("markerLost", () => {
            console.log("❌ Hiro-Marker verloren!");
        });
    } else {
        console.error("❌ Kein Hiro-Marker gefunden!");
    }
});
