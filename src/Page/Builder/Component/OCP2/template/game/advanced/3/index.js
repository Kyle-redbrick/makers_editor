import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 3,
  title: "고급 3단계 <타일을 움직여라>",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./3-1 story.png"),

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
      imgSrc: require("./3-1 start.png"),
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
      imgSrc: require("./3-1 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "plent_l",
          code: {
            type: "Program",
            start: 0,
            end: 19,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 17,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 17,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 12,
                    name: "setVelocityY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 13,
                      end: 16,
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
          event: {}
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "아래로 내려오는 타일을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-1 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-1 answer.png")
        }
      ]
    },
    {
      title: "미션2 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./3-2 start.png"),
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
      imgSrc: require("./3-2 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "plent_l",
          code: {
            type: "Program",
            start: 0,
            end: 53,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 17,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 17,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 12,
                    name: "setVelocityY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 13,
                      end: 16,
                      value: 300,
                      raw: "300"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 18,
                end: 39,
                expression: {
                  type: "CallExpression",
                  start: 18,
                  end: 39,
                  callee: {
                    type: "Identifier",
                    start: 18,
                    end: 33,
                    name: "setCollideScene"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 34,
                      end: 38,
                      value: true,
                      raw: "true"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 40,
                end: 53,
                expression: {
                  type: "CallExpression",
                  start: 40,
                  end: 53,
                  callee: {
                    type: "Identifier",
                    start: 40,
                    end: 50,
                    name: "setBounceY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 51,
                      end: 52,
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
          event: {}
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "위아래로 튕기는 타일을 만들자"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-2 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-2 answer.png")
        }
      ]
    },
    {
      title: "미션3 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./3-3 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션3 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./3-3 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "plent_l",
          code: {
            type: "Program",
            start: 0,
            end: 94,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 17,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 17,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 12,
                    name: "setVelocityY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 13,
                      end: 16,
                      value: 300,
                      raw: "300"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 18,
                end: 39,
                expression: {
                  type: "CallExpression",
                  start: 18,
                  end: 39,
                  callee: {
                    type: "Identifier",
                    start: 18,
                    end: 33,
                    name: "setCollideScene"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 34,
                      end: 38,
                      value: true,
                      raw: "true"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 40,
                end: 53,
                expression: {
                  type: "CallExpression",
                  start: 40,
                  end: 53,
                  callee: {
                    type: "Identifier",
                    start: 40,
                    end: 50,
                    name: "setBounceY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 51,
                      end: 52,
                      value: 1,
                      raw: "1"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 55,
                end: 76,
                expression: {
                  type: "CallExpression",
                  start: 55,
                  end: 76,
                  callee: {
                    type: "Identifier",
                    start: 55,
                    end: 67,
                    name: "setCollision"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 68,
                      end: 75,
                      value: "boy_d",
                      raw: '"boy_d"'
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 77,
                end: 94,
                expression: {
                  type: "CallExpression",
                  start: 77,
                  end: 94,
                  callee: {
                    type: "Identifier",
                    start: 77,
                    end: 87,
                    name: "setMovable"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 88,
                      end: 93,
                      value: false,
                      raw: "false"
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
          event: { api: "onClick" }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "주인공이 탈 수 있는 타일을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-3 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-3 answer.png")
        }
      ]
    },
    {
      title: "미션4 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./3-4 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션4 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./3-4 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "plent_l(2)",
          code: {
            type: "Program",
            start: 0,
            end: 18,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 18,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 18,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 12,
                    name: "setVelocityY"
                  },
                  arguments: [
                    {
                      type: "UnaryExpression",
                      start: 13,
                      end: 17,
                      operator: "-",
                      prefix: true,
                      argument: {
                        type: "Literal",
                        start: 14,
                        end: 17,
                        value: 300,
                        raw: "300"
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
          event: {}
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "위로 올라가는 타일을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-4 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-4 answer.png")
        }
      ]
    },
    {
      title: "미션5 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./3-5 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션5 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./3-5 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "plent_l(2)",
          code: {
            type: "Program",
            start: 0,
            end: 54,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 18,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 18,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 12,
                    name: "setVelocityY"
                  },
                  arguments: [
                    {
                      type: "UnaryExpression",
                      start: 13,
                      end: 17,
                      operator: "-",
                      prefix: true,
                      argument: {
                        type: "Literal",
                        start: 14,
                        end: 17,
                        value: 300,
                        raw: "300"
                      }
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 19,
                end: 40,
                expression: {
                  type: "CallExpression",
                  start: 19,
                  end: 40,
                  callee: {
                    type: "Identifier",
                    start: 19,
                    end: 34,
                    name: "setCollideScene"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 35,
                      end: 39,
                      value: true,
                      raw: "true"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 41,
                end: 54,
                expression: {
                  type: "CallExpression",
                  start: 41,
                  end: 54,
                  callee: {
                    type: "Identifier",
                    start: 41,
                    end: 51,
                    name: "setBounceY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 52,
                      end: 53,
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
          event: {}
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "위아래로 튕기는 타일을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-5 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-5 answer.png")
        }
      ]
    },
    {
      title: "미션6 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./3-6 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션6 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./3-6 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "plent_l(2)",
          code: {
            type: "Program",
            start: 0,
            end: 94,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 18,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 18,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 12,
                    name: "setVelocityY"
                  },
                  arguments: [
                    {
                      type: "UnaryExpression",
                      start: 13,
                      end: 17,
                      operator: "-",
                      prefix: true,
                      argument: {
                        type: "Literal",
                        start: 14,
                        end: 17,
                        value: 300,
                        raw: "300"
                      }
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 19,
                end: 40,
                expression: {
                  type: "CallExpression",
                  start: 19,
                  end: 40,
                  callee: {
                    type: "Identifier",
                    start: 19,
                    end: 34,
                    name: "setCollideScene"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 35,
                      end: 39,
                      value: true,
                      raw: "true"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 41,
                end: 54,
                expression: {
                  type: "CallExpression",
                  start: 41,
                  end: 54,
                  callee: {
                    type: "Identifier",
                    start: 41,
                    end: 51,
                    name: "setBounceY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 52,
                      end: 53,
                      value: 1,
                      raw: "1"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 55,
                end: 76,
                expression: {
                  type: "CallExpression",
                  start: 55,
                  end: 76,
                  callee: {
                    type: "Identifier",
                    start: 55,
                    end: 67,
                    name: "setCollision"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 68,
                      end: 75,
                      value: "boy_d",
                      raw: '"boy_d"'
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 77,
                end: 94,
                expression: {
                  type: "CallExpression",
                  start: 77,
                  end: 94,
                  callee: {
                    type: "Identifier",
                    start: 77,
                    end: 87,
                    name: "setMovable"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 88,
                      end: 93,
                      value: false,
                      raw: "false"
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
          event: { api: "onClick" }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "주인공이 탈 수 있는 타일을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-6 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./3-6 answer.png")
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
            code: `// 여기부터 코드를 작성해보세요.
`,
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
            code: `// 여기부터 코드를 작성해보세요.
`,
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
          }
        },
        spriteIds: [
          "factory_f",
          "plent_a",
          "plent_c",
          "boy_d",
          "button_ab_c",
          "plent_l",
          "plent_l(2)"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/18e9845ba17000ff78f946b640a11967.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: ["funky_v2", "victory_1"],
    timeStamp: 1602591550553,
    editorMode: "javascript"
  },
  interaction: {
    selected: {
      objects: { scene1: { name: "plent_l", type: "sprite" } },
      api: "ID_PHYSICS",
      method: null,
      scene: "scene1"
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
