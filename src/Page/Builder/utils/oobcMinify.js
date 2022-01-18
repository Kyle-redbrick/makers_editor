// import {
//   MODE,
//   GRAMMAR,
//   BLOCK,
//   DATA
// } from "../Component/Editor/Component/OOBCEditor/Util/Type";

// function getMinifyMap() {
//   const minifyMap = {
//     grammar: "$gr",
//     blockType: "$bl",
//     parentDataTypes: "$pa",
//     dataType: "$da",
//     scene: "$sc",
//     preview: "$pr"
//   };
//   const OOBCTypes = [MODE, GRAMMAR, BLOCK, DATA];
//   for (let i in OOBCTypes) {
//     const OOBCType = OOBCTypes[i];
//     for (let key in OOBCType) {
//       const mode = OOBCType[key];
//       const minified = `$${mode.slice(0, 2)}`;
//       if (!checkValueExistIn(minifyMap, minified)) minifyMap[mode] = minified;
//     }
//   }
//   return minifyMap;
// }

// function checkValueExistIn(object, value) {
//   for (let key in object) {
//     if (object[key] === value) {
//       return true;
//     }
//   }
//   return false;
// }

// function getRestoreMap() {
//   const minifyMap = getMinifyMap();
//   const restoreMap = {};
//   for (let key in minifyMap) {
//     const minified = minifyMap[key];
//     restoreMap[minified] = key;
//   }
//   return restoreMap;
// }

// function isMinifyMapValid() {
//   const minifyMap = getMinifyMap();
//   const restoreMap = getRestoreMap();
//   return Object.keys(minifyMap).length === Object.keys(restoreMap).length;
// }

export function minifyJSON(json) {
  // if (!isMinifyMapValid()) {
  console.warn("Warning::Minify Map is invalid");
  //   return;
  // }
  // let jsonString = JSON.stringify(json);
  // const minifyMap = getMinifyMap();
  // for (let key in minifyMap) {
  //   jsonString = jsonString.replaceAll(key, minifyMap[key]);
  // }
  // const minifiedJSON = JSON.parse(jsonString);
  // return minifiedJSON;
}

export function restoreJSON(json) {
  // if (!isMinifyMapValid()) {
  console.warn("Warning::Minify Map is invalid");
  //   return;
  // }
  // let jsonString = JSON.stringify(json);
  // const restoreMap = getRestoreMap();
  // for (let key in restoreMap) {
  //   jsonString = jsonString.replaceAll(key, restoreMap[key]);
  // }
  // const restoredJSON = JSON.parse(jsonString);
  // return restoredJSON;
}

