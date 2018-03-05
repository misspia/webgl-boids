import * as THREE from 'three';
import './index.scss'
import App from './js/app.js'
import Stage from './js/stage.js'
import frag from './shaders/frag.glsl'

const canvas = document.getElementById('canvas');
const options = {
  antialias: true,
  alpha: false,
  stencil: false
};

const app = new App(canvas, options);
app.showGridHelper();
const setupObjects = app.getSetupSetup();

const stage = new Stage(setupObjects);

window.onload = () => {
  stage.render();
}
