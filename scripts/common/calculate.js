//calculate.js
export function calculateFootprint({
  distance,         // in km (einfach)
  transport,        // string: auto, carpool, public, bike, walk
  daysPerWeek,      // wie oft an der HSD pro Woche (1–5)
  mealsPerWeek,     // Mensa-Besuche pro Woche (0–5)
  diet,             // string: meat-daily, vegetarian, vegan
  water,            // string: plastic, glass, refill
  paper,            // string: none, monthly, weekly, often
  screenHoursPerDay,// number: z. B. 2
  abroad            // boolean: true/false
}) {
  let total = 0;
  const weeksPerYear = 30;
  const uniDaysPerYear = daysPerWeek * weeksPerYear;

  // 🚗 Mobilität
  const dailyDistance = distance * 2; // hin & zurück
  switch (transport) {
    case "auto":
      total += dailyDistance * uniDaysPerYear * 0.189;
      break;
    case "carpool":
      total += dailyDistance * uniDaysPerYear * 0.094;
      break;
    case "public":
      total += dailyDistance * uniDaysPerYear * 0.064;
      break;
    default:
      // bike or walk = 0
      break;
  }

  // 🍽️ Ernährung
  let mealFactor = 0;
  switch (diet) {
    case "meat-daily":
      mealFactor = 2.93;
      break;
    case "vegetarian":
      mealFactor = 1.93;
      break;
    case "vegan":
      mealFactor = 1.5;
      break;
  }
  total += mealsPerWeek * weeksPerYear * mealFactor;

  // 💧 Wasser
  switch (water) {
    case "plastic":
      total += uniDaysPerYear * 0.15;
      break;
    case "glass":
      total += uniDaysPerYear * 0.1;
      break;
    case "refill":
      break; // 0 CO₂
  }

  // 📄 Papier
  switch (paper) {
    case "monthly":
      total += 0.5 * 12;
      break;
    case "weekly":
      total += 0.5 * weeksPerYear;
      break;
    case "often":
      total += 1.5 * weeksPerYear;
      break;
    default:
      break;
  }

  // 💻 Digitalverhalten
  total += screenHoursPerDay * 5 * weeksPerYear * 0.2;

  // ✈️ Reisen
  if (abroad === true) {
    total += 500; // pauschaler Wert
  }

  // ✨ Ausgabe
  return {
    totalKg: total.toFixed(1),
    equivalent: "≈ Flug Düsseldorf → Lissabon",
    trees: Math.ceil(total / 21) // 1 Baum ≈ 21 kg CO₂ / Jahr
  };
}
