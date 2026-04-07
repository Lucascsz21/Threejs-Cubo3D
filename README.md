# 🧊 Cubo 3D — Three.js

Aplicação web interativa que exibe um cubo em um ambiente 3D com câmera perspectiva e controle por mouse, desenvolvida com a biblioteca [Three.js](https://threejs.org/).

---

## 🖼️ Preview

> Abra `index.html` no navegador e você verá um cubo 3D iluminado com grade de referência, eixos cartesianos e wireframe. A câmera pode ser manipulada livremente com o mouse.

---

## 🚀 Como executar

Não é necessário instalar nenhuma dependência. O projeto utiliza Three.js via CDN.

### Abrir diretamente no navegador

1. Clone ou baixe este repositório
2. Abra o arquivo `index.html` diretamente no seu navegador

```bash
git clone https://github.com/Lucascsz21/Threejs-Cubo3D.git
cd Threejs-Cubo3D
# Abra index.html no navegador (duplo clique ou arraste para o browser)
```

---

## 🎮 Controles do Mouse

| Ação                          | Efeito                              |
| ----------------------------- | ----------------------------------- |
| **Botão esquerdo** (arrastar) | Rotaciona a câmera em torno do cubo |
| **Botão direito** (arrastar)  | Translada a câmera (pan)            |
| **Scroll**                    | Zoom, aproxima ou afasta a câmera   |

---

## 📁 Estrutura do Projeto

```
threejs-cube/
├── index.html   # Estrutura HTML e HUD de interface
├── main.js      # Lógica Three.js: cena, câmera, cubo, luzes, controles
```

---

## 📐 Câmera e Perspectiva

### Câmera Perspectiva (`PerspectiveCamera`)

A câmera utilizada é do tipo **perspectiva**, que simula a visão humana: objetos mais distantes aparecem menores, criando a sensação de profundidade. Ela é definida por quatro parâmetros:

```js
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
```

| Parâmetro | Valor            | Descrição                                                 |
| --------- | ---------------- | --------------------------------------------------------- |
| `fov`     | 60°              | Campo de visão vertical (Field of View)                   |
| `aspect`  | largura / altura | Proporção da tela — atualizada no resize                  |
| `near`    | 0.1              | Plano de corte próximo: objetos mais perto são ignorados  |
| `far`     | 1000             | Plano de corte distante: objetos mais longe são ignorados |

### Projeção Perspectiva

Na projeção perspectiva, raios partem de um único ponto (a câmera) e os objetos são projetados em um plano 2D. Isso cria a **convergência de linhas paralelas** e o **escalonamento pela distância** característicos da visão realista, ao contrário da projeção ortográfica, que não tem essa distorção de profundidade.

### OrbitControls

O `OrbitControls` da Three.js vincula a câmera ao mouse, permitindo orbitar, fazer pan e zoom ao redor de um ponto-alvo (`target`). Com `enableDamping = true`, os movimentos têm inércia suave.

---

## 🔧 Conceitos Implementados

- **Cena (`Scene`)**: container que agrupa todos os objetos, luzes e a câmera
- **Câmera Perspectiva**: simula visão com profundidade real
- **Renderizador WebGL** (`WebGLRenderer`): converte a cena 3D em pixels via GPU
- **BoxGeometry + MeshStandardMaterial**: cubo com material físico baseado em luz
- **Iluminação**: luz ambiente + direcional + pontual com sombras
- **Wireframe** via `EdgesGeometry`: destaca as arestas do cubo
- **OrbitControls**: rotação, pan e zoom com mouse
- **Resize handler**: mantém aspect ratio correto em qualquer resolução
- **Loop de animação** com `requestAnimationFrame`

---

## 🛠️ Tecnologias

- [Three.js r128](https://threejs.org/) — biblioteca de renderização 3D via WebGL
- HTML5 + CSS3 + JavaScript (ES6)
- Sem build tools ou dependências locais

---

## 📚 Referências

- [Documentação oficial Three.js](https://threejs.org/docs/)
- [Three.js Fundamentals](https://threejsfundamentals.org/)
- [OrbitControls – Three.js docs](https://threejs.org/docs/#examples/en/controls/OrbitControls)
