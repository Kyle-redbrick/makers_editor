import { URL } from "../../../../Common/Util/Constant";
import { injectIntl } from "react-intl";
import AssetLibrary from "../assetLibrary";
import createUserScript from "./userScript";
import obfuscate from "./obfuscate";
import isDev from "./isDev";

async function generateBabylonPage(params) {
  const { gameData, onParseError, isBuilderPlay } = params || {};

  const title = "BabylonTest";
  const screenMode = "HORIZONTAL";
  const baseURL = isDev() ? "/" : URL.GAME_SRC;
  const version = "0.1.1";
  const babylonSources = `
    <script src="https://cdn.babylonjs.com/babylon.js"></script>
    <script src="https://cdn.babylonjs.com/gui/babylon.gui.min.js"></script>
    <script src="https://cdn.babylonjs.com/cannon.js"></script>
    <script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>
    <script src="https://code.jquery.com/pep/0.4.3/pep.js"></script>
  `;
  const wizSources = isDev()
    ? `
    <script src="${baseURL}babylon/babylonConstant.js"></script>
    <script src="${baseURL}babylon/babylonApis.js"></script>
    <script src="${baseURL}babylon/babylonGame.js"></script>
    <script src="${baseURL}babylon/babylonScene.js"></script>
    <script src="${baseURL}babylon/babylonGameObject.js"></script>
    <script src="${baseURL}babylon/babylonSound.js"></script>
  `
    : `
    <script src="${baseURL}babylon/wiz_lib_3d.js?ver=${version}"></script>
  `;
  const defaultStyle = `
    html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
  `;

  let userScript = createUserScript(gameData, { onParseError });

  const babylonCanvasId = "babylonCanvas";
  const babylonStyle = `
    .babylonCanvasContainer {
        width: 100%;
        height: 100%;
    }
    #babylonCanvas {
        display: block;
        width: 100%;
        height: 100%;
        touch-action: none;
        outline: none;
        cursor: pointer;
    }
  `;
  const babylonElement = `
    <div class="babylonCanvasContainer">
        <canvas id="${babylonCanvasId}" tabindex="1"></canvas>
    </div>
  `;
  const babylonConfig = await createBabylonConfig(gameData, isBuilderPlay);
  let babylonScript = `
    var canvas = document.getElementById("${babylonCanvasId}");
    var babylonGame = BabylonGame.create(canvas, ${JSON.stringify(
      babylonConfig
    )});
    babylonGame.runScene("${gameData.startSceneId}");
    canvas.focus();
  `;

  const inputBoxElement = `
    <div class="InputBoxContainer">
      <div class="InputBoxInner--${screenMode}">
          <p class="InputBox--title">타이틀</p>
          <input
            type="text"
            class="InputBox--input"
            name="InputBox--input"
            placeholder=${this.props.intl.formatMessage({ id: "ID_INPUT_PLACEHOLDER" })}
            onkeydown="onInputKeyDown();"
          />
          <button class="InputBoxBtn InputBoxbtn--${screenMode} InputBoxBtn--cancel" onclick="onInputCancel();" >
            ${this.props.intl.formatMessage({ id: "ID_INPUT_POPUP_CANCLE" })}
          </button>
          <button class="InputBoxBtn InputBoxbtn--${screenMode} InputBoxBtn--confirm" onclick="onInputConfirm();">
            ${this.props.intl.formatMessage({ id: "ID_INPUT_POPUP_CONFIRM" })}
          </button>
        </div>
    </div>
  `;
  const inputBoxStyle = `
    .InputBoxContainer{
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: none;
    }
    .InputBoxInner--HORIZONTAL{
      position: relative;
      background-color: #393e4f;
      width: 48%;
      height: 35%;
      border-radius: 18px;
      text-align: center;
      margin: 0 auto;
      margin-top:10%;
      padding:4% 4% 4% 4%;
    }
    .InputBoxInner--VERTICAL{
      position: relative;
      background-color: #393e4f;
      width: 70%;
      height: 20%;
      border-radius: 18px;
      text-align: center;
      margin: 0 auto;
      margin-top:60%;
      padding:4% 4% 4% 4%;
    }

    .InputBox--title{
      color: #ffffff;
      width: 100%;
      text-align: center;
      font-weight: bold;
      margin-top:0;
      margin-bottom: 5%;
      font-family:"Source Sans Pro", sans-serif;
      font-size: 20px;
    }
    .InputBox--input{
      box-sizing: border-box;
      width: 100%;
      line-height: 3;
      padding-left: 3%;
      font-size: 14px;
      border-radius: 6px;
      border: solid 1px #2f3443;
      background-color: #272b37;
      color: #fff;
    }
    .InputBox--input::placeholder{
      color: #afafaf;
    }
    .InputBox--input:focus, .InputBoxBtn:focus{
      outline: none;
    }
    .InputBoxbtn--HORIZONTAL.InputBoxBtn{
      width:40%;
      height: 23%;
      border-radius: 25px;
      margin-right:1.5%;
      margin-left:1.5%;
      cursor: pointer;
      margin-top:7%;
      font-size:13px;
    }
    .InputBoxbtn--VERTICAL.InputBoxBtn{
      width:40%;
      height: 25%;
      border-radius: 25px;
      margin-right:1.5%;
      margin-left:1.5%;
      cursor: pointer;
      margin-top:10%;
      font-size:18px;

    }
    .InputBoxBtn--cancel{
      border-radius: 20px;
      border: solid 1px #1db6ff;
      background: transparent;
      color: #1db6ff;
    }
    .InputBoxBtn--confirm{
      background-color: #2c9ee0;
      color:#ffffff;
      border: none;
    }

    @media screen and (max-width: 768px) {
      .InputBoxInner--HORIZONTAL{
        width: 70%;
        height: 60%;
        margin-top:5%;
      }
      .InputBoxbtn--HORIZONTAL.InputBoxBtn{
        height: 25%;
        margin-top:7%;
      }
      .InputBox--input{
        line-height: 1.7;
        font-size: 16px;
        line-height: 1.5;
        width:90%;
      }
    }
  `;

  if (!isBuilderPlay) {
    userScript = obfuscate(userScript);
    babylonScript = obfuscate(babylonScript);
  }

  const html = `
    <!DOCTYPE html>
        <head>
            <title>${title}</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"/>
            ${babylonSources}
            ${wizSources}
            <style>
                ${defaultStyle}
                ${babylonStyle}
                ${inputBoxStyle}
            </style>
        </head>
        <body>
            ${babylonElement}
            ${inputBoxElement}
            <script>
                ${userScript}
                ${babylonScript}
            </script>
        </body>
    </html>
  `;
  return html;
}

async function createBabylonConfig(gameData, isBuilderPlay) {
  const scenes = {};
  gameData.sceneIds.forEach(sceneId => {
    scenes[sceneId] = gameData.scenes[sceneId];
  });
  const assets = await AssetLibrary.loadAssetsForGame(gameData);
  const assetBaseURL = isDev()
    ? "/"
    : isBuilderPlay
    ? URL.GAME_SRC
    : "https://wizschool-assets.s3.ap-northeast-2.amazonaws.com/";
  const config = { scenes, assets, assetBaseURL };
  return config;
}

export default injectIntl(generateBabylonPage);
