import * as THREE from 'three'
import vert from '../shaders/boid.vert'
import frag from '../shaders/boid.frag'

class Boid {
  constructor(pos, radius, accel, vel) {
    this.pos = pos;
    this.radius = radius;
    this.vel = vel;
    this.accel = accel;

    this.mesh = {};
    this.init();
  }
  init() {
    const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
    const material = new THREE.RawShaderMaterial({
        uniforms: {
          uResolution: new THREE.Uniform(new THREE.Vector2(window.innerWidth, window.innerHeight)),
          radius: 0,
        },
        vertexShader: vert,
        fragmentShader: frag
    })

    this.mesh = new THREE.Mesh(geometry, material);

    const {x, y, z} = this.pos;
    this.mesh.position.set(x, y, z);
  }
}


export default Boid;
