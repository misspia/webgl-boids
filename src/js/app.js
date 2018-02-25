import * as THREE from 'three'
import createControls from 'orbit-controls'

class App {
  constructor(canvas, options = {}) {
    this.canvas = canvas;

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      ...options
    });

    // set device pizel ratio
    const dpr = Math.min(1.5, window.devicePixelRatio);
    this.renderer.setPixelRatio(dpr);

    // 3D camera looking
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.01, 100);
    this.target = new THREE.Vector3();

    // 3D scene
    this.scene = new THREE.Scene();

    // 3D orbit controller
    this.controls = createControls({
      element: this.canvas,
      rotateSpeed: 0,
      distance: 1,
      distanceBounds: [1, 100],
      ...options
    });

    //setup initial size
    this.resize();

    // event listeners
    window.addEventListener('resize', () => this.resize());
  }
  getSetupObjects() {
    return {
      renderer: this.renderer,
      camera: this.camera,
      target: this.target,
      scene: this.scene,
      controls: this.controls,
    }
  }
  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    // update camera controls
    this.controls.update();
    this.camera.position.fromArray(this.controls.position);
    this.camera.up.fromArray(this.controls.up);
    this.camera.lookAt(this.target.fromArray(this.controls.direction));

    // update camera matrices
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();

  }
}

export default App;
