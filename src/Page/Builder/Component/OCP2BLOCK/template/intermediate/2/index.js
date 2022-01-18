import { VCTYPE } from "../../../../../../../Common/Util/Constant";

export const data = {
  level: 2,
  title: "초급 2단계. 자연스럽게 움직이는 주인공을 만들자",
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
          spriteId: "luna_a",
          oobcLine: {
            blocks: [
              {
                blockType: "sprite",
                data: "luna_a"
              },
              {
                blockType: "action",
                data: "playAnimation"
              },
              {
                blockType: "constant",
                data: "side_fly"
              }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "애니메이션으로\n주인공 캐릭터를 움직여보자!"
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
            code: "",
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
          },
          luna_a: {
            type: "sprite",
            assetId: "luna_a_v5",
            code:
              '{"lines":[{"id":"eml19z","block":{"id":"bgb4w5","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}',
            preview: {
              name: "luna_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 640,
              top: 360,
              scaleX: 1,
              scaleY: 1,
              width: 290,
              height: 289,
              opacity: 1,
              scale: "0100"
            }
          },
          joystick_b_black: {
            type: "component",
            assetId: "joystick_b_black",
            code:
              '{"lines":[{"id":"dst02l","block":{"id":"owrmcy","mode":"instance","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"grammar":"subject","blockTypes":["sprite","variable","function","util"],"blockType":"sprite","dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]},"dataType":"joystick","data":"joystick_b_black","childs":[{"id":"eupvfu","mode":"instance","grammars":{"property":"subject","util":"subject","action":"verb"},"grammar":"verb","blockTypes":["property","action","util"],"blockType":"action","parentDataTypes":["joystick"],"dataTypes":{"property":["number","string","boolean"],"action":["joystick"],"util":["sprite"]},"dataType":"joystick","data":"bind","childs":[{"id":"ckm92a","mode":"instance","grammars":{"sprite":"objective"},"grammar":"objective","blockTypes":["sprite"],"blockType":"sprite","dataTypes":{"sprite":["sprite"]},"dataType":"sprite","data":"luna_a","childs":[]},{"id":"k7voxl","mode":"instance","grammars":{"constant":"objective","operator":"objective"},"grammar":"objective","blockTypes":["constant","operator"],"blockType":"constant","dataTypes":{"constant":["number"],"operator":["number"]},"dataType":"number","data":300,"childs":[]}]}]},"folded":false},{"id":"58zdub","block":{"id":"euumlc","mode":"empty","grammars":{"sprite":"subject","variable":"subject","function":"subject","util":"subject"},"blockTypes":["sprite","variable","function","util"],"dataTypes":{"sprite":["sprite","screen","joystick","text","sound"],"variable":["sprite","function"],"function":["function"],"util":["util","mobile"]}},"folded":false}]}',
            locked: true,
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
        spriteIds: ["adventure_m", "luna_a", "joystick_b_black"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/faf744d36b3083094c301befe7ffd8e9.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: [],
    timeStamp: 1599099489725,
    editorMode: "block"
  },
  interaction: {
    selected: {
      objects: { scene1: { name: "luna_a", type: "sprite" } },
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
