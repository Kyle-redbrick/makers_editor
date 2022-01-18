class BabylonGameObject {
  constructor(config) {
    const { scene, data } = config;
    this.id = data.id;
    this.name = data.name;
    this.parentId = data.parentId;
    this.game = scene.game;
    this.scene = scene;
    this.gameObject = null;
    this.gizmo = null;
    if (this.game.isPlayMode()) {
      this.signalQueue = [];
      this.signalReceiver = {};
      setApiFunctions(this);
    }
  }
  static create(config) {
    const { data, oncreate } = config;
    const { GAMEOBJECT } = BabylonConstant;
    let babylonGameObject;
    switch (data.type) {
      case GAMEOBJECT.CAMERA:
        babylonGameObject = BabylonCamera.create(config);
        break;
      case GAMEOBJECT.SKYBOX:
        babylonGameObject = BabylonSkybox.create(config);
        break;
      case GAMEOBJECT.LIGHT:
        babylonGameObject = BabylonLight.create(config);
        break;
      case GAMEOBJECT.MESH:
        babylonGameObject = BabylonMesh.create(config);
        break;
      case GAMEOBJECT.GUI:
        babylonGameObject = BabylonGui.create(config);
        break;
      case GAMEOBJECT.TEXTURE_GUI:
        babylonGameObject = BabylonTextureGui.create(config);
        break;
      case GAMEOBJECT.EMPTY:
        babylonGameObject = BabylonEmptyObject.create(config);
        break;
      default:
        babylonGameObject = new BabylonGameObject(config);
        break;
    }
    if (oncreate && babylonGameObject) {
      oncreate(babylonGameObject);
    }
    return babylonGameObject;
  }
  static getConstructorWithType(type, subtype) {
    const { GAMEOBJECT } = BabylonConstant;
    switch (type) {
      case GAMEOBJECT.CAMERA:
        return BabylonCamera;
      case GAMEOBJECT.SKYBOX:
        return BabylonSkybox;
      case GAMEOBJECT.LIGHT:
        return BabylonLight;
      case GAMEOBJECT.MESH:
        return BabylonMesh;
      case GAMEOBJECT.GUI:
        return BabylonGui;
      case GAMEOBJECT.TEXTURE_GUI:
        return BabylonTextureGui;
      default:
        return null;
    }
  }
  static getAvailableGizmoTypes() {
    return [];
  }

  dispose() {
    this.gameObject.dispose();
  }

  getCloneCount() {
    return this.gameObject.cloneMeshMap
      ? this.gameObject.cloneMeshMap.length
      : 0;
  }

  onSelected() {
    this.showEdges();
    this.showGizmo();
  }
  onDeselected() {
    this.hideEdges();
    this.hideGizmo();
  }

  showEdges() {
    if (!this.game.isEditMode()) {
      return;
    }

    if (this.gameObject.enableEdgesRendering) {
      this.gameObject.enableEdgesRendering();
      this.gameObject.edgesColor = new BABYLON.Color4(0, 0, 0, 0.6);
    }
  }
  hideEdges() {
    if (this.gameObject.disableEdgesRendering) {
      this.gameObject.disableEdgesRendering();
    }
  }

  showGizmo() {
    if (!this.game.isEditMode()) {
      return;
    }

    const currentGizmoType = this.getCurrentGizmoType();
    if (!this.checkGizmoTypeAvailable(currentGizmoType)) {
      return;
    }
    const GizmoConstructor = this.getGizmoConstructor(currentGizmoType);
    if (!GizmoConstructor) {
      return;
    }

    const gizmoLayer = this.scene.gizmoLayer;
    const gizmo = new GizmoConstructor(gizmoLayer);
    gizmo.onDragStartObservable.add(this.onGizmoDragStart.bind(this));
    gizmo.onDragEndObservable.add(this.onGizmoDragEnd.bind(this));
    gizmo.attachedMesh = this.gameObject;
    this.gizmo = gizmo;
  }
  getCurrentGizmoType() {
    return this.game.getCurrentGizmoType();
  }
  checkGizmoTypeAvailable(gizmoType) {
    return this.constructor.getAvailableGizmoTypes().includes(gizmoType);
  }
  getGizmoConstructor(gizmoType) {
    switch (gizmoType) {
      case "scale":
        return BABYLON.ScaleGizmo;
      case "rotation":
        return BABYLON.RotationGizmo;
      case "position":
        return BABYLON.PositionGizmo;
      default:
        return null;
    }
  }
  hideGizmo() {
    if (this.gizmo) {
      this.gizmo.dispose();
      this.gizmo = undefined;
    }
  }
  onChangeCurrentGizmoType(gizmoType) {
    if (this.gizmo) {
      this.hideGizmo();
    }
    this.showGizmo();
  }

  onGizmoDragStart() {
    const currentGizmoType = this.getCurrentGizmoType();
    switch (currentGizmoType) {
      case "scale":
        this.prevScaling = this.gameObject.scaling.clone();
        break;
      case "rotation":
        this.prevRotation = this.gameObject.rotation.clone();
        break;
      case "position":
        this.prevPosition = this.gameObject.position.clone();
      default:
        break;
    }
  }
  onGizmoDragEnd() {
    const currentGizmoType = this.getCurrentGizmoType();
    switch (currentGizmoType) {
      case "scale":
        this.onChangeTransform(currentGizmoType, this.gameObject.scaling);
        break;
      case "rotation":
        this.onChangeTransform(currentGizmoType, this.gameObject.rotation);
        break;
      case "position":
        this.onChangeTransform(currentGizmoType, this.gameObject.position);
      default:
        break;
    }
  }
  onChangeTransform(type, vector3) {
    const { x, y, z } = vector3;
    const trimmer = type === "rotation" ? this.trimRotation : this.trimFloat;
    const value = {
      x: trimmer(x),
      y: trimmer(y),
      z: trimmer(z)
    };
    const payload = {
      id: this.id,
      sceneId: this.scene.id,
      propertyId: type,
      value: value
    };
    this.game.triggerListener("gameObjectPropertyChange", payload);
  }
  trimFloat(value) {
    return parseFloat(parseFloat(value).toFixed(5));
  }
  trimRotation(value) {
    return parseInt(BABYLON.Tools.ToDegrees(value));
  }

  setProperty(id, value) {
    let propertySetterId;
    switch (id) {
      case BabylonConstant.PROPERTY_ID.PARENT_ID:
        propertySetterId = "setParent";
        break;

      default:
        propertySetterId = "set" + id[0].toUpperCase() + id.slice(1, id.length);
        break;
    }
    const propertySetter = this[propertySetterId];
    if (propertySetter) {
      propertySetter.bind(this)(value);
    }
  }
  setPosition(position) {
    this.gameObject.position.x = position.x;
    this.gameObject.position.y = position.y;
    this.gameObject.position.z = position.z;
  }
  setRotation(rotation) {
    this.gameObject.rotation.x = BABYLON.Tools.ToRadians(rotation.x);
    this.gameObject.rotation.y = BABYLON.Tools.ToRadians(rotation.y);
    this.gameObject.rotation.z = BABYLON.Tools.ToRadians(rotation.z);
  }
  setScale(scale) {
    this.gameObject.scaling.x = scale.x;
    this.gameObject.scaling.y = scale.y;
    this.gameObject.scaling.z = scale.z;
  }
  setDirection(direction) {
    this.gameObject.direction.x = direction.x;
    this.gameObject.direction.y = direction.y;
    this.gameObject.direction.z = direction.z;
  }
  setParent(parentId) {
    if (!this.gameObject) {
      return;
    }

    if (parentId) {
      const parentObject = this.scene.getGameObject(parentId);
      if (parentObject) {
        this.gameObject.parent = parentObject.gameObject;
        this.parentId = parentId;
      }
    } else {
      this.gameObject.parent = null;
      this.parentId = null;
    }
  }

  onAllGameObjectsAdded() {
    this.setParent(this.parentId);
  }

  resolveSignal(name) {
    if (name in this.signalReceiver) {
      this.signalReceiver[name]();
    }
  }

  runUserScript = function() {
    const userScript = userScripts[this.scene.id][this.id];
    if (typeof userScript === "function") {
      userScript(getApis(this));
    }
    const signalCount = this.signalQueue.length;
    if (signalCount > 0) {
      for (let i = 0; i < signalCount; i++) {
        this.resolveSignal(this.signalQueue.pop());
      }
    }
  };
}

