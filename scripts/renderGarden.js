

// 🪧 Schild
const sign = document.createElement('a-entity');
sign.setAttribute('gltf-model', '#wood-sign');
sign.setAttribute('position', '0 0 -0.8');  // zentriert, leicht vorne
sign.setAttribute('rotation', '0 180 0');  // dreht das Schild zur Kamera
sign.setAttribute('final-scale', '5 5 5');
container.appendChild(sign);
animateEntityGrow(sign, 0, 1800); // zuerst animieren

export function animateEntityGrow(entity, delay = 0, duration = 2500) {
  entity.setAttribute('scale', '0.001 0.001 0.001');
  entity.setAttribute('visible', 'true');
  entity.setAttribute('animation__grow', {
    property: 'scale',
    to: entity.getAttribute('final-scale') || '1 1 1',
    delay,
    dur: duration,
    easing: 'easeOutElastic'
  });
}


export function renderGarden(answers) {
  const container = document.querySelector('#garden-container');
  if (!container) return;

  // ❗Nur Elemente außer der Wiese löschen
  [...container.children].forEach(child => {
    if (child.id !== 'grass-plane') container.removeChild(child);
  });

  // 🌳 Bäume
  const treeMap = {
    walk: ['tree-good', 'tree-good'],
    bike: ['tree-good', 'tree-good'],
    public: ['tree-good'],
    carpool: ['tree-good', 'tree-dead'],
    auto: ['tree-dead']
  };
  const treeScaleMap = {
    'tree-good': '0.25 0.25 0.25',
    'tree-dead': '20 20 20'
  };
  const trees = treeMap[answers.transport];
  trees?.forEach((id, i) => {
    const tree = document.createElement('a-entity');
    tree.setAttribute('gltf-model', `#${id}`);
    tree.setAttribute('position', `${-1 + i * 2} 0 -1.5`);
    tree.setAttribute('final-scale', treeScaleMap[id]);
    container.appendChild(tree);
    animateEntityGrow(tree, 0, 1800);
  });

  // 🌸 Blumen
  const flowerMap = {
    vegan: ['flower-big', 'flower-big'],
    vegetarian: ['flower-tulip', 'flower-tulip'],
    'meat-rare': ['flower-tulip'],
    'meat-daily': ['flower-dead']
  };
  const flowerScaleMap = {
    'flower-big': '0.2 0.2 0.2',
    'flower-tulip': '0.06 0.06 0.06',
    'flower-dead': '2 2 2'
  };
  const flowers = flowerMap[answers.diet];
  flowers?.forEach((id, i) => {
    const x = flowers.length === 1 ? 0 : -0.75 + i * 1.5;
    const flower = document.createElement('a-entity');
    flower.setAttribute('gltf-model', `#${id}`);
    flower.setAttribute('position', `${x} 0 -0.5`);
    flower.setAttribute('final-scale', flowerScaleMap[id]);
    container.appendChild(flower);
    animateEntityGrow(flower, 2500, 1800);
  });

  // 💧 Pond + Wasserpflanzen
  const pond = document.createElement('a-entity');
  pond.setAttribute('gltf-model', '#pond');
  pond.setAttribute('position', '0.1 0.5 2');
  pond.setAttribute('rotation', '0 90 0');
  pond.setAttribute('final-scale', '1.2 1.2 1.2');
  container.appendChild(pond);
  animateEntityGrow(pond, 5000, 1800);

  if (answers.water === 'glass' || answers.water === 'refill') {
    const reed = document.createElement('a-entity');
    reed.setAttribute('gltf-model', '#reed');
    reed.setAttribute('position', '1 0.01 0.3');
    reed.setAttribute('final-scale', '1 1 1');
    container.appendChild(reed);
    animateEntityGrow(reed, 5000, 1800);
  }

  if (answers.water === 'refill') {
    const lily = document.createElement('a-entity');
    lily.setAttribute('gltf-model', '#lily');
    lily.setAttribute('position', '-1.3 0.08 0.3');
    lily.setAttribute('final-scale', '2 2 2');
    container.appendChild(lily);
    animateEntityGrow(lily, 5000, 1800);
  }

  // 🌿 Büsche
  const bushMap = {
    none: ['bush-green', 'bush-flower'],
    rare: ['bush-green'],
    medium: ['bush-dead'],
    often: ['bush-dead']
  };
  const bushScaleMap = {
    'bush-green': '5.5 5.5 5.5',
    'bush-flower': '1.25 1.25 1.25',
    'bush-dead': '1 1 1'
  };
  const bushes = bushMap[answers.paper];
  bushes?.forEach((id, i) => {
    const x = bushes.length === 1 ? 0 : -1 + i * 2;
    const bush = document.createElement('a-entity');
    bush.setAttribute('gltf-model', `#${id}`);
    bush.setAttribute('position', `${x} 0 1.2`);
    bush.setAttribute('final-scale', bushScaleMap[id]);
    container.appendChild(bush);
    animateEntityGrow(bush, 8500, 1800);
  });





//  // ☀️ oder ☁️ je nach Bildschirmzeit
// // ☀️ Sonnenlicht
// if (hours <= 2) {
//   const sun = document.createElement('a-entity');
//   sun.setAttribute('light', 'type: directional; color: #fffca0; intensity: 0.8; castShadow: true');
//   sun.setAttribute('position', '2 4 2');
//   container.appendChild(sun);

//   // 💡 Umgebungslicht
//   const ambient = document.createElement('a-entity');
//   ambient.setAttribute('light', 'type: ambient; color: #ffffff; intensity: 0.6');
//   container.appendChild(ambient);
// } else {
//   // ☁️ Wolke
//   const cloud = document.createElement('a-entity');
//   cloud.setAttribute('gltf-model', '#cloud');
//   cloud.setAttribute('material', `color: ${hours > 5 ? '#555' : '#ccc'}`);
//   cloud.setAttribute('position', '-1.5 3 -2');
//   cloud.setAttribute('scale', '0.8 0.8 0.8');

//   cloud.setAttribute('animation__move', {
//     property: 'position',
//     from: '-1.5 3 -2',
//     to: '1.5 3 -2',
//     dur: 8000,
//     loop: true,
//     dir: 'alternate',
//     easing: 'easeInOutSine'
//   });

//   container.appendChild(cloud);
//   console.log('☁️ Wolke mit Animation platziert.');
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