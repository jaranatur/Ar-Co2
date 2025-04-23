// scripts/common/questions.js

export const questions = [
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
      id: "transport",
      question: "🚙 Wie kommst du meistens zur HSD?",
      type: "select",
      options: ["auto", "carpool", "public", "bike", "walk"]
    },
    {
      id: "mealsPerWeek",
      question: "🍽️ Wie oft gehst du pro Woche in die Mensa?",
      type: "select",
      options: ["0", "1", "2", "3", "4", "5"]
    },
    {
      id: "diet",
      question: "🥦 Wie sieht deine Ernährung im Alltag aus?",
      type: "select",
      options: ["meat-daily", "meat-rare", "vegetarian", "vegan"]
    },
    {
      id: "water",
      question: "💧Wie versorgst du dich mit Wasser?",
      type: "select",
      options: ["plastic", "glass", "refill"]
    },
    {
      id: "paper",
      question: "📄 Wie oft druckst du Uni-Material?",
      type: "select",
      options: ["none", "rare", "medium", "often"]
    },
    {
      id: "screenHoursPerDay",
      question: "💻 Wie viele Stunden nutzt du digitale Medien täglich?",
      type: "slider",
      min: 0,
      max: 10,
      step: 0.5,
      value: 0
    }
  ];
  