// const testJSON = {
//   scene: {
//     scenes: {
//       scene1: {
//         sceneName: "scene1",
//         sprites: {
//           space_aurora: {
//             type: "background",
//             assetId: "space_aurora_v3",
//             code: "",
//             preview: {
//               name: "space_aurora",
//               type: "background",
//               angle: 0,
//               left: -199,
//               top: 0,
//               scaleX: 1,
//               scaleY: 1,
//               width: 1678,
//               height: 720,
//               opacity: 1
//             }
//           },
//           joystick_a_white: {
//             type: "component",
//             assetId: "joystick_a_white",
//             code:
//               '{"lines":[{"id":"y5wd98","block":{"id":"ejsdbb","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"joystick","data":"joystick_a_white","childs":[{"id":"f9s293","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["joystick"],"dataTypes":{"property":["number","string","boolean"],"action":["joystick"],"util":["sprite"]},"dataType":"joystick","data":"bind","childs":[{"id":"va5tmm","mode":"instance","grammars":{"sprite":"objective"},"grammar":"objective","blockTypes":["sprite"],"blockType":"sprite","dataTypes":{"sprite":["sprite"]},"dataType":"sprite","data":"space_hoi","childs":[]},{"id":"ji3r4s","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"operator":["number"]},"dataType":"number","data":200,"childs":[]}]}]},"folded":false,"disabled":false},{"id":"qfo6yh","block":{"id":"t3he42","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}],"focusedLineIndex":-1,"focusedBlockIndex":-1,"editingBlockIndex":-1,"focusedCategory":null}',
//             preview: {
//               name: "joystick_a_white",
//               type: "component",
//               subtype: "analog",
//               angle: 0,
//               left: 1114.7298693350267,
//               top: 573.844151137729,
//               scaleX: 0.8150242550242552,
//               scaleY: 0.8150242550242552,
//               width: 250,
//               height: 250,
//               opacity: 1
//             }
//           },
//           satellite: {
//             type: "sprite",
//             assetId: "satellite_v3",
//             code:
//               '{"lines":[{"id":"lb2drr","block":{"id":"a17vki","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"satellite","childs":[{"id":"bm0xzv","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"ieq96w","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"idle","childs":[]}]}]},"folded":false,"disabled":false},{"id":"kshpyt","block":{"id":"vhc891","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}],"focusedLineIndex":-1,"focusedBlockIndex":-1,"editingBlockIndex":-1,"focusedCategory":null}',
//             preview: {
//               name: "satellite",
//               type: "sprite",
//               subtype: null,
//               angle: 327.8415566868632,
//               left: 145.50751702112137,
//               top: 550.3458669017298,
//               scaleX: 0.46760735808115467,
//               scaleY: 0.46760735808115467,
//               width: 215,
//               height: 500,
//               opacity: 1
//             }
//           },
//           planet_green: {
//             type: "sprite",
//             assetId: "planet_green_v3",
//             code:
//               '{"lines":[{"id":"yc3eo6","block":{"id":"5r9wn5","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"planet_green","childs":[{"id":"m6fi07","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"5lukt8","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"idle","childs":[]}]}]},"folded":false,"disabled":false},{"id":"0kr5r0","block":{"id":"2nb0wa","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}],"focusedLineIndex":-1,"focusedBlockIndex":-1,"editingBlockIndex":-1,"focusedCategory":null}',
//             preview: {
//               name: "planet_green",
//               type: "sprite",
//               subtype: null,
//               angle: 0,
//               left: 327.99972027457284,
//               top: 161.6774342946555,
//               scaleX: 0.5791991861628938,
//               scaleY: 0.5791991861628938,
//               width: 400,
//               height: 299,
//               opacity: 1
//             }
//           },
//           planet_pink: {
//             type: "sprite",
//             assetId: "planet_pink_v6",
//             code:
//               '{"lines":[{"id":"pti50b","block":{"id":"mni26w","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"planet_pink","childs":[{"id":"nsc70e","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"9jd3a2","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"idle","childs":[]}]}]},"folded":false,"disabled":false},{"id":"bur2aa","block":{"id":"6y1x1g","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}],"focusedLineIndex":-1,"focusedBlockIndex":-1,"editingBlockIndex":-1,"focusedCategory":null}',
//             preview: {
//               name: "planet_pink",
//               type: "sprite",
//               subtype: null,
//               angle: 0,
//               left: 564.3857609651881,
//               top: 573.3194042981024,
//               scaleX: 0.6506986772653004,
//               scaleY: 0.6506986772653004,
//               width: 320,
//               height: 320,
//               opacity: 1
//             }
//           },
//           planet_yellow: {
//             type: "sprite",
//             assetId: "planet_yellow_v4",
//             code:
//               '{"lines":[{"id":"q4xhwq","block":{"id":"woadh6","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"planet_yellow","childs":[{"id":"qukszl","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"t7pgm5","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"idle","childs":[]}]}]},"folded":false,"disabled":false},{"id":"lfsuif","block":{"id":"2rxjbz","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}],"focusedLineIndex":-1,"focusedBlockIndex":-1,"editingBlockIndex":-1,"focusedCategory":null}',
//             preview: {
//               name: "planet_yellow",
//               type: "sprite",
//               subtype: null,
//               angle: 0,
//               left: 821.4467352742934,
//               top: 142.6255638344143,
//               scaleX: 0.5644973997915181,
//               scaleY: 0.5644973997915181,
//               width: 350,
//               height: 350,
//               opacity: 1
//             }
//           },
//           space_probe: {
//             type: "sprite",
//             assetId: "space_probe",
//             code:
//               '{"lines":[{"id":"qowvga","block":{"id":"shu28l","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"space_probe","childs":[{"id":"fjwzig","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"01lyqg","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"idle","childs":[]}]}]},"folded":false,"disabled":false},{"id":"d25ep8","block":{"id":"k0mqcy","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}],"focusedLineIndex":-1,"focusedBlockIndex":-1,"editingBlockIndex":-1,"focusedCategory":null}',
//             preview: {
//               name: "space_probe",
//               type: "sprite",
//               subtype: null,
//               angle: 0,
//               left: 1072.3853376049965,
//               top: 368.2882202685739,
//               scaleX: 0.6151691313573102,
//               scaleY: 0.6151691313573102,
//               width: 305,
//               height: 209,
//               opacity: 1
//             }
//           },
//           space_hoi: {
//             type: "sprite",
//             assetId: "space_hoi",
//             code:
//               '{"lines":[{"id":"rsm6da","block":{"id":"8cjabp","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"space_hoi","childs":[{"id":"qcq7g4","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"dk9rji","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"idle","childs":[]}]}]},"folded":false,"disabled":false},{"id":"sil90m","block":{"id":"rb6e67","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"space_hoi","childs":[{"id":"5txtvb","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"onOverlap","childs":[{"id":"hktld1","mode":"instance","grammars":{"sprite":"objective"},"grammar":"objective","blockTypes":["sprite"],"blockType":"sprite","dataTypes":{"sprite":["sprite","text"]},"dataType":"sprite","data":"planet_green","childs":[]},{"id":"952tla","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"m9wjgg","block":{"id":"1xmo7p","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"space_hoi","childs":[{"id":"0ulsaw","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"goTo","childs":[{"id":"fbyejl","mode":"instance","grammars":{"constant":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","sprite","operator"],"blockType":"sprite","dataTypes":{"constant":["position","touch","random"],"sprite":["sprite","text"],"operator":["position","touch","random"]},"dataType":"sprite","data":"satellite","childs":[]}]}]},"folded":false,"disabled":false},{"id":"mjq77c","block":{"id":"4faocy","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}]}]},"folded":false,"disabled":false},{"id":"otezx6","block":{"id":"tgh6sk","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"space_hoi","childs":[{"id":"itvh21","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"onOverlap","childs":[{"id":"r5ic9l","mode":"instance","grammars":{"sprite":"objective"},"grammar":"objective","blockTypes":["sprite"],"blockType":"sprite","dataTypes":{"sprite":["sprite","text"]},"dataType":"sprite","data":"planet_pink","childs":[]},{"id":"fscjdo","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"ncbkjv","block":{"id":"lwq0s6","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"space_hoi","childs":[{"id":"kxr3fm","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"goTo","childs":[{"id":"n9gk24","mode":"instance","grammars":{"constant":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","sprite","operator"],"blockType":"sprite","dataTypes":{"constant":["position","touch","random"],"sprite":["sprite","text"],"operator":["position","touch","random"]},"dataType":"sprite","data":"satellite","childs":[]}]}]},"folded":false,"disabled":false},{"id":"2jjkza","block":{"id":"ss020o","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}]}]},"folded":false,"disabled":false},{"id":"vnx32l","block":{"id":"3ayp62","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"space_hoi","childs":[{"id":"4klg7p","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"onOverlap","childs":[{"id":"at72mo","mode":"instance","grammars":{"sprite":"objective"},"grammar":"objective","blockTypes":["sprite"],"blockType":"sprite","dataTypes":{"sprite":["sprite","text"]},"dataType":"sprite","data":"planet_yellow","childs":[]},{"id":"ag87v1","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"6ex0r5","block":{"id":"po750k","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"space_hoi","childs":[{"id":"47nghg","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"goTo","childs":[{"id":"u6g9gp","mode":"instance","grammars":{"constant":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","sprite","operator"],"blockType":"sprite","dataTypes":{"constant":["position","touch","random"],"sprite":["sprite","text"],"operator":["position","touch","random"]},"dataType":"sprite","data":"satellite","childs":[]}]}]},"folded":false,"disabled":false},{"id":"5jt64e","block":{"id":"gefiv2","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}]}]},"folded":false,"disabled":false},{"id":"n96th8","block":{"id":"j0rmgm","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"space_hoi","childs":[{"id":"uqjmc0","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"onOverlap","childs":[{"id":"laelsr","mode":"instance","grammars":{"sprite":"objective"},"grammar":"objective","blockTypes":["sprite"],"blockType":"sprite","dataTypes":{"sprite":["sprite","text"]},"dataType":"sprite","data":"space_probe","childs":[]},{"id":"hi0d3s","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"l67vr4","block":{"id":"2ngz5f","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"space_hoi","childs":[{"id":"nh03xj","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"say","childs":[{"id":"mypg0u","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["string"],"variable":["number","string","boolean"],"sprite":["text"],"operator":["string"]},"dataType":"string","data":"야호!!","childs":[]}]}]},"folded":false,"disabled":false},{"id":"ajn6ey","block":{"id":"j46ops","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"space_hoi","childs":[{"id":"y5hzsj","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"uroh3b","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"victory","childs":[]}]}]},"folded":false,"disabled":false},{"id":"cg2wl5","block":{"id":"l45lfe","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}]}]},"folded":false,"disabled":false},{"id":"o3yqw5","block":{"id":"j2o0n7","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}],"focusedLineIndex":-1,"focusedBlockIndex":-1,"editingBlockIndex":-1,"focusedCategory":null}',
//             preview: {
//               name: "space_hoi",
//               type: "sprite",
//               subtype: null,
//               angle: 0,
//               left: 202.97284158137032,
//               top: 550.0057685639015,
//               scaleX: 0.6777464752675255,
//               scaleY: 0.6777464752675255,
//               width: 223,
//               height: 209,
//               opacity: 1
//             }
//           }
//         },
//         spriteIds: [
//           "space_aurora",
//           "joystick_a_white",
//           "satellite",
//           "planet_green",
//           "planet_pink",
//           "planet_yellow",
//           "space_probe",
//           "space_hoi"
//         ],
//         preview:
//           "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/fa927d44636ec5454ae2882d5ab982be.jpg"
//       }
//     },
//     sceneIds: ["scene1"],
//     soundIds: ["documentary_v3"],
//     timeStamp: 1602485639033,
//     editorMode: "block"
//   },
//   interaction: {
//     selected: {
//       objects: { scene1: { name: "space_hoi", type: "sprite" } },
//       api: "ID_PHYSICS",
//       method: null,
//       scene: "scene1"
//     },
//     jukebox: { isPlaying: false }
//   },
//   preview: {
//     isPlaying: false,
//     isFullScreen: false,
//     screenMode: "HORIZONTAL",
//     volume: 100
//   }
// };

// if (isMinifyMapValid()) {
//   const minifiedTestJSON = minifyJSON(testJSON);
//   const restoredJSON = restoreJSON(minifiedTestJSON);
// } else {
//   console.warn("MinifyMap is invalid");
// }
