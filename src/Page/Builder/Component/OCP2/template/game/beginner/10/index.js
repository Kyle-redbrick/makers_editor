import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 10,
  title: "초급 10단계. 다 된 게임에 음악 뿌리기",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./10-1 story.png"),
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
      imgSrc: require("./10-1 start.png"),
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
      imgSrc: require("./10-1 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "adventure_m",
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
                                  type: "Literal",
                                  value: 8,
                                  raw: "8"
                                }
                              ]
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
                    name: "playSound"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "suspense_b",
                      raw: '"suspense_b"'
                    },
                    {
                      type: "Literal",
                      value: false,
                      raw: "false"
                    }
                  ]
                }
              }
            ],
            sourceType: "module"
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "게임에 음악을 넣어보자"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./10-1 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./10-1 answer.png")
        }
      ]
    },
    {
      title: "미션2 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./10-2 start.png"),
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
      imgSrc: require("./10-2 main.png"),
      successDelay: 5000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "effect_beam_e",
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
                      value: "fx",
                      raw: '"fx"'
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
                      type: "Literal",
                      value: 800,
                      raw: "800"
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
                                name: "goToSprite"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "monster_ad",
                                  raw: '"monster_ad"'
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
                                name: "playSound"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "shot_laser1",
                                  raw: '"shot_laser1"'
                                },
                                {
                                  type: "Literal",
                                  value: false,
                                  raw: "false"
                                }
                              ]
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
                    name: "onOverlap"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "luna_a",
                      raw: '"luna_a"'
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
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene2",
                                  raw: '"scene2"'
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
        { type: VCTYPE.CONDITION.PLAY_ONCE }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "게임에 음악을 넣어보자"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./10-2 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./10-2 answer.png")
        }
      ]
    },
    {
      title: "엔딩",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("../../common/lastEnd.png"),
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
    sceneIds: ["scene1", "scene2"],
    soundIds: ["shot_laser1", "suspense_b_v2"],
    timeStamp: 1599180923691,
    scenes: {
      scene2: {
        sceneName: "scene2",
        sprites: {
          adventure_m: {
            type: "background",
            assetId: "adventure_m_v5",
            code: ``,
            preview: {
              name: "adventure_m",
              type: "background",
              angle: 0,
              left: -199,
              top: -479,
              scaleX: 1,
              scaleY: 1,
              width: 1678,
              height: 1678,
              opacity: 1
            }
          },
          gameover_o: {
            type: "sprite",
            assetId: "gameover_o",
            code: ``,
            preview: {
              name: "gameover_o",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 640.7430385487529,
              top: 300,
              scaleX: 1.5,
              scaleY: 1.5,
              width: 444,
              height: 78,
              opacity: 1,
              scale: 150
            }
          },
          retry_j: {
            type: "sprite",
            assetId: "retry_j_v2",
            code: `onClick(function(){
    changeScene("scene1")
})`,
            preview: {
              name: "retry_j",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 634.5823688909464,
              top: 447.2234762979684,
              scaleX: 1,
              scaleY: 1,
              width: 300,
              height: 127,
              opacity: 1
            }
          }
        },
        spriteIds: ["adventure_m", "gameover_o", "retry_j"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/bde9139020109284d53992971872e413.jpg"
      },
      scene1: {
        sceneName: "scene1",
        spriteIds: [
          "adventure_m",
          "luna_a",
          "joystick_b_black",
          "monster_ad",
          "effect_beam_e"
        ],
        sprites: {
          adventure_m: {
            type: "background",
            assetId: "adventure_m_v5",
            code: `onFrame(function(){
    goX(8)
})
// 여기부터 코드를 작성해보세요.
`,
            preview: {
              name: "adventure_m",
              type: "background",
              angle: 0,
              left: -199,
              top: -479,
              scaleX: 1,
              scaleY: 1,
              width: 1678,
              height: 1678,
              opacity: 1
            }
          },
          joystick_b_black: {
            type: "component",
            assetId: "joystick_b_black",
            locked: true,
            code: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("luna_a")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
            preview: {
              name: "joystick_b_black",
              type: "component",
              subtype: "analog",
              angle: 0,
              left: 1103,
              top: 559,
              scaleX: 1,
              scaleY: 1,
              width: 250,
              height: 250,
              opacity: 1
            }
          },
          luna_a: {
            type: "sprite",
            assetId: "luna_a_v5",
            locked: true,
            code: `playAnimation("side_fly",true)`,
            preview: {
              name: "luna_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 936,
              top: 236,
              scaleX: 0.81,
              scaleY: 0.81,
              width: 290,
              height: 289,
              opacity: 1,
              scale: "81"
            }
          },
          effect_beam_e: {
            type: "sprite",
            assetId: "effect_beam_e_v2",
            code: `playAnimation("fx",true)
setVelocityX(800)
onOutStage(function(){
    goToSprite("monster_ad")
    // 여기부터 코드를 작성해보세요.
    
})
onOverlap("luna_a",function(){
    changeScene("scene2")
})`,
            preview: {
              name: "effect_beam_e",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 242,
              top: 345,
              scaleX: 0.52,
              scaleY: 0.52,
              width: 311,
              height: 143,
              opacity: 1,
              scale: "52"
            }
          },
          monster_ad: {
            type: "sprite",
            assetId: "monster_ad",
            locked: true,
            code: `playAnimation("attack",true)
setVelocityY(300)
setCollideScene(true)
setBounceY(1)`,
            preview: {
              name: "monster_ad",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 265,
              top: 338,
              scaleX: 0.78,
              scaleY: 0.78,
              width: 509,
              height: 548,
              opacity: 1,
              scale: "78"
            }
          }
        },
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/aef2c680f8c3fd1f84a92d104e84344e.jpg"
      }
    }
  },
  interaction: {
    selected: {
      objects: {
        scene1: {
          name: "adventure_m",
          type: "background"
        },
        scene2: {
          name: "retry_j",
          type: "sprite"
        }
      },
      api: "ID_PHYSICS",
      method: null,
      scene: "scene1"
    },
    jukebox: {
      isPlaying: false
    }
  },
  preview: {
    isPlaying: false,
    isFullScreen: false,
    screenMode: "HORIZONTAL",
    volume: 100
  }
};
