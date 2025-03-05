document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");

    const earth = document.getElementById("earth");
    const campusMap = document.getElementById("campus-map");
    const menu = document.getElementById("menu");
    const co2Bar = document.getElementById("co2-bar");
    const btnResults = document.getElementById("btn-results");

    let rotationProgress = 0;
    let co2Level = 0;
    let completedScenes = { bike: false, mensa: false, third: false };

    window.addEventListener("mousemove", (event) => {
        if (earth.getAttribute("visible") === "false") return;

        let deltaX = event.clientX - lastX;
        lastX = event.clientX;

        rotationProgress += Math.abs(deltaX);
        
        if (rotationProgress > 600) {
            earth.setAttribute("visible", "false");
            campusMap.setAttribute("visible", "true");

            document.querySelectorAll(".clickable").forEach(point => {
                point.setAttribute("visible", "true");
            });

            console.log("🌍 Erde ausgeblendet, 2D-Karte & Szenenpunkte sichtbar!");
        }
    });

    function updateCo2Bar() {
        let co2Color = co2Level > 70 ? "red" : co2Level > 40 ? "yellow" : "green";
        co2Bar.setAttribute("material", `color: ${co2Color}`);
        co2Bar.setAttribute("geometry", `width: ${Math.max(0.5, co2Level / 50)}`);
    }

    document.querySelectorAll(".clickable").forEach(point => {
        point.addEventListener("click", (event) => {
            const scene = event.target.id.replace("scene-", "");
            console.log(`🔴 Szene ${scene} gestartet!`);

            co2Bar.setAttribute("visible", "true");
            menu.setAttribute("visible", "true");
            completedScenes[scene] = true;
            event.target.setAttribute("material", "color", "gray");

            if (Object.values(completedScenes).every(Boolean)) {
                btnResults.setAttribute("visible", "true");
            }
        });
    });

    btnResults.addEventListener("click", () => {
        console.log("🏁 Berechnung starten");
    });
});
