import { VCTYPE } from "../../../../../../../Common/Util/Constant";
import { OCP_IMAGES } from "../../../../../../../Common/Util/Constant";
import endImg from "../images/end.png";

export const data = {
  title: "중급 4. 책상에서 단서 찾기",
  image: OCP_IMAGES.intermediate.level4.cover,
  state: null,
  level: 4,
  currentStageNum: 0,
  stages: [
    // start
    {
      type: VCTYPE.STEP.IMAGE,
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ],
      imgSrc: OCP_IMAGES.intermediate.level4.story
    },
    // mission 1
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.intermediate.level4.mission1,
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "desk_a",
          code: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "onClick"
                  },
                  arguments: [
                    {
                      type: "FunctionExpression",
                      params: [],
                      body: {
                        type: "BlockStatement",
                        body: [
                          {
                            type: "ExpressionStatement",
                            expression: {
                              type: "CallExpression",
                              callee: {
                                type: "Identifier",
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene2"
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            sourceType: "module"
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "changeScene",
            spriteId: "desk_a",
            sceneId: "scene1",
            name: "scene2"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data:
            "실행 버튼을 누르고 책상을 클릭하면 책상 위를 보여주는 장면으로 바뀌는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.intermediate.level4.hint1
        }
      ],
      answer: [
        { type: VCTYPE.EGO.IMAGE, data: OCP_IMAGES.intermediate.level4.answer1 }
      ],
      imgSrc: OCP_IMAGES.intermediate.level4.description1
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.intermediate.level4.select1,
      conditions: [
        {
          type: VCTYPE.CONDITION.SCENE_SELECTED,
          sceneId: "scene2",
          spriteId: "frame_arrow_n"
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "코드를 작성하기 전에\n먼저 스프라이트를 선택하자!"
        }
      ]
    },
    // mission 2
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.intermediate.level4.mission2,
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "arrow_n",
          code: {
            type: "Program",
            start: 0,
            end: 48,
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "onClick"
                  },
                  arguments: [
                    {
                      type: "FunctionExpression",
                      params: [],
                      body: {
                        type: "BlockStatement",
                        body: [
                          {
                            type: "ExpressionStatement",
                            expression: {
                              type: "CallExpression",
                              callee: {
                                type: "Identifier",
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene1"
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            sourceType: "module"
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "changeScene",
            sceneId: "scene2",
            spriteId: "arrow_n",
            name: "scene1"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data:
            "실행 버튼을 누르고 책상 아래쪽의 화살표를 클릭하면 금고가 있는 장면으로 바뀌는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.intermediate.level4.hint2
        }
      ],
      answer: [
        { type: VCTYPE.EGO.IMAGE, data: OCP_IMAGES.intermediate.level4.answer2 }
      ],
      imgSrc: OCP_IMAGES.intermediate.level4.description2
    },

    // end
    {
      type: VCTYPE.STEP.IMAGE,
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
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
          room_c: {
            type: "background",
            assetId: "room_c_v2",
            locked: true,
            code:  "",
            preview: {
              name: "room_c",
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
          frame_b: {
            type: "sprite",
            assetId: "frame_b",
            locked: true,
            code: 'onClick(function(){\n    say("멋진 그림이다",1)\n})',
            preview: {
              name: "frame_b",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 198.11469926412457,
              top: 179.46008708272856,
              scaleX: 1,
              scaleY: 1,
              width: 112,
              height: 175,
              opacity: 1
            }
          },
          frame_c: {
            type: "sprite",
            assetId: "frame_c_v2",
            locked: true,
            code:
              'onClick(function(){\n    say("이 그림대로 수를 입력해보자",1)\n})',
            preview: {
              name: "frame_c",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 842.7173518171381,
              top: 211.788396496401,
              scaleX: 1,
              scaleY: 1,
              width: 110,
              height: 171,
              opacity: 1
            }
          },
          fireplace_a: {
            type: "sprite",
            assetId: "fireplace_a_v4",
            locked: true,
            code: 'onClick(function(){\n    playAnimation("on",true)\n})',
            preview: {
              name: "fireplace_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 211.6666666666666,
              top: 448.64111498257836,
              scaleX: 1,
              scaleY: 1,
              width: 237,
              height: 339,
              opacity: 1
            }
          },
          cabinet_d: {
            type: "sprite",
            assetId: "cabinet_d",
            locked: true,
            code:
              'onClick(function(){\n    playAnimation("open",true) \n    wait(0.3)\n    sendSignal("showHint")\n})',
            preview: {
              name: "cabinet_d",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1061.73326035395,
              top: 488.3018867924529,
              scaleX: 1,
              scaleY: 1,
              width: 240,
              height: 256,
              opacity: 1
            }
          },
          hint_card_a: {
            type: "sprite",
            assetId: "hint_card_a",
            locked: true,
            code:
              'hide()\nonSignal("showHint1",function(){\n    show()\n})\n\nonClick(function(){\n    hide()\n})\n',
            preview: {
              name: "hint_card_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 641.0865819294938,
              top: 364.6153846153845,
              scaleX: 1,
              scaleY: 1,
              width: 579,
              height: 562,
              opacity: 0
            }
          },
          desk_a: {
            type: "sprite",
            assetId: "desk_a_v3",
            code:  "",
            preview: {
              name: "desk_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 640,
              top: 727,
              scaleX: 1,
              scaleY: 1,
              width: 492,
              height: 352,
              opacity: 1
            }
          }
        },
        spriteIds: [
          "room_c",
          "frame_b",
          "frame_c",
          "fireplace_a",
          "cabinet_d",
          "hint_card_a",
          "desk_a"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/2f2b1f60706c9b1a853fed939cfba9d6.jpg"
      },
      scene2: {
        sceneName: "scene2",
        sprites: {
          room_desk: {
            type: "background",
            assetId: "room_desk_v2",
            code: "",
            preview: {
              name: "room_desk",
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
          arrow_n: {
            type: "sprite",
            assetId: "arrow_n",
            code:  "",
            preview: {
              name: "arrow_n",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 640,
              top: 650,
              scaleX: 1,
              scaleY: 1,
              width: 80,
              height: 86,
              opacity: 1
            }
          }
        },
        spriteIds: ["room_desk", "arrow_n"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/3c5983c500929a06d6e8a65899163b51.jpg",
        isHiddenLockSprites: false
      }
    },
    sceneIds: ["scene1", "scene2"],
    soundIds: [],
    timeStamp: 1583415968269
  },

  interaction: {
    selected: {
      objects: {
        scene1: { name: "desk_a", type: "sprite" },
        scene2: {
          name: "arrow_n",
          type: "sprite"
        }
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
