export function handleCubeClicks() {
    const mobilityCube = document.getElementById("mobility-cube");
    const foodCube = document.getElementById("food-cube");
    const electronicsCube = document.getElementById("electronics-cube");

    mobilityCube.addEventListener("click", () => {
        console.log("🚗 Mobilitätsszene wird geladen.");
        loadScene('szene1.html');
    });

    foodCube.addEventListener("click", () => {
        console.log("🍎 Ernährungsszene wird geladen.");
        loadScene('szene2.html');
    });

    electronicsCube.addEventListener("click", () => {
        console.log("📱 Elektronikszene wird geladen.");
        loadScene('szene3.html');
    });
}

function loadScene(url) {
    window.location.href = url;
}
