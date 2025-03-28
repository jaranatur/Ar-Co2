export function handleBikeActions() {
  const bikeButton = document.getElementById("bike-button");

  if (!bikeButton) {
    console.warn("⚠️ bike-button nicht gefunden!");
    return;
  }

  const goToScene1 = () => {
    console.log("🚴 Szene 1 wird geladen...");
    window.location.href = "scenes/scene1.html";
  };

  bikeButton.addEventListener("click", goToScene1);
  bikeButton.addEventListener("touchstart", goToScene1);
}
