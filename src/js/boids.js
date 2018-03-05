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
    this.vel = 0.01;
    this.accel = 0.01;

    this.initualizePositions();
  }
  formatBorders(vertices) {
    return {
      max: vertices[0],
      min: vertices[vertices.length - 2]
    };
  }
  initualizePositions() {  // randomize starting pos within container
    console.log(this.borders)
    for(let i = 0; i < this.numBoids; i ++) {
      const radius = 0.1;
      const min = this.borders.min;
      const max = this.borders.max;

      const coord = new THREE.Vector3(
        Calc.randomInRange(min.x + radius, max.x - radius),
        Calc.randomInRange(min.y + radius, max.y - radius),
        Calc.randomInRange(min.z + radius, max.z - radius)
      );

      const boid = new Boid(coord, radius, this.vel, this.accel);
      this.scene.add(boid.mesh);
      this.boids.push(boid);
    }
  }
  drawBoids() {

  }
  updatePositions() {
    this.boids.forEach( boid => {
      const v1 = this.getCenterMass();
      const v2 = this.keepSmallDist();
      const v3 = this.matchNeighbourVel();

      boid.vel = b.vel + v1 + v2 + v3;
      boid.pos = boid.pos + boid.vel;
    });
  }
  testBorders() { // make sure boid is within borders + clamp if not
    //Math.min()
    // Math.max()
  }
  // boid rules
  getCenterMass(targetIndex) { // center mass without current boid
    // average of all boid positions except boid index
    const totalPos = this.boids.reduce((acc, boid, index) => {
      if(targetIndex == index) return acc;
      return acc.add(boid.pos);
    }, new THREE.Vector3());

    return totalPos.divideScalar(this.boids.length);
  }
  keepSmallDist(targetBoid, targetIndex) {
    return this.boids.reduce((acc, boid, index) => {
      if(targetIndex == index) return acc;

      const deltaPos = targetBoid.sub(boid); // length() ??

       // 0.3 = closest allowed dist b/w boids
       // should be at least creater than the radius of a boid
      if(Math.abs(deltaPos) < 0.3) {
        return acc -= deltaPos;
      }
    }, new THREE.Vector3());
  }
  matchNeighbourVel(targetBoid, targetIndex) {
    const totalVel = this.boids.reduce((acc, boid, index) => {
      if(boidIndex == index) return acc;
      return acc += boid.vel;
    }, new THREE.Vector3());

    totalVel.divideScalar(this.boids.length - 1);
    return totalVel.sub(targetBoid.vel).divideScalar(0.1); // 0.1 --> add a bit of vel back
  }

  render() {
    // this.vel += this.accel;
    this.boids.forEach( boid => {
      // boid.mesh.position.x += this.vel;
    })
  }

}

export default Boids;
