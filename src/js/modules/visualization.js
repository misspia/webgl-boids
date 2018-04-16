import * as THREE from 'three'

import audioFile from '../../assets/default.mp3';

import Audio from './audio.js'
import Bar from './bar.js'
import { Calc } from './utils.js'

class Visualization {
  constructor({renderer, camera, scene}) {
    this.renderer = renderer;
    this.camera = camera;
    this.scene = scene;
    this.audio = {};
    this.nodes = [];

    this.fftSize = 32;
    this.init();
  }
  formatBorders(vertices) {
    return {
      max: vertices[0],
      min: vertices[vertices.length - 2]
    };
  }
  init() {
    const config = {
      audioFile,
      camera: this.camera,
      fftSize: this.fftSize
    }
    this.audio = new Audio(config);
    this.initBars();
  }
  initBars() {
    const length = this.fftSize / 2;
    for(let i = 0; i < length; i ++) {
      const config = {
        pos: new THREE.Vector3(i, 0, 0),
        width: 0.5,
        height: 1,
        depth: 0.5,
      };
      const bar = new Bar(config);
      this.nodes.push(bar);
      this.scene.add(bar.mesh);
    }
  }
  drawBars() {
    const config = {
      pos: new THREE.Vector3(0, 0, 0),
      width: 1,
      height: 2,
      depth: 0.5,
    };
    const bar = new Bar(config);
    this.scene.add(bar.mesh);
  }
  render() {
    this.audio.getFrequencyData();

  }
}

export default Visualization;
