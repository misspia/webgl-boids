import * as THREE from 'three';
import vert from '../../shaders/bar.vert';
import frag from '../../shaders/bar.frag';

class Bar {
  constructor({pos, height, width, depth}) {
    this.pos = pos;
    this.height = height;
    this.width = width;
    this.depth = depth;

    this.mesh = {};
    this.init();
  }
  init() {
    const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

    this.mesh = new THREE.Mesh(geometry, material);
  }
  render() {

  }
}

export default Bar;
