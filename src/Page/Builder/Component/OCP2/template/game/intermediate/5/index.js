import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 5,
  title: "중급 5단계. 적 설정하기(1)",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./5-1 story.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./5-1 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./5-1 main.png"),
      successDelay: 2000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "pumpkin",
          code: {
            type: "Program",
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
                      value: "idle_a",
                      raw: '"idle_a"',
                      isLoose: true
                    },
                    {
                      type: "Literal",
                      value: true,
                      raw: "true"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "setVelocityX"
                  },
                  arguments: [
                    {
                      type: "UnaryExpression",
                      operator: "-",
                      prefix: true,
                      argument: {
                        type: "Literal",
                        value: 400,
                        raw: "400"
                      }
                    }
                  ],
                  optional: false
                }
              }
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { spriteId: "pumpkin", api: "playAnimation" }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { spriteId: "pumpkin", api: "setVelocityX", value: -400 }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "왼쪽으로 움직이는 호박을 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./5-1 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./5-1 answer.png")
        }
      ]
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./5-2 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./5-2 main.png"),
      successDelay: 2000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "pumpkin",
          code: {
            type: "Program",
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
                      value: "idle_a",
                      raw: '"idle_a"',
                      isLoose: true
                    },
                    {
                      type: "Literal",
                      value: true,
                      raw: "true"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "setVelocityX"
                  },
                  arguments: [
                    {
                      type: "UnaryExpression",
                      operator: "-",
                      prefix: true,
                      argument: {
                        type: "Literal",
                        value: 400,
                        raw: "400"
                      }
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "onOutStage"
                  },
                  arguments: [
                    {
                      type: "FunctionExpression",
                      id: null,
                      expression: false,
                      generator: false,
                      async: false,
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
                                name: "goTo"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: 1280,
                                  raw: "1280"
                                },
                                {
                                  type: "Literal",
                                  value: 150,
                                  raw: "150"
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
            ]
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            spriteId: "pumpkin",
            api: "goTo"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "호박이 화면 밖으로 나가면\n오른쪽에서 다시 나오게 하자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./5-2 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./5-2 answer.png")
        }
      ]
    },
    {
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
    sceneIds: ["scene1"],
    soundIds: ["documentary_v3"],
    timeStamp: 1602490264767,
    scenes: {
      scene1: {
        sceneName: "scene1",
        spriteIds: ["halloween_red", "witch", "pumpkin"],
        sprites: {
          witch: {
            type: "sprite",
            assetId: "witch_v18",
            code: `playAnimation("idle",true)
say("시작!",1)
setGravityY(1000)
onScreenClick(function(){
    setVelocityY(-400)
})`,
            preview: {
              name: "witch",
              type: "sprite",
              subtype: null,
              angle: 0,
              scaleX: 1,
              scaleY: 1,
              width: 390,
              height: 346,
              opacity: 1,
              left: 377.5940959409594,
              top: 397.484931914577
            }
          },
          pumpkin: {
            type: "sprite",
            assetId: "pumpkin_v14",
            code: `// 여기부터 코드를 작성해보세요.
`,
            preview: {
              name: "pumpkin",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 949.0723282431552,
              top: 154.10256410256412,
              scaleX: 1,
              scaleY: 1,
              width: 164,
              height: 146,
              opacity: 1
            }
          },
          halloween_red: {
            type: "background",
            assetId: "halloween_red",
            code: `onFrame(function(){
    goX(-2)
})`,
            preview: {
              name: "halloween_red",
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
          }
        },
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/c0623bfcf69d8059804dd2125d5eb077.jpg"
      }
    }
  },
  interaction: {
    selected: {
      api: "ID_PHYSICS",
      method: null,
      scene: "scene1",
      objects: { scene1: { name: "pumpkin", type: "sprite" } }
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
