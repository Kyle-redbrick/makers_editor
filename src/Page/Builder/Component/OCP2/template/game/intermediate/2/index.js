import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 2,
  title: "중급 2단계. 배경 움직이기",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./2-1 story.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./2-1 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./2-1 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "halloween_red",
          code: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "onFrame"
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
                                name: "goX"
                              },
                              arguments: [
                                {
                                  type: "UnaryExpression",
                                  operator: "-",
                                  prefix: true,
                                  argument: {
                                    type: "Literal",
                                    value: 2,
                                    raw: "2"
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
            api: "goX",
            steps: -2
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "계속해서 왼쪽으로 움직이는\n배경을 만들자"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./2-1 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./2-1 answer.png")
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
    timeStamp: 1602492336216,
    scenes: {
      scene1: {
        sceneName: "scene1",
        spriteIds: ["halloween_red", "witch"],
        sprites: {
          witch: {
            type: "sprite",
            assetId: "witch_v18",
            code: `playAnimation("idle",true)
say("시작!",1)`,
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
            code: `// 여기부터 코드를 작성해보세요.
`,
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
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/452977239ce9d8d0256959b974e0e029.jpg"
      }
    }
  },
  interaction: {
    selected: {
      api: "ID_PHYSICS",
      method: null,
      scene: "scene1",
      objects: { scene1: { name: "halloween_red", type: "background" } }
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
