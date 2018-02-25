import './index.scss'
import App from './js/app.js'
import frag from './shaders/frag.glsl'

const canvas = document.getElementById('canvas');
const options = {antialias: false, alpha: false, stencil: false};

const app = new App(canvas, options);
const { renderer, camera, target, scene, controls } = app.getSetupObjects();


const draw = () => {
  requestAnimationFrame(draw);
}

draw();
