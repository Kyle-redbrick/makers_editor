import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 5,
  title: "중급 5단계. 적 설정하기(1)",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./5-1 story.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./5-1 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./5-1 main.png"),
      successDelay: 2000,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "pumpkin",
          oobcLine: {
            blocks: [
              {
                blockType: "sprite",
                data: "pumpkin"
              },
              {
                blockType: "action",
                data: "playAnimation"
              },
              {
                blockType: "constant"
              }
            ]
          }
        },
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "pumpkin",
          oobcLine: {
            blocks: [
              {
                blockType: "sprite",
                data: "pumpkin"
              },
              {
                blockType: "property",
                data: "velocityX"
              },
              {
                blockType: "action",
                data: "set"
              },
              {
                blockType: "constant",
                data: -400
              }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { spriteId: "pumpkin", api: "playAnimation" }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { spriteId: "pumpkin", api: "setVelocityX", value: -400 }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "왼쪽으로 움직이는 호박을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./5-1 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./5-1 answer.png")
        }
      ]
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./5-2 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./5-2 main.png"),
      successDelay: 2000,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "pumpkin",
          oobcLine: {
            blocks: [
              {
                blockType: "sprite",
                data: "pumpkin"
              },
              {
                blockType: "action",
                data: "onOut"
              }
            ]
          }
        },
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "pumpkin",
          oobcLine: {
            blocks: [
              {
                blockType: "sprite",
                data: "pumpkin"
              },
              {
                blockType: "action",
                data: "goTo"
              },
              {
                blockType: "constant",
                data: { x: 1280, y: 150 }
              }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            spriteId: "pumpkin",
            api: "goTo"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "호박이 화면 밖으로 나가면\n오른쪽에서 다시 나오게 하자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./5-2 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./5-2 answer.png")
        }
      ]
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("../../common/end.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "정말 잘하는데?\n다음 수업에서 또 보자구!"
        }
      ]
    }
  ]
};

export const state = {
  scene: {
    sceneIds: ["scene1"],
    soundIds: ["documentary_v3"],
    editorMode: "block",
    timeStamp: 1602490264767,
    scenes: {
      scene1: {
        sceneName: "scene1",
        spriteIds: ["halloween_red", "witch", "pumpkin"],
        sprites: {
          witch: {
            type: "sprite",
            assetId: "witch_v18",
            code:
              '{"lines":[{"id":"t8tedc","block":{"id":"oospcm","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"witch","childs":[{"id":"9308rh","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"qsrwxi","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"idle","childs":[]}]}]},"folded":false,"disabled":false},{"id":"cak4ds","block":{"id":"a0rat2","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"witch","childs":[{"id":"z3i3bg","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"say","childs":[{"id":"0dtq6v","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["string"],"variable":["number","string","boolean"],"sprite":["text"],"operator":["string"]},"dataType":"string","data":"시작!","childs":[]}]}]},"folded":false,"disabled":false},{"id":"hoqlmo","block":{"id":"hzfdrh","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"witch","childs":[{"id":"rwf7wk","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"subject","blockTypes":["property","action","util"],"blockType":"property","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"number","data":"gravityY","childs":[{"id":"6r7bk4","mode":"instance","grammars":{"action":"verb"},"grammar":"verb","blockTypes":["action"],"blockType":"action","parentDataTypes":[null,"number","string","boolean"],"dataTypes":{"action":["number"]},"dataType":"number","data":"set","childs":[{"id":"gcns7n","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"variable":["number"],"sprite":["sprite","text"],"operator":["number"]},"dataType":"number","data":1000,"childs":[]}]}]}]},"folded":false,"disabled":false},{"id":"gzwqh4","block":{"id":"j8f0cr","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"screen","data":"halloween_red","childs":[{"id":"ep1jwi","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["screen"],"dataTypes":{"property":["number","string","boolean"],"action":["screen"],"util":["sprite"]},"dataType":"screen","data":"onTouch","childs":[{"id":"uzn1x8","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"0hvga8","block":{"id":"fnoq8g","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"witch","childs":[{"id":"8wvr5u","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"subject","blockTypes":["property","action","util"],"blockType":"property","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"number","data":"velocityY","childs":[{"id":"zbjodb","mode":"instance","grammars":{"action":"verb"},"grammar":"verb","blockTypes":["action"],"blockType":"action","parentDataTypes":[null,"number","string","boolean"],"dataTypes":{"action":["number"]},"dataType":"number","data":"set","childs":[{"id":"ep9x8s","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"variable":["number"],"sprite":["sprite","text"],"operator":["number"]},"dataType":"number","data":-400,"childs":[]}]}]}]},"folded":false,"disabled":false},{"id":"jdqs97","block":{"id":"w994jm","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}]}]},"folded":false,"disabled":false},{"id":"rp7cew","block":{"id":"ro2ac8","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}],"focusedLineIndex":-1,"focusedBlockIndex":-1,"editingBlockIndex":-1,"focusedCategory":null}',
            preview: {
              name: "witch",
              type: "sprite",
              subtype: null,
              angle: 0,
              scaleX: 1,
              scaleY: 1,
              width: 390,
              height: 346,
              opacity: 1,
              left: 377.5940959409594,
              top: 397.484931914577
            }
          },
          pumpkin: {
            type: "sprite",
            assetId: "pumpkin_v14",
            code:
              '{"lines":[{"id":"dt9p6y","block":{"id":"fpuv7l","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}',
            preview: {
              name: "pumpkin",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 949.0723282431552,
              top: 154.10256410256412,
              scaleX: 1,
              scaleY: 1,
              width: 164,
              height: 146,
              opacity: 1
            }
          },
          halloween_red: {
            type: "background",
            assetId: "halloween_red",
            code: "",
            preview: {
              name: "halloween_red",
              type: "background",
              angle: 0,
              left: -199,
              top: 0,
              scaleX: 1,
              scaleY: 1,
              width: 1678,
              height: 720,
              opacity: 1
            }
          }
        },
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/c0623bfcf69d8059804dd2125d5eb077.jpg"
      }
    }
  },
  interaction: {
    selected: {
      api: "ID_PHYSICS",
      method: null,
      scene: "scene1",
      objects: { scene1: { name: "pumpkin", type: "sprite" } }
    },
    jukebox: { isPlaying: false }
  },
  preview: {
    isPlaying: false,
    isFullScreen: false,
    screenMode: "HORIZONTAL",
    volume: 100
  }
};
