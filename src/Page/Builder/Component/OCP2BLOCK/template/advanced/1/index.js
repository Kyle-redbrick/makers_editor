import { VCTYPE } from "../../../../../../../Common/Util/Constant";

export const data = {
  level: 1,
  title: "고급 1단계. 조이스틱으로 주인공을 움직여보자!",
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
      imgSrc: require("./mission1_start.png"),
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
      imgSrc: require("./mission1.png"),
      successDelay: 1500,
      conditions: [
        {
          type: VCTYPE.CONDITION.OOBC_LINE_EXIST,
          spriteId: "joystick_b_black",
          oobcLine: {
            blocks: [
              {
                blockType: "sprite",
                data: "joystick_b_black"
              },
              {
                blockType: "action",
                data: "bind"
              },
              {
                blockType: "sprite",
                data: "luna_a"
              },
              {
                blockType: "constant",
                data: 300
              }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "setVelocityFromDegree"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "조이스틱을 코딩해서\n주인공 캐릭터를 움직여보자!"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./mission1_hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./mission1_answer.png")
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
          luna_a: {
            type: "sprite",
            assetId: "luna_a_v5",
            code: null,
            locked: true,
            preview: {
              name: "luna_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 953.2301100234538,
              top: 268.6581618669688,
              scaleX: 0.7502958861344436,
              scaleY: 0.7502958861344436,
              width: 290,
              height: 289,
              opacity: 1
            }
          },
          joystick_b_black: {
            type: "component",
            assetId: "joystick_b_black",
            code: null,
            preview: {
              name: "joystick_b_black",
              type: "component",
              subtype: "analog",
              angle: 0,
              left: 1115.668011374909,
              top: 582.6636568848759,
              scaleX: 1,
              scaleY: 1,
              width: 250,
              height: 250,
              opacity: 1
            }
          },
          adventure_m: {
            type: "background",
            assetId: "adventure_m_v5",
            code: null,
            locked: true,
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
          }
        },
        spriteIds: ["adventure_m", "luna_a", "joystick_b_black"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/eb5c3857e03630f4545318a2eb8ed70a.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: [],
    timeStamp: 1599028978705,
    editorMode: "block"
  },
  interaction: {
    selected: {
      objects: {
        scene1: { name: "joystick_b_black", type: "component" }
      },
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
  },
  block: { customStrings: [], popupConstantOpen: false, templateCode: null }
};
