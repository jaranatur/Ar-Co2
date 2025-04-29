// scripts/common/questions.js

export const setupQuestions = [
  {
    id: "daysPerWeek",
    question: "🗓️ Wie oft bist du pro Woche an der HSD?",
    type: "select",
    options: [
      { value: "", label: "Bitte auswählen..." },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" }
    ]
  },
  {
    id: "distance",
    question: "📍 Wie weit wohnst du von der HSD entfernt?",
    type: "select",
    options: [
      { value: "", label: "Bitte auswählen..." },
      { value: "0", label: "0 km" },
      { value: "1", label: "1 km" },
      { value: "2", label: "2 km" },
      { value: "3", label: "3 km" },
      { value: "4", label: "4 km" },
      { value: "5", label: "5 km" },
      { value: "10", label: "10 km" },
      { value: "15", label: "15 km" },
      { value: "20", label: "20 km" },
      { value: "25", label: "25 km" },
      { value: "30", label: "30 km" },
      { value: "40", label: "40 km" },
      { value: "50", label: "50 km" }
    ]
  },
  {
    id: "mealsPerWeek",
    question: "🍽️ Wie oft gehst du pro Woche in die Mensa?",
    type: "select",
    options: [
      { value: "", label: "Bitte auswählen..." },
      { value: "0", label: "0" },
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" }
    ]
  }
];

export const mainQuestions = [
  {
    id: "transport",
    question: "🚙 Wie kommst du meistens zur HSD – an den meisten Tagen?",
    type: "select",
    options: [
      { value: "", label: "Bitte auswählen..." },
      { value: "auto", label: "Mit dem Auto – allein" },
      { value: "carpool", label: "Mitfahrgelegenheit / ich fahre andere" },
      { value: "public", label: "Öffentliche Verkehrsmittel" },
      { value: "bike", label: "Fahrrad" },
      { value: "walk", label: "Zu Fuß" }
    ]
  },
  {
    id: "diet",
    question: "🥦 Wie sieht deine Ernährung im Alltag meistens aus?",
    type: "select",
    options: [
      { value: "", label: "Bitte auswählen..." },
      { value: "meat-daily", label: "Ich esse (fast) täglich Fleisch" },
      { value: "meat-rare", label: "Ich esse nur selten Fleisch" },
      { value: "vegetarian", label: "Ich esse vegetarisch (ohne Fleisch)" },
      { value: "vegan", label: "Ich esse überwiegend vegan" }
    ]
  },
  {
    id: "water",
    question: "💧 Wie versorgst du dich an der HSD meistens mit Wasser?",
    type: "select",
    options: [
      { value: "", label: "Bitte auswählen..." },
      { value: "plastic", label: "Ich kaufe Einweg-Plastikflaschen" },
      { value: "glass", label: "Ich kaufe Pfandflaschen (z. B. Glas-Mehrweg)" },
      { value: "refill", label: "Ich fülle meine eigene Flasche auf (z. B. Zuhause oder an der Uni)" }
    ]
  },
  {
    id: "paper",
    question: "📄 Wie oft druckst du Uni-Material?",
    type: "select",
    options: [
      { value: "", label: "Bitte auswählen..." },
      { value: "none", label: "Nie" },
      { value: "rare", label: "1x im Monat" },
      { value: "medium", label: "1x pro Woche" },
      { value: "often", label: "Mehrmals pro Woche" }
    ]
  },
  {
    id: "screenHoursPerDay",
    question: "💻 Wie viele Stunden nutzt du täglich digitale Medien für dein Studium an der HSD?",
    type: "slider",
    min: 0,
    max: 10,
    step: 0.5,
    value: 0 // Slider bleibt, weil sinnvoll (0 Stunden als Start)
  }
];
