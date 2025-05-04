// import { initGlobals } from './common/globals.js';
// import { initScene } from './common/initScene.js';
// import { handleEarthRotation } from './common/handleEarthRotation.js';
import { calculateFootprint } from './common/calculate.js';
import { setupQuestions, mainQuestions } from './common/questions.js';
import { setupNamePrompt } from './common/handleNamePrompt.js';
import { feedbackTexts } from './common/feedbackTexts.js';
import { renderGarden } from './renderGarden.js';
// import { grassGrow } from "./renderGarden.js";
import { digitalFacts } from './common/digitalFacts.js';


let currentIndex = 0;
let answers = {};
let userName = "";
let currentQuestions = [];
let currentFactIndex = 0;


const renderButton = document.getElementById("render-button");
const nextButton = document.getElementById("next-question");

function updateLiveBall(totalKg) {
  const indicator = document.getElementById("co2-indicator");
  const donut = indicator?.querySelector("#donut-meter");
  const value = indicator?.querySelector(".co2-value");
  const max = indicator?.querySelector(".co2-max");

  if (!indicator || !donut || !value || !max) return;

  const kg = Math.round(totalKg);
  const percent = Math.min(kg / 100, 1);

  donut.classList.remove("green", "orange", "red");
  if (kg < 50) donut.classList.add("green");
  else if (kg <= 100) donut.classList.add("orange");
  else donut.classList.add("red");

  donut.setAttribute("stroke-dasharray", `${percent * 100}, 100`);
  value.textContent = `${kg} kg`;
  max.textContent = "/ 100 kg";

  const isVisible = window.getComputedStyle(document.getElementById("input-overlay")).display !== "none";
  indicator.style.display = isVisible ? "flex" : "none";
}

function renderQuestion(index) {
  hideFeedback();
  const question = currentQuestions[index];
  const body = document.querySelector(".input-card-body");
  if (!question || !body) return;

  body.innerHTML = "";

  const label = document.createElement("label");
  label.textContent = question.question;
  body.appendChild(label);
  if (question.type === "select") {
    const select = document.createElement("select");
    select.id = question.id;

    question.options.forEach(opt => {
      const option = document.createElement("option");
      if (typeof opt === "string") {
        option.value = opt;
        option.textContent = opt;
      } else {
        option.value = opt.value;
        option.textContent = opt.label;
      }
      select.appendChild(option);
    });

    select.value = "";
    if (select.querySelector('option[value=""]')) {
      select.querySelector('option[value=""]').disabled = true;
    }

    select.addEventListener("input", () => {
      let value = select.value;
      if (["daysPerWeek", "distance", "mealsPerWeek"].includes(question.id)) {
        value = parseInt(value, 10);
      }
      answers[question.id] = value;
      updateLiveBall(calculateFootprint(answers).totalKg);
      showFeedback(question.id, value);
    });

    if (answers[question.id]) {
      select.value = answers[question.id];
    }

    body.appendChild(select);
  }

  if (question.type === "slider") {
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = question.min;
    slider.max = question.max;
    slider.step = question.step;
    slider.value = answers[question.id] ?? question.value;
    slider.id = question.id;

    const output = document.createElement("span");
    output.id = "screen-value";
    output.textContent = `${slider.value} Stunden`;

    slider.addEventListener("input", () => {
      const val = parseFloat(slider.value);
      answers[question.id] = val;
      output.textContent = `${val} Stunden`;
      updateLiveBall(calculateFootprint(answers).totalKg);
      showFeedback(question.id, val);
    });

    body.appendChild(slider);
    body.appendChild(output);
  }

  checkRenderReady();
}

function checkRenderReady() {
  const isLastQuestion = currentIndex === currentQuestions.length - 1;
  const allAnswered = mainQuestions.every(q => {
    const val = answers[q.id];
    return val !== null && val !== undefined && val !== '';
  });

  if (isLastQuestion && allAnswered) {
    renderButton.style.display = "block";
    nextButton.style.display = "none";
  } else {
    renderButton.style.display = "none";
    nextButton.style.display = "inline-block";
  }
  const factButton = document.getElementById("fact-button");
  if (factButton) {
    const shouldHideFactBtn = isLastQuestion && allAnswered;
    factButton.style.display = shouldHideFactBtn ? "none" : "block";
  }
  

}

function showFeedback(questionId, selectedValue) {
  const feedbackBox = document.getElementById('feedback-text');
  let feedback = '';

  if (typeof feedbackTexts[questionId] === 'function') {
    feedback = feedbackTexts[questionId](selectedValue);
  } else if (typeof feedbackTexts[questionId] === 'object') {
    feedback = feedbackTexts[questionId][selectedValue] || '';
  }

  if (feedback && feedbackBox) {
    feedbackBox.innerText = feedback;
    feedbackBox.style.display = "block";
    feedbackBox.classList.add('active');
    feedbackBox.classList.remove('hidden');
  }
}

