'use strict';

import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

function main() {
  const canvas = document.querySelector('#canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas
  });

  // camera
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  // scene
  const scene = new THREE.Scene();

  // box geometry
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // 육면체 각 면에 서로 다른 6개의 텍스쳐를 지정하기
  const cubes = [];

  const loadManager = new THREE.LoadingManager();
  const loader = new THREE.TextureLoader(loadManager);

  const materials = [
    new THREE.MeshBasicMaterial({
      map: loader.load('./image/flower-1.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load('./image/flower-2.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load('./image/flower-3.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load('./image/flower-4.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load('./image/flower-5.jpg')
    }),
    new THREE.MeshBasicMaterial({
      map: loader.load('./image/flower-6.jpg')
    }),
  ];

  // loadManager.onProgress 콜백함수에서 처리하려는 DOM 요소
  const loadingElem = document.querySelector('#loading');
  const progressBarElem = loadingElem.querySelector('.progressbar');

  loadManager.onLoad = () => {
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    cubes.push(cube);
  };

  // onProgress 콜백함수를 지정하면 현재 LoadingManager의 진행상태를 추적하는 값을 받아올 수 있음. 공식 튜토리얼 및 documentation 참고.
  loadManager.onProgress = (urlOfLastItemLoaded, itemLoaded, itemTotal) => {
    const progress = itemLoaded / itemTotal;
    progressBarElem.style.transform = `scaleX(${progress})`;
  }

  // resize
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function animate(t) {
    t *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, index) => {
      const speed = 0.2 + index * 0.1;
      const rotate = t * speed;
      cube.rotation.x = rotate;
      cube.rotation.y = rotate;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

main();