document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Seite geladen!");

    const overlay = document.getElementById("click-overlay");
    const scene = document.querySelector("a-scene");
    const camera = document.querySelector("a-camera");
    const co2Display = document.getElementById("co2-display");
    const choices = document.getElementById("choices");
    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");

    let currentScene = 0;
    let co2Score = 0;

    // 🌍 Rotation der Erde
    function rotateEarth() {
        let earth = document.getElementById("earth");
        let rotation = earth.getAttribute("rotation") || { x: 0, y: 0, z: 0 };
        rotation.y += 1;
        earth.setAttribute("rotation", rotation);
    }
    setInterval(rotateEarth, 50);

    // 🎯 Raycasting-Funktion für Touch & Klick
    function convertToRay(event) {
        const touch = event.touches ? event.touches[0] : event;
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({ x, y }, camera.object3D.children[0]);
        const intersects = raycaster.intersectObjects(scene.object3D.children, true);

        if (intersects.length > 0) {
            console.log("📌 Klick erkannt auf: ", intersects[0].object);
            intersects[0].object.el.emit("click");
        }
    }

    // 🖱️ Klick- und Touch-Events über Overlay abfangen
    overlay.addEventListener("click", convertToRay);
    overlay.addEventListener("touchstart", convertToRay);

    // 📊 CO₂-Anzeige aktualisieren
    function updateCO2(amount) {
        co2Score += amount;
        co2Display.setAttribute("text", `value: CO₂-Bilanz: ${co2Score}kg`);
    }

    // 🚗 Event-Listener für Szenenauswahl
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

    // 🔄 Szenenwechsel
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
