import { sceneSelection } from './globals.js';

export function handleCubeClicks() {
    const bikeScene = document.getElementById("scene-bike");
    const saladScene = document.getElementById("scene-salad");
    const waterScene = document.getElementById("scene-water");

    bikeScene.addEventListener("click", () => {
        console.log("🚴 Mobilitätsszene wird geladen.");
        loadScene('scene1.html');
    });

    saladScene.addEventListener("click", () => {
        console.log("🥗 Ernährungsszene wird geladen.");
        loadScene('scene2.html');
    });

    waterScene.addEventListener("click", () => {
        console.log("💧 Trinkflaschenszene wird geladen.");
        loadScene('scene3.html');
    });
}

function loadScene(url) {
    window.location.href = url;
}
