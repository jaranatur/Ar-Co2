# Konzeption und Entwicklung einer AR-Webanwendung zur Förderung von Klimabewusstsein an der HSD

> **Bachelorarbeit im Studiengang B.Sc. Medieninformatik**
> **Hochschule Düsseldorf (HSD)**
> 
> **Autorin:** Jara Natur | **Jahr:** 2025

**Anwendung (optimiert für mobile Endgeräte):**
[co2calculatorr.netlify.app](https://co2calculatorr.netlify.app)

## 1. Über das Projekt

Diese Webanwendung wurde im Rahmen einer Bachelorarbeit konzipiert und entwickelt. Ziel ist es, Studierenden der Hochschule Düsseldorf (HSD) ihren individuellen $CO_2$-Fußabdruck im Studienalltag visuell und interaktiv näherzubringen.

Das Projekt nutzt **Gamification** und **Augmented Reality (AR)**, um die Auswirkungen täglicher Entscheidungen sichtbar zu machen. Das zentrale Referenzziel ist der Richtwert des HSD-Klimaschutzkonzepts von **$100\,\text{kg}\,CO_2$ pro Person und Jahr** im Hochschulkontext.

### Kernfunktionen

* **Interaktiver Fragenfluss:** Erfassung von Mobilität, Ernährung, Papierverbrauch und digitalem Verhalten.
* **Live-Feedback:** Ein dynamisches Donut-Diagramm visualisiert in Echtzeit den aktuellen $CO_2$-Stand.
* **Wissensvermittlung:** "Random Facts" bieten wissenschaftlich fundierte Fakten, um den Einfluss der digitalen Nutzung zu beleuchten.
* **AR-Visualisierung:** Das Ergebnis wird als virtueller Nachhaltigkeitsgarten dargestellt (gesund vs. verdorrt, je nach Bilanz).
* **Symbolischer Overshoot Day:** Berechnung, wann die persönlichen Ressourcen im Hochschulkontext für das Jahr aufgebraucht wären.

---

## 2. Technologien und Setup

Das Projekt setzt auf Web-Technologien, um eine hohe Zugänglichkeit zu gewährleisten.

### Tech Stack

| Kategorie | Technologie | Zweck |
| :--- | :--- | :--- |
| **AR Framework** | [A-Frame](https://aframe.io/) (WebXR) | 3D-Szene Deklaration, Komponenten-Handling. |
| **AR Engine** | [AR.js](https://ar-js-org.github.io/AR.js-Docs/) | Marker-basiertes Tracking (Hiro-Marker). |
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) | UI-Steuerung und Logik. |
| **3D Assets** | GLB (glTF Binary) | Optimierte 3D-Modelle für WebAR. |

###  Projektstruktur

Die Code-Basis verwendet eine modulare Struktur, die Logik, Daten und Assets konsequent trennt.

```bash
/
├── index.html            # Hauptseite: Definiert die UI-Struktur, Overlays und die A-Frame Szene.
├── style.css             # Styling: Das gesamte CSS für das Interface.
├── README.md             # Projektdokumentation (Diese Datei).
│
├── /scripts              # Steuerungs- und Render-Logik
│   ├── main.js           # Hauptsteuerungslogik und Initialisierung der App.
│   └── renderGarden.js   # Logik zur dynamischen Auswahl und Positionierung der 3D-Modelle.
│
├── /scripts/common       # Modulare Logik & Daten
│   ├── calculate.js      # Die reinen Berechnungsfunktionen für den CO2-Score.
│   ├── digitalFacts.js   # Daten-Array: Fakten zu digitaler Nutzung.
│   ├── feedbackTexts.js  # Daten-Array: Texte für das Feedback am Ende.
│   ├── handleNamePrompt.js # Logik zur Speicherung des Nutzernamens.
│   ├── questions.js      # Daten-Array: Die gesamten Fragen und zugehörigen CO2-Werte.
│   └── setupOverlayObserver.js # Logik zur Überwachung des Overlays.
│
└── /assets               # ALLE Assets in einem flachen Ordner (GLB-Modelle, Texturen, UI-Grafiken)
    ├── bush-dead.glb         # Beispiel: Abgestorbenes Busch-Modell (zustandsabhängig)
    ├── tree-good.glb         # Beispiel: Gesunder Baum (zustandsabhängig)
    ├── pond.glb              # Beispiel: Static-Asset für die Szene
    └── ... (Alle weiteren GLB-Dateien, PNG-Texturen und 2D-Grafiken)

``` 

## 3. Demo und Nutzung 

Die Anwendung ist als Web-App konzipiert und primär für **mobile Endgeräte** (Smartphones) optimiert.

### Voraussetzungen für die AR-Szene

Zur finalen Darstellung des Nachhaltigkeitsgartens wird ein **Hiro-Marker** benötigt.

1.  Öffne die App auf deinem Smartphone.
2.  Durchlaufe den Fragenkatalog.
3.  Scanne am Ende den Hiro-Marker, um deinen persönlichen Garten zu sehen.
<p align="center">
    <img src="https://i.imgur.com/HOeFtqs.png" alt="Der klassische AR.js Hiro-Marker" width="200" />
    <br>
    <em>Bitte Marker ausdrucken oder auf einem separaten Bildschirm anzeigen.</em>
</p>



---

## 4. Bekannte Einschränkungen und Reflexion

###  Herausforderungen während der Entwicklung
* **Technologiewechsel:** Die ursprünglich geplante Umsetzung mit **React und Three.js** musste aufgrund von Performance- und Stabilitäts-Problemen auf mobilen Geräten zugunsten von **A-Frame** verworfen werden.
* **AR-Interaktion:** Aufgrund technischer Hürden bei Touch-Events innerhalb der AR-Szene musste der gesamte Fragenfluss als stabiles HTML-Overlay realisiert werden. AR wird ausschließlich für die finale Ergebnisdarstellung genutzt.

###  Kritische Selbstreflexion
Rückblickend würde das Projekt heute **grundlegend anders** angegangen werden: Die Konzentration auf die WebAR-Funktionalität hat zu viel Entwicklungszeit gebunden. Bei einem erneuten Start würde der Fokus stärker auf eine **pure, markerlose Web-Anwendung** mit interaktiver 3D-Visualisierung (ohne AR-Zwänge) gelegt, um eine stabilere User Experience auf allen Geräten zu gewährleisten und die Entwicklungszeit effizienter zu nutzen.

---

## 5. Datengrundlage & Berechnung

* **Referenzziel:** $100\,\text{kg}\,CO_2$ pro Person und Jahr (HSD Klimaschutzkonzept).
* **Datengrundlage:** Emissionsfaktoren des Umweltbundesamtes (UBA) für Mobilität und Ernährung; The Shift Project für digitale Emissionen.
* **Betrachtungszeitraum:** 30 aktive Hochschulwochen pro Jahr.

## 6. Screenshots

Die folgenden Screenshots veranschaulichen den interaktiven Fragenfluss, den Hinweis zur Aktivierung der Augmented Reality sowie die finale Ergebnisdarstellung des Nachhaltigkeitsgartens.

<p align="center">
    <img src="https://i.imgur.com/sBVJOrZ.png" alt="Screenshot des interaktiven Fragenfluss-Interfaces" width="30%" /> 
    &nbsp;&nbsp;&nbsp;&nbsp; 
    <img src="https://i.imgur.com/p7ZTFH8.png" alt="Screenshot des Hinweises zum Scannen des Markers (AR-Ansicht)" width="30%" /> 
    &nbsp;&nbsp;&nbsp;&nbsp;
    <img src="https://i.imgur.com/r1SYud4.png" alt="Screenshot der finalen AR-Szene mit dem Nachhaltigkeitsgarten" width="30%" />
</p>

## 7. Ausblick

Mögliche Features für zukünftige Versionen:
* Vergleichsmodus mit dem Durchschnitt der Studierendenschaft.
* Implementierung von *Markerless Tracking* (sofern WebXR-Support stabiler wird).

---

## Lizenz & Credits

**Autorin:** Jara Natur

**Betreuerinnen:** Prof. Gabi Schwab-Trapp, Dr. Christina Karababa

*Diese Anwendung wurde im Rahmen einer akademischen Abschlussarbeit an der Hochschule Düsseldorf (HSD) erstellt.*

