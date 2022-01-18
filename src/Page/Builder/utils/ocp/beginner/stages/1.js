import {
  VideoClassStageType as StageType,
  VideoClassConditionType as ConditionType,
  VideoClassEgoType as EgoType,
  VCTYPE
} from "../../../../../../Common/Util/Constant";

import { OCP_IMAGES } from "../../../../../../Common/Util/Constant";

import endImg from "../../images/end.png";

export const data = {
  title: "초급 1. 열리지 않는 문",
  state: null,
  level: 1,
  image: OCP_IMAGES.beginner.level1.cover,
  currentStageNum: 0,
  stages: [
    // ...OCP_IMAGES.beginner.level1.tutorials.map(tutorialImg => {
    //   return {
    //     type: StageType.IMAGE,
    //     ego: [
    //       {
    //         type: EgoType.TEXT,
    //         data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
    //       }
    //     ],
    //     imgSrc: tutorialImg
    //   };
    // }),
    {
      type: StageType.IMAGE,
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ],
      imgSrc: OCP_IMAGES.beginner.level1.story
    },
    {
      type: StageType.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level1.mission1,
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
          spriteId: "door_e",
          code: [
            {
              type: "function",
              name: "onClick",
              children: [
                {
                  type: "function",
                  name: "shake",
                  children: []
                }
              ]
            }
          ]
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "onClick",
            sceneId: "scene1",
            spriteId: "door_e"
          }
        }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "코드를 작성해서\n열리지 않는 문을 만들어보자!"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.beginner.level1.hint1
        }
      ],
      answer: [
        { type: EgoType.IMAGE, data: OCP_IMAGES.beginner.level1.answer1 }
      ],
      imgSrc: OCP_IMAGES.beginner.level1.description1
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
            code: "// 여기부터 코드를 작성해보세요.\n",
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
          }
        },
        spriteIds: ["room_b", "door_e"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/a211b7706fa5a37f1840d003517f6aec.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: [],
    timeStamp: 1583415968269
  },
  interaction: {
    selected: {
      objects: { scene1: { name: "door_e", type: "sprite" } },
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
