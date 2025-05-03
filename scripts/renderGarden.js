// 

export function renderGarden(answers) {
  const container = document.querySelector('#garden-container');
  if (!container) {
    console.error("❌ Kein #garden-container gefunden!");
    return;
  }

  console.log("✅ #garden-container gefunden und bereit.");

  // 🔁 Nur Kinder außer der Wiese entfernen
  [...container.children].forEach(child => {
    if (child.id !== 'grass-plane') container.removeChild(child);
  });
  
   
    console.log('✅ Garten-Container geleert.');
  
    // 🌳 Bäume nach Transport
    const treeMap = {
      walk: ['tree-good', 'tree-good'],
      bike: ['tree-good', 'tree-good'],
      public: ['tree-good'],
      carpool: ['tree-good', 'tree-dead'],
      auto: ['tree-dead']
    };
    
    const scaleMap = {
      'tree-good': '0.18 0.18 0.18',
      'tree-dead': '20 20 20'
    };
    
    const trees = treeMap[answers.transport];
    if (!trees) console.warn('⚠️ Keine Bäume für Transport:', answers.transport);
    
    trees?.forEach((id, i) => {
      const tree = document.createElement('a-entity');
      tree.setAttribute('gltf-model', `#${id}`);
      tree.setAttribute('position', `${-1 + i * 2} 0 -1.5`);
      tree.setAttribute('scale', scaleMap[id] || '1 1 1');
      container.appendChild(tree);
      console.log(`🌳 Baum #${i + 1} (${id}) platziert.`);
    });
    







  
    // 🌸 Blumen nach Ernährung
    const flowerMap = {
      vegan: ['flower-big', 'flower-big'],
      vegetarian: ['flower-tulip', 'flower-tulip'],
      'meat-rare': ['flower-tulip'],
      'meat-daily': ['flower-dead']
    };
  
  // 🌼 Skalierungen pro Modell
    const flowerScaleMap = {
  'flower-big': '0.2 0.2 0.2',
  'flower-tulip': '0.06 0.06 0.06',
  'flower-dead': '2 2 2'
      };  

      const flowers = flowerMap[answers.diet];
      if (!flowers) console.warn('⚠️ Keine Blumen für Ernährung:', answers.diet);
      
      flowers?.forEach((id, i) => {
        const x = flowers.length === 1 ? 0 : -0.75 + i * 1.5;
        const flower = document.createElement('a-entity');
        flower.setAttribute('gltf-model', `#${id}`);
        flower.setAttribute('position', `${x} 0 -0.5`);
        flower.setAttribute('scale', flowerScaleMap[id] || '1 1 1');
        container.appendChild(flower);
        console.log(`🌸 Blume #${i + 1} (${id}) platziert.`);
      });









  
    // 💧 Teich
    const pond = document.createElement('a-entity');
    pond.setAttribute('gltf-model', '#pond');
    pond.setAttribute('position', '0.1 0.5 2');
    pond.setAttribute('scale', '1.2 1.2 1.2');
    pond.setAttribute('rotation', '0 90 0');
    container.appendChild(pond);
    console.log('💧 Teich platziert.');
    
  
    // 🌾 Wasserpflanzen
    if (answers.water === 'glass' || answers.water === 'refill') {
      const reed = document.createElement('a-entity');
      reed.setAttribute('gltf-model', '#reed');
      reed.setAttribute('position', '1 0.01 0.3');
      reed.setAttribute('scale', '1 1 1');
      container.appendChild(reed);
      console.log('🌾 Schilf platziert.');
    }
    if (answers.water === 'refill') {
      const lily = document.createElement('a-entity');
      lily.setAttribute('gltf-model', '#lily');
      lily.setAttribute('position', '-1.3 0.08 0.3');
      lily.setAttribute('scale', '2 2 2');
      container.appendChild(lily);
      console.log('🌸 Seerose platziert.');
    }
  




    // 🌿 Büsche
    const bushMap = {
      none: ['bush-green', 'bush-flower'],
      rare: ['bush-green'],
      medium: ['bush-dead'],
      often: ['bush-dead']
    };
  
    
// 📏 Skalen je Busch-ID
const bushScaleMap = {
  'bush-green': '5 5 5',
  'bush-flower': '0.1 0.1 0.1',
  'bush-dead': '1  1 1'
};

const bushes = bushMap[answers.paper];
if (!bushes) console.warn('⚠️ Keine Büsche für Papierverhalten:', answers.paper);

bushes?.forEach((id, i) => {
  const x = bushes.length === 1 ? 0 : -1 + i * 2;
  const bush = document.createElement('a-entity');
  bush.setAttribute('gltf-model', `#${id}`);
  bush.setAttribute('position', `${x} 0 1.4`);
  
  // ✨ Skala aus der Map holen (Fallback: 0.4)
  const scale = bushScaleMap[id] || '0.4 0.4 0.4';
  bush.setAttribute('scale', scale);
  
  container.appendChild(bush);
  console.log(`🌿 Busch #${i + 1} (${id}) platziert mit Skala ${scale}.`);
});






  
  //   // // 🌞 oder ☁️
  // const hours = parseFloat(answers.screenHoursPerDay);
  //  if (isNaN(hours)) {
  //      console.warn('⚠️ Ungültiger screenHoursPerDay:', answers.screenHoursPerDay);
  //     return;
  //    }
  
  //    if (hours <= 2) {
  //      const sun = document.createElement('a-entity');
  //      sun.setAttribute('light', 'type: directional; color: #fffca0; intensity: 1');
  //      sun.setAttribute('position', '0 4 -2');
  //      container.appendChild(sun);
  //      console.log('🌞 Sonne platziert.');
  //   } else {
  //      const cloud = document.createElement('a-entity');
  //      cloud.setAttribute('gltf-model', '#cloud');
  //      cloud.setAttribute('material', `color: ${hours > 5 ? '#555' : '#ccc'}`);
  //      cloud.setAttribute('position', '0 4 -2');
  //      cloud.setAttribute('scale', '0.8 0.8 0.8');
  //      container.appendChild(cloud);
  //      console.log('☁️ Wolke platziert.');
  //  }
  
  //    console.log('✅ Garten fertig gerendert.');
  // }




}


  
  //export function grassGrow() {
    //   const grass = document.querySelector("#grass-plane");
    //   if (!grass) return;
    
    //   // Sichtbar machen und auf Anfangsgröße setzen
    //   grass.setAttribute("visible", "true");
    //   grass.setAttribute("scale", "0 0 0");
    
    //   // Alte Animation löschen (für Wiederholung)
    //   grass.removeAttribute("animation__grow");
    
    //   // Neue Animation hinzufügen
    //   grass.setAttribute("animation__grow", {
    //     property: "scale",
    //     to: "1 1 1",
    //     dur: 1200,
    //     easing: "easeOutElastic"
    //   });
    
    //   console.log("🌿 grassGrow() gestartet!");
    // 