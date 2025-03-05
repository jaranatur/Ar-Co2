document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    const campusMap = document.getElementById("campus-map");
    const menu = document.getElementById("menu");
    const co2Bar = document.getElementById("co2-bar");
    const btnResults = document.getElementById("btn-results");

    let isDragging = false;
    let lastX = 0;
    let rotationProgress = 0;
    let co2Level = 0;
    let completedScenes = { bike: false, mensa: false, third: false };

    // 🌍 Erde wieder drehbar machen (Fix für das `gltf-model`-Problem)
    window.addEventListener("mousedown", (event) => {
        if (event.target.id === "earth" || event.target.closest("#earth")) {
            isDragging = true;
            lastX = event.clientX;
        }
    });

    window.addEventListener("mousemove", (event) => {
        if (!isDragging) return;

        let deltaX = event.clientX - lastX;
        lastX = event.clientX;

        let currentRotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
        earth.setAttribute("rotation", {
            x: currentRotation.x,
            y: currentRotation.y + deltaX * 0.5,
            z: currentRotation.z
        });

        // 🌟 Fortschritt fürs Verblassen des Textes
        rotationProgress += Math.abs(deltaX);
        let opacity = Math.max(0, 1 - rotationProgress / 500);
        hintText.setAttribute("text", `opacity: ${opacity}`);
        if (opacity === 0) hintText.setAttribute("visible", "false");
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // 🖐 Touch-Unterstützung für Mobilgeräte
    window.addEventListener("touchstart", (event) => {
        if (event.target.id === "earth" || event.target.closest("#earth")) {
            isDragging = true;
            lastX = event.touches[0].clientX;
        }
    });

    window.addEventListener("touchmove", (event) => {
        if (!isDragging) return;

        let deltaX = event.touches[0].clientX - lastX;
        lastX = event.touches[0].clientX;

        let currentRotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
        earth.setAttribute("rotation", {
            x: currentRotation.x,
            y: currentRotation.y + deltaX * 0.5,
            z: currentRotation.z
        });

        // 🌟 Fortschritt fürs Verblassen des Textes
        rotationProgress += Math.abs(deltaX);
        let opacity = Math.max(0, 1 - rotationProgress / 500);
        hintText.setAttribute("text", `opacity: ${opacity}`);
        if (opacity === 0) hintText.setAttribute("visible", "false");
    });

    window.addEventListener("touchend", () => {
        isDragging = false;
    });

    // 🌍 Wenn die Erde oft genug gedreht wurde → Karte + Szenenpunkte sichtbar machen
    window.addEventListener("mousemove", (event) => {
        if (rotationProgress > 600) {
            earth.setAttribute("visible", "false");
            campusMap.setAttribute("visible", "true");

            document.querySelectorAll(".clickable").forEach(point => {
                point.setAttribute("visible", "true");
            });

            console.log("🌍 Erde ausgeblendet, 2D-Karte & Szenenpunkte sichtbar!");
        }
    });

    // 🔥 Update CO₂-Balken (Farbe + Größe)
    function updateCo2Bar() {
        let co2Color = co2Level > 70 ? "red" : co2Level > 40 ? "yellow" : "green";
        co2Bar.setAttribute("material", `color: ${co2Color}`);
        co2Bar.setAttribute("geometry", `width: ${Math.max(0.5, co2Level / 50)}`);
    }

    // 🔴 Szenen klickbar machen
    document.querySelectorAll(".clickable").forEach(point => {
        point.addEventListener("click", (event) => {
            const scene = event.target.id.replace("scene-", "");
            console.log(`🔴 Szene ${scene} gestartet!`);

            // CO₂-Balken & Menü einblenden
            co2Bar.setAttribute("visible", "true");
            menu.setAttribute("visible", "true");

            // Szene als abgeschlossen markieren
            completedScenes[scene] = true;
            event.target.setAttribute("material", "color", "gray");

            // Falls alle Szenen abgeschlossen → "Berechnen"-Button sichtbar machen
            if (Object.values(completedScenes).every(Boolean)) {
                btnResults.setAttribute("visible", "true");
            }
        });
    });

    // 🟢 "Weiter"-Button erhöht CO₂-Level
    document.getElementById("btn-next").addEventListener("click", () => {
        console.log("➡️ Weiter gedrückt");
        co2Level += 10;
        updateCo2Bar();
    });

    // 🔴 "Zurück"-Button senkt CO₂-Level
    document.getElementById("btn-back").addEventListener("click", () => {
        console.log("⬅️ Zurück gedrückt");
        co2Level -= 10;
        updateCo2Bar();
    });

    // 🏁 "Berechnen"-Button für Endergebnis
    btnResults.addEventListener("click", () => {
        console.log("🏁 Berechnung starten");
    });
});
