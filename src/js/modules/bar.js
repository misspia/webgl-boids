import * as THREE from 'three';
import vert from '../../shaders/bar.vert';
import frag from '../../shaders/bar.frag';

class Bar {
  constructor({pos}) {
    this.pos = pos;
    this.height = 1.0;
    this.width = 0.5;
    this.depth = 0.5;

    this.mesh = {};
    this.init();
  }
  init() {
    const geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

    this.mesh = new THREE.Mesh(geometry, material);
    this.setPos();
  }
  setPos() {
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
  }
  update(node) {
    this.mesh.scale.y = Math.max(0.1, node / 255) * 5;
  }
  render() {

  }
}

export default Bar;
