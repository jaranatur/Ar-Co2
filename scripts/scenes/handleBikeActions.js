export function handleBikeActions() {
  console.log("🚴 handleBikeActions gestartet");

  const bikeButton = document.getElementById("bike-button");
  console.log("🔍 Suche nach #bike-button:", bikeButton);

  if (!bikeButton) {
    console.warn("❌ bike-button NICHT im DOM gefunden!");
    return;
  }

  const goToScene1 = () => {
    console.log("✅ Bike-Button wurde geklickt → Szene 1 wird geladen");
    window.location.href = "scenes/scene1.html";
  };

  bikeButton.addEventListener("click", () => {
    console.log("🖱️ click Event erkannt");
    goToScene1();
  });

  bikeButton.addEventListener("touchstart", () => {
    console.log("📱 touchstart Event erkannt");
    goToScene1();
  });

  // Optional: zeige Sichtbarkeit des Buttons
  const visible = bikeButton.getAttribute("visible");
  console.log("👁️ Sichtbarkeit von bike-button:", visible);
}
