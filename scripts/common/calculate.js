// calculate.js

export function calculateFootprint({
  distance,         // in km (einfach)
  transport,        // auto, carpool, public, bike, walk
  daysPerWeek,      // wie oft pro Woche an der HSD
  mealsPerWeek,     // Mensa-Besuche pro Woche
  diet,             // meat-daily, meat-rare, vegetarian, vegan
  water,            // plastic, glass, refill
  paper,            // none, monthly, weekly, often
  screenHoursPerDay // z. B. 3.5
}) {
  let total = 0;
  const semesterWeeks = 30;
  const uniDays = daysPerWeek * semesterWeeks;

  // 🚗 Mobilität
  const dailyDistance = distance * 2; // hin & zurück
  switch (transport) {
    case "auto":
      total += dailyDistance * uniDays * 0.189;
      break;
    case "carpool":
      total += dailyDistance * uniDays * 0.094;
      break;
    case "public":
      total += dailyDistance * uniDays * 0.064;
      break;
    case "bike":
    case "walk":
    default:
      // kein CO₂
      break;
  }

  // 🍽️ Ernährung
  let mealFactor = 0;
  switch (diet) {
    case "meat-daily":
      mealFactor = 2.93;
      break;
    case "meat-rare":
      mealFactor = 2.2;
      break;
    case "vegetarian":
      mealFactor = 1.93;
      break;
    case "vegan":
      mealFactor = 1.5;
      break;
    default:
      mealFactor = 2.5; // Fallback-Wert, falls nichts ausgewählt wurde
      break;
  }
  total += mealsPerWeek * semesterWeeks * mealFactor;

  // 💧 Wasser
  switch (water) {
    case "plastic":
      total += uniDays * 0.15;
      break;
    case "glass":
      total += uniDays * 0.1;
      break;
    case "refill":
    default:
      // 0 CO₂
      break;
  }

  // 📄 Papier
  switch (paper) {
    case "none":
      break; // kein CO₂
    case "monthly":
      total += 0.5 * (semesterWeeks / 4); // etwa 7.5
      break;
    case "weekly":
      total += 0.5 * semesterWeeks;
      break;
    case "often":
      total += 1.5 * semesterWeeks;
      break;
    default:
      break;
  }

  // 💻 Bildschirmzeit
  total += screenHoursPerDay * 5 * semesterWeeks * 0.2;

  // ✨ Ausgabe
  return {
    totalKg: parseFloat(total.toFixed(1)),
    equivalent: "≈ Flug Düsseldorf → Lissabon",
    trees: Math.ceil(total / 21) // 1 Baum ≈ 21 kg CO₂
  };
}