class BabylonMesh extends BabylonGameObject {
  static create(config) {
    const { data } = config;
    const MESH = BabylonConstant.MESH;

    let babylonMesh;
    switch (data.subtype) {
      case MESH.GROUND:
        babylonMesh = BabylonGround.create(config);
        break;
      case MESH.BOX:
        babylonMesh = BabylonBox.create(config);
        break;
      case MESH.SPHERE:
        babylonMesh = BabylonSphere.create(config);
        break;
      case MESH.OBJ:
        babylonMesh = BabylonOBJ.create(config);
        return babylonMesh;
      default:
        return;
    }

    babylonMesh.init(data);

    return babylonMesh;
  }
  init(data) {
    this.setPosition(data.position);
    this.setRotation(data.rotation);
    this.setScale(data.scale);
    this.setSpeed();
  }
  static getAvailableGizmoTypes() {
    return [
      BabylonConstant.GIZMO.POSITION,
      BabylonConstant.GIZMO.ROTATION,
      BabylonConstant.GIZMO.SCALE
    ];
  }

  addOnClickListener(func) {
    this.gameObject.isPickable = true;
    if (!this.gameObject.actionManager) {
      this.gameObject.actionManager = new BABYLON.ActionManager(
        this.scene.scene
      );
    }
    this.gameObject.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, func)
    );
  }

  getClone() {
    const postfix = `clone${this.getCloneCount() + 1}`;
    const newId = `${this.id}_${postfix}`;
    const newName = `${this.name}_${postfix}_${new Date().getTime()}`;

    const parentObject = this.parentId
      ? this.scene.getGameObject(this.parentId)
      : null;
    const parent = parentObject ? parentObject.gameObject : null;

    const newGameObject = this.gameObject.clone("name", parent);
    const clonedObject = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    clonedObject.id = newId;
    clonedObject.name = newName;
    clonedObject.gameObject = newGameObject;

    this.scene.addGameObject(clonedObject, true);
    return clonedObject;
  }

  setBillboardMode(mode) {
    this.gameObject.billboardMode = mode;
  }

  setPhysics(mass, restitution, friction) {
    if (!this.scene.isPhysicsEnabled()) {
      return;
    }

    if (!this.gameObject.physicsImpostor) {
      this.gameObject.physicsImpostor = new BABYLON.PhysicsImpostor(
        this.gameObject,
        this.constructor.getPhysicsImpostorType(),
        {},
        this.scene.scene
      );
    }

    if (mass !== undefined) this.setPhysicsParam("mass", mass);
    if (restitution !== undefined)
      this.setPhysicsParam("restitution", restitution);
    if (friction !== undefined) this.setPhysicsParam("friction", friction);
  }
  resetPhysicsParams() {
    const imposter = this.gameObject.physicsImpostor;
    if (!imposter) {
      return;
    }
    this.prevPhysicsParams = {
      mass: imposter.mass,
      restitution: imposter.restitution,
      friction: imposter.friction
    };
    this.setPhysicsParam("mass", 0);
    this.setPhysicsParam("restitution", 0);
    this.setPhysicsParam("friction", 0);
  }
  restorePhysicsParams() {
    if (!this.gameObject.physicsImpostor || !this.prevPhysicsParams) {
      return;
    }
    const { mass, restitution, friction } = this.prevPhysicsParams;
    this.setPhysicsParam("mass", mass);
    this.setPhysicsParam("restitution", restitution);
    this.setPhysicsParam("friction", friction);
  }
  static getPhysicsImpostorType() {
    return BABYLON.PhysicsImpostor.BoxImpostor;
  }
  setPhysicsParam(paramName, value) {
    const imposter = this.gameObject.physicsImpostor;
    if (!imposter) {
      return;
    }
    imposter.setParam(paramName, value);
  }
  getPhysicsParam(paramName) {
    const imposter = this.gameObject.physicsImpostor;
    if (!imposter) {
      return;
    }
    return imposter.getParam(paramName);
  }
  registerOnPhysicsCollide(againstObjects, func) {
    if (!this.gameObject.physicsImpostor) {
      return false;
    }
    const againstImposters = [];
    againstObjects.forEach(against => {
      if (against.gameObject.physicsImpostor) {
        againstImposters.push(against.gameObject.physicsImpostor);
      }
    });
    if (againstImposters.length === 0) {
      return false;
    }
    this.gameObject.physicsImpostor.registerOnPhysicsCollide(
      againstImposters,
      func
    );
    return true;
  }
  unregisterOnPhysicsCollide(againstObjects, func) {
    if (!this.gameObject.physicsImpostor) {
      return;
    }
    const againstImposters = [];
    againstObjects.forEach(against => {
      if (against.gameObject.physicsImpostor) {
        againstImposters.push(against.gameObject.physicsImpostor);
      }
    });
    if (againstImposters.length > 0) {
      this.gameObject.physicsImpostor.unregisterOnPhysicsCollide(
        againstImposters,
        func
      );
    }
  }

  setSpeed(x, y, z) {
    if (!this.speed) {
      this.speed = new BABYLON.Vector3(100, 100, 100);
    }
    if (x !== undefined) this.speed.x = x;
    if (y !== undefined) this.speed.y = y;
    if (z !== undefined) this.speed.z = z;
  }
  getSpeed(axis) {
    if (axis) {
      return this.speed[axis];
    }
    return this.speed;
  }

  setVelocity(axis, value) {
    if (!this.gameObject.physicsImpostor) {
      return;
    }
    if (!this.velocity) {
      this.velocity = new BABYLON.Vector3(0, 0, 0);
    }
    this.velocity[axis] = value;
    this.gameObject.physicsImpostor.setLinearVelocity(this.velocity);
  }
  getVelocity(axis) {
    if (this.velocity) {
      return this.velocity[axis];
    }
    return 0;
  }

  setAngularVelocity(axis, value) {
    if (!this.gameObject.physicsImpostor) {
      return;
    }
    if (!this.angularVelocity) {
      this.angularVelocity = new BABYLON.Vector3(0, 0, 0);
    }
    this.angularVelocity[axis] = value;
    this.gameObject.physicsImpostor.setAngularVelocity(this.angularVelocity);
  }
  getAngularVelocity(axis) {
    if (this.angularVelocity) {
      return this.angularVelocity[axis];
    }
    return 0;
  }

  setControlOption(optionName, value) {
    if (!this.controlOptions) {
      this.controlOptions = {};
    }
    this.controlOptions[optionName] = value;
  }
  attachDefaultControl(enable) {
    if (enable) {
      if (!this.gameObject.physicsImpostor) {
        this.setPhysics(0, 0, 0);
      }
      if (!this.controlOptions || !this.controlOptions.rotationSpeed) {
        this.setControlOption("rotationSpeed", 1);
      }
      if (!this.controlOptions.maxJump) {
        this.setControlOption("maxJump", 1);
      }
      this.transformNode = new BABYLON.TransformNode();
      this.defaultControlObserver = this.scene.addBeforeRenderObservable(() => {
        this.defaultControl();
        this.transformNode.position = this.gameObject.position;
      });
      this.checkAndUpdateCameraTarget(true);
    } else if (this.defaultControlObserver) {
      this.scene.removeBeforeRenderObservable(this.defaultControlObserver);
      this.defaultControlObserver = null;

      this.checkAndUpdateCameraTarget(false);
      this.transformNode.dispose();
      this.transformNode = null;
    }
  }
  defaultControl = () => {
    const { keyCodeInputMap } = this.scene;
    const frameRatio = this.scene.scene.getAnimationRatio();

    const frontVector = this.transformNode.getDirection(
      BABYLON.Vector3.Forward()
    );
    let frontVectorScale = 0;
    if (keyCodeInputMap[87] || keyCodeInputMap[38]) {
      frontVectorScale = 0.06 * frameRatio * (this.speed.z / 100);
    }
    if (keyCodeInputMap[83] || keyCodeInputMap[40]) {
      frontVectorScale = -(0.06 * frameRatio) * (this.speed.z / 100);
    }
    if (keyCodeInputMap[65] || keyCodeInputMap[37]) {
      this.transformNode.rotate(
        BABYLON.Axis.Y,
        -(0.03 * frameRatio) * this.controlOptions.rotationSpeed
      );
      this.gameObject.rotate(
        BABYLON.Axis.Y,
        -(0.03 * frameRatio) * this.controlOptions.rotationSpeed
      );
    }
    if (keyCodeInputMap[68] || keyCodeInputMap[39]) {
      this.transformNode.rotate(
        BABYLON.Axis.Y,
        0.03 * frameRatio * this.controlOptions.rotationSpeed
      );
      this.gameObject.rotate(
        BABYLON.Axis.Y,
        0.03 * frameRatio * this.controlOptions.rotationSpeed
      );
    }
    this.gameObject.moveWithCollisions(frontVector.scale(frontVectorScale));

    if (!this.jumpVectorY) {
      this.jumpVectorY = 0;
    }
    if (keyCodeInputMap[32]) {
      this.jumpVectorY += 0.03 * frameRatio;
      if (this.jumpVectorY > 0.12 * frameRatio * this.controlOptions.maxJump) {
        this.jumpVectorY = 0.12 * frameRatio * this.controlOptions.maxJump;
      }
    } else {
      this.jumpVectorY -= 0.03 * frameRatio;
      if (this.jumpVectorY < 0) {
        this.jumpVectorY = 0;
      }
    }
    if (this.jumpVectorY !== 0) {
      let jumpVector = new BABYLON.Vector3(0, 0, 0);
      jumpVector.y = this.jumpVectorY;
      this.gameObject.moveWithCollisions(jumpVector);
    }
  };
  checkAndUpdateCameraTarget(useTransformNode) {
    const activeLockedTarget = this.scene.scene.activeCamera.lockedTarget;
    if (!activeLockedTarget) return;

    if (useTransformNode && activeLockedTarget === this.gameObject) {
      this.scene.scene.activeCamera.lockedTarget = this.transformNode;
    } else if (!useTransformNode && activeLockedTarget === this.transformNode) {
      this.scene.scene.activeCamera.lockedTarget = this.gameObject;
    }
  }
}
class BabylonBox extends BabylonMesh {
  static create(config) {
    const { scene, data } = config;
    const babylonMesh = new BabylonBox(config);
    const box = BABYLON.MeshBuilder.CreateBox(data.id, {}, scene.scene);
    babylonMesh.gameObject = box;
    return babylonMesh;
  }
}
class BabylonGround extends BabylonMesh {
  static create(config) {
    const { scene, data } = config;
    const babylonMesh = new BabylonGround(config);
    const ground = BABYLON.MeshBuilder.CreateGround(data.id, {}, scene.scene);
    babylonMesh.gameObject = ground;
    return babylonMesh;
  }
  onAllGameObjectsAdded() {
    super.onAllGameObjectsAdded();
    this.gameObject.receiveShadows = true;
  }
  static getPhysicsImpostorType() {
    return BABYLON.PhysicsImpostor.BoxImpostor;
  }
}
class BabylonSphere extends BabylonMesh {
  static create(config) {
    const { scene, data } = config;
    const babylonMesh = new BabylonSphere(config);
    const sphere = BABYLON.MeshBuilder.CreateSphere(data.id, {}, scene.scene);
    babylonMesh.gameObject = sphere;

    // temp
    var mat = new BABYLON.StandardMaterial("mat", scene.scene);
    mat.diffuseColor = new BABYLON.Color3.Random();
    sphere.material = mat;

    return babylonMesh;
  }
  static getPhysicsImpostorType() {
    return BABYLON.PhysicsImpostor.SphereImpostor;
  }
}
class BabylonOBJ extends BabylonMesh {
  static create(config) {
    const { scene, data, oncreate } = config;

    const babylonMesh = new BabylonOBJ(config);
    babylonMesh.path = babylonMesh.getUrl(data.path);
    babylonMesh.filename = data.filename;
    const meshTask = scene.addMeshTask(
      "objTask",
      "",
      babylonMesh.path,
      data.filename
    );

    // temp
    if (data.filename.includes("Hex10")) {
      data.texture = undefined;
    }

    meshTask.onSuccess = task => {
      const mesh = babylonMesh.getMeshFromTask(task);

      const mat = mesh.material;

      if (mat && data.texture) {
        babylonMesh.texture = new BABYLON.Texture(
          babylonMesh.getUrl(data.texture),
          scene.scene
        );
        mat.diffuseTexture = babylonMesh.texture;
        mat.specularTexture = babylonMesh.texture;
        mat.emissiveTexture = babylonMesh.texture;
        mat.ambientTexture = babylonMesh.texture;
      }

      babylonMesh.gameObject = mesh;
      babylonMesh.gameObject.id = data.id;
      babylonMesh.gameObject.name = data.name;
      babylonMesh.gameObject.receiveShadows = true;

      babylonMesh.init(data);
      oncreate(babylonMesh);
    };

    meshTask.onError = (task, msg, exception) => {
      console.log(111, "meshTask error", msg, exception);
      if (task.loadedMeshes) {
        task.loadedMeshes.forEach(mesh => {
          mesh.dispose();
        });
      }
    };

    return null;
  }

