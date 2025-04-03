export function calculateFootprint({ distance, transport, diet, water }) {
    let total = 0;
  
    // 🚗 Transport CO₂ factor
    switch (transport) {
      case "auto":
        total += distance * 0.25;
        break;
      case "carpool":
        total += distance * 0.12;
        break;
      case "public":
        break;
      case "bike":
      case "walk":
        total += 0;
        break;
    }
  
    // 🥗 Diet impact
    switch (diet) {
      case "meat-daily":
        total += 3;
        break;
      case "meat-rare":
        total += 1.5;
        break;
      case "vegetarian":
        total += 1;
        break;
      case "vegan":
        total += 0.5;
        break;
    }
  
    // 💧 Water packaging
    switch (water) {
      case "plastic":
        total += 1.5;
        break;
      case "glass-disposable":
        total += 1.2;
        break;
      case "glass-returnable":
        total += 0.6;
        break;
      case "tap-bottle":
        total += 0.3;
        break;
      case "tap-glass":
        total += 0;
        break;
    }
  
    return {
      totalKg: total.toFixed(2),
      equivalent: "≈ Flug Berlin → Rom",
      trees: Math.ceil(total / 21)
    };
  }
  
  // ➕ Show result in overlay
  export function displayResult(result) {
    const overlay = document.getElementById("input-overlay");
    const resultEl = document.createElement("div");
    resultEl.id = "result-box";
    resultEl.innerHTML = `
      <h3>🌍 Deine CO₂-Bilanz:</h3>
      <p><strong>${result.totalKg} kg CO₂</strong></p>
      <p>${result.equivalent}</p>
      <p>🌳 Du müsstest ca. ${result.trees} Bäume pflanzen</p>
      <button id="back-btn" style="margin-top: 1rem;">🔙 Zurück zur Eingabe</button>
    `;
    overlay.appendChild(resultEl);
  
    // 🎯 Show "Zurück" button
    document.getElementById("back-btn").addEventListener("click", () => {
      resultEl.remove();
      overlay.scrollTop = 0; // optional
    });
  }
  