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

    this.fftSize = 64;
    this.init();
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
    const angleIncrement = 360 / length;
    const origin = new THREE.Vector3();
    const radius = 4;

    for(let i = 0; i < length; i ++) {
      const config = {
        pos: Calc.circleCoord(origin, radius, angleIncrement * i),
      };
      const bar = new Bar(config);
      this.nodes.push(bar);
      this.scene.add(bar.mesh);
    }
  }
  updateBars() {
    this.audio.data.forEach((node, index) => {
      this.nodes[index].update(node);
    })
  }
  render() {
    this.audio.getFrequencyData();
    this.updateBars()
  }
}

export default Visualization;
