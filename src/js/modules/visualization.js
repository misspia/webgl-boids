import * as THREE from 'three'

import Bar from './bar.js'
import { Calc } from './utils.js'

class Boids {
  constructor({renderer, camera, scene}) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;

    this.init();
  }
  formatBorders(vertices) {
    return {
      max: vertices[0],
      min: vertices[vertices.length - 2]
    };
  }
  init() {
    const config = {
      pos: new THREE.Vector3(0, 0, 0),
      width: 1,
      height: 2,
      depth: 0.5,
    };
    const bar = new Bar(config);
    this.scene.add(bar.mesh);
  }
  render() {

  }
}

export default Boids;
