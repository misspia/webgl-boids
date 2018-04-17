import * as THREE from 'three';
import vert from '../../shaders/bar.vert';
import frag from '../../shaders/bar.frag';

class Bar {
  constructor({pos}) {
    this.pos = pos;
    this.height = 1.0;
    this.width = 0.5;
    this.depth = 0.5;
    this.vert = vert;
    this.frag = frag;
    this.geometry = {};
    this.material = {};

    this.mesh = {};
    this.init();
  }
  init() {
    this.initGeometry();
    this.initMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.setPos();
  }
  initGeometry() {
    this.geometry = new THREE.BoxBufferGeometry(this.width, this.height, this.depth);
    this.geometry.addAttribute('frequency', new THREE.Float32BufferAttribute(1, 1, 1, 1));
  }
  initMaterial() {
    this.material = new THREE.RawShaderMaterial({
        uniforms: {
            time: { value: 1.0 },
            resolution: { value: new THREE.Vector2() },
        },
        vertexShader: this.vert,
        fragmentShader: this.frag,
    });
  }
  setPos() {
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
  }
  update(node) {
    this.mesh.scale.y = Math.max(0.1, node / 255) * 5;
    this.updateShaderAttributes();
  }
  updateShaderAttributes() {

  }
}

export default Bar;
