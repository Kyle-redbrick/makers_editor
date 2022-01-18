import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 9,
  title: "초급 9단계. 다시 하고 싶은 게임",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./story.png"),
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
      imgSrc: require("./start.png"),
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
      imgSrc: require("./main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "retry_j",
          oobcLine: {
            lineNum: 0,
            depth: 0,
            blocks: [
              {
                blockType: "sprite",
                data: "retry_j"
              },
              {
                blockType: "action",
                data: "onTouch"
              }
            ]
          }
        },
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "retry_j",
          oobcLine: {
            lineNum: 0,
            depth: 0,
            blocks: [
              {
                blockType: "sprite",
                data: "adventure_m"
              },
              {
                blockType: "action",
                data: "changeScene"
              },
              {
                blockType: "constant",
                data: "scene1"
              }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "onClick",
            sceneId: "scene2",
            spriteId: "retry_j"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "게임을 다시 할 수 있도록 코드를 짜볼까?"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./answer.png")
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
          adventure_m: {
            type: "background",
            assetId: "adventure_m_v5",
            code:
              '{"lines":[{"id":"xx0apz","block":{"id":"6915rf","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"screen","data":"adventure_m","childs":[{"id":"79r31r","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["screen"],"dataTypes":{"property":["number","string","boolean"],"action":["screen"],"util":["sprite"]},"dataType":"screen","data":"onFrame","childs":[{"id":"r1c2m3","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"8v5h7p","block":{"id":"ucnldn","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"screen","data":"adventure_m","childs":[{"id":"zqj8li","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text","screen"],"dataTypes":{"property":["number","string","boolean"],"action":["screen"],"util":["sprite"]},"dataType":"screen","data":"go","childs":[{"id":"7cynt9","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["direction","axis"],"operator":["direction","axis"]},"dataType":"direction","data":"right","childs":[]},{"id":"bhp2p9","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"variable":["number"],"sprite":["sprite","text","screen","joystick"],"operator":["number"]},"dataType":"number","data":8,"childs":[]}]}]},"folded":false},{"id":"oebr8d","block":{"id":"i40834","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}]}]},"folded":false},{"id":"dhotnk","block":{"id":"53u70f","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}',
            preview: {
              name: "adventure_m",
              type: "background",
              angle: 0,
              left: -199,
              top: -479,
              scaleX: 1,
              scaleY: 1,
              width: 1678,
              height: 1678,
              opacity: 1
            }
          },
          luna_a: {
            type: "sprite",
            assetId: "luna_a_v5",
            code:
              '{"lines":[{"id":"6ksmxm","block":{"id":"dufta2","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"luna_a","childs":[{"id":"vn41h6","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"5bhmsf","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"side_fly","childs":[]}]}]},"folded":false},{"id":"fe98da","block":{"id":"3o5ssy","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}',
            preview: {
              name: "luna_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 936,
              top: 236,
              scaleX: 0.81,
              scaleY: 0.81,
              width: 290,
              height: 289,
              opacity: 1,
              scale: "81"
            }
          },
          monster_m: {
            type: "sprite",
            assetId: "monster_ad",
            code:
              '{"lines":[{"id":"78a9ko","block":{"id":"vtl5u2","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"monster_m","childs":[{"id":"3jwwn1","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"r6spko","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"attack","childs":[]}]}]},"folded":false},{"id":"adkeui","block":{"id":"hp7ft1","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"monster_m","childs":[{"id":"lpkwvr","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"subject","blockTypes":["property","action","util"],"blockType":"property","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"number","data":"velocityY","childs":[{"id":"8j9ic1","mode":"instance","grammars":{"action":"verb"},"grammar":"verb","blockTypes":["action"],"blockType":"action","parentDataTypes":[null,"number","string","boolean"],"dataTypes":{"action":["number"]},"dataType":"number","data":"set","childs":[{"id":"z2tgu6","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"variable":["number"],"sprite":["sprite","text"],"operator":["number"]},"dataType":"number","data":300,"childs":[]}]}]}]},"folded":false},{"id":"lgeruz","block":{"id":"017892","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"monster_m","childs":[{"id":"aazhww","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"setCollision","childs":[{"id":"bdzqou","mode":"instance","grammars":{"sprite":"objective"},"grammar":"objective","blockTypes":["sprite"],"blockType":"sprite","dataTypes":{"sprite":["sprite","text","screen"]},"dataType":"screen","data":"adventure_m","childs":[]}]}]},"folded":false},{"id":"xbpvn7","block":{"id":"lsiuu7","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"monster_m","childs":[{"id":"myewtd","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"subject","blockTypes":["property","action","util"],"blockType":"property","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"number","data":"bounceY","childs":[{"id":"ax9ege","mode":"instance","grammars":{"action":"verb"},"grammar":"verb","blockTypes":["action"],"blockType":"action","parentDataTypes":[null,"number","string","boolean"],"dataTypes":{"action":["number"]},"dataType":"number","data":"set","childs":[{"id":"pnnoxe","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"variable":["number"],"sprite":["sprite","text"],"operator":["number"]},"dataType":"number","data":1,"childs":[]}]}]}]},"folded":false},{"id":"8udijc","block":{"id":"non0l8","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}',
            preview: {
              name: "monster_m",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 265,
              top: 338,
              scaleX: 0.78,
              scaleY: 0.78,
              width: 509,
              height: 548,
              opacity: 1,
              scale: "78"
            }
          },
          joystick_b_black: {
            type: "component",
            assetId: "joystick_b_black",
            code:
              '{"lines":[{"id":"9xognq","block":{"id":"guisju","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"joystick","data":"joystick_b_black","childs":[{"id":"t2vr4i","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["joystick"],"dataTypes":{"property":["number","string","boolean"],"action":["joystick"],"util":["sprite"]},"dataType":"joystick","data":"bind","childs":[{"id":"0qumcq","mode":"instance","grammars":{"sprite":"objective"},"grammar":"objective","blockTypes":["sprite"],"blockType":"sprite","dataTypes":{"sprite":["sprite"]},"dataType":"sprite","data":"luna_a","childs":[]},{"id":"65dfju","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"operator":["number"]},"dataType":"number","data":300,"childs":[]}]}]},"folded":false},{"id":"lw7jdc","block":{"id":"6dir0i","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}',
            preview: {
              name: "joystick_b_black",
              type: "component",
              subtype: "analog",
              angle: 0,
              left: 1103,
              top: 559,
              scaleX: 1,
              scaleY: 1,
              width: 250,
              height: 250,
              opacity: 1
            }
          },
          effect_beam_e: {
            type: "sprite",
            assetId: "effect_beam_e_v2",
            code:
              '{"lines":[{"id":"gaz6mg","block":{"id":"nnyg85","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"effect_beam_e","childs":[{"id":"dki985","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"playAnimation","childs":[{"id":"joyla7","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["animation"],"operator":["animation"]},"dataType":"animation","data":"fx","childs":[]}]}]},"folded":false},{"id":"08bbjc","block":{"id":"k59z3h","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"effect_beam_e","childs":[{"id":"q8libs","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"subject","blockTypes":["property","action","util"],"blockType":"property","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"number","data":"velocityX","childs":[{"id":"dxfgv5","mode":"instance","grammars":{"action":"verb"},"grammar":"verb","blockTypes":["action"],"blockType":"action","parentDataTypes":[null,"number","string","boolean"],"dataTypes":{"action":["number"]},"dataType":"number","data":"set","childs":[{"id":"sv6gpo","mode":"instance","grammars":{"constant":"objective","variable":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","variable","sprite","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"variable":["number"],"sprite":["sprite","text"],"operator":["number"]},"dataType":"number","data":800,"childs":[]}]}]}]},"folded":false},{"id":"njlgxv","block":{"id":"dw7v4l","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"effect_beam_e","childs":[{"id":"05veig","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"onOut","childs":[{"id":"78y6m2","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"rq0v8d","block":{"id":"h6c0pu","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"effect_beam_e","childs":[{"id":"ibg1t1","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"goTo","childs":[{"id":"utv8jb","mode":"instance","grammars":{"constant":"objective","sprite":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","sprite","operator"],"blockType":"sprite","dataTypes":{"constant":["position","touch","random"],"sprite":["sprite","text"],"operator":["position","touch","random"]},"dataType":"sprite","data":"monster_m","childs":[]}]}]},"folded":false},{"id":"gms01j","block":{"id":"f5854h","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}]}]},"folded":false},{"id":"lxo3lv","block":{"id":"6hviht","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"sprite","data":"effect_beam_e","childs":[{"id":"x6hzau","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["sprite","text"],"dataTypes":{"property":["number","string","boolean"],"action":["sprite"],"util":["sprite"]},"dataType":"sprite","data":"onOverlap","childs":[{"id":"4ji8cg","mode":"instance","grammars":{"sprite":"objective"},"grammar":"objective","blockTypes":["sprite"],"blockType":"sprite","dataTypes":{"sprite":["sprite","text"]},"dataType":"sprite","data":"luna_a","childs":[]},{"id":"5gbuac","mode":"instance","grammars":{"callback":"objective"},"grammar":"objective","blockTypes":["callback"],"blockType":"callback","dataTypes":{"callback":[null]},"data":[{"id":"kd1d0g","block":{"id":"uktmoy","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"screen","data":"adventure_m","childs":[{"id":"f33xkp","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["screen"],"dataTypes":{"property":["number","string","boolean"],"action":["screen"],"util":["sprite"]},"dataType":"screen","data":"changeScene","childs":[{"id":"0rz8jh","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["screen"],"operator":["screen"]},"dataType":"screen","data":"scene2","childs":[]}]}]},"folded":false},{"id":"fwx50r","block":{"id":"l1ylw8","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}]}]},"folded":false},{"id":"wmiwwc","block":{"id":"orjytu","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}',
            preview: {
              name: "effect_beam_e",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 242,
              top: 345,
              scaleX: 0.52,
              scaleY: 0.52,
              width: 311,
              height: 143,
              opacity: 1,
              scale: "52"
            }
          }
        },
        spriteIds: [
          "adventure_m",
          "luna_a",
          "joystick_b_black",
          "monster_m",
          "effect_beam_e"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/7217a11c775c99da1a972919d86c7331.jpg"
      },
      scene2: {
        sceneName: "scene2",
        sprites: {
          undefined: {
            code:
              '{"lines":[{"id":"juyu14","block":{"id":"7l59tc","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}'
          },
          adventure_m: {
            type: "background",
            assetId: "adventure_m_v5",
            locked: true,
            code:
              '{"lines":[{"id":"hlget2","block":{"id":"xvg6ox","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}',
            preview: {
              name: "adventure_m",
              type: "background",
              angle: 0,
              left: -199,
              top: -479,
              scaleX: 1,
              scaleY: 1,
              width: 1678,
              height: 1678,
              opacity: 1
            }
          },
          gameover_o: {
            type: "sprite",
            assetId: "gameover_o",
            locked: true,

            code:
              '{"lines":[{"id":"ipj716","block":{"id":"dkw9qm","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}',
            preview: {
              name: "gameover_o",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 640.7430385487529,
              top: 300,
              scaleX: 1.5,
              scaleY: 1.5,
              width: 444,
              height: 78,
              opacity: 1,
              scale: 150
            }
          },
          retry_j: {
            type: "sprite",
            assetId: "retry_j_v2",
            code:
              '{"lines":[{"id":"wgp4g8","block":{"id":"lppdum","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}',
            preview: {
              name: "retry_j",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 635.3707052441231,
              top: 481.5584415584416,
              scaleX: 1,
              scaleY: 1,
              width: 300,
              height: 127,
              opacity: 1
            }
          }
        },
        spriteIds: ["adventure_m", "gameover_o", "retry_j"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/02aa1d88fee0484ffddf0b2822c26e55.jpg"
      }
    },
    sceneIds: ["scene2", "scene1"],
    soundIds: [],
    timeStamp: 1599181009586,
    editorMode: "block"
  },
  interaction: {
    selected: {
      objects: {
        scene1: {
          name: "effect_beam_e",
          type: "sprite"
        },
        scene2: {
          name: "retry_j",
          type: "sprite"
        }
      },
      api: "ID_PHYSICS",
      method: null,
      scene: "scene2"
    },
    jukebox: {
      isPlaying: false
    }
  },
  preview: {
    isPlaying: false,
    isFullScreen: false,
    screenMode: "HORIZONTAL",
    volume: 100
  },
  block: {
    customStrings: [],
    popupConstantOpen: false,
    templateCode: null
  }
};
