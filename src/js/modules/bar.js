import * as THREE from 'three';
import vert from '../../shaders/bar.vert';
import frag from '../../shaders/bar.frag';

class Bar {
  constructor({pos}) {
    this.pos = pos;
  }
}

export default Bar;
