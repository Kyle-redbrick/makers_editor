import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 9,
  title: "초급 9단계. 다시 하고 싶은 게임",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./story.png"),
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
      imgSrc: require("./start.png"),
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
      imgSrc: require("./main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "retry_j",
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
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene1",
                                  raw: '"scene1"'
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
            sceneId: "scene2",
            spriteId: "retry_j"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "게임을 다시 할 수 있도록 코드를 짜볼까?"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./answer.png")
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
          adventure_m: {
            type: "background",
            assetId: "adventure_m_v5",
            code: `onFrame(function(){
    goX(8)
})`,
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
          luna_a: {
            type: "sprite",
            assetId: "luna_a_v5",
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
          monster_m: {
            type: "sprite",
            assetId: "monster_ad",
            code: `playAnimation("attack",true)
setVelocityY(300)
setCollideScene(true)
setBounceY(1)`,
            preview: {
              name: "monster_m",
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
          },
          joystick_b_black: {
            type: "component",
            assetId: "joystick_b_black",
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
          effect_beam_e: {
            type: "sprite",
            assetId: "effect_beam_e_v2",
            code: `playAnimation("fx",true)
setVelocityX(800)
onOutStage(function(){
    goToSprite("monster_ad")
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
          }
        },
        spriteIds: [
          "adventure_m",
          "luna_a",
          "joystick_b_black",
          "monster_m",
          "effect_beam_e"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/7217a11c775c99da1a972919d86c7331.jpg"
      },
      scene2: {
        sceneName: "scene2",
        sprites: {
          adventure_m: {
            type: "background",
            assetId: "adventure_m_v5",
            locked: true,
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
            locked: true,
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
            code: `// 여기부터 코드를 작성해보세요.
`,
            preview: {
              name: "retry_j",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 635.3707052441231,
              top: 481.5584415584416,
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
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/02aa1d88fee0484ffddf0b2822c26e55.jpg"
      }
    },
    sceneIds: ["scene2", "scene1"],
    soundIds: [],
    timeStamp: 1599181009586
  },
  interaction: {
    selected: {
      objects: {
        scene1: {
          name: "effect_beam_e",
          type: "sprite"
        },
        scene2: {
          name: "retry_j",
          type: "sprite"
        }
      },
      api: "ID_PHYSICS",
      method: null,
      scene: "scene2"
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
