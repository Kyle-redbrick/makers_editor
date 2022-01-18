import { VCTYPE } from "../../../../../../../Common/Util/Constant";
import { OCP_IMAGES } from "../../../../../../../Common/Util/Constant";
import endImg from "../images/end.png";

export const data = {
  title: "중급 7. 두 번째 힌트 카드",
  image: OCP_IMAGES.intermediate.level7.cover,
  state: null,
  level: 7,
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
      imgSrc: OCP_IMAGES.intermediate.level7.story
    },
    // mission 1
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.intermediate.level7.mission1,
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
          spriteId: "hint_card_b",
          code: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "hide"
                  },
                  arguments: []
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
          data:
            "실행 버튼을 누르면 화면에 있던 힌트 카드가 보이지 않는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.intermediate.level7.hint1
        }
      ],
      answer: [
        { type: VCTYPE.EGO.IMAGE, data: OCP_IMAGES.intermediate.level7.answer1 }
      ],
      imgSrc: OCP_IMAGES.intermediate.level7.description1
    },
    // mission 2
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.intermediate.level7.mission2,
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
          spriteId: "hint_card_b",
          code: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "hide"
                  },
                  arguments: []
                }
              },
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "onSignal"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "showHint2"
                    },
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
                                name: "show"
                              },
                              arguments: []
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
            api: "show",
            sceneId: "scene2",
            spriteId: "hint_card_b"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data:
            "실행 버튼을 누르고 수납장을 클릭하면 힌트 카드가 나오는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.intermediate.level7.hint2
        }
      ],
      answer: [
        { type: VCTYPE.EGO.IMAGE, data: OCP_IMAGES.intermediate.level7.answer2 }
      ],
      imgSrc: OCP_IMAGES.intermediate.level7.description2
    },
    // mission 3
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.intermediate.level7.mission3,
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
          spriteId: "hint_card_b",
          code: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "hide"
                  },
                  arguments: []
                }
              },
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "onSignal"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "showHint2"
                    },
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
                                name: "show"
                              },
                              arguments: []
                            }
                          }
                        ]
                      }
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
                                name: "hide"
                              },
                              arguments: []
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
            sceneId: "scene2",
            spriteId: "hint_card_b"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data:
            "실행 버튼을 누르고 힌트 카드를 클릭하면 사라지는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.intermediate.level7.hint3
        }
      ],
      answer: [
        { type: VCTYPE.EGO.IMAGE, data: OCP_IMAGES.intermediate.level7.answer3 }
      ],
      imgSrc: OCP_IMAGES.intermediate.level7.description3
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
              'onClick(function(){\n    playAnimation("open",true) \n    wait(0.3)\n    sendSignal("showHint1")\n})',
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
            locked: true,
            code:
              'onClick(function(){\n    playAnimation("open",true)\n    say("보석함을 5번 두드려라",1)\n})',
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
            locked: true,
            code:
              'onClick(function(){\n    playAnimation("on",true)\n    say("책상 위가 밝아졌다",1)\n})',
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
            locked: true,
            code:
              'onClick(function(){\n    playAnimation("idle",true)\n    say("나침반이 돌아간다",1)\n})',
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
          },
          chest_h: {
            type: "sprite",
            assetId: "chest_h",
            locked: true,
            code:
              'var count = 0\nonClick(function(){\n    count = count + 1\n    say(count,1)\n    if(count>=5){\n        playAnimation("open",true)\n        wait(0.3)\n        sendSignal("showHint2")\n    } else {\n        say("뭔가 들어 있을 것 같다",1)\n    }\n})',
            preview: {
              name: "chest_h",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1050.6666666666667,
              top: 103.82022471910116,
              scaleX: 1,
              scaleY: 1,
              width: 457,
              height: 424,
              opacity: 1
            }
          },
          hint_card_b: {
            type: "sprite",
            assetId: "hint_card_b",
            code:  "",
            preview: {
              name: "hint_card_b",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 640,
              top: 360,
              scaleX: 1,
              scaleY: 1,
              width: 584,
              height: 562,
              opacity: 1
            }
          }
        },
        spriteIds: [
          "room_desk",
          "arrow_n",
          "note_d",
          "candle_a",
          "compass_a",
          "chest_h",
          "hint_card_b"
        ],
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
          name: "hint_card_b",
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
