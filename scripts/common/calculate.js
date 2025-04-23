// calculate.js
export function calculateFootprint({
  distance,         // in km (einfach)
  transport,        // string: auto, carpool, public, bike, walk
  daysPerWeek,      // wie oft an der HSD pro Woche (1–5)
  mealsPerWeek,     // Mensa-Besuche pro Woche (0–5)
  diet,             // string: meat-daily, vegetarian, vegan
  water,            // string: plastic, glass, refill
  paper,            // string: none, monthly, weekly, often
  screenHoursPerDay // number: z. B. 2
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
      break; // 0 CO₂
  }

  // 📄 Papier
  switch (paper) {
    case "monthly":
      total += 0.5 * (semesterWeeks / 4); // ca. 7.5 Monate
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

  // 💻 Digitalverhalten
  total += screenHoursPerDay * 5 * semesterWeeks * 0.2;

  // ✨ Ausgabe
  return {
    totalKg: total.toFixed(1),
    equivalent: "≈ Flug Düsseldorf → Lissabon",
    trees: Math.ceil(total / 21) // 1 Baum ≈ 21 kg CO₂ / Jahr
  };
}
