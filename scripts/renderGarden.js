export function renderGarden(answers) {
    const container = document.querySelector('#garden-container');
    if (!container) return;
  
    container.innerHTML = '';
  
    const treeMap = {
        walk: ['tree-good', 'tree-good'],
        bike: ['tree-good', 'tree-good'],
        public: ['tree-good'],
        carpool: ['tree-dead'],
        auto: ['tree-dead']
      };
      
    const trees = treeMap[answers.transport] || [];
    trees.forEach((id, i) => {
      const tree = document.createElement('a-entity');
      tree.setAttribute('gltf-model', `#${id}`);
      tree.setAttribute('position', `${-1 + i * 2} 0 -4.5`);
      tree.setAttribute('scale', '0.5 0.5 0.5');
      container.appendChild(tree);
    });
  
    const flowerMap = {
      vegan: ['flower-big', 'flower-big'],
      vegetarian: ['flower-tulip', 'flower-tulip'],
      'meat-rare': ['flower-tulip'],
      'meat-daily': ['flower-dead']
    };
    const flowers = flowerMap[answers.diet] || [];
    flowers.forEach((id, i) => {
      const x = flowers.length === 1 ? 0 : -1 + i * 2;
      const flower = document.createElement('a-entity');
      flower.setAttribute('gltf-model', `#${id}`);
      flower.setAttribute('position', `${x} 0 -3.5`);
      flower.setAttribute('scale', '0.4 0.4 0.4');
      container.appendChild(flower);
    });
  
    const pond = document.createElement('a-entity');
    pond.setAttribute('gltf-model', '#pond');
    pond.setAttribute('position', '0 0 -2.5');
    pond.setAttribute('scale', '0.7 0.7 0.7');
    container.appendChild(pond);
  
    if (answers.water === 'glass' || answers.water === 'refill') {
      const reed = document.createElement('a-entity');
      reed.setAttribute('gltf-model', '#reed');
      reed.setAttribute('position', '0.4 0.01 -2.4');
      reed.setAttribute('scale', '0.3 0.3 0.3');
      container.appendChild(reed);
    }
    if (answers.water === 'refill') {
      const lily = document.createElement('a-entity');
      lily.setAttribute('gltf-model', '#lily');
      lily.setAttribute('position', '-0.4 0.01 -2.6');
      lily.setAttribute('scale', '0.3 0.3 0.3');
      container.appendChild(lily);
    }
  
    const bushMap = {
      none: ['bush-green', 'bush-flower'],
      rare: ['bush-green'],
      medium: ['bush-dead'],
      often: ['bush-dead']
    };
    const bushes = bushMap[answers.paper] || [];
    bushes.forEach((id, i) => {
      const x = bushes.length === 1 ? 0 : -1 + i * 2;
      const bush = document.createElement('a-entity');
      bush.setAttribute('gltf-model', `#${id}`);
      bush.setAttribute('position', `${x} 0 -1.5`);
      bush.setAttribute('scale', '0.4 0.4 0.4');
      container.appendChild(bush);
    });
  
    const hours = parseFloat(answers.screenHoursPerDay);
    if (hours <= 2) {
      const sun = document.createElement('a-entity');
      sun.setAttribute('light', 'type: directional; color: #fffca0; intensity: 1');
      sun.setAttribute('position', '0 4 -2');
      container.appendChild(sun);
    } else {
      const cloud = document.createElement('a-entity');
      cloud.setAttribute('gltf-model', '#cloud');
      cloud.setAttribute('material', `color: ${hours > 5 ? '#555' : '#ccc'}`);
      cloud.setAttribute('position', '0 4 -2');
      cloud.setAttribute('scale', '0.8 0.8 0.8');
      container.appendChild(cloud);
    }
  }
  