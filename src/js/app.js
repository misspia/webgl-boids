import * as THREE from 'three'
import OrbitControls from 'three-orbit-controls'

const OrbitController = OrbitControls(THREE);

class App {
  constructor(canvas, options = {}) {
    this.canvas = canvas;

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      ...options
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor( 0x29233b );

    // set device pizel ratio
    const dpr = Math.min(1.5, window.devicePixelRatio);
    this.renderer.setPixelRatio(dpr);

    // 3D camera looking
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera( 75, aspectRatio, 0.01, 100);
    this.target = new THREE.Vector3();
    this.camera.position.set(0, 1, -3);
    this.camera.lookAt(this.target);

    // 3D scene
    this.scene = new THREE.Scene();
    window.scene = this.scene;

    // 3D orbit controller
    this.controls = new OrbitController(this.camera, this.renderer.domElement);

    //setup initial size
    this.resize();

    // event listeners
    window.addEventListener('resize', () => this.resize());
  }
  getSetupSetup() {
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

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}

export default App;
