import { ASSET_CATEGORY } from "../Constant";
const { GAMEOBJECT, MESH, GUI, LIGHT, CAMERA, EMPTY } = window.BabylonConstant;

class AssetLibrary {
  constructor() {
    this.assets = {};
  }

  loadAssetsFor(category, onload) {
    let assets = this.getAssetsFor(category);

    if (!assets) {
      const defaultAssets = this.getDefaultAssets(category);
      const loadedAssets = this.getLoadedAssets(category); // todo
      assets = defaultAssets.concat(loadedAssets);
      this.assets[category] = assets;
    }

    if (onload) {
      onload(assets);
    }
  }
  getAssetsFor(category) {
    return this.assets[category];
  }

  getLoadedAssets(category) {
    switch (category) {
      case ASSET_CATEGORY.MESH:
        let meshAssets = [
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "hexagon",
            path: "/babylon/textures/hex10/",
            filename: "Hex10.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 10, y: 2, z: 10 },
            thumbPath: require("./defaultThumbs/hex.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "Barrel Lid",
            path: "/babylon/objs/",
            filename: "BarrelLid.obj",
            texture: "/babylon/textures/storagepack/MainTexture.png",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/storagepack/BarrelLid_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "Barrel1",
            path: "/babylon/objs/",
            filename: "BarrelOne.obj",
            texture: "/babylon/textures/storagepack/MainTexture.png",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/storagepack/BarrelOne_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "Barrel1 Open",
            path: "/babylon/objs/",
            filename: "BarrelOneOpen.obj",
            texture: "/babylon/textures/storagepack/MainTexture.png",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/storagepack/BarrelOneOpen_t.png")
          },
          // {
          //   type: GAMEOBJECT.MESH,
          //   subtype: MESH.OBJ,
          //   name: "Chest",
          //   path: "/babylon/objs/",
          //   filename: "ChestOne.obj",
          //   texture: "/babylon/textures/storagepack/DarkTexture.png",
          //   position: { x: 0, y: 0, z: 0 },
          //   rotation: { x: 0, y: 0, z: 0 },
          //   scale: { x: 1, y: 1, z: 1 },
          //   thumbPath: require("./defaultThumbs/storageOne.png")
          // },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "Barrel2",
            path: "/babylon/objs/",
            filename: "BarrelTwo.obj",
            texture: "/babylon/textures/storagepack/MainTexture.png",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/storagepack/BarrelTwo_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "Barrel2 Open",
            path: "/babylon/objs/",
            filename: "BarrelTwoOpen.obj",
            texture: "/babylon/textures/storagepack/MainTexture.png",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/storagepack/BarrelTwoOpen_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "Crate",
            path: "/babylon/objs/",
            filename: "Crate.obj",
            texture: "/babylon/textures/storagepack/MainTexture.png",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/storagepack/Crate_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "Crate Lid",
            path: "/babylon/objs/",
            filename: "CrateLid.obj",
            texture: "/babylon/textures/storagepack/MainTexture.png",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/storagepack/CrateLid_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "Crate Open",
            path: "/babylon/objs/",
            filename: "CrateOpen.obj",
            texture: "/babylon/textures/storagepack/MainTexture.png",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/storagepack/CrateOpen_t.png")
          },
          // {
          //   type: GAMEOBJECT.MESH,
          //   subtype: MESH.OBJ,
          //   name: "Keg",
          //   path: "/babylon/objs/",
          //   filename: "Keg.obj",
          //   texture: "/babylon/textures/storagepack/DarkTexture.png",
          //   position: { x: 0, y: 0, z: 0 },
          //   rotation: { x: 0, y: 0, z: 0 },
          //   scale: { x: 1, y: 1, z: 1 },
          //   thumbPath: require("./defaultThumbs/storageOne.png")
          // },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "경찰차",
            path: "/babylon/objs/",
            filename: "Cop.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/cars/Cop_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "자동차1",
            path: "/babylon/objs/",
            filename: "NormalCar1.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/cars/NormalCar1_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "자동차2",
            path: "/babylon/objs/",
            filename: "NormalCar2.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/cars/NormalCar2_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "스포츠카1",
            path: "/babylon/objs/",
            filename: "SportsCar.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/cars/SportsCar_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "스포츠카2",
            path: "/babylon/objs/",
            filename: "SportsCar2.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/cars/SportsCar2_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "SUV",
            path: "/babylon/objs/",
            filename: "SUV.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/cars/SUV_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "택시",
            path: "/babylon/objs/",
            filename: "Taxi.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 1, y: 1, z: 1 },
            thumbPath: require("./thumbs/cars/Taxi_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "주차금지",
            path: "/babylon/objs/modular_street/",
            filename: "Sign_NoParking.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Sign_NoParking_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "정지표시",
            path: "/babylon/objs/modular_street/",
            filename: "Sign_Stop.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Sign_Stop_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "삼각표시",
            path: "/babylon/objs/modular_street/",
            filename: "Sign_Triangle.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Sign_Triangle_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "3차선 길1",
            path: "/babylon/objs/modular_street/",
            filename: "Street_3Way_2.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_3Way_2_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "3차선 길2",
            path: "/babylon/objs/modular_street/",
            filename: "Street_3Way.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_3Way_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "4차선 길1",
            path: "/babylon/objs/modular_street/",
            filename: "Street_4Way.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_4Way_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "4차선 길2",
            path: "/babylon/objs/modular_street/",
            filename: "Street_4Way_2.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_4Way_2_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "다리 비탈길",
            path: "/babylon/objs/modular_street/",
            filename: "Street_Bridge_Ramp.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_Bridge_Ramp_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "다리 지하도",
            path: "/babylon/objs/modular_street/",
            filename: "Street_Bridge_Underpass.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_Bridge_Underpass_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "물과 다리1",
            path: "/babylon/objs/modular_street/",
            filename: "Street_Bridge_Water.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_Bridge_Water_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "물과 다리2",
            path: "/babylon/objs/modular_street/",
            filename: "Street_Bridge_WaterRamp.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_Bridge_WaterRamp_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "다리",
            path: "/babylon/objs/modular_street/",
            filename: "Street_Bridge.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_Bridge_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "커브 길",
            path: "/babylon/objs/modular_street/",
            filename: "Street_Curve.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_Curve_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "막다른 길",
            path: "/babylon/objs/modular_street/",
            filename: "Street_Deadend.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_Deadend_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "높은 비탈길",
            path: "/babylon/objs/modular_street/",
            filename: "Street_Elevated_Ramp.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_Elevated_Ramp_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "높은 길",
            path: "/babylon/objs/modular_street/",
            filename: "Street_Elevated.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_Elevated_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "물",
            path: "/babylon/objs/modular_street/",
            filename: "Street_Empty_Water.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_Empty_Water_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "빈 길",
            path: "/babylon/objs/modular_street/",
            filename: "Street_Empty.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_Empty_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "곧은 길",
            path: "/babylon/objs/modular_street/",
            filename: "Street_Straight.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Street_Straight_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "가로등1",
            path: "/babylon/objs/modular_street/",
            filename: "Streetlight_Single.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Streetlight_Single_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "가로등2",
            path: "/babylon/objs/modular_street/",
            filename: "Streetlight_Double.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Streetlight_Double_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "가로등3",
            path: "/babylon/objs/modular_street/",
            filename: "Streetlight_Triple.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/Streetlight_Triple_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "신호등1",
            path: "/babylon/objs/modular_street/",
            filename: "TrafficLight.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/TrafficLight_t.png")
          },
          {
            type: GAMEOBJECT.MESH,
            subtype: MESH.OBJ,
            name: "신호등2",
            path: "/babylon/objs/modular_street/",
            filename: "TrafficLight_2.obj",
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            scale: { x: 7, y: 7, z: 7 },
            thumbPath: require("./thumbs/modular_street/TrafficLight_2_t.png")
          }
        ];
        meshAssets = meshAssets.concat(this.getSpaceshipAssets());
        meshAssets = meshAssets.concat(this.getGemAssets());
        return meshAssets;
      case ASSET_CATEGORY.SKYBOX:
        return [
          {
            type: GAMEOBJECT.SKYBOX,
            subtype: GAMEOBJECT.SKYBOX,
            name: "구름 하늘",
            size: 1000.0,
            texture: "/babylon/textures/blueSky/skybox",
            thumbPath: require("./defaultThumbs/skybox_px.jpg")
          },
          {
            type: GAMEOBJECT.SKYBOX,
            subtype: GAMEOBJECT.SKYBOX,
            name: "푸른 성운",
            size: 1000.0,
            texture: "/babylon/textures/nebular_blue/nebular_blue",
            thumbPath: require("./defaultThumbs/nebular_blue_px.jpg")
          },
          {
            type: GAMEOBJECT.SKYBOX,
            subtype: GAMEOBJECT.SKYBOX,
            name: "푸른 하늘",
            size: 1000.0,
            texture: "/babylon/textures/bluesky1/bluesky",
            thumbPath: require("./defaultThumbs/bluesky_pz.png")
          },
          {
            type: GAMEOBJECT.SKYBOX,
            subtype: GAMEOBJECT.SKYBOX,
            name: "분홍 하늘",
            size: 1000.0,
            texture: "/babylon/textures/glorious_pink/glorious_pink",
            thumbPath: require("./defaultThumbs/glorious_pink_nz.png")
          },
          {
            type: GAMEOBJECT.SKYBOX,
            subtype: GAMEOBJECT.SKYBOX,
            name: "붉은 성운",
            size: 1000.0,
            texture: "/babylon/textures/nebular_bluepink/nebular_blue_pink",
            thumbPath: require("./defaultThumbs/nebular_blue_pink_py.jpg")
          },
          {
            type: GAMEOBJECT.SKYBOX,
            subtype: GAMEOBJECT.SKYBOX,
            name: "우주",
            size: 1000.0,
            texture: "/babylon/textures/space/space",
            thumbPath: require("./defaultThumbs/space_px.png")
          }
        ];
      default:
        return [];
    }
  }
  getSpaceshipAssets() {
    const names = [
      "항공기1",
      "항공기2",
      "항공기3",
      "항공기4",
      "항공기5",
      "항공기6",
      "항공기7",
      "항공기8",
      "항공기9",
      "우주선1",
      "우주선2",
      "우주선3",
      "우주선4",
      "우주선5",
      "TIE Fighter"
    ];
    const fileNames = [
      "ship1.obj",
      "ship2.obj",
      "ship3.obj",
      "ship4.obj",
      "ship5.obj",
      "ship6.obj",
      "ship7.obj",
      "ship8.obj",
      "ship9.obj",
      "Spaceship.obj",
      "Spaceship2.obj",
      "Spaceship3.obj",
      "Spaceship4.obj",
      "Spaceship5.obj",
      "tie-fighter.obj"
    ];
    const thumbs = [
      "ship1",
      "ship2",
      "ship3",
      "ship4",
      "ship5",
      "ship6",
      "ship7",
      "ship8",
      "ship9",
      "Spaceship_t",
      "Spaceship2_t",
      "Spaceship3_t",
      "Spaceship4_t",
      "Spaceship5_t",
      "tie-fighter"
    ];
    const assets = fileNames.map((fileName, i) => {
      return {
        type: GAMEOBJECT.MESH,
        subtype: MESH.OBJ,
        name: names[i],
        path: "/babylon/objs/spaceship/",
        filename: fileName,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: i > 8 ? 0 : 180, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        thumbPath: require(`./thumbs/spaceship/${thumbs[i]}.png`)
      };
    });
    return assets;
  }
  getGemAssets() {
    const names = [
      "다이아몬드1",
      "다이아몬드2",
      "다이아몬드3",
      "다이아몬드4",
      "별1",
      "별2",
      "별3",
      "하트",
      "사각형1",
      "사각형2",
      "직육면체",
      "육각형",
      "오각형",
      "큰 구",
      "작은 구",
      "나선"
    ];
    const fileNames = [
      "4 Side Diamond.obj",
      "5 Side Diamond.obj",
      "Diamondo.obj",
      "Diamondo5side.obj",
      "BeveledStar.obj",
      "SoftStar.obj",
      "HardStar.obj",
      "Heart.obj",
      "Cubie.obj",
      "CubieBeveled.obj",
      "Cuboid.obj",
      "Hexagon.obj",
      "Penta.obj",
      "SphereGemLarge.obj",
      "SphereGemSmall.obj",
      "Spiral.obj"
    ];
    const thumbs = [
      "4 Side Diamond_t",
      "5 Side Diamond_t",
      "Diamondo_t",
      "Diamondo5side_t",
      "BeveledStar_t",
      "SoftStar_t",
      "HardStar_t",
      "Heart_t",
      "Cubie_t",
      "CubieBeveled_t",
      "Cuboid_t",
      "Hexgon_t",
      "Penta_t",
      "SphereGemLarge_t",
      "SphereGemSmall_t",
      "Spiral_t"
    ];
    const assets = fileNames.map((fileName, i) => {
      return {
        type: GAMEOBJECT.MESH,
        subtype: MESH.OBJ,
        name: names[i],
        path: "/babylon/objs/gems/",
        filename: fileName,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        thumbPath: require(`./thumbs/gems/${thumbs[i]}.png`)
      };
    });
    return assets;
  }
  getDefaultAssets(category) {
    switch (category) {
      case ASSET_CATEGORY.MESH:
        return this.getDefaultMeshes();
      case ASSET_CATEGORY.GUI:
        return this.getDefaultGUIs();
      case ASSET_CATEGORY.TEXTURE_GUI:
        return this.getDefaultTextureGUIs();
      case ASSET_CATEGORY.LIGHT:
        return this.getDefaultLights();
      case ASSET_CATEGORY.CAMERA:
        return this.getDefaultCameras();
      case ASSET_CATEGORY.COMPONENT:
        return this.getDefaultComponents();
      default:
        return [];
    }
  }

  getDefaultMeshes() {
    return [
      this.getDefaultBox(),
      this.getDefaultSphere(),
      this.getDefaultGround()
    ];
  }
  getDefaultBox() {
    return {
      name: "box",
      type: GAMEOBJECT.MESH,
      subtype: MESH.BOX,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      thumbPath: require("./defaultThumbs/box.png")
    };
  }
  getDefaultSphere() {
    return {
      name: "sphere",
      type: GAMEOBJECT.MESH,
      subtype: MESH.SPHERE,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      thumbPath: require("./defaultThumbs/sphere.png")
    };
  }
  getDefaultGround() {
    return {
      name: "ground",
      type: GAMEOBJECT.MESH,
      subtype: MESH.GROUND,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      thumbPath: require("./defaultThumbs/ground.png")
    };
  }

  getDefaultGUIs() {
    return [
      {
        type: GAMEOBJECT.GUI,
        subtype: GUI.BUTTON,
        width: 180,
        height: 60,
        position: { x: 550, y: 330 },
        scale: { x: 1, y: 1 },
        rotation: { x: 0 },
        text: "버튼",
        fontSize: 24,
        cornerRadius: 12,
        thumbPath: require("./defaultThumbs/button.png")
      },

      {
        type: GAMEOBJECT.GUI,
        subtype: GUI.TEXT,
        width: 150,
        height: 40,
        position: { x: 30, y: 30 },
        scale: { x: 1, y: 1 },
        rotation: { x: 0 },
        text: "텍스트",
        fontSize: 24,
        thumbPath: require("./defaultThumbs/text.png")
      }
    ];
  }
  getDefaultTextureGUIs() {
    return [
      {
        type: GAMEOBJECT.TEXTURE_GUI,
        subtype: GUI.TEXT,
        width: "150px",
        height: "40px",
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        color: "white",
        background: "black",
        text: "텍스트",
        fontSize: 70,
        thumbPath: require("./defaultThumbs/textureText.png")
      }
    ];
  }

  getDefaultCameras() {
    return [
      this.getDefaultUniversialCamera(),
      this.getDefaultFollowCamera(),
      this.getDefaultArcRotateCamera()
    ];
  }
  getDefaultUniversialCamera() {
    return {
      name: "universalCamera",
      type: GAMEOBJECT.CAMERA,
      subtype: CAMERA.UNIVERSAL,
      position: { x: 0, y: 3, z: -3 },
      rotation: { x: 30, y: 0, z: 0 },
      description: {
        title: "자유 카메라",
        description: "자유롭게 움직일 수 있는 가장 기본적인 카메라에요"
      },
      thumbPath: require("./defaultThumbs/camera_universal.svg")
    };
  }
  getDefaultArcRotateCamera() {
    return {
      name: "arcRotateCamera",
      type: GAMEOBJECT.CAMERA,
      subtype: CAMERA.ARCROTATE,
      position: { x: 0, y: 3, z: -3 },
      // target: { x: 0, y: 0, z: 0 },
      description: {
        title: "회전 카메라",
        description: "바라보는 방향을 자유롭게 조절할 수 있는 카메라에요"
      },
      thumbPath: require("./defaultThumbs/camera_arcrotate.svg")
    };
  }
  getDefaultFollowCamera() {
    return {
      name: "followCamera",
      type: GAMEOBJECT.CAMERA,
      subtype: CAMERA.FOLLOW,
      position: { x: 0, y: 3, z: -3 },
      rotation: { x: 30, y: 0, z: 0 },
      description: {
        title: "추적 카메라",
        description: "오브젝트를 따라다니게 할 수 있는 카메라에요"
      },
      thumbPath: require("./defaultThumbs/camera_follow.svg")
    };
  }

  getDefaultLights() {
    return [
      this.getDefaultPointLight(),
      this.getDefaultDirectionalLight(),
      this.getDefaultSpotLight(),
      this.getDefaultHemisphericLight()
    ];
  }
  getDefaultPointLight() {
    return {
      name: "pointLight",
      type: GAMEOBJECT.LIGHT,
      subtype: LIGHT.POINT,
      position: { x: 0, y: 1, z: 0 },
      range: 100,
      intensity: 1,
      description: {
        title: "방사형 빛",
        description: "한 점에서 모든 방향으로 뻗어나가는 빛이에요"
      },
      thumbPath: require("./defaultThumbs/light_point.svg")
    };
  }
  getDefaultDirectionalLight() {
    return {
      name: "directionalLight",
      type: GAMEOBJECT.LIGHT,
      subtype: LIGHT.DIRECTIONAL,
      direction: { x: 0, y: -1, z: 0 },
      intensity: 1,
      description: {
        title: "직선형 빛",
        description: "모든 공간에서 한 방향으로 비춰지는 빛이에요"
      },
      thumbPath: require("./defaultThumbs/light_directional.svg")
    };
  }
  getDefaultSpotLight() {
    return {
      name: "spotLight",
      type: GAMEOBJECT.LIGHT,
      subtype: LIGHT.SPOT,
      position: { x: 0, y: 1, z: 0 },
      direction: { x: 0, y: -1, z: 0 },
      range: 10,
      intensity: 1,
      description: {
        title: "원뿔형 빛",
        description: "한 점에서 특정 방향에 원뿔형태로 비춰지는 빛이에요"
      },
      thumbPath: require("./defaultThumbs/light_spot.svg")
    };
  }
  getDefaultHemisphericLight() {
    return {
      name: "hemisphericLight",
      type: GAMEOBJECT.LIGHT,
      subtype: LIGHT.HEMISPHERIC,
      direction: { x: 0, y: 1, z: 0 },
      intensity: 1,
      description: {
        title: "자연광",
        description: "자연적으로 물체 주변에 반사되어 보이는 빛이에요"
      },
      thumbPath: require("./defaultThumbs/light_hemispheric.svg")
    };
  }

  getDefaultComponents() {
    return [this.getVirtualJoystick()];
  }
  getVirtualJoystick() {
    return {
      name: "virtualJoystick",
      type: GAMEOBJECT.EMPTY,
      subtype: EMPTY.VIRTUAL_JOYSTICK,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      code:
        'const leftJoystick = getVirtualJoystick(true)\nconst rightJoystick = getVirtualJoystick(false)\nconst objectToMove = getObject("name")\nconst movespeed = 5\nlet moveX, moveY, moveZ\nonFrame(function(){\n    if(leftJoystick.isPressed()) {\n        moveX = leftJoystick.getDeltaPositionX() * getDeltaTime() * movespeed\n        moveZ = leftJoystick.getDeltaPositionY() * getDeltaTime() * movespeed\n        objectToMove.goX(moveX)\n        objectToMove.goZ(moveZ)\n    }\n    if(rightJoystick.isPressed()) {\n        moveY = rightJoystick.getDeltaPositionY() * getDeltaTime() * movespeed\n        objectToMove.goY(moveY)\n    }\n})',
      thumbPath: require("./defaultThumbs/component_vJoystick.png")
    };
  }
}

const singleton = new AssetLibrary();
export default singleton;