  getUrl(path) {
    let url = path;
    if (this.game.getBaseUrl()) {
      url = `${this.game.getBaseUrl()}${path.substring(1)}`;
    }
    return url;
  }

  getMeshFromTask(task, isClone = false) {
    const meshes = task.loadedMeshes;

    if (meshes.length === 1) {
      const mesh = meshes[0];

      if (!isClone) {
        // temp
        if (!mesh.material) {
          const mat = new BABYLON.StandardMaterial(
            `${this.id}_mat`,
            this.scene.scene
          );
          mat.diffuseColor = new BABYLON.Color3.Random();
          mat.emissiveColor = new BABYLON.Color3.Random();
          mesh.material = mat;
        }
      } else {
        mesh.material = this.gameObject.material;
      }

      return mesh;
    } else {
      const mergedMesh = BABYLON.Mesh.MergeMeshes(
        meshes,
        true,
        true,
        undefined,
        true
      );

      let multimat = null;
      if (!isClone) {
        multimat = new BABYLON.MultiMaterial(
          `${this.id}_mat`,
          this.scene.scene
        );
        meshes.forEach(mesh => {
          multimat.subMaterials.push(mesh.material);
        });
      } else {
        multimat = this.gameObject.material;
      }

      mergedMesh.material = multimat;
      if (multimat instanceof BABYLON.MultiMaterial) {
        const subMeshes = mergedMesh.subMeshes;
        for (let i = 0; i < subMeshes.length; i++) {
          subMeshes[i].materialIndex = i;
        }
      }

      return mergedMesh;
    }
  }