function hideFeedback() {
  const feedbackBox = document.getElementById('feedback-text');
  if (feedbackBox) {
    feedbackBox.classList.remove('active');
    feedbackBox.classList.add('hidden');
    setTimeout(() => {
      feedbackBox.style.display = "none";
    }, 600);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const co2 = document.getElementById("co2-indicator");
  if (co2) co2.style.display = "none";

  // initGlobals();
  // initScene();
  

  const namePrompt = document.getElementById("name-prompt");
  if (namePrompt) namePrompt.style.display = "flex";



  document.querySelector("#earth-container")?.setAttribute("visible", "false");
  document.querySelector("#hint-text")?.setAttribute("visible", "false");
  document.querySelector("#hint-bg")?.setAttribute("visible", "false");
  document.querySelector("#arrow-icon-entity")?.setAttribute("visible", "false");

  const navButtons = document.getElementById("nav-buttons");
  if (navButtons) navButtons.style.display = "none";

  const allInputIds = mainQuestions.map(q => q.id);
  allInputIds.forEach(id => answers[id] = id === "screenHoursPerDay" ? 0 : "");

  updateLiveBall(0);



  const startBtn = document.getElementById("start-btn");
  const nameInput = document.getElementById("user-name");

  if (startBtn && nameInput) {
    setupNamePrompt();
  } else {
    const retryInterval = setInterval(() => {
      const btn = document.getElementById("start-btn");
      const input = document.getElementById("user-name");
      if (btn && input) {
        clearInterval(retryInterval);
        setupNamePrompt();
        console.log("✅ setupNamePrompt() wurde erfolgreich aufgerufen.");
      }
    }, 100);
  }




  

  document.addEventListener("start-questions", () => {
    const scene = document.querySelector('a-scene');
    if (scene) scene.classList.add('no-interaction');

    userName = document.getElementById("user-name").value.trim();
    if (!userName) {
      alert("Bitte gib deinen Namen ein!");
      return;
    }

    document.querySelector(".input-card-header h2").textContent = `${userName}s Nachhaltigkeitsinfos`;

  
  
    document.getElementById("input-overlay").style.display = "flex";
    if (co2) co2.style.display = "flex";

    renderSetup();

    new MutationObserver(() => {
      updateLiveBall(calculateFootprint(answers).totalKg);
    }).observe(document.getElementById("input-overlay"), {
      attributes: true,
      attributeFilter: ["style"]
    });
  });
 

  document.getElementById("prev-question").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion(currentIndex);
      checkRenderReady();
    }
  });

  document.getElementById("next-question").addEventListener("click", () => {
    if (currentIndex < currentQuestions.length - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
      checkRenderReady();
    } else {
      const result = calculateFootprint(answers);
      if (co2) co2.style.display = "none";
      console.log("Fragen abgeschlossen:", result);
    }
  });

  const marker = document.querySelector("a-marker");
  if (marker) {
    marker.setAttribute("emitevents", "true");

    marker.addEventListener("markerLost", () => {
      console.log("⚠️ Marker verloren – Szene bleibt sichtbar.");
    });

    marker.addEventListener("markerFound", () => {
      console.log("✅ Marker wiedergefunden.");
    });
  }
});

renderButton.addEventListener("click", () => {
  renderButton.style.display = "none";

  document.querySelector(".input-card").style.display = "none";
  document.getElementById("nav-buttons").style.display = "none";
  document.getElementById("feedback-text").style.display = "none";
  document.getElementById("co2-indicator").style.display = "none";

  const hint = document.getElementById("scan-hint");
  if (hint) {
    hint.style.display = "block";
    setTimeout(() => {
      hint.style.transition = "opacity 1s ease";
      hint.style.opacity = "0";
      setTimeout(() => hint.remove(), 1000);
    },4000);
  }

  const garden = document.querySelector("#garden-container");
  if (garden) garden.setAttribute("visible", "true");

  const grass = document.querySelector("#grass-plane");
  if (grass) grass.setAttribute("visible", "true"); // <--- das ersetzt grassGrow()

  const marker = document.querySelector("a-marker");
  if (!marker) {
    console.error("❌ Kein Marker gefunden!");
    return;
  }

  if (marker.object3D.visible) {
    console.log("✅ Marker sichtbar – direkt rendern.");
    setTimeout(() => renderGarden(answers), 1200);
  } else {
    marker.addEventListener("markerFound", () => {
      console.log("✅ Marker sichtbar → Garten wird gerendert.");
      setTimeout(() => renderGarden(answers), 5000);
    }, { once: true });
  }
});


