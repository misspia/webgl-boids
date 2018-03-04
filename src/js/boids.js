import * as THREE from 'three'

import Boid from './boid.js'
import Utils from

class Boids {
  constructor({renderer, camera, scene, spanPosition, boundingBox}) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;

    this.spawnPosition = {};
    this.boundingBox = [];

    this.boids = [];
    this.numBoids = 10;
    this.vel = 0.01;
    this.accel = 0.01;

    this.init();
  }
  initualizePositions() {  // randomize starting pos within container for each
    for(let i = 0; i < this.numBoids; i ++) {
      const coord = {
        x: 0,
        y: 0,
        z: 0
      };
      //  const coord = new THREE.Vector3(0, 0, 0);
      const boid = new Boid(coord, 0.1, 0.1, 0.1);
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
  // boid rules
  getCenterMass(targetIndex) { // center mass without current boid
    // average of all boid positions except boid index
    const sum = this.boids.reduce((sum, boid, index) => {
      if(targetIndex == index) return sum;
      return sum.add(boid.pos);
    }, new THREE.Vector3());

    return sum.divideScalar(this.boids.length);
  }
  keepSmallDist(targetBoid, targetIndex) {
    return this.boids.reduce((acc, boid, index) => {
      if(targetIndex == index) return acc;

      const deltaPos = targetBoid.sub(boid); // length() ??
      if(Math.abs(deltaPos) < 100) { // 100 = closest allowed dist b/w boids
        return acc -= deltaPos;
      }
    }, new THREE.Vector3());
  }
  matchNeighbourVel() {

  }

  render() {
    // this.vel += this.accel;
    this.boids.forEach( boid => {
      // boid.mesh.position.x += this.vel;
    })
  }

}

export default Boids;
