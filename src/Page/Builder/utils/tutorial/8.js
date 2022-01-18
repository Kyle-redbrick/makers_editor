import {
  VideoClassStageType as StageType,
  VideoClassConditionType as ConditionType,
  VideoClassEgoType as EgoType
} from "../../../../Common/Util/Constant";

// import storyImg from "./Image/8/story.png";
// import endImg from "./Image/end.png";

// import mission1Img from "./Image/8/mission1.png";
// import mission2Img from "./Image/8/mission2.png";
// import code1Img from "./Image/8/code1.png";
// import code2Img from "./Image/8/code2.png";
// import answer1Img from "./Image/8/answer1.png";
// import answer2Img from "./Image/8/answer2.png";

export const data = {
  title: "드디어 열린 문",
  // state: null,
  level: 8,
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
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/8/story.png"
    },
    {
      type: StageType.IMAGE,
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/8/mission1.png",
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
          spriteId: "door_wood",
          code: [
            {
              type: "function",
              name: "onOverlap",
              children: [
                {
                  type: "function",
                  name: "playAnimation",
                  children: []
                }
              ]
            }
          ]
        },
        { type: ConditionType.PLAY_ONCE }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "코드를 작성해서 황금열쇠로 문이 열리게 만들자!"
        }
      ],
      hint: [
        {
          type: EgoType.TEXT,
          data:
            "onOverlap 명령어를 입력하고\n아래에 playAnimation 명령어를 입력해봐!"
        }
      ],
      answer: [
        {
          type: EgoType.IMAGE,
          data:
            "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/8/answer1.png"
        }
      ],
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/8/code1.png"
    },
    {
      type: StageType.IMAGE,
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/8/mission2.png",
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
          spriteId: "door_wood",
          code: [
            {
              type: "function",
              name: "wait",
              children: []
            },
            {
              type: "function",
              name: "changeScene",
              children: []
            }
          ]
        },
        { type: ConditionType.PLAY_ONCE }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "코드를 작성해서\n문이 열린 후 화면(scene)이 전환되도록 해보자!"
        }
      ],
      hint: [
        {
          type: EgoType.TEXT,
          data:
            'playAnimation 명령어 아래에\nwait(2)명령어와 changeScene("scene2")를 입력해봐!'
        }
      ],
      answer: [
        {
          type: EgoType.IMAGE,
          data:
            "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/8/answer1.png"
        }
      ],
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/8/code2.png"
    },
    {
      type: StageType.END,
      ego: [
        {
          type: EgoType.TEXT,
          data: "수업을 모두 마쳤어!\n대단한걸?\n다음 수업에서 또 보자!"
        }
      ],
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/end.png"
    }
  ]
};

