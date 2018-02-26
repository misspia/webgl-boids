import * as THREE from 'three'
import dat from 'dat.gui'

class Stage {
  constructor({ renderer, camera, target, scene, controls }) {
    this.renderer = renderer;
    this.camera = camera;
    this.target = target;
    this.scene = scene;
    this.controls = controls;
    this.gui = new dat.GUI();

    this.container = {};
    this.init();
  }
  init() {
    this.createContainer();
    this.createGUI();
  }
  createGUI() {
    // dat.gui controls
    // example: 
    // this.gui.add(this.container.position, 'y', 0, 100).listen()
  }
  createContainer() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    this.container = new THREE.Mesh(geometry, material);
    this.scene.add(this.container);
  }
  getContainerVertices() {
    return this.container.geometry.vertices;
  }
  draw() {
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(() => this.draw())
  }
}

export default Stage;
