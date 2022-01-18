import { VCTYPE } from "../../../../../../Common/Util/Constant";
import { OCP_IMAGES } from "../../../../../../Common/Util/Constant";
import endImg from "../../images/end.png";

export const data = {
  title: "중급 5. 알쏭달쏭한 수첩의 내용",
  image: OCP_IMAGES.intermediate.level5.cover,
  state: null,
  level: 5,
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
      imgSrc: OCP_IMAGES.intermediate.level5.story
    },
    // mission 1
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.intermediate.level5.mission1,
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
          spriteId: "compass_a",
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
                                  value: "idle"
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
                                name: "say"
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
            api: "playAnimation",
            sceneId: "scene2",
            spriteId: "compass_a",
            name: "idle"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data:
            "실행 버튼을 누르고 나침반을 클릭하면 바늘이 움직이는지 확인해 보세요. "
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.intermediate.level5.hint1
        }
      ],
      answer: [
        { type: VCTYPE.EGO.IMAGE, data: OCP_IMAGES.intermediate.level5.answer1 }
      ],
      imgSrc: OCP_IMAGES.intermediate.level5.description1
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.intermediate.level5.select1,
      conditions: [
        {
          type: VCTYPE.CONDITION.SPRITE_SELECTED,
          sceneId: "scene2",
          spriteId: "candle_a"
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
      imgSrc: OCP_IMAGES.intermediate.level5.mission2,
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
          spriteId: "candle_a",
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
                                  value: "on"
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
                                name: "say"
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
            api: "playAnimation",
            sceneId: "scene2",
            spriteId: "candle_a",
            name: "on"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "실행 버튼을 누르고 촛대를 클릭하면 불이 켜지는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.intermediate.level5.hint2
        }
      ],
      answer: [
        { type: VCTYPE.EGO.IMAGE, data: OCP_IMAGES.intermediate.level5.answer2 }
      ],
      imgSrc: OCP_IMAGES.intermediate.level5.description2
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.intermediate.level5.select2,
      conditions: [
        {
          type: VCTYPE.CONDITION.SPRITE_SELECTED,
          sceneId: "scene2",
          spriteId: "note_d"
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "코드를 작성하기 전에\n먼저 스프라이트를 선택하자!"
        }
      ]
    },
    // mission 3
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.intermediate.level5.mission3,
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
          spriteId: "note_d",
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
                                name: "say"
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
            api: "playAnimation",
            sceneId: "scene2",
            spriteId: "note_d",
            name: "open"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data:
            "실행 버튼을 누르고 수첩을 클릭하면 펼쳐진 수첩에서 말풍선이 뜨는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.intermediate.level5.hint3
        }
      ],
      answer: [
        { type: VCTYPE.EGO.IMAGE, data: OCP_IMAGES.intermediate.level5.answer3 }
      ],
      imgSrc: OCP_IMAGES.intermediate.level5.description3
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
            code: 'onClick(function(){\n    changeScene("scene2")\n})',
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
            locked: true,
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
            locked: true,
            code: 'onClick(function(){\n    changeScene("scene1")\n})',
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
          },
          note_d: {
            type: "sprite",
            assetId: "note_d",
            code: "// 여기부터 코드를 작성해보세요.\n",
            preview: {
              name: "note_d",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 58.3333333333333,
              top: 166.67893356301138,
              scaleX: 1,
              scaleY: 1,
              width: 693,
              height: 413,
              opacity: 1,
              scale: "100"
            }
          },
          candle_a: {
            type: "sprite",
            assetId: "candle_a",
            code: "// 여기부터 코드를 작성해보세요.\n",
            preview: {
              name: "candle_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1134.666666666667,
              top: 485.9335238617234,
              scaleX: 1,
              scaleY: 1,
              width: 341,
              height: 411,
              opacity: 1
            }
          },
          compass_a: {
            type: "sprite",
            assetId: "compass_a",
            code: "// 여기부터 코드를 작성해보세요.\n",
            preview: {
              name: "compass_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 231.16666666666669,
              top: 559.0055984026935,
              scaleX: 1,
              scaleY: 1,
              width: 307,
              height: 227,
              opacity: 1
            }
          }
        },
        spriteIds: ["room_desk", "arrow_n", "note_d", "candle_a", "compass_a"],
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
          name: "compass_a",
          type: "sprite"
        }
      },
      api: "ID_MOTION",
      method: null,
      scene: "scene2"
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
