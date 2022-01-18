import { URL } from "../../../Common/Util/Constant";
import AssetLibrary from "./assetLibrary";

export default async function(state, isFromWizlab) {
  const baseURL = isFromWizlab ? "/" : URL.GAME_SRC;
  const assets = await AssetLibrary.loadAssetsForGame(state.scene);
  let scriptSrc = `
<script src="${baseURL}game/constant.js"></script>
<script src="${baseURL}game/preload.js"></script>
<script src="${baseURL}game/preloadScene.js"></script>
`;

  const htmlDoc = `
<!DOCTYPE html>
<head>
<script src="https://cdn.jsdelivr.net/npm/webfontloader@1.6.28/webfontloader.min.js"></script>
<script src="${baseURL}phaser2.js"></script>
${scriptSrc}
<link
href="https://fonts.googleapis.com/css?family=Black+And+White+Picture|Black+Han+Sans|Cute+Font|Do+Hyeon|Dokdo|East+Sea+Dokdo|Gaegu|Gamja+Flower|Gothic+A1|Gugi|Hi+Melody|Jua|Kirang+Haerang|Nanum+Brush+Script|Nanum+Gothic|Nanum+Myeongjo|Nanum+Pen+Script|Noto+Sans+KR|Noto+Serif+KR|Poor+Story|Song+Myung|Stylish|Sunflower:300|Yeon+Sung&amp;subset=korean"
rel="stylesheet"
></link>
</head>
<body>
<div id="container"><div id="gameWrapper"></div></div>
<script>
var state = ${JSON.stringify(state)};
var assets = ${JSON.stringify(assets)};
var scenes = state.scene.scenes;
var sceneIds = state.scene.sceneIds;
var soundIds = state.scene.soundIds;
var wrapperId = "gameWrapper";

this.game = new Game({
  screenWidth: 300,
  screenHeight: 300,
  wrapperId: wrapperId,
  scenes: scenes,
  sceneIds: sceneIds,
  soundIds: soundIds,
  assets: assets
});
</script></body></html>`;
  return htmlDoc;
}
