import {
  URL,
  EDITORMODE,
  WizSpritePrefix
} from "../../../../Common/Util/Constant";
import OOBC from "../../../../Common/Component/OOBCEditor/OOBC";
import AssetLibrary from "../assetLibrary";
import Parser from "../parser";
import obfuscate from "./obfuscate";
import isDev from "./isDev";

/**
 * @param {Object} state - 프로젝트 스테이트
 * @param {Object} gameMeta - 게임 페이지 메타 데이터, { pId, gameTitle, liveTest = false, isFromWizlab = false, systemVolume }
 * @param {function} parserErrorHandler - 게임 코드 파싱 중 에러 발생 시 호출할 콜백
 */
export default async function(state, gameMeta, parserErrorHandler) {
  // parse gameData into pId, gameName, state, screenMode
  const { pId, gameTitle, liveTest = false, isFromWizlab = false } = gameMeta;
  const systemVolume = isNaN(gameMeta.systemVolume)
    ? 100
    : gameMeta.systemVolume;
  const editorMode = state.editorMode;
  const screenMode = state.preview.screenMode;
  const isHorizontalMode = screenMode === "HORIZONTAL";

  // set game state related data
  const baseURL = isFromWizlab ? "/" : URL.GAME_SRC;
  const stateObj = state;
  const assets = await AssetLibrary.loadAssetsForGame(state.scene);

  // User's code is going to be parsed by the Parser
  let userDefinedFunction = "var userDefinedFunction = {};";
  stateObj.scene.sceneIds.forEach(sceneId => {
    userDefinedFunction += `userDefinedFunction["${sceneId}"] = {};`;
    stateObj.scene.scenes[sceneId].spriteIds.forEach(spriteId => {
      try {
        let code = stateObj.scene.scenes[sceneId].sprites[spriteId].code;
        let parsedCode;

        switch (editorMode) {
          case EDITORMODE.PYTHON:
            parsedCode = Parser.parsePython(code);
            break;
          case EDITORMODE.BLOCK:
            let contextJSON;
            try {
              contextJSON = JSON.parse(code);
              const context = OOBC.Context.fromJSON(contextJSON);
              code = context.toJavascript();
            } catch (err) {
              // TODO: specifically handle oobc context parse error
              return;
            }
            parsedCode = Parser.parse(code);
            break;
          case EDITORMODE.JAVASCRIPT:
            parsedCode = Parser.parse(code);
          default:
            parsedCode = Parser.parse(code);
            break;
        }

        userDefinedFunction += `
          userDefinedFunction["${sceneId}"]["${spriteId}"] =
            async function(${WizSpritePrefix}) {
              try {
                ${parsedCode}
              } catch(error) {
                postErrorToParent(error, {
                  sceneId: "${sceneId}",
                  spriteId: "${spriteId}"
                })
              }
            };
          `;
      } catch (error) {
        console.error(error);
        if (parserErrorHandler) {
          const payload = { sceneId, spriteId };
          parserErrorHandler(error, payload);
        }
      }
    });
  });
  let scriptSrc = "";
  if (isDev()) {
    scriptSrc = `<script src="${baseURL}game/constant.js"></script>
    <script src="${baseURL}game/game.js"></script>
    <script src="${baseURL}game/gameScene.js"></script>
    <script src="${baseURL}game/keyboard.js"></script>
    <script src="${baseURL}game/wizSprite.js"></script>
    <script src="${baseURL}game/socket.io.js"></script>
    `;
  } else {
    scriptSrc = `<script src="${baseURL}game/socket.io.js"></script>
    <script src="${baseURL}game/wiz_lib.js?ver=67"></script>`;
  }

  let gameScript = `function onclickInputShow(title,inputCallback){
    var inputTitle =  document.getElementsByClassName("InputBox--title")[0];
    inputTitle.innerHTML =title ;
    var inputBox =  document.getElementsByClassName("InputBoxContainer")[0];
    inputBox.style.display ='block';
    var InputBoxInput =  document.getElementsByClassName("InputBox--input")[0];
    InputBoxInput.focus();
    InputBoxInput.select();
    this.inputCallback = inputCallback;
    isInputVisible = true;
  }
  function onInputKeyDown() {
    if(event.keyCode === 13) {
      event.stopPropagation();
      onclickInputConfirm();
    }
  }
  function onclickInputCancel() {
    var inputBox = document.getElementsByClassName("InputBoxContainer")[0];
    inputBox.style.display = "none";
    this.inputCallback("");
    isInputVisible = false;
  }
  function onclickInputConfirm() {
    var inputValue = document.getElementsByClassName("InputBox--input")[0].value;
    this.inputCallback(inputValue);
    var inputBox = document.getElementsByClassName("InputBoxContainer")[0];
    inputBox.style.display = "none";
    document.getElementsByClassName("InputBox--input")[0].value = "";
    isInputVisible = false;
  }

    ${userDefinedFunction}
    var state = ${JSON.stringify(state)};
    var assets = ${JSON.stringify(assets)};
    var errorPosted = false
    var isInputVisible = false


    window.onkeydown = function(e) {
      if(!isInputVisible){
        e.preventDefault();
      }

    }

    window.onkeypress = function(e) {
      if(!isInputVisible){
        e.preventDefault();
      }
    }

    window.addEventListener("unhandledrejection", function(message) {
      if(message.promise){
        postErrorToParent(message.reason)
      }
    });

    postErrorToParent = function(error, payload) {
      if(errorPosted) {
        return
      }
      errorPosted = true
      parent.postMessage({ 
        source: "wizlab",
        type: "error",
        error: error,
        payload: payload
      });
    }

    gameErrorHandler = function(type, payload) {
      postErrorToParent(type, payload)
    };

    gamePreloadHandler = function() {
      var pId = "${pId}";
      var gameTitle = "${gameTitle}";
      var screenMode = "${screenMode}";
      var liveTest = ${liveTest ? "true" : "false"}
      // console.log("preloadHandler called for", gameTitle)
      if (window.app) {
        // console.log("gamePreloadHandler + android")
        window.app.onInformation(pId, gameTitle, screenMode, liveTest);
      }
      if (window.webkit) {
        // console.log("gamePreloadHandler + ios")
        try {
          window.webkit.messageHandlers.onInformation.postMessage({
            pId,
            name: gameTitle,
            screenMode,
            liveTest
          });
        } catch (err) {}
      }
    }
    
    parent.postMessage({ type: "screenMode", payload: { pId: "${pId}", screenMode: "${screenMode}" } }, "*");

    parent.postMessage({ type: "screenMode", payload: { pId: "${pId}", screenMode: "${screenMode}" } }, "*");

    var scenes = state.scene.scenes;
    var sceneIds = state.scene.sceneIds;
    var screenMode = state.preview.screenMode;
    var soundIds = state.scene.soundIds;

    var wrapperId = "gameWrapper";
    var screenWidth;
    var screenHeight;
    var wideScreen = getUrlParameter("wide");
    if(getUrlParameter("w") && wideScreen){
      var paramWidth = getUrlParameter("w");
      var paramHeight = getUrlParameter("h");
      var max = Math.max(paramWidth, paramHeight);
      var min = Math.min(paramWidth, paramHeight);
      var ratio = max / min;
      ratio = ratio > 19/9 ? 19/9 : ratio;
      ratio = ratio < 16/9 ? 16/9 : ratio;
      if(wideScreen){
          if(screenMode === "HORIZONTAL") {
            screenHeight = 720;
            screenWidth = 720 * max / min;
          } else {
            screenWidth = 720;
            screenHeight = 720 * max / min;
          }
      }
    } else {
      screenWidth = screenMode === "HORIZONTAL" ? 1280 : 720;
      screenHeight = screenMode === "HORIZONTAL" ? 720 : 1280;
    }

    ${
      isFromWizlab
        ? `screenWidth = window.innerWidth; screenHeight = window.innerHeight`
        : ""
    }
    this.game = new Game({
      pId: '${pId}',
      screenWidth: screenWidth,
      screenHeight: screenHeight,
      wideScreen: wideScreen,
      screenMode: screenMode,
      wrapperId: wrapperId,
      scenes: scenes,
      sceneIds: sceneIds,
      soundIds: soundIds,
      errorHandler: gameErrorHandler,
      assets: assets,
      preloadHandler: gamePreloadHandler,
      systemVolume: ${systemVolume},
      isFromWizlab: ${isFromWizlab}
    });

    function getUrlParameter(name) {
      var url_string = window.location.href;
      var url = new URL(url_string);
      var value = url.searchParams.get(name);
      return value;
    };

    function changeGyro(x,y) {
      this.game.onGyroChanged(x,y);
    }

    function onListeningResult(msg) {
      this.game.onListeningResult(msg);
    }

    function onShaked() {
      this.game.onShaked();
    }

    function onFaceDetect(face) {
      this.game.onFaceDetect(face);
    }

    function onSaveGameData() {
      this.game.onSaveGameData();
    }

    function onResetGameData() {
      this.game.onResetGameData();
    }

    function onLoadGameData(data) {
      this.game.onLoadGameData(data);
    }

    function onUpdateSystemVolume(volume) {
      this.game.onUpdateSystemVolume(volume);
    }

    function onReceiveTFSignal(signal) {
      this.game.onReceiveTFSignal(signal);
    }

    function gameEventHandler(event) {
      if (event.data.source) {
        if (event.data.source === "wizlab") {
          if (event.data.type === "gameData") {
            const { type, data } = JSON.parse(event.data.message);
            switch (type) {
              case "onSaveGameData":
                this.onSaveGameData();
                break;
              case "onResetGameData":
                this.onResetGameData();
                break;
              case "onLoadGameData":
                this.onLoadGameData(data);
                break;
              default:
            }
          } else if(event.data.type === "onUpdateSystemVolume") {
            this.onUpdateSystemVolume(event.data.data);
          }
        } else if (event.data.source === "wizlive") {
          if(event.data.type === "tensorflowDemo") {
            onReceiveTFSignal(event.data.signal);
          }
        }
      }
    }
    window.addEventListener("message", this.gameEventHandler, false);`;

  if (!isFromWizlab) {
    gameScript = obfuscate(gameScript);
  }

  const loadingScreenStyle = `
    #loadingScreen {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: none;
      color: #fff;
      background-color: #141821;
    }
    #loadingScreen_container {
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 50%;
      left: 50%;
      width: 489px;
      transform-origin: center;
      transform: translate(-50%, -50%) scale(0.66) ;
    }
    @media screen and (max-width: 1024px) {
      #loadingScreen_container {
        transform: translate(-50%, -50%) scale(${
          isHorizontalMode ? 0.48 : 0.78
        });
      }
    }
    @media screen and (max-width: 736px) {
      #loadingScreen_container {
        transform: translate(-50%, -50%) scale(${
          isHorizontalMode ? 0.36 : 0.66
        });
      }
    }
    @media screen and (max-width: 480px) {
      #loadingScreen_container {
        transform: translate(-50%, -50%) scale(${
          isHorizontalMode ? 0.24 : 0.42
        });
      }
    }
    @media screen and (max-width: 240px) {
      #loadingScreen_container {
        transform: translate(-50%, -50%) scale(${
          isHorizontalMode ? 0.24 : 0.24
        });
      }
    }
    #loadingScreen_title {
      position: relative;
      margin: 0 auto;
      width: 36%;
    }
    #loadingScreen_title_text {
      display: block;
      width: 100%;
    }
    #loadingScreen_title_dots {
      position: absolute;
      display: flex;
      bottom: 0;
      left: 100%;
      margin-left: 3px;
    }
    .loadingScreen_title_dot {
      margin-left: 1px;
      width: 9px;
      height: 9px;
      opacity: 0;
      animation: dotBlink 0.99s infinite;
    }
    .loadingScreen_title_dot:nth-of-type(1) {
      animation-delay: 0s;
    }
    .loadingScreen_title_dot:nth-of-type(2) {
      animation-delay: 0.33s;
    }
    .loadingScreen_title_dot:nth-of-type(3) {
      animation-delay: 0.66s;
    }
    @keyframes dotBlink {
      0%, 66%, 100% { opacity: 0; }
      33% { opacity: 1; }
    }
    #loadingScreen_progress {
      display: block;
      margin-top: 24px;
    }
    #loadingScreen_progress_bar {
      transition: 0.2s width;
    }
    #loadingScreen_progress_reflect {
      transition: 0.2s width;
    }
  `;
  const loadingScreenElement = `
    <div id="loadingScreen">
      <div id="loadingScreen_container">
        <div id="loadingScreen_title">
          <img id="loadingScreen_title_text" src="https://d1tz4sj00zmgsb.cloudfront.net/gamePreloadingText.png" alt="gamePreloadingText" />
          <div id="loadingScreen_title_dots">
            <img class="loadingScreen_title_dot" src="https://d1tz4sj00zmgsb.cloudfront.net/gamePreloadingText_dot.png" alt="gamePreloadingText_dot1" />
            <img class="loadingScreen_title_dot" src="https://d1tz4sj00zmgsb.cloudfront.net/gamePreloadingText_dot.png" alt="gamePreloadingText_dot2" />
            <img class="loadingScreen_title_dot" src="https://d1tz4sj00zmgsb.cloudfront.net/gamePreloadingText_dot.png" alt="gamePreloadingText_dot3" />
          </div>
        </div>
        <svg id="loadingScreen_progress" xmlns="http://www.w3.org/2000/svg" width="489" height="45" viewBox="0 0 489 45">
          <g fill="none" fill-rule="evenodd">
            <g>
              <g transform="translate(-378 -350) translate(378 350)">
                <rect width="489" height="45" fill="#000" rx="22.5"/>
                <g>
                    <rect id="loadingScreen_progress_bar" width="48" height="45" fill="#06CC9F" rx="22.5"/>
                    <rect id="loadingScreen_progress_reflect" width="24" height="21" x="11" y="4" fill="#FFF" fill-opacity=".5" rx="10.5"/>
                    <ellipse cx="13.888" cy="10.23" fill="#FFF" rx="3.5" ry="5.5" transform="rotate(40 13.888 10.23)"/>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  `;
  const loadingScreenScript = `
    function hideGameAndShowLoading() {
      const loadingScreen = document.getElementById("loadingScreen");
      loadingScreen.style.display = "flex";
    }
    function hideLoadingAndShowGame() {
      const loadingScreen = document.getElementById("loadingScreen");
      loadingScreen.remove();
    }
    function updateLoadingProgress(progress) {
      const maxProgressWidth = 489;
      const bar = document.getElementById("loadingScreen_progress_bar");
      const reflect = document.getElementById("loadingScreen_progress_reflect");
      if(progress >= 100) {
        bar.style.width = maxProgressWidth + "px";
        reflect.style.width = (maxProgressWidth - 24) + "px";
      } else {
        let progressWidth = maxProgressWidth * progress / 100;
        if (progressWidth < 48) {
          progressWidth = 48;
        }
        bar.style.width = progressWidth + "px";
        reflect.style.width = (progressWidth - 24) + "px";
      }
    }
  `;

  const htmlDoc = `
    <!DOCTYPE html>
    <head>
    <title>player</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"/>
    <script src="https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/webfontloader.min.js"></script>
    <!-- <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Array.prototype.find,Array.prototype.findIndex"></script> -->
    <script src="${baseURL}phaser2.js"></script>
    <script src="${baseURL}phaser2-joystick.js"></script>

    ${scriptSrc}
    <style>
    body{padding:0;margin:0;${
      isFromWizlab
        ? "background-color:transparent;width:100%;height:100vh;position:relative;"
        : "background-color:#000000;width:100%;height:100vh;position:relative;"
    }}
    ${
      screenMode === "HORIZONTAL"
        ? "#container{height:100%;text-align: center;} #gameWrapper{height:100%;display: inline-block;}"
        : "#container{width:100%;height:auto;margin:0;position:absolute;top:50%;left:0;transform:translateY(-50%);}"
    }

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
  ${loadingScreenStyle}
  </style>
  <link
  href="https://fonts.googleapis.com/css?family=Black+And+White+Picture|Black+Han+Sans|Cute+Font|Do+Hyeon|Dokdo|East+Sea+Dokdo|Gaegu|Gamja+Flower|Gothic+A1|Gugi|Hi+Melody|Jua|Kirang+Haerang|Nanum+Brush+Script|Nanum+Gothic|Nanum+Myeongjo|Nanum+Pen+Script|Noto+Sans+KR|Noto+Serif+KR|Poor+Story|Song+Myung|Stylish|Sunflower:300|Yeon+Sung&amp;subset=korean"
    rel="stylesheet"
  ></link>
    </head>
    <body>
    <div id="container"><div id="gameWrapper"></div></div>

    <div class="InputBoxContainer">
      <div class="InputBoxInner--${screenMode}">
          <p class="InputBox--title">타이틀</p>
          <input
            type="text"
            class="InputBox--input"
            name="InputBox--input"
            placeholder="Please Enter Value"
            onkeydown="onInputKeyDown();"
          />
          <button class="InputBoxBtn InputBoxbtn--${screenMode} InputBoxBtn--cancel" onclick="onclickInputCancel();" >Cancel</button>
          <button class="InputBoxBtn InputBoxbtn--${screenMode} InputBoxBtn--confirm" onclick="onclickInputConfirm();">Confirm</button>
        </div>
    </div>
    ${loadingScreenElement}
    <script>
    ${loadingScreenScript}
    ${gameScript}
    </script></body></html>`;

  return htmlDoc;
}
