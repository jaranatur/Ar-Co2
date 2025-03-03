document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ AR Szene geladen!");

    const earth = document.getElementById("earth");
    const hintText = document.getElementById("hint-text");

    // 🔊 Sound (später aktivieren, Datei notwendig)
    // const tapSound = new Audio("assets/tap.mp3");

    // 🌍 Click-Event für die Erde
    earth.addEventListener("click", () => {
        console.log("🌍 Erde wurde angeklickt!");
        hintText.setAttribute("visible", "false");

        // 🔊 Sound abspielen (später aktivieren)
        // tapSound.play();

        // 📌 Zoom-Effekt für Immersion
        earth.setAttribute("animation__zoom", "property: scale; to: 1.2 1.2 1.2; dur: 500; easing: easeInOutQuad");
    });
});