function renderSetup() {
  currentQuestions = setupQuestions;

  const body = document.querySelector(".input-card-body");
  if (!body) return;

  body.innerHTML = "";

  const header = document.createElement("h2");
  header.textContent = "Starte hier:";
  body.appendChild(header);

  setupQuestions.forEach(question => {
    const questionWrapper = document.createElement("div");
    questionWrapper.className = "question-wrapper";

    const label = document.createElement("label");
    label.textContent = question.question;
    questionWrapper.appendChild(label);

    if (question.type === "select") {
      const select = document.createElement("select");
      select.id = question.id;

      question.options.forEach(opt => {
        const option = document.createElement("option");
        if (typeof opt === "string") {
          option.value = opt;
          option.textContent = opt;
        } else {
          option.value = opt.value;
          option.textContent = opt.label;
        }
        select.appendChild(option);
      });

      select.value = "";
      if (select.querySelector('option[value=""]')) {
        select.querySelector('option[value=""]').disabled = true;
      }

      questionWrapper.appendChild(select);
    }

    body.appendChild(questionWrapper);
  });

  const btn = document.createElement("button");
  btn.textContent = "Weiter";
  btn.addEventListener("click", () => {
    setupQuestions.forEach(question => {
      const input = document.getElementById(question.id);
      if (input) {
        let value = input.value;
        if (["daysPerWeek", "distance", "mealsPerWeek"].includes(question.id)) {
          value = parseInt(value, 10);
        }
        answers[question.id] = value;
      }
    });

    startMainFlow();
  });
  body.appendChild(btn);

  const indicator = document.getElementById("co2-indicator");
  if (indicator) {
    indicator.style.display = "none";
  }
}

function startMainFlow() {
  currentQuestions = mainQuestions;
  currentIndex = 0;

  const indicator = document.getElementById("co2-indicator");
  if (indicator) indicator.style.display = "flex";

  renderQuestion(currentIndex);

  const navButtons = document.getElementById("nav-buttons");
  if (navButtons) navButtons.style.display = "flex";

  // 👉 Button nur hier erstellen (nur bei mainQuestions)
  if (!document.getElementById("fact-button")) {
    const btn = document.createElement("button");
    btn.id = "fact-button";
    btn.innerHTML = "💡 Wusstest du schon, dass...?";
    btn.addEventListener("click", () => {
      const factBox = document.getElementById("fact-overlay") || createFactBox();
      const random = digitalFacts[Math.floor(Math.random() * digitalFacts.length)];
      factBox.querySelector("p").textContent = random;
      factBox.style.display = "flex";
      document.getElementById("input-overlay").classList.add("blurred");
    });
    document.body.appendChild(btn);
  } else {
    document.getElementById("fact-button").style.display = "block";
  }
}


export function showFactsModal() {
  if (document.getElementById('facts-modal')) {
    document.getElementById('facts-modal').style.display = 'flex';
    return;
  }

  const modal = document.createElement('div');
  modal.id = 'facts-modal';
  modal.innerHTML = `
    <div class="facts-card">
      <button id="close-facts">✖</button>
      <h2>🌍 Mehr erfahren: Quellen & Inspiration</h2>
      <p>In der Entwicklung dieser AR-Anwendung wurden neben offiziellen Klimazielen der Hochschule Düsseldorf auch praxisnahe Maßnahmen und digitale Bildungsformate berücksichtigt.</p>
      <p>Die folgenden Ressourcen bieten weiterführende Informationen für alle, die sich tiefer mit dem Thema Nachhaltigkeit, CO₂-Reduktion und digitaler Vermittlung beschäftigen möchten:</p>

      <h3>📚 Quellen zur HSD & Klimaschutz</h3>
      <ul>
        <li><strong>Klimaschutzkonzept der Hochschule Düsseldorf (2020)</strong><br>
          <a href="https://example.com/pdf1" target="_blank">Download PDF</a><br>
          Enthält Ziele, Maßnahmen und Emissionsdaten – u. a. das 100 kg CO₂-Jahresziel für Studierende.
        </li>
        <li><strong>Maßnahmenkatalog Nachhaltigkeit der HSD</strong><br>
          <a href="https://example.com/pdf2" target="_blank">PDF: Maßnahmenübersicht</a><br>
          Workshops, Energie-Scouts, EMAS-System, Mobilität etc.
        </li>
      </ul>

      <h3>🌐 Inspirierende AR-Projekte</h3>
      <ul>
        <li><strong>„Explore Münster“</strong> – <a href="https://explore-muenster.de" target="_blank">Website</a></li>
        <li><strong>„Die Befreiung AR“</strong> – <a href="https://br.de/zaubar" target="_blank">Zur Webversion</a></li>
        <li><strong>„Chemnitz.ZeitWeise“</strong> – <a href="https://zeitweise.app" target="_blank">Zur App</a></li>
      </ul>

      <h3>💡 Weitere Recherchemöglichkeiten</h3>
      <ul>
        <li><strong>Nachhaltigkeit & Lehre</strong> – <a href="https://www.hoch-n.org" target="_blank">hoch-n.org</a></li>
        <li><strong>CO₂-Rechner</strong> – <a href="https://uba.co2-rechner.de" target="_blank">UBA-Rechner</a></li>
      </ul>

      <p><strong>👉 Tipp:</strong> Diese Anwendung zeigt dir einen Richtwert für deinen CO₂-Fußabdruck im Uni-Alltag. Für genauere Einblicke schau in die verlinkten Quellen.</p>
    </div>
  `;

  document.body.appendChild(modal);
  document.getElementById("close-facts").onclick = () => {
    modal.style.display = 'none';
  };
}

