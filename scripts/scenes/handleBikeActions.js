// scripts/scenes/handleBikeActions.js

export function handleBikeActions() {
  const bike = document.getElementById('scene-bike');
  const testBox = document.getElementById('test-box');

  if (bike) {
    console.log("✅ 'scene-bike' gefunden!");

    const goToMobilityScene = () => {
      console.log("🚴 Navigiere zur Mobilitätsszene");
      window.location.href = 'scenes/scene1.html';
    };

    bike.addEventListener("click", goToMobilityScene);
    bike.addEventListener("touchstart", goToMobilityScene);
  } else {
    console.log("❌ 'scene-bike' NICHT gefunden!");
  }

  if (testBox) {
    console.log("✅ 'test-box' gefunden!");

    const goToMobilityScene = () => {
      console.log("🚴 Navigiere zur Mobilitätsszene");
      window.location.href = 'scenes/scene1.html';
    };

    testBox.addEventListener("click", () => {
      console.log("🟦 KUGEL wurde geklickt!");
      goToMobilityScene();
    });

    testBox.addEventListener("touchstart", () => {
      console.log("📱 Touch auf Box erkannt!");
      goToMobilityScene();
    });
  }
}
