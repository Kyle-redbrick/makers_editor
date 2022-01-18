import { VCTYPE } from "../../../../../../Common/Util/Constant";
import { OCP_IMAGES } from "../../../../../../Common/Util/Constant";
import endImg from "../../images/end.png";

export const data = {
  title: "중급 2. 수납장에는 무엇이 들어있을까?",
  image: OCP_IMAGES.intermediate.level2.cover,
  state: null,
  level: 2,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ],
      imgSrc: OCP_IMAGES.intermediate.level2.story
    },
    // mission 1
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.intermediate.level2.mission1,
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
          spriteId: "cabinet_d",
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
                                name: "playAnimation"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "open"
                                },
                                {
                                  type: "Literal",
                                  isLoose: true
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
            api: "onClick",
            sceneId: "scene1",
            spriteId: "cabinet_d"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data:
            "실행 버튼을 누르고 수납장을 클릭하면 서랍이 열리는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.intermediate.level2.hint1
        }
      ],
      answer: [
        { type: VCTYPE.EGO.IMAGE, data: OCP_IMAGES.intermediate.level2.answer1 }
      ],
      imgSrc: OCP_IMAGES.intermediate.level2.description1
    },
    // mission 2
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.intermediate.level2.mission2,
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
          spriteId: "cabinet_d",
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
                                name: "playAnimation"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "open"
                                },
                                {
                                  type: "Literal",
                                  isLoose: true
                                }
                              ]
                            }
                          },
                          {
                            type: "ExpressionStatement",
                            expression: {
                              type: "CallExpression",
                              callee: {
                                type: "Identifier",
                                name: "sendSignal"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "showHint1"
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
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "모두 입력했다면 > 버튼을 눌러 다음 미션으로 넘어가세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.intermediate.level2.hint2
        }
      ],
      answer: [
        { type: VCTYPE.EGO.IMAGE, data: OCP_IMAGES.intermediate.level2.answer2 }
      ],
      imgSrc: OCP_IMAGES.intermediate.level2.description2
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
            code: "// 여기부터 코드를 작성해보세요.\n",
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
            code: "// 여기부터 코드를 작성해보세요.\n",
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
          }
        },
        spriteIds: ["room_c", "frame_b", "frame_c", "fireplace_a", "cabinet_d"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/2f2b1f60706c9b1a853fed939cfba9d6.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: [],
    timeStamp: 1583415968269
  },

  interaction: {
    selected: {
      objects: { scene1: { name: "cabinet_d", type: "sprite" } },
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