  async getClone() {
    const postfix = `clone${this.getCloneCount() + 1}`;
    const newId = `${this.id}_${postfix}`;
    const newName = this.name;
    // const newName = `${this.name}_${postfix}_${new Date().getTime()}`;

    const newGameObject = await this.getClonedObj(this, newId, newName);
    if (!newGameObject) {
      return;
    }

    const clonedObject = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    clonedObject.id = newId;
    clonedObject.name = newName;
    clonedObject.gameObject = newGameObject;
    if (this.parentId) {
      clonedObject.setParent(this.parentId);
    }
    clonedObject.setPosition(this.gameObject.position);
    clonedObject.setRotation(this.gameObject.rotation);
    clonedObject.setScale(this.gameObject.scaling);
    const originalImposter = this.gameObject.physicsImpostor;
    if (originalImposter) {
      clonedObject.setPhysics(
        originalImposter.mass,
        originalImposter.restitution,
        originalImposter.friction
      );
    }

    this.scene.addGameObject(clonedObject);
    return clonedObject;
  }

  getClonedObj(original, id, name) {
    return new Promise(function(resolve) {
      if (!original.path || !original.filename) {
        resolve(null);
      }

      const meshTask = original.scene.addMeshTask(
        "objTask",
        "",
        original.path,
        original.filename
      );
      meshTask.onSuccess = task => {
        const mesh = original.getMeshFromTask(task, true);
        mesh.id = id;
        mesh.name = name;
        mesh.receiveShadows = original.gameObject.receiveShadows;
        if (mesh.material && original.texture) {
          mesh.material.diffuseTexture = original.texture;
          mesh.material.specularTexture = original.texture;
          mesh.material.emissiveTexture = original.texture;
          mesh.material.ambientTexture = original.texture;
        }

        resolve(mesh);
      };
      meshTask.onError = (task, msg, exception) => {
        console.log(111, "meshTask error", msg, exception);
        resolve(null);
      };
      original.scene.loadAssetsManager();
    });
  }
}

