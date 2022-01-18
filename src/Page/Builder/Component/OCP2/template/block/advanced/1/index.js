import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 1,
  title: "고급 1단계 <착지와 함께 등장!>",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./1-1 story.png"),
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
      imgSrc: require("./1-1 start.png"),
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
      imgSrc: require("./1-1 main.png"),
      successDelay: 1500,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "boy_d",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "boy_d" },
              { blockType: "action", data: "playAnimation" },
              { blockType: "constant", data: "idle" }
            ]
          }
        },
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "boy_d",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "boy_d" },
              { blockType: "property", data: "gravityY" },
              { blockType: "action", data: "set" },
              { blockType: "constant", data: 2000 }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { api: "setGravityY", value: 2000 }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "타일 위로 떨어지는\n주인공을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./1-1 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./1-1 answer.png")
        }
      ]
    },
    {
      title: "미션2 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./1-2 start.png"),
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
      imgSrc: require("./1-2 main.png"),
      successDelay: 1500,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "plent_c",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "plent_c" },
              { blockType: "action", data: "setCollision" },
              { blockType: "sprite", data: "boy_d" }
            ]
          }
        },
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "plent_c",
          oobcLine: {
            blocks: [
              { blockType: "sprite", data: "plent_c" },
              { blockType: "property", data: "movable" },
              { blockType: "action", data: "set" },
              { blockType: "constant", data: "false" }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { spriteId: "plent_c", api: "setMovable", enable: false }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "주인공과 부딪히는 타일을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./1-2 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./1-2 answer.png")
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
              '{"lines":[{"id":"2envfp","block":{"id":"vgggio","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}',
            preview: {
              name: "boy_d",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 171.80811808118082,
              top: 271.3245033112583,
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
              '{"lines":[{"id":"2afxzl","block":{"id":"bqinf9","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false,"disabled":false}]}',
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
          }
        },
        spriteIds: ["factory_f", "plent_a", "plent_c", "boy_d"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/08b573637222e3c5dbd0c1d7a0a21dbc.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: ["funky_v2", "victory_1"],
    timeStamp: 1602568145222,
    editorMode: "block"
  },
  interaction: {
    selected: {
      objects: { scene1: { name: "boy_d", type: "background" } },
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
