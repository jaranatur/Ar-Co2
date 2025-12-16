
export function calculateFootprint({
  distance,
  transport,
  daysPerWeek,
  mealsPerWeek,
  diet,
  water,
  paper,
  screenHoursPerDay
}) {
  let total = 0;
  const semesterWeeks = 30;
  const uniDays = daysPerWeek * semesterWeeks;

  //  Mobilität
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

  //  Ernährung
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

  //  Wasser
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

  //  Papier
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

  //  Bildschirmzeit
  total += screenHoursPerDay * 5 * semesterWeeks * 0.2;

  //  Ausgabe
  return {
    totalKg: parseFloat(total.toFixed(1)),
    trees: Math.ceil(total / 21), // 1 Baum ≈ 21 kg
    overshootDay: calculateOvershootDay(total),
    tips: generateImprovementTips({
      distance, transport, daysPerWeek, mealsPerWeek,
      diet, water, paper, screenHoursPerDay
    })
  };
}
export function calculateOvershootDay(totalKg) {
  const targetPerYear = 100; // Pariser Ziel: 2 Tonnen CO₂/Jahr
  const days = Math.round((totalKg / targetPerYear) * 365);
  const baseDate = new Date(new Date().getFullYear(), 0, 1);
  baseDate.setDate(baseDate.getDate() + days);
  return baseDate.toLocaleDateString("de-DE", { day: "2-digit", month: "long" });
}

export function generateImprovementTips(answers) {
  const tips = [];

  if (answers.diet === "meat-daily") {
    tips.push("🍖 Wenn du nur an wenigen Tagen Fleisch isst, kannst du bis zu **30 kg CO₂ pro Jahr** sparen.");
  } else if (answers.diet === "meat-rare") {
    tips.push("🥦 Du isst schon selten Fleisch – noch klimafreundlicher wäre eine überwiegend vegetarische oder vegane Ernährung.");
  }

  if (answers.transport === "auto") {
    tips.push("🚗 Der Wechsel vom Auto zum Fahrrad oder ÖPNV kann dir jährlich **bis zu 200 kg CO₂** einsparen.");
  } else if (answers.transport === "carpool") {
    tips.push("🚘 Fahrgemeinschaften sind besser als alleine fahren – noch nachhaltiger wäre der Umstieg auf Bus, Bahn oder Fahrrad.");
  } else if (answers.transport === "public") {
    tips.push("🚌 Der ÖPNV ist super – wenn’s möglich ist, könntest du kurze Strecken auch mal mit dem Fahrrad fahren.");
  }

  if (answers.screenHoursPerDay > 5) {
    tips.push("📺 Weniger Streaming in HD kann dir schnell **50 kg CO₂ pro Jahr** sparen – SD reicht oft völlig aus.");
  } else if (answers.screenHoursPerDay > 3) {
    tips.push("📱 Ein bewusster Umgang mit Streaming und Geräten spart CO₂ – probier mal Podcast oder Lesen statt Video.");
  }

  if (answers.water === "plastic") {
    tips.push("💧 Eine Mehrwegflasche spart über das Jahr hinweg mehrere Kilo CO₂ – und auch Plastikmüll.");
  } else if (answers.water === "glass") {
    tips.push("🔁 Glasflaschen sind besser als Plastik – am nachhaltigsten sind langlebige, selbst befüllte Mehrwegflaschen.");
  }

  if (answers.paper === "often") {
    tips.push("📄 Viel Papierverbrauch lässt sich leicht reduzieren – doppelseitig drucken oder digital arbeiten spart **~30 kg CO₂**.");
  } else if (answers.paper === "weekly") {
    tips.push("📝 Du verwendest regelmäßig Papier – vielleicht kannst du auf digitale Notizen umsteigen?");
  }

  return tips.slice(0, 3); // Maximal 3 Tipps
}