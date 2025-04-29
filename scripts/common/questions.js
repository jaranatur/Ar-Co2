// scripts/common/questions.js

export const setupQuestions = [
  {
    id: "daysPerWeek",
    question: "🗓️ Wie oft bist du pro Woche an der HSD?",
    type: "select",
    options: ["1", "2", "3", "4", "5"]
  },
  {
    id: "distance",
    question: "📍 Wie weit wohnst du von der HSD entfernt?",
    type: "select",
    options: ["0", "1", "2", "3", "4", "5", "10", "15", "20", "25", "30", "40", "50"]
  },
  {
    id: "mealsPerWeek",
    question: "🍽️ Wie oft gehst du pro Woche in die Mensa?",
    type: "select",
    options: ["0", "1", "2", "3", "4", "5"]
  }
];

export const mainQuestions = [
  {
    id: "transport",
    question: "🚙 Wie kommst du meistens zur HSD – an den meisten Tagen?",
    type: "select",
    options: [
      { value: "auto", label: "Mit dem Auto – allein" },
      { value: "carpool", label: "Mitfahrgelegenheit / ich fahre andere" },
      { value: "public", label: "Öffentliche Verkehrsmittel" },
      { value: "bike", label: "Fahrrad" },
      { value: "walk", label: "Zu Fuß" }
    ],
    value: "walk"
  },
  {
    id: "diet",
    question: "🥦 Wie sieht deine Ernährung im Alltag meistens aus?",
    type: "select",
    options: [
      { value: "meat-daily", label: "Ich esse (fast) täglich Fleisch" },
      { value: "meat-rare", label: "Ich esse nur selten Fleisch" },
      { value: "vegetarian", label: "Ich esse vegetarisch (ohne Fleisch)" },
      { value: "vegan", label: "Ich esse überwiegend vegan" }
    ],
    value: "vegan"
  },
  {
    id: "water",
    question: "💧 Wie versorgst du dich an der HSD meistens mit Wasser?",
    type: "select",
    options: [
      { value: "plastic", label: "Ich kaufe Einweg-Plastikflaschen" },
      { value: "glass", label: "Ich kaufe Pfandflaschen (z. B. Glas-Mehrweg)" },
      { value: "refill", label: "Ich fülle meine eigene Flasche auf (z. B. Zuhause oder an der Uni)" }
    ],
    value: "refill"
  },
  {
    id: "paper",
    question: "📄 Wie oft druckst du Uni-Material?",
    type: "select",
    options: [
      { value: "none", label: "Nie" },
      { value: "rare", label: "1x im Monat" },
      { value: "medium", label: "1x pro Woche" },
      { value: "often", label: "Mehrmals pro Woche" }
    ],
    value: "none"
  },
  {
    id: "screenHoursPerDay",
    question: "💻 Wie viele Stunden nutzt du täglich digitale Medien für dein Studium an der HSD?",
    type: "slider",
    min: 0,
    max: 10,
    step: 0.5,
    value: 0
  }
];

