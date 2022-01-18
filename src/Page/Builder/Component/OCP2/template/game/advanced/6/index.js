import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 6,
  title: "고급 6단계 <타일을 움직여서 전진>",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./6-1 story.png"),
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
      imgSrc: require("./6-1 start.png"),
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
      imgSrc: require("./6-1 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "plent_l",
          code: {
            type: "Program",
            start: 0,
            end: 57,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 21,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 21,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 12,
                    name: "setCollision"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 13,
                      end: 20,
                      value: "boy_d",
                      raw: '"boy_d"'
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 22,
                end: 39,
                expression: {
                  type: "CallExpression",
                  start: 22,
                  end: 39,
                  callee: {
                    type: "Identifier",
                    start: 22,
                    end: 32,
                    name: "setMovable"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 33,
                      end: 38,
                      value: false,
                      raw: "false"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 40,
                end: 57,
                expression: {
                  type: "CallExpression",
                  start: 40,
                  end: 57,
                  callee: {
                    type: "Identifier",
                    start: 40,
                    end: 52,
                    name: "setVelocityX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 53,
                      end: 56,
                      value: 300,
                      raw: "300"
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
          event: { api: "changeScene" }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "오른쪽으로 움직이는 타일을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./6-1 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./6-1 answer.png")
        }
      ]
    },
    {
      title: "미션2 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./6-2 start.png"),
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
      imgSrc: require("./6-2 main.png"),
      successDelay: 4000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "plent_l",
          code: {
            type: "Program",
            start: 0,
            end: 93,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 21,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 21,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 12,
                    name: "setCollision"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 13,
                      end: 20,
                      value: "boy_d",
                      raw: '"boy_d"'
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 22,
                end: 39,
                expression: {
                  type: "CallExpression",
                  start: 22,
                  end: 39,
                  callee: {
                    type: "Identifier",
                    start: 22,
                    end: 32,
                    name: "setMovable"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 33,
                      end: 38,
                      value: false,
                      raw: "false"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 40,
                end: 57,
                expression: {
                  type: "CallExpression",
                  start: 40,
                  end: 57,
                  callee: {
                    type: "Identifier",
                    start: 40,
                    end: 52,
                    name: "setVelocityX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 53,
                      end: 56,
                      value: 300,
                      raw: "300"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 58,
                end: 79,
                expression: {
                  type: "CallExpression",
                  start: 58,
                  end: 79,
                  callee: {
                    type: "Identifier",
                    start: 58,
                    end: 73,
                    name: "setCollideScene"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 74,
                      end: 78,
                      value: true,
                      raw: "true"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 80,
                end: 93,
                expression: {
                  type: "CallExpression",
                  start: 80,
                  end: 93,
                  callee: {
                    type: "Identifier",
                    start: 80,
                    end: 90,
                    name: "setBounceX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 91,
                      end: 92,
                      value: 1,
                      raw: "1"
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
          event: { api: "changeScene" }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "좌우로 튕기는 타일을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./6-2 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./6-2 answer.png")
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
              'setVelocityY(300)\nsetCollideScene(true)\nsetBounceY(1)\nsetCollision("boy_d")\nsetMovable(false)',
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
            code: 'playAnimation("idle",true)\nsetGravityY(2000)',
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
              'setCollision("boy_d")\nsetMovable(false)\n// 여기부터 코드를 작성해보세요.\n',
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
          }
        },
        spriteIds: ["factory_g", "plent_l", "boy_d"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/dfa5016297f2178c468cb969e94c391d.jpg"
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
        scene2: { name: "plent_l", type: "sprite" }
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
