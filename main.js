// 1. CENA
// A cena é o "mundo" 3D onde todos os objetos, luzes e câmeras existem.
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a0a2e);

// 2. CÂMERA EM PERSPECTIVA
const camera = new THREE.PerspectiveCamera(
  60, // fov
  window.innerWidth / window.innerHeight, // aspect
  0.1, // near
  1000, // far
);
camera.position.set(3, 2.5, 4); // posição inicial da câmera no espaço

// 3. RENDERIZADOR
// O renderizador converte a cena 3D em pixels 2D no canvas usando WebGL.
const renderer = new THREE.WebGLRenderer({
  antialias: true, // suaviza bordas serrilhadas
  alpha: false,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.getElementById("canvas-container").appendChild(renderer.domElement);

// 4. ILUMINAÇÃO
// Luz ambiente: ilumina todos os objetos uniformemente (sem sombra)
const ambientLight = new THREE.AmbientLight(0x1a2a4a, 1.2);
scene.add(ambientLight);

// Luz direcional principal: simula o sol, projeta sombras
const dirLight = new THREE.DirectionalLight(0x6699ff, 2.0);
dirLight.position.set(5, 8, 5);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(1024, 1024);
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 50;
scene.add(dirLight);

// Luz de preenchimento (fill light) — contraluz azulada
const fillLight = new THREE.DirectionalLight(0x2244aa, 1.0);
fillLight.position.set(-4, -2, -3);
scene.add(fillLight);

// Luz pontual para destaque no topo do cubo
const pointLight = new THREE.PointLight(0x88aaff, 3.0, 12);
pointLight.position.set(0, 7, 0);
scene.add(pointLight);

// 5. CUBO
// BoxGeometry(largura, altura, profundidade)
const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3);

// Material com brilho metálico
const material = new THREE.MeshStandardMaterial({
  color: 0xffd700,
  metalness: 0.4,
  roughness: 0.3,
  envMapIntensity: 1.0,
});

const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

// 6. PLANO (chão)
const planeGeo = new THREE.PlaneGeometry(20, 20);
const planeMat = new THREE.MeshStandardMaterial({
  color: 0x888888,
  roughness: 0.9,
  metalness: 0.1,
});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -Math.PI / 2; // deita o plano horizontalmente
plane.position.y = -1; // posiciona abaixo do cubo
plane.receiveShadow = true;
scene.add(plane);

// 7. ORBIT CONTROLS
// OrbitControls permite manipular a câmera com o mouse:
//   • Botão esquerdo (arrastar)  → rotacionar em torno do alvo
//   • Botão direito (arrastar)   → transladar câmera (pan)
//   • Scroll do mouse            → zoom (aproximar/afastar)
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // amortecimento inercial para movimento suave
controls.dampingFactor = 0.06;
controls.minDistance = 2; // zoom mínimo
controls.maxDistance = 20; // zoom máximo
controls.target.set(0, 0, 0); // ponto para onde a câmera aponta
controls.update();

// 8. AJUSTE DE REDIMENSIONAMENTO
// Quando a janela é redimensionada, atualiza aspect ratio da câmera e o tamanho do canvas
window.addEventListener("resize", () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix(); // recalcula a matriz de projeção perspectiva

  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// 9. LOOP DE ANIMAÇÃO
// requestAnimationFrame chama a função no próximo frame do navegador (~60fps)
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  // Rotação suave automática quando o usuário não interage
  cube.rotation.y = elapsed * 0.3;
  cube.rotation.x = Math.sin(elapsed * 0.2) * 0.15;

  cube.position.y = Math.sin(elapsed * 0.8) * 0.08;

  controls.update();

  renderer.render(scene, camera);
}

animate();
