import * as THREE from 'three'

import Boid from './boid.js'
import { Calc } from './utils.js'

class Boids {
  constructor({renderer, camera, scene, spanPosition, containerVertices}) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;

    this.spawnPosition = {};
    this.borders = this.formatBorders(containerVertices);

    this.boids = [];
    this.numBoids = 10;
    this.vel = new THREE.Vector3(0.01, 0.01, 0.01);
    this.accel = new THREE.Vector3(0.01, 0.01, 0.01);

    this.initPositions();
  }
  formatBorders(vertices) {
    return {
      max: vertices[0],
      min: vertices[vertices.length - 2]
    };
  }
  initPositions() {
    for(let i = 0; i < this.numBoids; i ++) {
      const radius = 0.1;
      const min = this.borders.min;
      const max = this.borders.max;

      const coord = new THREE.Vector3(
        Calc.randomInRange(min.x + radius, max.x - radius),
        Calc.randomInRange(min.y + radius, max.y - radius),
        Calc.randomInRange(min.z + radius, max.z - radius)
      );

      const boid = new Boid(this.borders, coord, radius, this.vel, this.accel);
      this.scene.add(boid.mesh);
      this.boids.push(boid);
    }
  }
  updatePositions() {
    this.boids.forEach( (boid, index) => {
      const cohesionVector = this.cohesion(index);
      const seperationVector = this.seperation(boid, index);
      const alignmentVector = this.alignment(boid, index);

      const combinedRules = cohesionVector;

      boid.updatePos(combinedRules);

      // boid.addVel(combinedRules);
      // boid.addPos(boid.vel);

      // boid.vel = b.vel + cohesionVector + seperationVector + alignmentVector;
      // boid.pos = boid.pos + boid.vel;
    });
  }

  // boid rules
  cohesion(targetIndex) { // center mass without current boid
    const totalPos = this.boids.reduce((acc, boid, index) => {
      if(targetIndex == index) return acc;
      return acc.add(boid.pos);
    }, new THREE.Vector3());

    return totalPos.divideScalar(this.boids.length);
  }
  seperation(targetBoid, targetIndex) {
    return this.boids.reduce((acc, boid, index) => {
      if(targetIndex == index) return acc;

      const deltaPos = targetBoid.pos.sub(boid); // length() ??
       // 0.3 = closest allowed dist b/w boids
       // should be at least creater than the radius of a boid
      if(Math.abs(deltaPos) < 0.3) {
        return acc -= deltaPos;
      }
    }, new THREE.Vector3());
  }
  alignment(targetBoid, targetIndex) {
    const totalVel = this.boids.reduce((acc, boid, index) => {
      if(targetIndex == index) return acc;
      return acc.add(boid.vel);
    }, new THREE.Vector3());

    totalVel.divideScalar(this.boids.length - 1);
    return totalVel.sub(targetBoid.vel).divideScalar(0.1); // 0.1 --> add a bit of vel back
  }

  render() {
    // this.vel += this.accel;
    this.boids.forEach( boid => {
      this.updatePositions();
      // boid.addPos(new THREE.Vector3(Math.random() / 2, Math.random() / 2, Math.random() / 2));
      // boid.mesh.position.x += this.vel;
    })
  }
}

export default Boids;
