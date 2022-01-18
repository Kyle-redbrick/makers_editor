class BabylonSound {
  constructor(config) {
    const { scene, data } = config;
    this.id = data.id;
    this.name = data.defaultName;
    this.scene = scene;
    this.sound = null;
    this.execQueue = [];
    this.isReady = false;
  }
  static create(config) {
    const babylonSound = new BabylonSound(config);
    const { scene, data } = config;

    const assetTask = scene.addBinaryFileTask("soundTask", data.path);
    assetTask.onSuccess = task => {
      const sound = new BABYLON.Sound(
        data.defaultName,
        task.data,
        scene.scene,
        () => {
          babylonSound.sound = sound;
          babylonSound.onReadyToPlay();
          scene.addSound(babylonSound);
        }
      );
    };

    assetTask.onError = (task, msg, exception) => {
      console.error(111, "soundTask error", msg, exception);
      scene.addSound(babylonSound);
    };
  }

  dispose() {
    if (this.sound) {
      this.sound.dispose();
    }
  }

  onReadyToPlay() {
    this.isReady = true;
    const execQueueCount = this.execQueue.length;
    if (execQueueCount > 0) {
      for (let i = 0; i < execQueueCount; i++) {
        this.execQueue.pop()();
      }
    }
  }

  isReady() {
    return this.isReady;
  }

  execOnReady(func) {
    if (this.isReady) {
      func();
    } else {
      this.execQueue.push(func);
    }
  }

  isPlaying() {
    return this.sound ? this.sound.isPlaying : false;
  }

  play() {
    this.execOnReady(() => this.sound.play());
  }

  restart() {
    this.execOnReady(() => {
      this.stop();
      this.play();
    });
  }

  resume() {
    this.execOnReady(() => {
      if (!this.isPlaying()) {
        this.sound.play();
      }
    });
  }

  setLoop(loop) {
    this.execOnReady(() => {
      this.sound.loop = loop;
    });
  }

  stop() {
    this.execOnReady(() => {
      this.sound.stop();
    });
  }

  pause() {
    this.execOnReady(() => {
      this.sound.pause();
    });
  }

  setVolume(volume) {
    this.execOnReady(() => {
      let newVol = volume;
      if (newVol < 0) {
        newVol = 0;
      } else if (newVol > 1) {
        newVol = 1;
      }
      this.sound.setVolume(newVol);
    });
  }

  getVolume() {
    return this.sound ? this.sound.getVolume() : 0;
  }

  addVolume(value) {
    this.setVolume(this.getVolume() + value);
  }
}

window.BabylonSound = BabylonSound;
