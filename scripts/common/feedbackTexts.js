export const feedbackTexts = {
    transport: {
      auto: "Autofahrten sind CO₂-intensiv – schon 2x pro Woche zur HSD können dein Jahresziel sprengen.",
      carpool: "Carsharing spart CO₂ – gemeinsam unterwegs = klüger unterwegs!",
      public: "Top! ÖPNV passt perfekt zum 100 kg CO₂-Ziel der HSD.",
      bike: "YES! Fahrradfahren ist ideal: kein CO₂, viel Freiheit.",
      walk: "Legendär. Zu Fuß zur HSD = fast unschlagbar klimafreundlich."
    },
    diet: {
      "meat-daily": "Täglich Fleisch? Das haut CO₂-mäßig ordentlich rein – jede Reduktion hilft.",
      "meat-rare": "Selten Fleisch ist stark! Das spart ordentlich Emissionen.",
      vegetarian: "Super Wahl! Vegetarisch zu essen reduziert deine Bilanz deutlich.",
      vegan: "Queen/King Move. Vegan leben senkt den CO₂-Fußabdruck der Ernährung drastisch."
    },
    water: {
      plastic: "Plastikflaschen verursachen CO₂ in Produktion & Entsorgung – HSD bietet Nachfüllstationen!",
      glass: "Glas ist okay – noch besser: einfach nachfüllen!",
      refill: "Perfekt! Eigene Flasche + Nachfüllstation = smart & klimafreundlich."
    },
    paper: {
      none: "Nice! Digital studieren ist nicht nur praktisch, sondern auch gut fürs Klima.",
      rare: "Sehr gut! Wenig Papierverbrauch spart Ressourcen & CO₂.",
      medium: "Vielleicht geht da noch was digital? Papier verursacht oft mehr CO₂ als gedacht.",
      often: "Papier ist CO₂-intensiv – probier doch mal digitale Notizen oder Reader."
    },
    screenHoursPerDay: (value) => {
      if (value <= 2) return "Wenig Bildschirmzeit = wenig Stromverbrauch. Super nachhaltig!";
      if (value <= 5) return "Durchschnittliche Nutzung – achte auf Stromquellen und Pausen!";
      return "Viel Bildschirmzeit = mehr Stromverbrauch. Schon SD-Streaming spart CO₂!";
    }
  };
  