export const state = {
  scene: {
    scenes: {
      scene1: {
        sceneName: "scene1",
        sprites: {
          room_yellowbrick: {
            type: "background",
            assetId: "room_yellowbrick_v5",
            code: "",
            locked: true,
            preview: {
              name: "room_yellowbrick",
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
          door_wood: {
            type: "sprite",
            assetId: "door_wood_v5",
            code:
              "onClick(function(){\n    shake()\n})\n\n// 여기부터 코드를 작성해보세요.\n",
            preview: {
              name: "door_wood",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1115.4648785468737,
              top: 350.3586916274956,
              scaleX: 1,
              scaleY: 1,
              width: 183,
              height: 703,
              opacity: 1,
              scale: "100"
            }
          },
          sofa_white: {
            type: "sprite",
            assetId: "sofa_white_v5",
            code: 'onClick(function(){\n    say("아무 것도 없다.",1)\n})\n',
            locked: true,
            preview: {
              name: "sofa_white",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 631.1422789972041,
              top: 532.091388400703,
              scaleX: 1,
              scaleY: 1,
              width: 623,
              height: 233,
              opacity: 1
            }
          },
          clock_c: {
            type: "sprite",
            assetId: "clock_c_v3",
            code:
              'playAnimation("idle",true)\nonClick(function(){\n    say("딱히 특별한 것이 없다.",1)\n})',
            locked: true,
            preview: {
              name: "clock_c",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 890.9153245452994,
              top: 202.1268394395926,
              scaleX: 0.5831336099142623,
              scaleY: 0.5831336099142623,
              width: 235,
              height: 235,
              opacity: 1
            }
          },
          safe: {
            type: "sprite",
            assetId: "safe_v5",
            code:
              'onClick(function(){\n    say("상자가 잠겨져있다",1)\n})\n\nonSignal("open",function(){\n    playAnimation("open",true)\n})',
            locked: true,
            preview: {
              name: "safe",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 162.33601638836782,
              top: 592.4094454372965,
              scaleX: 0.6981794014933671,
              scaleY: 0.6981794014933671,
              width: 373,
              height: 341,
              opacity: 1
            }
          },
          light_a: {
            type: "sprite",
            assetId: "light_a_v5",
            code:
              'onClick(function(){\n    playAnimation("on",true)\n    say("불이 켜졌다",1)\n})',
            locked: true,
            preview: {
              name: "light_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 257.05076179238785,
              top: 387.5812735952086,
              scaleX: 0.7849709011632315,
              scaleY: 0.7849709011632315,
              width: 184,
              height: 539,
              opacity: 1
            }
          },
          frame_wood: {
            type: "sprite",
            assetId: "frame_wood_v5",
            code:
              'onClick(function(){\n    playAnimation("out",true)\n    sendSignal("key")\n})',
            locked: true,
            preview: {
              name: "frame_wood",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 544.0268741319944,
              top: 159.4074117577444,
              scaleX: 0.8315478311776191,
              scaleY: 0.8315478311776191,
              width: 208,
              height: 252,
              opacity: 1
            }
          },
          key_d: {
            type: "sprite",
            assetId: "key_d_v5",
            code:
              'hide()\nonSignal("key",function(){\n    show()\n})\n\nsetDraggable(true)\nonOverlap("door_wood",function(){\n    say("열리지 않는다",1)\n})\n\nonOverlap("safe",function(){\n    sendSignal("open")\n    kill()\n})',
            locked: true,
            preview: {
              name: "key_d",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 545.9816457817761,
              top: 164.3507176825173,
              scaleX: 0.29929134027912235,
              scaleY: 0.29929134027912235,
              width: 160,
              height: 377,
              opacity: 1
            }
          },
          key_c: {
            type: "sprite",
            assetId: "key_c_v5",
            code:
              'hide()\nsetDraggable(true)\nonSignal("open",function(){\n    show()\n    moveX(200)\n})',
            locked: true,
            preview: {
              name: "key_c",
              type: "sprite",
              subtype: null,
              angle: 268.87212547942363,
              left: 146.89795281309097,
              top: 657.8195267127543,
              scaleX: 0.21813557389400684,
              scaleY: 0.21813557389400684,
              width: 160,
              height: 377,
              opacity: 1
            }
          }
        },
        spriteIds: [
          "room_yellowbrick",
          "door_wood",
          "sofa_white",
          "clock_c",
          "light_a",
          "safe",
          "frame_wood",
          "key_d",
          "key_c"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/6c09283fd149f05b349ec90b00d448a7.jpg"
      },
      scene2: {
        sceneName: "scene2",
        sprites: {
          log_cabin_b: {
            type: "background",
            assetId: "log_cabin_b",
            code: "",
            locked: true,
            preview: {
              name: "log_cabin_b",
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
          mission_clear_a: {
            type: "sprite",
            assetId: "mission_clear_a_v3",
            code: "",
            locked: true,
            preview: {
              name: "mission_clear_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 899.4046865104497,
              top: 484.00702987697713,
              scaleX: 1,
              scaleY: 1,
              width: 449,
              height: 239,
              opacity: 1
            }
          }
        },
        spriteIds: ["log_cabin_b", "mission_clear_a"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/1e5c0f860355e32d72b5ad81ee58ab5b.jpg"
      }
    },
    sceneIds: ["scene1", "scene2"],
    soundIds: [],
    timeStamp: 1583416320937
  },
  interaction: {
    selected: {
      objects: {
        scene1: { name: "door_wood", type: "sprite" },
        scene2: { name: "log_cabin_b", type: "background" }
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