class BabylonGui extends BabylonGameObject {
  constructor(config) {
    super(config);
  }
  static create(config) {
    const { data } = config;
    let babylonGui;
    const GUI = BabylonConstant.GUI;
    switch (data.subtype) {
      case GUI.BUTTON:
        babylonGui = BabylonGuiButton.create(config);
        break;
      case GUI.TEXT:
        babylonGui = BabylonGuiText.create(config);
        break;
      default:
        break;
    }
    babylonGui.commontInit(data);
    return babylonGui;
  }
  commontInit(data) {
    this.gameObject.color = "white";
    this.gameObject.background = "black";
    this.gameObject.horizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.gameObject.verticalAlignment =
      BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;

    this.setWidth(data.width);
    this.setHeight(data.height);
    this.setFontSize(data.fontSize);
    this.setPosition(data.position);
    this.setRotation(data.rotation);
    this.setCornerRadius(data.cornerRadius);

    if (this.game.isEditMode()) {
      this.setPointerPicker();
      this.setEngineResizeObservable();
      this.setDraggable();
    }
  }
  dispose() {
    this.scene.removeGUI(this);
    super.dispose();
  }
  addOnClickListener(func) {
    this.gameObject.isPointerBlocker = true;
    this.gameObject.onPointerClickObservable.add(func);
  }
  setPointerPicker() {
    this.gameObject.isPointerBlocker = true;
    this.gameObject.onPointerDownObservable.add(() => {
      this.scene.onPointerPickGameObject(this);
    });
  }
  setEngineResizeObservable() {
    this.game.engine.onResizeObservable.add(() => {
      if (this.engineResizeTimeout) {
        clearTimeout(this.engineResizeTimeout);
        this.engineResizeTimeout = undefined;
      }
      this.engineResizeTimeout = setTimeout(
        this.updateGUIProperties.bind(this),
        100
      );
    });
  }
  setDraggable() {
    this.gameObject.onPointerDownObservable.add(coordinates => {
      this.dragStartPointerPoint = new BABYLON.Vector2(
        coordinates.x,
        coordinates.y
      );
      this.dragStartPoint = new BABYLON.Vector2(
        parseFloat(this.gameObject.left),
        parseFloat(this.gameObject.top)
      );
      this.isDragging = true;
    });

    this.gameObject.onPointerUpObservable.add(() => {
      const position = {
        x: parseFloat(this.gameObject.left),
        y: parseFloat(this.gameObject.top)
      };
      const guiPosition = this.convertToGUIPosition(position);
      const payload = {
        id: this.id,
        sceneId: this.scene.id,
        propertyId: "position",
        value: guiPosition
      };
      this.game.triggerListener("gameObjectPropertyChange", payload);

      this.dragStartPointerPoint = null;
      this.dragStartPoint = null;
      this.isDragging = false;
    });

    this.gameObject.onPointerMoveObservable.add(coordinates => {
      if (this.isDragging) {
        const diff = this.dragStartPointerPoint.subtract(
          new BABYLON.Vector2(coordinates.x, coordinates.y)
        );
        this.gameObject.left = this.dragStartPoint.x - diff.x;
        this.gameObject.top = this.dragStartPoint.y - diff.y;
      }
    });

    this.scene.guiEditorContainer.onPointerMoveObservable.add(coordinates => {
      if (this.isDragging) {
        const diff = this.dragStartPointerPoint.subtract(
          new BABYLON.Vector2(coordinates.x, coordinates.y)
        );
        this.gameObject.left = this.dragStartPoint.x - diff.x;
        this.gameObject.top = this.dragStartPoint.y - diff.y;
      }
    });
  }

