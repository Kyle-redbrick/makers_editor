import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 6,
  title: "중급 6단계. 적 설정하기(2)",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./6-1 story.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./6-1 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./6-1 main.png"),
      successDelay: 3500,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "pumpkin_three",
          oobcLine: {
            blocks: [
              {
                blockType: "sprite",
                data: "pumpkin_three"
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
          spriteId: "pumpkin_three",
          oobcLine: {
            blocks: [
              {
                blockType: "sprite",
                data: "pumpkin_three"
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
          event: {
            spriteId: "pumpkin_three",
            api: "playAnimation"
          }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            spriteId: "pumpkin_three",
            api: "setVelocityX",
            value: -400
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "왼쪽으로 움직이는 호박벽을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./6-1 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./6-1 answer.png")
        }
      ]
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./6-2 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./6-2 main.png"),
      successDelay: 3500,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "pumpkin_three",
          oobcLine: {
            blocks: [
              {
                blockType: "sprite",
                data: "pumpkin_three"
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
          spriteId: "pumpkin_three",
          oobcLine: {
            blocks: [
              {
                blockType: "sprite",
                data: "pumpkin_three"
              },
              {
                blockType: "action",
                data: "goTo"
              },
              {
                blockType: "constant",
                data: { x: 1280, y: 570 }
              }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            spriteId: "pumpkin_three",
            api: "goTo"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "호박벽이 화면 밖으로 나가면\n오른쪽에서 다시 나오게 하자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./6-2 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./6-2 answer.png")
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
    timeStamp: 1602490743108,
    scenes: {
      scene1: {
        sceneName: "scene1",
        spriteIds: ["halloween_red", "witch", "pumpkin", "pumpkin_three"],
        sprites: {
          witch: {
            type: "sprite",
            assetId: "witch_v18",
            code:
              '{"lines":[{"id":"t8tedc","block":{"id":"oospcm","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"witch","childs":[{"id":"9308rh","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"qsrwxi","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"idle","childs":[]}]}]},"folded":false,"disabled":false},{"id":"cak4ds","block":{"id":"a0rat2","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"witch","childs":[{"id":"z3i3bg","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"say","childs":[{"id":"0dtq6v","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["string"],"variable":["number","string","boolean"],"sprite":["text"],"operator":["string"]},"dataType":"string","data":"시작!","childs":[]}]}]},"folded":false,"disabled":false},{"id":"hoqlmo","block":{"id":"hzfdrh","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"witch","childs":[{"id":"rwf7wk","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"subject","blockTypes":["property","action","util"],"blockType":"property","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"number","data":"gravityY","childs":[{"id":"6r7bk4","mode":"instance","grammars":{"action":"verb"},"grammar":"verb","blockTypes":["action"],"blockType":"action","parentDataTypes":[null,"number","string","boolean"],"dataTypes":{"action":["number"]},"dataType":"number","data":"set","childs":[{"id":"gcns7n","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"variable":["number"],"sprite":["sprite","text"],"operator":["number"]},"dataType":"number","data":1000,"childs":[]}]}]}]},"folded":false,"disabled":false},{"id":"rp7cew","block":{"id":"f6tzii","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"screen","data":"halloween_red","childs":[{"id":"uaadid","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["screen"],"dataTypes":{"property":["number","string","boolean"],"action":["screen"],"util":["sprite"]},"dataType":"screen","data":"onTouch","childs":[{"id":"v67urn","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"2p627c","block":{"id":"bjbq8s","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"witch","childs":[{"id":"fyxc7i","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"subject","blockTypes":["property","action","util"],"blockType":"property","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"number","data":"velocityY","childs":[{"id":"upkqod","mode":"instance","grammars":{"action":"verb"},"grammar":"verb","blockTypes":["action"],"blockType":"action","parentDataTypes":[null,"number","string","boolean"],"dataTypes":{"action":["number"]},"dataType":"number","data":"set","childs":[{"id":"7oa2ho","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"variable":["number"],"sprite":["sprite","text"],"operator":["number"]},"dataType":"number","data":-400,"childs":[]}]}]}]},"folded":false,"disabled":false},{"id":"99m92t","block":{"id":"e06wzf","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}]}]},"folded":false,"disabled":false},{"id":"ibexb2","block":{"id":"hpe3qk","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}],"focusedLineIndex":-1,"focusedBlockIndex":-1,"editingBlockIndex":-1,"focusedCategory":null}',
            preview: {
              name: "witch",
              type: "sprite",
              subtype: null,
              angle: 0,
              scaleX: 0.6,
              scaleY: 0.6,
              width: 390,
              height: 346,
              opacity: 1,
              left: 359.2793105673505,
              top: 399.536213965859,
              scale: "60"
            }
          },
          pumpkin: {
            type: "sprite",
            assetId: "pumpkin_v14",
            code:
              '{"lines":[{"id":"dt9p6y","block":{"id":"3rzu0n","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"pumpkin","childs":[{"id":"lfkzn4","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"zl2mh6","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"idle_a","childs":[]}]}]},"folded":false,"disabled":false},{"id":"rd4g21","block":{"id":"efwhzk","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"pumpkin","childs":[{"id":"rdjwix","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"subject","blockTypes":["property","action","util"],"blockType":"property","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"number","data":"velocityX","childs":[{"id":"8x73hb","mode":"instance","grammars":{"action":"verb"},"grammar":"verb","blockTypes":["action"],"blockType":"action","parentDataTypes":[null,"number","string","boolean"],"dataTypes":{"action":["number"]},"dataType":"number","data":"set","childs":[{"id":"4es7kv","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"variable":["number"],"sprite":["sprite","text"],"operator":["number"]},"dataType":"number","data":-400,"childs":[]}]}]}]},"folded":false,"disabled":false},{"id":"hmmbli","block":{"id":"waze55","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"pumpkin","childs":[{"id":"kzjnkd","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"onOut","childs":[{"id":"k2hz4g","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"2n4hus","block":{"id":"nacxea","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"pumpkin","childs":[{"id":"q3anen","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"goTo","childs":[{"id":"s8whzs","mode":"instance","grammars":{"constant":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["position","touch","random"],"sprite":["sprite","text"],"operator":["position","touch","random"]},"dataType":"position","data":{"x":1280,"y":150},"childs":[]}]}]},"folded":false,"disabled":false},{"id":"at3xv0","block":{"id":"7yoo00","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}]}]},"folded":false,"disabled":false},{"id":"yivezh","block":{"id":"atavu2","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}',
            preview: {
              name: "pumpkin",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 794.4141406437911,
              top: 150,
              scaleX: 1,
              scaleY: 1,
              width: 164,
              height: 146,
              opacity: 1
            }
          },
          pumpkin_three: {
            type: "sprite",
            assetId: "pumpkin_three_v8",
            code:
              '{"lines":[{"id":"wddre7","block":{"id":"ekjnhm","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}',
            preview: {
              name: "pumpkin_three",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1005.3420470611702,
              top: 576.1538461538461,
              scaleX: 1,
              scaleY: 1,
              width: 163,
              height: 300,
              opacity: 1
            }
          },
          halloween_red: {
            type: "background",
            assetId: "halloween_red",
            code:
              '{"lines":[{"id":"ugh6t1","block":{"id":"0cjhq1","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"screen","data":"halloween_red","childs":[{"id":"0u0fgu","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["screen"],"dataTypes":{"property":["number","string","boolean"],"action":["screen"],"util":["sprite"]},"dataType":"screen","data":"onFrame","childs":[{"id":"8q6xuj","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"8ryxzv","block":{"id":"ud8udx","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"screen","data":"halloween_red","childs":[{"id":"cjaquq","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text","screen"],"dataTypes":{"property":["number","string","boolean"],"action":["screen"],"util":["sprite"]},"dataType":"screen","data":"go","childs":[{"id":"f8pe5r","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["direction","axis"],"operator":["direction","axis"]},"dataType":"direction","data":"left","childs":[]},{"id":"0eqvep","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"variable":["number"],"sprite":["sprite","text","screen","joystick"],"operator":["number"]},"dataType":"number","data":2,"childs":[]}]}]},"folded":false,"disabled":false},{"id":"dsizx3","block":{"id":"026775","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}]}]},"folded":false,"disabled":false},{"id":"5zg2jb","block":{"id":"iwbyuz","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}],"focusedLineIndex":-1,"focusedBlockIndex":-1,"editingBlockIndex":-1,"focusedCategory":null}',
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
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/a4442436d2272573f9ee87a562bac7a1.jpg"
      }
    }
  },
  interaction: {
    selected: {
      api: "ID_PHYSICS",
      method: null,
      scene: "scene1",
      objects: { scene1: { name: "pumpkin_three", type: "sprite" } }
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
