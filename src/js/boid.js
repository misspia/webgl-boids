import * as THREE from 'three'
import vert from '../shaders/boid.vert'
import frag from '../shaders/boid.frag'

class Boid {
  constructor(coords, radius, accel, vel) {
    this.coords = coords;
    this.radius = radius;
    this.vel = vel;
    this.accel = accel;

    this.body = {};
    this.init();
  }
  init() {
    const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
    // const material = new THREE.MeshBasicMaterial({color: 0xffffff});

    const material = new THREE.RawShaderMaterial({
        // uniforms: {},
        vertexShader: vert,
        fragmentShader: frag
    })

    this.body = new THREE.Mesh(geometry, material);
  }
}


export default Boid;
