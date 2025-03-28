// scripts/scenes/handleBikeActions.js

export function handleBikeActions() {
  const bikeButton = document.getElementById("bike-button");

  if (!bikeButton) {
    console.error("❌ bike-button nicht gefunden!");
    return;
  }

  const goToScene1 = () => {
    console.log("🚴 Kugel geklickt → Szene 1 wird geöffnet");
    window.location.href = "scene1.html"; // oder scenes/scene1.html, je nach Pfad
  };

  bikeButton.addEventListener("click", goToScene1);
  bikeButton.addEventListener("touchstart", goToScene1);

  console.log("✅ Bike-Button Listener aktiv.");
}
