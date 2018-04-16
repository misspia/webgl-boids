import * as THREE from 'three'
import dat from 'dat.gui'

import Visualization from './modules/visualization.js'

class Stage {
  constructor({ renderer, camera, target, scene, controls }) {
    this.renderer = renderer;
    this.camera = camera;
    this.target = target;
    this.scene = scene;
    this.controls = controls;
    this.gui = new dat.GUI();

    this.container = {};
    this.visualization = {};
    this.init();
  }
  init() {
    this.createDatGUI();
    this.initVisualization();

  }
  initVisualization() {
    const config = {
      renderer: this.renderer,
      camera: this.camera,
      scene:this.scene,
    }
    this.visualization = new Visualization(config);
  }
  createDatGUI() {
    // dat.gui controls
    // example:
    // this.gui.add(this.container.position, 'y', 0, 100).listen()
  }
  createContainer() {
    const size = 2;
    const halfSize = size / 2;

    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

    this.container = new THREE.Mesh(geometry, material);
    this.scene.add(this.container);
  }
  getContainerVertices() {
    return this.container.geometry.vertices;
  }
  getContainerCenter() {
    return this.container.position;
  }
  render() {
    this.renderer.render(this.scene, this.camera);
    this.visualization.render();
    requestAnimationFrame(() => this.render());
  }
}

export default Stage;
