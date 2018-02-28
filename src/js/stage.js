import * as THREE from 'three'
import dat from 'dat.gui'

import Boids from './boids.js'


class Stage {
  constructor({ renderer, camera, target, scene, controls }) {
    this.renderer = renderer;
    this.camera = camera;
    this.target = target;
    this.scene = scene;
    this.controls = controls;
    this.gui = new dat.GUI();

    this.container = {};
    this.simulation = {};
    this.init();
  }
  init() {
    this.createContainer();
    this.createGUI();
    this.initSimulation();

  }
  initSimulation() {
    const config = {
      renderer: this.renderer,
      camera: this.camera,
      scene:this.scene,
      target: this.target,
      spawnPosition: this.getContainerCenter(),
      boundingBox: this.getContainerVertices()
    }
    this.simulation = new Boids(config);
  }
  createGUI() {
    // dat.gui controls
    // example:
    // this.gui.add(this.container.position, 'y', 0, 100).listen()
  }
  createContainer() {
    const size = 2;
    const halfSize = size / 2;

    const geometry = new THREE.BoxGeometry(size, size, size);
    // geometry.translate(halfSize, halfSize, halfSize);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

    this.container = new THREE.Mesh(geometry, material);
    this.scene.add(this.container);

    // this.camera.position.set(halfSize, halfSize, halfSize);
    // console.log(this.getContainerVertices())
  }
  getContainerVertices() {
    return this.container.geometry.vertices;
  }
  getContainerCenter() {
    return this.container.position;
  }
  render() {
    this.renderer.render(this.scene, this.camera)
    this.simulation.render();
    requestAnimationFrame(() => this.render());
  }
}

export default Stage;
