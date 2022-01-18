import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 7,
  title: "고급 7단계 <점프, 점프!>",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./7-1 story.png"),
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
      imgSrc: require("./7-1 start.png"),
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
      imgSrc: require("./7-1 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "button_ab_a",
          code: {
            type: "Program",
            start: 0,
            end: 45,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 45,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 45,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 7,
                    name: "onClick"
                  },
                  arguments: [
                    {
                      type: "FunctionExpression",
                      start: 8,
                      end: 44,
                      id: null,
                      expression: false,
                      generator: false,
                      async: false,
                      params: [],
                      body: {
                        type: "BlockStatement",
                        start: 18,
                        end: 44,
                        body: [
                          {
                            type: "ExpressionStatement",
                            start: 24,
                            end: 42,
                            expression: {
                              type: "CallExpression",
                              start: 24,
                              end: 42,
                              callee: {
                                type: "Identifier",
                                start: 24,
                                end: 34,
                                name: "sendSignal"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 35,
                                  end: 41,
                                  value: "jump",
                                  raw: '"jump"'
                                }
                              ],
                              optional: false
                            }
                          }
                        ]
                      }
                    }
                  ],
                  optional: false
                }
              }
            ],
            sourceType: "module"
          }
        }
        // { type: VCTYPE.CONDITION.PLAY_ONCE },
        // {
        //   type: VCTYPE.CONDITION.GAME_EVENT,
        //   event: {
        //     api: "changeScene"
        //   }
        // },
        // {
        //   type: VCTYPE.CONDITION.GAME_EVENT,
        //   event: {
        //     api: "sendSignal",
        //     name: "jump"
        //   }
        // }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "방향키로 주인공을 움직이자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./7-1 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./7-1 answer.png")
        }
      ]
    },
    {
      title: "미션2 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./7-2 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션2 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./7-2 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "boy_d",
          code: {
            type: "Program",
            start: 0,
            end: 131,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 26,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 26,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 13,
                    name: "playAnimation"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 14,
                      end: 20,
                      value: "idle",
                      raw: '"idle"'
                    },
                    {
                      type: "Literal",
                      start: 21,
                      end: 25,
                      value: true,
                      raw: "true"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 27,
                end: 44,
                expression: {
                  type: "CallExpression",
                  start: 27,
                  end: 44,
                  callee: {
                    type: "Identifier",
                    start: 27,
                    end: 38,
                    name: "setGravityY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 39,
                      end: 43,
                      value: 2000,
                      raw: "2000"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 46,
                end: 131,
                expression: {
                  type: "CallExpression",
                  start: 46,
                  end: 131,
                  callee: {
                    type: "Identifier",
                    start: 46,
                    end: 54,
                    name: "onSignal"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 55,
                      end: 61,
                      value: "jump",
                      raw: '"jump"'
                    },
                    {
                      type: "FunctionExpression",
                      start: 62,
                      end: 130,
                      id: null,
                      expression: false,
                      generator: false,
                      async: false,
                      params: [],
                      body: {
                        type: "BlockStatement",
                        start: 72,
                        end: 130,
                        body: [
                          {
                            type: "ExpressionStatement",
                            start: 78,
                            end: 104,
                            expression: {
                              type: "CallExpression",
                              start: 78,
                              end: 104,
                              callee: {
                                type: "Identifier",
                                start: 78,
                                end: 91,
                                name: "playAnimation"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 92,
                                  end: 98,
                                  value: "jump",
                                  raw: '"jump"'
                                },
                                {
                                  type: "Literal",
                                  start: 99,
                                  end: 103,
                                  value: true,
                                  raw: "true"
                                }
                              ],
                              optional: false
                            }
                          },
                          {
                            type: "ExpressionStatement",
                            start: 109,
                            end: 128,
                            expression: {
                              type: "CallExpression",
                              start: 109,
                              end: 128,
                              callee: {
                                type: "Identifier",
                                start: 109,
                                end: 121,
                                name: "setVelocityY"
                              },
                              arguments: [
                                {
                                  type: "UnaryExpression",
                                  start: 122,
                                  end: 127,
                                  operator: "-",
                                  prefix: true,
                                  argument: {
                                    type: "Literal",
                                    start: 123,
                                    end: 127,
                                    value: 1000,
                                    raw: "1000"
                                  }
                                }
                              ],
                              optional: false
                            }
                          }
                        ]
                      }
                    }
                  ],
                  optional: false
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
            api: "changeScene"
          }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "onSignal",
            name: "jump"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "방향키로 주인공을 움직이자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./7-2 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./7-2 answer.png")
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
          factory_f: {
            type: "background",
            assetId: "factory_f",
            code: "",
            preview: {
              name: "factory_f",
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
          undefined: { code: "" },
          boy_d: {
            type: "sprite",
            assetId: "boy_d_v3",
            code:
              'playAnimation("idle",true)\nsetGravityY(2000)\n\nonSignal("run",function(){\n    playAnimation("run",true)\n    setVelocityX(400)\n})\n\nonOutStage(function(){\n    goTo(160,350)\n})\n\nonSignal("stop",function(){\n    playAnimation("idle",true)\n    setVelocityX(0)\n})\n\n\n',
            preview: {
              name: "boy_d",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 169.44649446494466,
              top: 278.47682119205297,
              scaleX: 0.55,
              scaleY: 0.55,
              width: 234,
              height: 400,
              opacity: 1,
              scale: "55"
            }
          },
          plent_a: {
            type: "sprite",
            assetId: "plent_a_v2",
            code: "",
            preview: {
              name: "plent_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1159.4772090215383,
              top: 475.9907289746187,
              scaleX: 0.5709300403302527,
              scaleY: 0.5709300403302527,
              width: 506,
              height: 115,
              opacity: 1
            }
          },
          plent_c: {
            type: "sprite",
            assetId: "plent_c_v2",
            code: 'setCollision("boy_d")\nsetMovable(false)',
            preview: {
              name: "plent_c",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 165.31365313653134,
              top: 495.89403973509934,
              scaleX: 1,
              scaleY: 1,
              width: 256,
              height: 58,
              opacity: 1
            }
          },
          button_ab_c: {
            type: "sprite",
            assetId: "button_ab_c_v2",
            code:
              'onClick(function(){\n    sendSignal("run")\n})\n\nonClickUp(function(){\n    sendSignal("stop")\n})',
            preview: {
              name: "button_ab_c",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1138.3025830258302,
              top: 607.9470198675497,
              scaleX: 1,
              scaleY: 1,
              width: 159,
              height: 159,
              opacity: 1
            }
          },
          plent_l: {
            type: "sprite",
            assetId: "plent_l_v2",
            code:
              'setVelocityY(300)\nsetCollideScene(true)\nsetBounceY(1)\nsetCollision("boy_d")\nsetMovable(false)\n',
            preview: {
              name: "plent_l",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 488,
              top: 140,
              scaleX: 0.5,
              scaleY: 0.5,
              width: 512,
              height: 155,
              opacity: 1,
              scale: "50"
            }
          },
          "plent_l(2)": {
            type: "sprite",
            assetId: "plent_l_v2",
            code:
              'setVelocityY(-300)\nsetCollideScene(true)\nsetBounceY(1)\nsetCollision("boy_d")\nsetMovable(false)',
            preview: {
              name: "plent_l(2)",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 830,
              top: 624,
              scaleX: 0.5,
              scaleY: 0.5,
              width: 512,
              height: 155,
              opacity: 1,
              scale: "50"
            }
          },
          effect_g: {
            type: "sprite",
            assetId: "effect_g",
            code:
              'playAnimation("fx",true)\n\nonOverlap("boy_d",function(){\n    changeScene("scene2")\n})',
            preview: {
              name: "effect_g",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1152.4723247232473,
              top: 343.3112582781457,
              scaleX: 1,
              scaleY: 1,
              width: 260,
              height: 236,
              opacity: 1
            }
          }
        },
        spriteIds: [
          "factory_f",
          "plent_a",
          "plent_c",
          "boy_d",
          "button_ab_c",
          "plent_l",
          "plent_l(2)",
          "effect_g"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/3c5f3d38d5dd6513dbae765952ee227a.jpg"
      },
      scene2: {
        sceneName: "scene2",
        sprites: {
          factory_g: {
            type: "background",
            assetId: "factory_g",
            code: "",
            preview: {
              name: "factory_g",
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
          boy_d: {
            type: "sprite",
            assetId: "boy_d_v3",
            code:
              'playAnimation("idle",true)\nsetGravityY(2000)\n// 여기부터 코드를 작성해보세요.\n',
            preview: {
              name: "boy_d",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 257.2767527675277,
              top: 405.0132450331126,
              scaleX: 0.55,
              scaleY: 0.55,
              width: 234,
              height: 400,
              opacity: 1,
              scale: "55"
            }
          },
          plent_l: {
            type: "sprite",
            assetId: "plent_l_v2",
            code:
              'setCollision("boy_d")\nsetMovable(false)\nsetVelocityX(300)\nsetCollideScene(true)\nsetBounceX(1)',
            preview: {
              name: "plent_l",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 230,
              top: 608,
              scaleX: 0.5,
              scaleY: 0.5,
              width: 512,
              height: 155,
              opacity: 1,
              scale: "050"
            }
          },
          button_ab_a: {
            type: "sprite",
            assetId: "button_ab_a_v2",
            code: "// 여기부터 코드를 작성해보세요.\n",
            preview: {
              name: "button_ab_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1128.8560885608856,
              top: 610.3311258278146,
              scaleX: 1,
              scaleY: 1,
              width: 120,
              height: 121,
              opacity: 1
            }
          }
        },
        spriteIds: ["factory_g", "plent_l", "boy_d", "button_ab_a"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/fae2b02b8caabf8244018115c4d46edf.jpg"
      }
    },
    sceneIds: ["scene1", "scene2"],
    soundIds: ["funky_v2", "victory_1"],
    timeStamp: 1602648479306,
    editorMode: "javascript"
  },
  interaction: {
    selected: {
      objects: {
        scene1: { name: "effect_g", type: "sprite" },
        scene2: { name: "button_ab_a", type: "sprite" }
      },
      api: "ID_PHYSICS",
      method: null,
      scene: "scene2"
    },
    jukebox: { isPlaying: false }
  },
  preview: {
    isPlaying: false,
    isFullScreen: false,
    screenMode: "HORIZONTAL",
    volume: 100
  }
};