export function renderFinalButtons() {
  const container = document.createElement('div');
  container.id = 'final-button-container';
  container.innerHTML = `
    <button><div>📷</div><span>Screenshot</span></button>
    <button><div>ℹ️</div><span>Fakten</span></button>
    <button><div>📊</div><span>Ergebnis</span></button>
    <button><div>💡</div><span>Wusstest du schon?</span></button>
    <button><div>🔁</div><span>Neu</span></button>
  `;

  document.body.appendChild(container);

  const buttons = document.querySelectorAll("#final-button-container button");
  const factsButton = buttons[1];   // ℹ️
  const tipButton = buttons[3];     // 💡
  const restartButton = buttons[4]; // 🔁

  factsButton.addEventListener("click", showFactsModal);

  let currentFactIndex = 0;

  tipButton.addEventListener("click", () => {
    const factBox = document.getElementById("fact-overlay") || createFactBox(true);
    showFactAtIndex(currentFactIndex);
    factBox.style.display = "flex";
  
    // Blur alle finalen Buttons
    document.querySelectorAll("#final-button-container button").forEach(btn =>
      btn.classList.add("blurred")
    );
  });
  


  restartButton.addEventListener("click", () => {
    if (confirm("Willst du wirklich neu starten? Deine Daten gehen verloren.")) {
      window.location.reload();
    }
  });
}


document.addEventListener("click", (e) => {
  if (e.target.id === "fact-button") {
    const factBox = document.getElementById("fact-overlay") || createFactBox();
    const random = digitalFacts[Math.floor(Math.random() * digitalFacts.length)];
    factBox.querySelector("p").textContent = random;
    factBox.style.display = "flex";
    document.getElementById("input-overlay").classList.add("blurred");
    document.getElementById("fact-button").classList.add("blurred"); // 👈 hinzugefügt
  }

  if (e.target.id === "close-fact") {
    document.getElementById("fact-overlay").style.display = "none";
    document.getElementById("input-overlay").classList.remove("blurred");
    document.getElementById("fact-button").classList.remove("blurred"); // 👈 hinzugefügt
  }
});






function showFactAtIndex(index) {
  const factBox = document.getElementById("fact-overlay");
  if (!factBox) return;
  factBox.querySelector("p").textContent = digitalFacts[index];
}

function createFactBox(includeNavigation = false) {
  const overlay = document.createElement("div");
  overlay.id = "fact-overlay";
  overlay.innerHTML = `
    <div class="fact-card">
      <button id="close-fact">✖</button>
      <h3>${includeNavigation ? "💡 Digital-Fakten" : "💡 Wusstest du schon, dass ... ?"}</h3>

      <p></p>
      ${
        includeNavigation
          ? `
        <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
          <button id="prev-fact">← Zurück</button>
          <button id="next-fact">Weiter →</button>
        </div>`
          : ""
      }
    </div>
  `;
  document.body.appendChild(overlay);

  if (includeNavigation) {
    overlay.querySelector("#prev-fact").addEventListener("click", () => {
      if (currentFactIndex > 0) currentFactIndex--;
      showFactAtIndex(currentFactIndex);
    });

    overlay.querySelector("#next-fact").addEventListener("click", () => {
      if (currentFactIndex < digitalFacts.length - 1) currentFactIndex++;
      showFactAtIndex(currentFactIndex);
    });
  }

  overlay.querySelector("#close-fact").addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelectorAll("#final-button-container button").forEach(btn => {
      btn.classList.remove("blurred");
    });
  });
  
  

  return overlay;
}
