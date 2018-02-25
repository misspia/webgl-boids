import * as THREE from 'three';

class Stage {
  constructor({ renderer, camera, target, scene, controls }) {
    this.renderer = renderer;
    this.camera = camera;
    this.target = target;
    this.scene = scene;
    this.controls = controls;

    this.container = {};
    this.init();
  }
  init() {
    this.createContainer();

  }
  createContainer() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    this.container = new THREE.Mesh(geometry, material);
    this.scene.add(this.container);
    console.log('!!', this.getStageBoundingBox())
    // const boxHelper = new THREE.BoxHelper(this.container, 0xffff00);
    // this.scene.add(boxHelper)
  }
  getStageBoundingBox() {
    return this.container.geometry.vertices;
  }
  draw() {
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => this.draw())
  }
}

export default Stage;
