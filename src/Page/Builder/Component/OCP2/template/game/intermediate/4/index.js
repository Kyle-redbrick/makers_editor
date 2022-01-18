import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 4,
  title: "중급 4단계. 마녀 점프하기",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./4-1 story.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./4-1 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./4-1 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "witch",
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
                      value: "idle",
                      raw: '"idle"'
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
                    name: "say"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "시작!",
                      raw: '"시작!"',
                      isLoose: true
                    },
                    {
                      type: "Literal",
                      value: 1,
                      raw: "1"
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
                    name: "setGravityY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 1000,
                      raw: "1000"
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
                    name: "onScreenClick"
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
                                name: "setVelocityY"
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
            api: "setVelocityY",
            value: -400
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "화면을 터치하면 올라가는\n꼬마 마녀를 만들자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./4-1 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./4-1 answer.png")
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
    timeStamp: 1602490096228,
    scenes: {
      scene1: {
        sceneName: "scene1",
        spriteIds: ["halloween_red", "witch"],
        sprites: {
          witch: {
            type: "sprite",
            assetId: "witch_v18",
            code: `playAnimation("idle",true)
say("시작!",1)
setGravityY(1000)
// 여기부터 코드를 작성해보세요.
`,
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
              left: 640,
              top: 380
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
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/46e3020c03cacc7cf6a395e1c1c01d9d.jpg"
      }
    }
  },
  interaction: {
    selected: {
      api: "ID_PHYSICS",
      method: null,
      scene: "scene1",
      objects: { scene1: { name: "witch", type: "sprite" } }
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
