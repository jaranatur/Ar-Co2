document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");

    // 🌍 Elemente abrufen
    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");
    const infoBox = document.getElementById("info-box");
    const sceneSelection = document.getElementById("scene-selection");
    const mobilityQuestion = document.getElementById("mobility-question");
    const returnButton = document.getElementById("return-button");
    const mobilityCube = document.getElementById("mobility-cube");
    const co2Bar = document.getElementById("co2-bar");

    let co2Level = 0;
    let mobilityCompleted = false;

    // 🌱 CO₂-Balken aktualisieren
    function updateCO2Bar(level) {
        co2Level = level;
        co2Bar.setAttribute("geometry", `height: ${0.01 + co2Level * 0.05}`);
        co2Bar.setAttribute("position", `0 ${-1 + co2Level * 0.025} 0.01`);
        co2Bar.setAttribute("material", `color: ${co2Level < 3 ? "green" : co2Level < 6 ? "yellow" : "red"}`);
    }

    // 🌍 **Event-Listener für Maus- & Touchbewegung (Erde drehen)**
    let isDragging = false;
    let lastX = 0;
    let rotationProgress = 0;
    let scaleProgress = 1;

    window.addEventListener("mousedown", (event) => {
        isDragging = true;
        lastX = event.clientX;
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

        // 🌍 Erde langsam rauszoomen
        scaleProgress = Math.max(0.3, 1 - rotationProgress / 800);
        earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

        if (rotationProgress > 600) {
            earth.setAttribute("visible", "false");
            infoBox.setAttribute("visible", "true");
            console.log("🌍 Erde verschwunden, Infotext eingeblendet!");

            // ⏳ Info-Box wird nach 5 Sekunden automatisch geschlossen
            setTimeout(() => {
                console.log("ℹ️ Info-Box wird automatisch ausgeblendet.");
                infoBox.setAttribute("visible", "false");
                sceneSelection.setAttribute("visible", "true");
            }, 5000);
        }
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
    });

    // 🖐 Touch-Unterstützung für Mobilgeräte
    window.addEventListener("touchstart", (event) => {
        isDragging = true;
        lastX = event.touches[0].clientX;
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

        rotationProgress += Math.abs(deltaX);
        let opacity = Math.max(0, 1 - rotationProgress / 500);
        hintText.setAttribute("text", `opacity: ${opacity}`);
        if (opacity === 0) hintText.setAttribute("visible", "false");

        scaleProgress = Math.max(0.5, 1 - rotationProgress / 1000);
        earth.setAttribute("scale", `${scaleProgress} ${scaleProgress} ${scaleProgress}`);

        if (rotationProgress > 1000) {
            earth.setAttribute("visible", "false");
            infoBox.setAttribute("visible", "true");
            console.log("🌍 Erde ausgeblendet, Infotext eingeblendet!");

            // ⏳ Info-Box wird nach 5 Sekunden automatisch geschlossen
            setTimeout(() => {
                console.log("ℹ️ Info-Box wird automatisch ausgeblendet.");
                infoBox.setAttribute("visible", "false");
                sceneSelection.setAttribute("visible", "true");
            }, 5000);
        }
    });

    window.addEventListener("touchend", () => {
        isDragging = false;
    });

    // ❌ **GLOBALER CLICK-HANDLER für ALLE Würfel & Modelle**
    window.addEventListener("click", (event) => {
        let targetId = event.target.id;
        console.log("👆 Klick erkannt auf:", targetId);

        // 📌 **Mobilitäts-Würfel wurde geklickt**
        if (targetId === "mobility-cube" && !mobilityCompleted) {
            console.log("🚲 Mobilitätsfrage wird angezeigt.");
            sceneSelection.setAttribute("visible", "false");
            mobilityQuestion.setAttribute("visible", "true");
        }

        // 📌 **Transport-Optionen wurden gewählt**
        if (targetId === "bike-model") {
            console.log("🚲 Fahrrad gewählt! CO₂ bleibt niedrig.");
            updateCO2Bar(1);
            returnButton.setAttribute("visible", "true");
        } else if (targetId === "bus-model") {
            console.log("🚌 Bus gewählt! CO₂ steigt etwas.");
            updateCO2Bar(3);
            returnButton.setAttribute("visible", "true");
        } else if (targetId === "car-model") {
            console.log("🚗 Auto gewählt! CO₂ steigt stark!");
            updateCO2Bar(7);
            returnButton.setAttribute("visible", "true");
        }

        // 📌 **Zurück zur Auswahl**
        if (targetId === "return-button") {
            console.log("↩️ Zurück zur Auswahl.");
            mobilityQuestion.setAttribute("visible", "false");
            sceneSelection.setAttribute("visible", "true");
            mobilityCube.setAttribute("material", "color: gray"); // 🎨 Blauer Würfel wird grau
            mobilityCompleted = true;
        }
    });

    // 🌍 **A-Frame Click-Handler für Touch & Maus**
    AFRAME.registerComponent("click-listener", {
        init: function () {
            this.el.addEventListener("click", (evt) => {
                console.log("📌 A-Frame Click erkannt auf:", this.id);
                window.dispatchEvent(new CustomEvent("click", { detail: { id: this.id } }));
            });
        }
    });

    // 🌍 **Click-Listener für A-Frame Objekte aktivieren**
    mobilityCube.setAttribute("click-listener", "");
    document.querySelectorAll(".clickable").forEach((el) => {
        el.setAttribute("click-listener", "");
    });
});
