import * as THREE from 'three'
import vert from '../shaders/boid.vert'
import frag from '../shaders/boid.frag'

class Boid {
  constructor(borders, pos, radius, vel, accel) {
    this.borders = borders;
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
  addVel(vector) {
    const newVel = this.vel.clone().add(vector);
    this.vel.set(newVel.x, newVel.y, newVel.z);
  }
  addPos(vector) {
    const newPos = this.mesh.position.clone().add(vector);
    this.mesh.position.set(newPos.x, newPos.y, newPos.z);
  }
  updatePos(vector) {
    this.addVel(vector);
    this.addPos(this.vel);
    this.boundPos();
  }
  boundPos() { // make sure boid is within borders + clamp if not
    Object.keys(this.mesh.position).forEach(axis => {
      this.boundAxis(axis);
    })
  }
  boundAxis(axis) {
    const coord = this.mesh.position[axis];
    // const pos = this.mesh.posistion[axis];
    console.log(this.mesh.position[axis])
    // if(coord <= this.borders.min[axis]) {
    //   this.mesh.posistion[axis] = this.borders.min[axis] + this.radius;
    // } else if(coord >= this.borders.max[axis]) {
    //   this.mesh.posistion[axis] = this.borders.max[axis] - this.radius;
    // } else {
    //   this.mesh.posistion[axis] = coord;
    // }
  }
}


export default Boid;
