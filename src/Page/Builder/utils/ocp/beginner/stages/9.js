import {
  VideoClassStageType as StageType,
  // VideoClassConditionType as ConditionType,
  VideoClassEgoType as EgoType,
  VCTYPE
} from "../../../../../../Common/Util/Constant";
import { OCP_IMAGES } from "../../../../../../Common/Util/Constant";
import endImg from "../../images/end.png";

export const data = {
  title: "초급 9. 배경 음악 재생하기",
  state: null,
  image: OCP_IMAGES.beginner.level9.cover,
  level: 9,
  currentStageNum: 0,
  stages: [
    {
      type: StageType.START,
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ],
      imgSrc: OCP_IMAGES.beginner.level9.story
    },
    {
      type: StageType.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level9.mission1,
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: StageType.IMAGE,
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ],
      imgSrc: OCP_IMAGES.beginner.level9.tutorial
    },
    {
      type: VCTYPE.STEP.CODE,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "room_b",
          code: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "playSound"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      isLoose: true
                    },
                    {
                      type: "Literal",
                      isLoose: true
                    }
                  ]
                }
              }
            ],
            sourceType: "module"
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "스프라이트 박스에서 배경음을 가져와서 코드에 적용해보자!"
        }
      ],
      hint: [
        {
          type: EgoType.IMAGE,
          data: OCP_IMAGES.beginner.level9.hint1
        }
      ],
      answer: [
        { type: EgoType.IMAGE, data: OCP_IMAGES.beginner.level9.answer1 }
      ],
      imgSrc: OCP_IMAGES.beginner.level9.description1
    },
    {
      type: StageType.END,
      ego: [
        {
          type: EgoType.TEXT,
          data: "수업을 모두 마쳤어!\n대단한걸?\n다음 수업에서 또 보자!"
        }
      ],
      imgSrc: endImg
    }
  ]
};

export const state = {
  scene: {
    scenes: {
      scene1: {
        sceneName: "scene1",
        sprites: {
          room_b: {
            type: "background",
            assetId: "room_b",
            code: "// 여기부터 코드를 작성해보세요.\n",
            preview: {
              name: "room_b",
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
          door_e: {
            type: "sprite",
            assetId: "door_e_v2",
            code:
              'onClick(function(){\n    shake()\n})\nonOverlapOnce("key_c",function(){\n    playAnimation("open",true)\n    wait(2)\n    changeScene("scene2")})\n',
            locked: true,
            preview: {
              name: "door_e",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1180.115606936416,
              top: 355.0430292598967,
              scaleX: 1,
              scaleY: 1,
              width: 163,
              height: 644,
              opacity: 1
            }
          },
          desk: {
            type: "sprite",
            assetId: "desk",
            code: 'onClick(function(){\n    say("아무 것도 없다.",1)\n})\n',
            locked: true,
            preview: {
              name: "desk",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 636.300578034682,
              top: 410.80895008605853,
              scaleX: 1,
              scaleY: 1,
              width: 616,
              height: 275,
              opacity: 1
            }
          },
          clock_a: {
            type: "sprite",
            assetId: "clock_a",
            code:
              'playAnimation("idle",true)\nonClick(function(){\n    say("딱히 특별한 것이 없다.",1)\n})',
            locked: true,
            preview: {
              name: "clock_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 423.5193979276554,
              top: 164.6195078191965,
              scaleX: 0.7273521388124453,
              scaleY: 0.7273521388124453,
              width: 204,
              height: 206,
              opacity: 1
            }
          },
          suitcase: {
            type: "sprite",
            assetId: "suitcase",
            locked: true,
            code:
              'onClick(function(){\n    say("상자가 잠겨져있다",1)\n})\nonSignal("open",function(){\n    playAnimation("open",true)})\n',
            preview: {
              name: "suitcase",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 357.61078998073225,
              top: 611.566265060241,
              scaleX: 1,
              scaleY: 1,
              width: 286,
              height: 257,
              opacity: 1
            }
          },
          light_i: {
            type: "sprite",
            assetId: "light_i",
            code:
              'onClick(function(){\n    playAnimation("on",true)\n    say("불이 켜졌다",1)\n})',
            locked: true,
            preview: {
              name: "light_i",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 997.6107899807322,
              top: 337.6936316695353,
              scaleX: 1,
              scaleY: 1,
              width: 270,
              height: 374,
              opacity: 1
            }
          },
          frame_a: {
            type: "sprite",
            assetId: "frame_a",
            code:
              'onClick(function(){\n    playAnimation("hide",true)\n    sendSignal("key")\n})',
            locked: true,
            preview: {
              name: "frame_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 129.47976878612718,
              top: 195.18072289156626,
              scaleX: 1,
              scaleY: 1,
              width: 152,
              height: 297,
              opacity: 1
            }
          },
          key_d: {
            type: "sprite",
            assetId: "key_d_v5",
            locked: true,
            code:
              'hide()\nonSignal("key",function(){\n    show()\n    setDraggable(true)\n})\nonOverlap("door_e",function(){\n    say("열리지 않는다",1)\n})\nonOverlap("suitcase",function(){\n    kill()\n    sendSignal("open")})\n',
            preview: {
              name: "key_d",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 141.33333333333331,
              top: 200.8988764044944,
              scaleX: 0.2,
              scaleY: 0.2,
              width: 160,
              height: 377,
              opacity: 1,
              scale: "20"
            }
          },
          key_c: {
            type: "sprite",
            assetId: "key_c_v5",
            locked: true,
            code:
              'hide()\nonSignal("open",function(){\n    show()\n    moveX(200)\n    setDraggable(true)\n})',
            preview: {
              name: "key_c",
              type: "sprite",
              subtype: null,
              angle: 246.9346809072811,
              left: 340.5853434413049,
              top: 608.4083088021893,
              scaleX: 0.2,
              scaleY: 0.2,
              width: 160,
              height: 377,
              opacity: 1,
              scale: "20"
            }
          }
        },
        spriteIds: [
          "room_b",
          "door_e",
          "desk",
          "clock_a",
          "light_i",
          "suitcase",
          "frame_a",
          "key_d",
          "key_c"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/a211b7706fa5a37f1840d003517f6aec.jpg"
      },
      scene2: {
        sceneName: "scene2",
        sprites: {
          hall: {
            type: "background",
            assetId: "hall_v2",
            code: "",
            preview: {
              name: "hall",
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
          },
          custom: {
            type: "custom",
            assetId: "14aa7b4ac6d11cb5af74c6d2f8d10cc4",
            code: "flash()",
            preview: {
              name: "custom",
              type: "custom",
              angle: 0,
              left: 640,
              top: 360,
              scaleX: 1,
              scaleY: 1,
              width: 1678,
              height: 720,
              opacity: 1
            }
          }
        },
        spriteIds: ["hall", "custom"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/2a4ad9196a345445b2c4c5fa0033d99a.jpg"
      }
    },
    sceneIds: ["scene1", "scene2"],
    soundIds: ["fantasy_epic_v2", "balloons_v2"],
    timeStamp: 1583416483517
  },
  interaction: {
    selected: {
      objects: {
        scene1: { name: "room_b", type: "background" },
        scene2: { name: "hall", type: "background" }
      },
      api: "ID_MOTION",
      method: null,
      scene: "scene1"
    },
    jukebox: {
      isPlaying: false,
      path: null,
      type: null,
      id: null,
      listName: null
    }
  },
  preview: {
    isPlaying: false,
    isFullScreen: false,
    screenMode: "HORIZONTAL",
    volume: 100
  }
};
