import {
  VideoClassStageType as StageType,
  VideoClassConditionType as ConditionType,
  VideoClassEgoType as EgoType
} from "../../../../Common/Util/Constant";

// import storyImg from "./Image/4/story.png";
// import endImg from "./Image/end.png";

// import mission1Img from "./Image/4/mission1.png";
// import mission2Img from "./Image/4/mission2.png";
// import mission3Img from "./Image/4/mission3.png";
// import mission4Img from "./Image/4/mission4.png";
// import code1Img from "./Image/4/code1.png";
// import code2Img from "./Image/4/code2.png";
// import code3Img from "./Image/4/code3.png";
// import code4Img from "./Image/4/code4.png";
// import answer1Img from "./Image/4/answer1.png";
// import answer2Img from "./Image/4/answer2.png";
// import answer3Img from "./Image/4/answer3.png";
// import answer4Img from "./Image/4/answer4.png";

// import spriteSelect2Img from "./Image/4/spriteSelect2.png";
// import spriteSelect4Img from "./Image/4/spriteSelect4.png";

export const data = {
  title: "숨겨진 열쇠는 어디에?",
  // state: null,
  level: 4,
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
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/story.png"
    },
    {
      type: StageType.IMAGE,
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/mission1.png",
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
          spriteId: "key_d",
          code: [
            {
              type: "function",
              name: "hide",
              children: []
            }
          ]
        },
        { type: ConditionType.PLAY_ONCE }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "게임 실행시 열쇠가 보이지 않게 만들자!"
        }
      ],
      hint: [
        {
          type: EgoType.TEXT,
          data: "hide 명령어를 입력해봐!"
        }
      ],
      answer: [
        {
          type: EgoType.IMAGE,
          data:
            "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/answer1Img"
        }
      ],
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/code1.png"
    },
    {
      type: StageType.IMAGE,
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/mission2.png",
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: StageType.CODE,
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/spriteSelect2.png",
      conditions: [
        {
          type: ConditionType.SPRITE_SELECTED,
          sceneId: "scene1",
          spriteId: "frame_wood"
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
      type: StageType.CODE,
      conditions: [
        {
          type: ConditionType.CODE_EXIST,
          permanent: true,
          sceneId: "scene1",
          spriteId: "frame_wood",
          code: [
            {
              type: "function",
              name: "onClick",
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
          data: "코드를 작성해서\n액자를 클릭했을 때 그림이 사라지도록 해보자!"
        }
      ],
      hint: [
        {
          type: EgoType.TEXT,
          data:
            'onClick 명령어를 입력하고\n그 안에 playAnimation을 입력하고\n"name" 부분에 "out"을 넣어봐!'
        }
      ],
      answer: [
        {
          type: EgoType.IMAGE,
          data:
            "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/answer2.png"
        }
      ],
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/code2.png"
    },
    {
      type: StageType.IMAGE,
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/mission3.png",
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
          spriteId: "frame_wood",
          code: [
            {
              type: "function",
              name: "sendSignal",
              children: []
            }
          ]
        }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "sendSignal 명령어를 활용해서\n열쇠 스프라이트에 신호를 보내봐!"
        }
      ],
      hint: [
        {
          type: EgoType.TEXT,
          data: 'playAnimation 아래에\nsendSignal("key")을 입력해봐!'
        }
      ],
      answer: [
        {
          type: EgoType.IMAGE,
          data:
            "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/answer3.png"
        }
      ],
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/code3.png"
    },
    {
      type: StageType.IMAGE,
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/mission4.png",
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: StageType.CODE,
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/spriteSelect4.png",
      conditions: [
        {
          type: ConditionType.SPRITE_SELECTED,
          sceneId: "scene1",
          spriteId: "key_d"
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
      type: StageType.CODE,
      conditions: [
        {
          type: ConditionType.CODE_EXIST,
          permanent: true,
          sceneId: "scene1",
          spriteId: "key_d",
          code: [
            {
              type: "function",
              name: "onSignal",
              children: [
                {
                  type: "function",
                  name: "show",
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
          data:
            "코드를 작성해서\n액자로부터 신호를 받았을 때 열쇠가 나타나도록 해보자!"
        }
      ],
      hint: [
        {
          type: EgoType.TEXT,
          data: "onSignal 명령어를 입력하고\n그 안에 show() 명령어를 넣어봐!"
        }
      ],
      answer: [
        {
          type: EgoType.IMAGE,
          data:
            "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/answer4.png"
        }
      ],
      imgSrc:
        "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/tutorial/4/code4.png"
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
            code: "onClick(function(){\n    shake()\n})",
            locked: true,
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
            code: 'onClick(function(){\n    say("아무 것도 없다.",1)\n})',
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
            code: 'onClick(function(){\n    say("상자가 잠겨져있다",1)\n})',
            locked: true,
            preview: {
              name: "safe",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 177.52068096458925,
              top: 593.6748232931841,
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
            code: "// 여기부터 코드를 작성해보세요.\n",
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
            code: "// 여기부터 코드를 작성해보세요.\n",
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
          "key_d"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/cdc548d6141b3de31c3f34d95c970c8b.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: [],
    timeStamp: 1583459004652
  },
  interaction: {
    selected: {
      objects: { scene1: { name: "key_d", type: "sprite" } },
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
