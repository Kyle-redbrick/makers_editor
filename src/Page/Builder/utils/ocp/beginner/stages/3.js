import {
  VideoClassStageType as StageType,
  VideoClassConditionType as ConditionType,
  VideoClassEgoType as EgoType,
  VCTYPE
} from "../../../../../../Common/Util/Constant";

import { OCP_IMAGES } from "../../../../../../Common/Util/Constant";
import endImg from "../../images/end.png";

export const data = {
  title: "초급 3. 반응이 없는 가구들",
  state: null,
  image: OCP_IMAGES.beginner.level3.cover,
  level: 3,
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
      imgSrc: OCP_IMAGES.beginner.level3.story
    },
    {
      type: StageType.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level3.mission1,
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: StageType.CODE,
      conditions: [
        {
          type: ConditionType.CODE_EXIST,
          permanent: true,
          sceneId: "scene1",
          spriteId: "suitcase",
          code: [
            {
              type: "function",
              name: "onClick",
              children: [
                {
                  type: "function",
                  name: "say",
                  children: []
                }
              ]
            }
          ]
        },
        { type: ConditionType.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "onClick",
            sceneId: "scene1",
            spriteId: "suitcase"
          }
        }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "코드를 작성해서\n서류가방을 클릭했을 때 메세지를 띄우자!"
        }
      ],
      hint: [
        {
          type: EgoType.IMAGE,
          data: OCP_IMAGES.beginner.level3.hint1
        }
      ],
      answer: [
        { type: EgoType.IMAGE, data: OCP_IMAGES.beginner.level3.answer1 }
      ],
      imgSrc: OCP_IMAGES.beginner.level3.description1
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level3.select1,
      conditions: [
        {
          type: VCTYPE.CONDITION.SPRITE_SELECTED,
          sceneId: "scene1",
          spriteId: "light_i"
        }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "코드를 작성하기 전에\n먼저 스프라이트를 선택하자!"
        }
      ]
    },
    {
      type: StageType.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level3.mission2,
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: StageType.CODE,
      conditions: [
        {
          type: ConditionType.CODE_EXIST,
          permanent: true,
          sceneId: "scene1",
          spriteId: "light_i",
          code: [
            {
              type: "function",
              name: "onClick",
              children: [
                {
                  type: "function",
                  name: "say",
                  children: []
                },
                {
                  type: "function",
                  name: "playAnimation",
                  children: []
                }
              ]
            }
          ]
        },
        { type: ConditionType.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "playAnimation",
            sceneId: "scene1",
            spriteId: "light_i",
            name: "on"
          }
        }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data:
            "코드를 작성해서\n조명을 클릭했을 때 메세지를 띄우고\n불도 켜지게 하자!"
        }
      ],
      hint: [
        {
          type: EgoType.IMAGE,
          data: OCP_IMAGES.beginner.level3.hint2
        }
      ],
      answer: [
        { type: EgoType.IMAGE, data: OCP_IMAGES.beginner.level3.answer2 }
      ],
      imgSrc: OCP_IMAGES.beginner.level3.description2
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
            code: "",
            locked: true,
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
            code: "onClick(function(){\n    shake()\n})",
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
            code: 'onClick(function(){\n    say("아무 것도 없다.",1)\n})',
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
            code: "// 여기부터 코드를 작성해보세요.\n",
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
            code: "// 여기부터 코드를 작성해보세요.\n",
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
          }
        },
        spriteIds: [
          "room_b",
          "door_e",
          "desk",
          "clock_a",
          "light_i",
          "suitcase"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/a211b7706fa5a37f1840d003517f6aec.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: [],
    timeStamp: 1583416056266
  },
  interaction: {
    selected: {
      objects: { scene1: { name: "suitcase", type: "sprite" } },
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