  setPosition(guiPosition) {
    const texturePosition = this.convertToTexturePosition(guiPosition);
    this.gameObject.left = texturePosition.x;
    this.gameObject.top = texturePosition.y;
    this.guiPosition = guiPosition;
  }
  setRotation(rotation) {
    this.gameObject.rotation = BABYLON.Tools.ToRadians(rotation.x);
  }
  setWidth(guiWidth) {
    this.gameObject.width = this.converToTextureWidth(guiWidth) + "px";
    this.guiWidth = guiWidth;
  }
  setHeight(guiHeight) {
    this.gameObject.height = this.converToTextureHeight(guiHeight) + "px";
    this.guiHeight = guiHeight;
  }
  setFontSize(guiFontSize) {
    this.gameObject.fontSize = this.converToTextureFontSize(guiFontSize);
    this.guiFontSize = guiFontSize;
  }
  setCornerRadius(guiCornerRadius) {
    this.gameObject.cornerRadius = this.converToTextureCornerRadius(
      guiCornerRadius
    );
    this.guiCornerRadius = guiCornerRadius;
  }
  setText(text) {
    this.gameObject.text = text;
  }
  setGuiTextColor(color) {
    this.gameObject.color = color;
  }
  getGuiTextColor() {
    return this.gameObject.color;
  }
  setGuiBackgroundColor(color) {
    this.gameObject.background = color;
  }

  updateGUIProperties() {
    this.updatePosition();
    this.updateWidth();
    this.updateHeight();
    this.updateFontSize();
    this.updateCornerRadius();
  }
  updatePosition() {
    this.setPosition(this.guiPosition);
  }
  updateWidth() {
    this.setWidth(this.guiWidth);
  }
  updateHeight() {
    this.setHeight(this.guiHeight);
  }
  updateFontSize() {
    this.setFontSize(this.guiFontSize);
  }
  updateCornerRadius() {
    this.setCornerRadius(this.guiCornerRadius);
  }

  converToTextureWidth(guiWidth) {
    return (guiWidth / 1280) * this.scene.getGUISizeInPixels().width;
  }
  converToTextureHeight(guiHeight) {
    return (guiHeight / 720) * this.scene.getGUISizeInPixels().height;
  }
  converToTextureFontSize(guiFontSize) {
    return (guiFontSize / 720) * this.scene.getGUISizeInPixels().height;
  }
  converToTextureCornerRadius(guiCornerRadius) {
    return (guiCornerRadius / 720) * this.scene.getGUISizeInPixels().height;
  }
  convertToTexturePosition(guiPosition) {
    const { width, height } = this.scene.getGUISizeInPixels();
    const x = (guiPosition.x / 1280) * width;
    const y = (guiPosition.y / 720) * height;
    return { x, y };
  }
  convertToGUIPosition(position) {
    const { width, height } = this.scene.getGUISizeInPixels();
    const x = (position.x / width) * 1280;
    const y = (position.y / height) * 720;
    return {
      x: parseFloat(parseFloat(x).toFixed(1)),
      y: parseFloat(parseFloat(y).toFixed(1))
    };
  }
}
class BabylonGuiButton extends BabylonGui {
  static create(config) {
    const { data } = config;
    const babylonGuiButton = new BabylonGuiButton(config);
    const guiButton = BABYLON.GUI.Button.CreateSimpleButton(data.id, data.text);
    babylonGuiButton.gameObject = guiButton;
    return babylonGuiButton;
  }
  setText(text) {
    this.gameObject.textBlock.text = text;
  }
}
class BabylonGuiText extends BabylonGui {
  static create(config) {
    const { data } = config;
    const babylonGuiText = new BabylonGuiText(config);
    const guiText = new BABYLON.GUI.TextBlock();
    guiText.text = data.text;
    babylonGuiText.gameObject = guiText;
    return babylonGuiText;
  }
}

class BabylonTextureGui extends BabylonGameObject {
  constructor(config) {
    super(config);
    this.gui = null;
  }
  static create(config) {
    const { scene, data } = config;
    const babylonGui = new BabylonTextureGui(config);

    let gui;
    const GUI = BabylonConstant.GUI;
    switch (data.subtype) {
      case GUI.BUTTON:
        gui = BABYLON.GUI.Button.CreateSimpleButton(data.id, data.text);
        break;
      case GUI.TEXT:
        gui = new BABYLON.GUI.TextBlock(data.id, data.text);
        gui.fontSize = data.fontSize;
        break;
      default:
        break;
    }

    gui.width = data.width;
    gui.height = data.height;
    // gui.color = data.color;
    // temp
    gui.color = "white";
    gui.cornerRadius = data.cornerRadius;
    gui.background = data.background;
    gui.resizeToFit = true;
    gui.thickness = 0;

    babylonGui.getAdvancedTexture(scene).addControl(gui);
    babylonGui.gui = gui;
    babylonGui.setPosition(data.position);
    babylonGui.setRotation(data.rotation);
    babylonGui.setScale(data.scale);

    return babylonGui;
  }

