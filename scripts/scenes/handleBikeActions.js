

export function handleBikeActions() {
  console.log("🚴 handleBikeActions gestartet");

  const bikeButton = document.getElementById("bike-button");
  console.log("🔍 Suche nach #bike-button:", bikeButton);

  if (bikeButton) {
    console.log("✅ bike-button gefunden!");

    const goToScene1 = () => {
      console.log("✅ Bike-Button wurde geklickt → Szene 1 wird geladen");
      window.location.href = "scenes/scene1.html";
    };
    bikeButton.addEventListener("click", () => {
      console.log("🖱️ KLICK auf bike-button erkannt!");
      goToScene1();
    });
  
    bikeButton.addEventListener("touchstart", () => {
      console.log("📱 TOUCH auf bike-button erkannt!");
      goToMobilityScene();
    });  
  }
}
