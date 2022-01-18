import { VCTYPE } from "../../../../../../../Common/Util/Constant";

export const data = {
  level: 4,
  title: "초급 4단계. 몬스터의 속도를 설정하자",
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
          spriteId: "monster_ad",
          oobcLine: {
            lineNum: 0,
            depth: 0,
            blocks: [
              {
                blockType: "sprite",
                data: "monster_ad"
              },
              {
                blockType: "action",
                data: "playAnimation"
              },
              {
                blockType: "constant",
                data: "attack"
              }
            ]
          }
        },
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "monster_ad",
          oobcLine: {
            lineNum: 0,
            depth: 0,
            blocks: [
              {
                blockType: "sprite",
                data: "monster_ad"
              },
              {
                blockType: "property",
                data: "velocityY"
              },
              {
                blockType: "action",
                data: "set"
              },
              {
                blockType: "constant",
                data: 300
              }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "몬스터의 속도를 설정하자"
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
            locked: true,
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
            locked: true,
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
          monster_ad: {
            type: "sprite",
            assetId: "monster_ad",
            code:
              '{"lines":[{"id":"78a9ko","block":{"id":"d0phce","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}',
            preview: {
              name: "monster_ad",
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
            locked: true,
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
          }
        },
        spriteIds: ["adventure_m", "luna_a", "joystick_b_black", "monster_ad"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/3cf191289d4d6054a33d746d057649b4.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: [],
    timeStamp: 1599100017314,
    editorMode: "block"
  },
  interaction: {
    selected: {
      objects: { scene1: { name: "monster_ad", type: "sprite" } },
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
