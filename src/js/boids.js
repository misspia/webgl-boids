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
  initualizePositions() {
    for(let i = 0; i < this.numBoids; i ++) {
      const coord = {
        x: 0,
        y: 0,
        z: 0
      };
      const boid = new Boid(coord, 0.1, 0.1, 0.1);
      this.scene.add(boid.mesh);
      this.boids.push(boid);
    }
  }
  drawBoids() {

  }
  updatePositions() {

  }
  

  render() {
    // this.vel += this.accel;
    this.boids.forEach( boid => {
      // boid.mesh.position.x += this.vel;
    })
  }

}

export default Boids;
