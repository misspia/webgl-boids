import * as THREE from 'three';

class Audio {
  constructor({camera, audioFile}) {
    this.listener = {};
    this.sound = {};
    this.camera = camera;
    this.file = audioFile;

    this.init();
  }
  init() {
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);

    this.sound = new THREE.Audio(this.listener);
    this.loadFile();
  }
  loadFile() {
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(this.file, (buffer) => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.sound.setVolume(0.5);
      this.play()
    })
  }
  play() {
    this.sound.play();
  }
  pause() {
    this.sound.pause();
  }
}

export default Audio;
