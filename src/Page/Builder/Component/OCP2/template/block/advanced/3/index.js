import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 3,
  title: "고급 3단계 <타일을 움직여라>",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./3-1 story.png"),

      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션1 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./3-1 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션1 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./3-1 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "plent_l",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "plent_l" },
              { blockType: "property", data: "velocityY" },
              { blockType: "action", data: "set" },
              { blockType: "constant", data: 300 }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { api: "setVelocityY", spriteId: "plent_l", value: 300 }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "아래로 내려오는 타일을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-1 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-1 answer.png")
        }
      ]
    },
    {
      title: "미션2 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./3-2 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션2 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./3-2 main.png"),
      successDelay: 4000,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "plent_l",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "plent_l" },
              { blockType: "action", data: "setCollision" },
              { blockType: "sprite", data: "factory_f" }
            ]
          }
        },
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "plent_l",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "plent_l" },
              { blockType: "property", data: "bounceY" },
              { blockType: "action", data: "set" },
              { blockType: "constant", data: 1 }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { api: "setCollideScene", spriteId: "plent_l" }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { api: "setBounceY", spriteId: "plent_l", value: 1 }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "위아래로 튕기는 타일을 만들자"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-2 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-2 answer.png")
        }
      ]
    },
    {
      title: "미션3 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./3-3 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션3 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./3-3 main.png"),
      successDelay: 4500,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "plent_l",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "plent_l" },
              { blockType: "action", data: "setCollision" },
              { blockType: "sprite", data: "boy_d" }
            ]
          }
        },
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "plent_l",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "plent_l" },
              { blockType: "property", data: "movable" },
              { blockType: "action", data: "set" },
              { blockType: "constant", data: "false" }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "setCollision",
            spriteId: "plent_l",
            targetName: "boy_d"
          }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { api: "setMovable", spriteId: "plent_l", enable: false }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "주인공이 탈 수 있는 타일을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-3 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-3 answer.png")
        }
      ]
    },
    {
      title: "미션4 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./3-4 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션4 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./3-4 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "plent_l(2)",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "plent_l(2)" },
              { blockType: "property", data: "velocityY" },
              { blockType: "action", data: "set" },
              { blockType: "constant", data: -300 }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { api: "setVelocityY", spriteId: "plent_l(2)", value: -300 }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "위로 올라가는 타일을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-4 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-4 answer.png")
        }
      ]
    },
    {
      title: "미션5 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./3-5 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션5 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./3-5 main.png"),
      successDelay: 4000,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "plent_l(2)",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "plent_l(2)" },
              { blockType: "action", data: "setCollision" },
              { blockType: "sprite", data: "factory_f" }
            ]
          }
        },
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "plent_l(2)",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "plent_l(2)" },
              { blockType: "property", data: "bounceY" },
              { blockType: "action", data: "set" },
              { blockType: "constant", data: 1 }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { api: "setCollideScene", spriteId: "plent_l(2)" }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { api: "setBounceY", spriteId: "plent_l(2)", value: 1 }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "위아래로 튕기는 타일을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-5 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-5 answer.png")
        }
      ]
    },
    {
      title: "미션6 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./3-6 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션6 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./3-6 main.png"),
      successDelay: 5500,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "plent_l(2)",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "plent_l(2)" },
              { blockType: "action", data: "setCollision" },
              { blockType: "sprite", data: "boy_d" }
            ]
          }
        },
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "plent_l(2)",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "plent_l(2)" },
              { blockType: "property", data: "movable" },
              { blockType: "action", data: "set" },
              { blockType: "constant", data: "false" }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "setCollision",
            spriteId: "plent_l(2)",
            targetName: "boy_d"
          }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { api: "setMovable", spriteId: "plent_l(2)", enable: false }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "주인공이 탈 수 있는 타일을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-6 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-6 answer.png")
        }
      ]
    },
    {
      title: "엔딩",
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
    scenes: {
      scene1: {
        sceneName: "scene1",
        sprites: {
          factory_f: {
            type: "background",
            assetId: "factory_f",
            code:
              '{"lines":[{"id":"orvdio","block":{"id":"i1bjtz","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}',
            preview: {
              name: "factory_f",
              type: "background",
              angle: 0,
              left: 0,
              top: 0,
              scaleX: 1,
              scaleY: 1,
              width: 1280,
              height: 720,
              opacity: 1
            }
          },
          boy_d: {
            type: "sprite",
            assetId: "boy_d_v3",
            code:
              '{"lines":[{"id":"vupdho","block":{"id":"k5s3rl","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"boy_d","childs":[{"id":"bj3u0m","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"mf07c4","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"idle","childs":[]}]}]},"folded":false,"disabled":false},{"id":"2envfp","block":{"id":"x8xeou","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"boy_d","childs":[{"id":"9nqiai","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"subject","blockTypes":["property","action","util"],"blockType":"property","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"number","data":"gravityY","childs":[{"id":"xuo3v1","mode":"instance","grammars":{"action":"verb"},"grammar":"verb","blockTypes":["action"],"blockType":"action","parentDataTypes":[null,"number","string","boolean"],"dataTypes":{"action":["number"]},"dataType":"number","data":"set","childs":[{"id":"ktedgm","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"variable":["number"],"sprite":["sprite","text"],"operator":["number"]},"dataType":"number","data":2000,"childs":[]}]}]}]},"folded":false,"disabled":false},{"id":"6ajs89","block":{"id":"d93s03","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"boy_d","childs":[{"id":"4ya6xr","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"onOut","childs":[{"id":"zjyg8m","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"h470z2","block":{"id":"hxw2wl","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"boy_d","childs":[{"id":"irlmqb","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"goTo","childs":[{"id":"xe4hlo","mode":"instance","grammars":{"constant":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["position","touch","random"],"sprite":["sprite","text"],"operator":["position","touch","random"]},"dataType":"position","data":{"x":160,"y":350},"childs":[]}]}]},"folded":false,"disabled":false},{"id":"009q4h","block":{"id":"p3keze","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}]}]},"folded":false,"disabled":false},{"id":"pokxke","block":{"id":"bxzd1k","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}',
            preview: {
              name: "boy_d",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 160,
              top: 350,
              scaleX: 0.55,
              scaleY: 0.55,
              width: 234,
              height: 400,
              opacity: 1,
              scale: "55"
            }
          },
          plent_a: {
            type: "sprite",
            assetId: "plent_a_v2",
            code:
              '{"lines":[{"id":"zkhv4j","block":{"id":"9g7m3p","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}',
            preview: {
              name: "plent_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1159.4772090215383,
              top: 475.9907289746187,
              scaleX: 0.5709300403302527,
              scaleY: 0.5709300403302527,
              width: 506,
              height: 115,
              opacity: 1
            }
          },
          plent_c: {
            type: "sprite",
            assetId: "plent_c_v2",
            code:
              '{"lines":[{"id":"2afxzl","block":{"id":"pzgalw","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"plent_c","childs":[{"id":"c1gc70","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"setCollision","childs":[{"id":"0a7v84","mode":"instance","grammars":{"sprite":"objective"},"grammar":"objective","blockTypes":["sprite"],"blockType":"sprite","dataTypes":{"sprite":["sprite","text","screen"]},"dataType":"sprite","data":"boy_d","childs":[]}]}]},"folded":false,"disabled":false},{"id":"29cjzv","block":{"id":"di5lo0","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"plent_c","childs":[{"id":"p2ok1c","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"subject","blockTypes":["property","action","util"],"blockType":"property","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"boolean","data":"movable","childs":[{"id":"d12frs","mode":"instance","grammars":{"action":"verb"},"grammar":"verb","blockTypes":["action"],"blockType":"action","parentDataTypes":[null,"number","string","boolean"],"dataTypes":{"action":["boolean"]},"dataType":"boolean","data":"set","childs":[{"id":"3v3dtk","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["boolean"],"variable":["boolean"],"sprite":["sprite","text"],"operator":["boolean"]},"dataType":"boolean","data":"false","childs":[]}]}]}]},"folded":false,"disabled":false},{"id":"u6kes0","block":{"id":"pg2tv9","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}',
            preview: {
              name: "plent_c",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 165.31365313653134,
              top: 495.89403973509934,
              scaleX: 1,
              scaleY: 1,
              width: 256,
              height: 58,
              opacity: 1
            }
          },
          button_ab_c: {
            type: "sprite",
            assetId: "button_ab_c_v2",
            code:
              '{"lines":[{"id":"lpg9m6","block":{"id":"2apkc6","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"button_ab_c","childs":[{"id":"qhorns","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"onTouch","childs":[{"id":"r19k6b","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"lwnke0","block":{"id":"dwg8po","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"boy_d","childs":[{"id":"uzi0xu","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"lww88v","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"run","childs":[]}]}]},"folded":false,"disabled":false},{"id":"dpq2ht","block":{"id":"f5cutt","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"boy_d","childs":[{"id":"ab06wq","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"subject","blockTypes":["property","action","util"],"blockType":"property","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"number","data":"velocityX","childs":[{"id":"20i3ro","mode":"instance","grammars":{"action":"verb"},"grammar":"verb","blockTypes":["action"],"blockType":"action","parentDataTypes":[null,"number","string","boolean"],"dataTypes":{"action":["number"]},"dataType":"number","data":"set","childs":[{"id":"gpw1cl","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"variable":["number"],"sprite":["sprite","text"],"operator":["number"]},"dataType":"number","data":400,"childs":[]}]}]}]},"folded":false,"disabled":false}]}]}]},"folded":false,"disabled":false},{"id":"a6rtyu","block":{"id":"df53fy","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"button_ab_c","childs":[{"id":"c9tljb","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"onTouchUp","childs":[{"id":"x6pxu3","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"fjakjh","block":{"id":"7lfdbt","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"boy_d","childs":[{"id":"bnrwiw","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"d4g7qp","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"idle","childs":[]}]}]},"folded":false,"disabled":false},{"id":"zuu1y5","block":{"id":"girhsa","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"boy_d","childs":[{"id":"9wtf4t","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"subject","blockTypes":["property","action","util"],"blockType":"property","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"number","data":"velocityX","childs":[{"id":"sldwyp","mode":"instance","grammars":{"action":"verb"},"grammar":"verb","blockTypes":["action"],"blockType":"action","parentDataTypes":[null,"number","string","boolean"],"dataTypes":{"action":["number"]},"dataType":"number","data":"set","childs":[{"id":"2qmeit","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"variable":["number"],"sprite":["sprite","text"],"operator":["number"]},"dataType":"number","data":0,"childs":[]}]}]}]},"folded":false,"disabled":false},{"id":"v6x8qt","block":{"id":"j904fd","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}]}]},"folded":false,"disabled":false},{"id":"m4w26f","block":{"id":"8aj0ni","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}',
            preview: {
              name: "button_ab_c",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1138.3025830258302,
              top: 607.9470198675497,
              scaleX: 1,
              scaleY: 1,
              width: 121,
              height: 121,
              opacity: 1
            }
          },
          plent_l: {
            type: "sprite",
            assetId: "plent_l_v2",
            code:
              '{"lines":[{"id":"tyjioi","block":{"id":"qq47el","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}],"focusedLineIndex":-1,"focusedBlockIndex":-1,"editingBlockIndex":-1,"focusedCategory":null}',
            preview: {
              name: "plent_l",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 488,
              top: 140,
              scaleX: 0.5,
              scaleY: 0.5,
              width: 512,
              height: 155,
              opacity: 1,
              scale: "50"
            }
          },
          "plent_l(2)": {
            type: "sprite",
            assetId: "plent_l_v2",
            code:
              '{"lines":[{"id":"g3ayym","block":{"id":"o3knmk","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}',
            preview: {
              name: "plent_l(2)",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 830,
              top: 624,
              scaleX: 0.5,
              scaleY: 0.5,
              width: 512,
              height: 155,
              opacity: 1,
              scale: "50"
            }
          }
        },
        spriteIds: [
          "factory_f",
          "plent_a",
          "plent_c",
          "boy_d",
          "button_ab_c",
          "plent_l",
          "plent_l(2)"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/5dd3ab74744ffb3025cde3e200cbaea4.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: ["funky_v2", "victory_1"],
    timeStamp: 1602568958154,
    editorMode: "block"
  },
  interaction: {
    selected: {
      objects: { scene1: { name: "plent_l", type: "sprite" } },
      api: "ID_PHYSICS",
      method: null,
      scene: "scene1"
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
