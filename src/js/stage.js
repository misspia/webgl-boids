import * as THREE from 'three';

class Stage {
  constructor({ renderer, camera, target, scene, controls }) {
    this.renderer = renderer;
    this.camera = camera;
    this.target = target;
    this.scene = scene;
    this.controls = controls;
  }
  init() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);
    this.camera.position.z = 5;

  }
  draw() {
    this.init();
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => this.draw())
  }
}

export default Stage;