  getAdvancedTexture(scene) {
    if (!this.gameObject) {
      this.gameObject = BABYLON.Mesh.CreatePlane(this.id, 4, scene.scene);
      this.gameObject.isPickable = this.game.isEditMode();
    }
    return BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(this.gameObject);
  }

  setText(text) {
    if (this.gui.typeName === "TextBlock") {
      this.gui.text = text;
      return;
    }
    this.gui.textBlock.text = text;
  }
  setGuiTextColor(color) {
    if (this.gui.typeName === "TextBlock") {
      this.gui.color = color;
      return;
    }
    this.gui.textBlock.color = color;
  }
  getGuiTextColor() {
    if (this.gui.typeName === "TextBlock") {
      return this.gui.color;
    }
    return this.gui.textBlock.color;
  }
  setGuiBackgroundColor(color) {
    if (this.gui.typeName === "TextBlock") {
      this.gui.background = color;
      return;
    }
    this.gui.textBlock.background = color;
  }

  setBillboardMode(mode) {
    this.gameObject.billboardMode = mode;
  }

  addOnClickListener(func) {
    this.gameObject.isPickable = true;
    this.gui.isPointerBlocker = true;
    this.gui.onPointerClickObservable.add(func);
  }

  getClone() {
    const postfix = `clone${this.getCloneCount() + 1}`;
    const newId = `${this.id}_${postfix}`;
    const newName = `${this.name}_${postfix}_${new Date().getTime()}`;

    const parentObject = this.parentId
      ? this.scene.getGameObject(this.parentId)
      : null;
    const parent = parentObject ? parentObject.gameObject : null;

    const newGameObject = this.gameObject.clone("name", parent);
    const clonedObject = Object.assign(
      Object.create(Object.getPrototypeOf(this)),
      this
    );
    clonedObject.id = newId;
    clonedObject.name = newName;
    clonedObject.gameObject = newGameObject;

    this.scene.addGameObject(clonedObject, true);
    return clonedObject;
  }

  static getAvailableGizmoTypes() {
    return [
      BabylonConstant.GIZMO.POSITION,
      BabylonConstant.GIZMO.ROTATION,
      BabylonConstant.GIZMO.SCALE
    ];
  }
}

class BabylonCamera extends BabylonGameObject {
  constructor(config) {
    super(config);
    this.isActiveCamera = false;
  }
  static create(config) {
    const { data } = config;
    let babylonCamera;
    const CAMERA = BabylonConstant.CAMERA;
    switch (data.subtype) {
      case CAMERA.UNIVERSAL:
        babylonCamera = BabylonUniversalCamera.create(config);
        break;
      case CAMERA.ARCROTATE:
        babylonCamera = BabylonArcRotateCamera.create(config);
        break;
      case CAMERA.FOLLOW:
        babylonCamera = BabylonFollowCamera.create(config);
        break;
      default:
        return;
    }
    babylonCamera.setIsActiveCamera(data.isActiveCamera);
    return babylonCamera;
  }
  setIsActiveCamera(isActiveCamera) {
    this.isActiveCamera = isActiveCamera;
    if (this.game.isPlayMode()) {
      if (isActiveCamera) {
        this.gameObject.attachControl(this.game.canvas, true);
        this.scene.scene.activeCamera = this.gameObject;
      }
    }
  }

  static getAvailableGizmoTypes() {
    return [BabylonConstant.GIZMO.POSITION, BabylonConstant.GIZMO.ROTATION];
  }
}
class BabylonUniversalCamera extends BabylonCamera {
  static create(config) {
    const { scene, data } = config;
    const babylonCamera = new BabylonUniversalCamera(config);
    babylonCamera.gameObject = new BABYLON.UniversalCamera(
      data.id,
      new BABYLON.Vector3(data.position.x, data.position.y, data.position.z),
      scene.scene
    );
    babylonCamera.setRotation(data.rotation);
    return babylonCamera;
  }
}
class BabylonArcRotateCamera extends BabylonCamera {
  static create(config) {
    const { scene, data } = config;
    const babylonCamera = new BabylonArcRotateCamera(config);
    babylonCamera.gameObject = new BABYLON.ArcRotateCamera(
      data.id,
      0,
      0,
      10,
      new BABYLON.Vector3(0, 0, 0),
      scene.scene
    );
    babylonCamera.setPosition(data.position);
    return babylonCamera;
  }
  setPosition(position) {
    this.gameObject.setPosition(
      new BABYLON.Vector3(position.x, position.y, position.z)
    );
  }
}
class BabylonFollowCamera extends BabylonCamera {
  static create(config) {
    const { scene, data } = config;
    const babylonCamera = new BabylonFollowCamera(config);
    const followCamera = new BABYLON.FollowCamera(
      data.id,
      new BABYLON.Vector3(data.position.x, data.position.y, data.position.z),
      scene.scene
    );
    followCamera.lowerHeightOffsetLimit = 6;
    followCamera.heightOffset = 6;
    followCamera.upperHeightOffsetLimit = 6;
    followCamera.lowerRadiusLimit = 12;
    followCamera.radius = 12;
    followCamera.upperRadiusLimit = 12;
    followCamera.lowerRotationOffsetLimit = 165;
    followCamera.rotationOffset = 180;
    followCamera.upperRotationOffsetLimit = 195;

    babylonCamera.targetId = data.targetId;
    babylonCamera.gameObject = followCamera;
    babylonCamera.setRotation(data.rotation);
    return babylonCamera;
  }
  onAllGameObjectsAdded() {
    super.onAllGameObjectsAdded();
    if (this.game.isPlayMode()) {
      this.updateTarget();
    }
  }
  updateTarget() {
    const followCamera = this.gameObject;
    const targetObject = this.scene.getGameObject(this.targetId);
    if (targetObject) {
      followCamera.lockedTarget = targetObject.gameObject;
    }
  }
}

