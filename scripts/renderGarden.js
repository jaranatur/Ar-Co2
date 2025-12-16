
import { renderFinalButtons } from './main.js';
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

  // Bäume
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

  //  Blumen
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

  //  Pond + Wasserpflanzen
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

  //  Büsche
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

  setTimeout(() => {
    renderFinalButtons();
  }, 11000); //  8.5s + 1.8s + Puffer  

}
