import * as THREE from 'three'

import Bar from './bar.js'
import { Calc } from './utils.js'

class Boids {
  constructor({renderer, camera, scene, spanPosition, containerVertices}) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;

    this.borders = this.formatBorders(containerVertices);
    this.init();
  }
  formatBorders(vertices) {
    return {
      max: vertices[0],
      min: vertices[vertices.length - 2]
    };
  }
  init() {

    const bar = new Bar();
      // this.scene.add();
  }
  render() {

  }
}

export default Boids;
