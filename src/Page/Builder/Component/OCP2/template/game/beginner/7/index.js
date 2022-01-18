import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 7,
  title: "초급 7단계. 화면 밖으로 나간 미사일 설정하자",
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
      imgSrc: require("./mission1_intro.png"),
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
      imgSrc: require("./mission1.png"),
      successDelay: 3000,
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
                  ]
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
                  ]
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
          data: "화면 밖으로 나간 미사일 설정하자"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./mission1_hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./mission1_answer.png")
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
            locked: true,
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
          monster_ad: {
            type: "sprite",
            assetId: "monster_ad",
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
          effect_beam_e: {
            type: "sprite",
            assetId: "effect_beam_e_v2",
            code: `playAnimation("fx",true)
setVelocityX(800)
// 여기부터 코드를 작성해보세요.
`,
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
          "monster_ad",
          "effect_beam_e"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/8c7eb9462ad50637c4cc1f2b3234ee59.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: [],
    timeStamp: 1599100058416
  },
  interaction: {
    selected: {
      objects: { scene1: { name: "effect_beam_e", type: "sprite" } },
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