class BabylonLight extends BabylonGameObject {
  static create(config) {
    const { data } = config;
    let babylonLight;
    const LIGHT = BabylonConstant.LIGHT;
    switch (data.subtype) {
      case LIGHT.POINT:
        babylonLight = BabylonPointLight.create(config);
        break;
      case LIGHT.SPOT:
        babylonLight = BabylonSpotLight.create(config);
        break;
      case LIGHT.HEMISPHERIC:
        babylonLight = BabylonHemisphericLight.create(config);
        break;
      case LIGHT.DIRECTIONAL:
      default:
        babylonLight = BabylonDirectionalLight.create(config);
        break;
    }
    return babylonLight;
  }
  setIntensity(intensity) {
    this.gameObject.intensity = intensity;
  }
  setRange(range) {
    this.gameObject.range = range;
  }
}
class BabylonPointLight extends BabylonLight {
  static create(config) {
    const { scene, data } = config;
    const { position, intensity, range } = data;
    const light = new BABYLON.PointLight(
      data.id,
      new BABYLON.Vector3(position.x, position.y, position.z),
      scene.scene
    );
    light.intensity = intensity;
    light.range = range;

    const babylonLight = new BabylonPointLight(config);
    babylonLight.gameObject = light;

    return babylonLight;
  }
  static getAvailableGizmoTypes() {
    return [BabylonConstant.GIZMO.POSITION];
  }
}
class BabylonSpotLight extends BabylonLight {
  static create(config) {
    const { scene, data } = config;
    const { position, direction, intensity, range } = data;
    const light = new BABYLON.SpotLight(
      data.id,
      new BABYLON.Vector3(position.x, position.y, position.z),
      new BABYLON.Vector3(direction.x, direction.y, direction.z),
      Math.PI / 2,
      10,
      scene.scene
    );
    light.intensity = intensity;
    light.range = range;

    const babylonLight = new BabylonSpotLight(config);
    babylonLight.gameObject = light;

    return babylonLight;
  }
  static getAvailableGizmoTypes() {
    return [BabylonConstant.GIZMO.POSITION];
  }
}
class BabylonDirectionalLight extends BabylonLight {
  static create(config) {
    const { scene, data } = config;
    const { x, y, z } = data.direction;
    const direction = new BABYLON.Vector3(x, y, z);
    const light = new BABYLON.DirectionalLight(data.id, direction, scene.scene);
    const babylonLight = new BabylonDirectionalLight(config);
    babylonLight.gameObject = light;
    return babylonLight;
  }
}
class BabylonHemisphericLight extends BabylonLight {
  static create(config) {
    const { scene, data } = config;
    const { x, y, z } = data.direction;
    const direction = new BABYLON.Vector3(x, y, z);
    const light = new BABYLON.HemisphericLight(data.id, direction, scene.scene);
    const babylonLight = new BabylonHemisphericLight(config);
    babylonLight.gameObject = light;
    return babylonLight;
  }
}

class BabylonSkybox extends BabylonGameObject {
  constructor(config) {
    super(config);
    this.defaultSkyboxSize = 1000.0;
  }
  static create(config) {
    const { scene, data } = config;
    const babylonSkybox = new BabylonSkybox(config);

    const skybox = BABYLON.MeshBuilder.CreateBox(
      data.id,
      { size: data.size },
      babylonSkybox.scene.scene
    );
    skybox.infiniteDistance = true;

    const skyboxMaterial = new BABYLON.StandardMaterial(
      babylonSkybox.id,
      babylonSkybox.scene.scene
    );
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
      babylonSkybox.getUrl(data.texture),
      babylonSkybox.scene.scene
    );
    skyboxMaterial.reflectionTexture.coordinatesMode =
      BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    babylonSkybox.gameObject = skybox;
    return babylonSkybox;
  }

  getUrl(path) {
    let url = path;
    if (this.game.getBaseUrl()) {
      url = `${this.game.getBaseUrl()}${path.substring(1)}`;
    }
    return url;
  }

  setSize(size) {
    const scale = parseFloat(size) / this.defaultSkyboxSize;
    this.gameObject.scaling.x = scale;
    this.gameObject.scaling.y = scale;
    this.gameObject.scaling.z = scale;
  }
}

class BabylonEmptyObject extends BabylonGameObject {
  static create(config) {
    const { data } = config;
    const emptyObject = new BabylonEmptyObject(config);
    const transformNode = new BABYLON.TransformNode(
      data.id,
      emptyObject.scene.scene
    );
    emptyObject.gameObject = transformNode;
    emptyObject.init(data);
    return emptyObject;
  }

  init(data) {
    this.setPosition(data.position);
    this.setRotation(data.rotation);
    this.setScale(data.scale);
  }

  static getAvailableGizmoTypes() {
    return [
      BabylonConstant.GIZMO.POSITION,
      BabylonConstant.GIZMO.ROTATION,
      BabylonConstant.GIZMO.SCALE
    ];
  }
}

window.BabylonGameObject = BabylonGameObject;
