import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 1,
  title: "초급 1단계. 조이스틱으로 주인공을 움직여보자!",
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
      imgSrc: require("./mission1_start.png"),
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
      successDelay: 1500,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "joystick_b_black",
          code: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "onJoystick"
                  },
                  arguments: [
                    {
                      type: "FunctionExpression",
                      params: [
                        {
                          type: "Identifier",
                          name: "degree"
                        },
                        {
                          type: "Identifier",
                          name: "force"
                        }
                      ],
                      body: {
                        type: "BlockStatement",
                        body: [
                          {
                            type: "VariableDeclaration",
                            declarations: [
                              {
                                type: "VariableDeclarator",
                                id: {
                                  type: "Identifier",
                                  name: "maxSpeed"
                                },
                                init: {
                                  type: "Literal",
                                  isLoose: true
                                }
                              }
                            ]
                          },
                          {
                            type: "VariableDeclaration",
                            declarations: [
                              {
                                type: "VariableDeclarator",
                                id: {
                                  type: "Identifier",
                                  name: "sprite"
                                },
                                init: {
                                  type: "CallExpression",
                                  callee: {
                                    type: "Identifier",
                                    name: "getSprite"
                                  },
                                  arguments: [
                                    {
                                      type: "Literal",
                                      value: "luna_a",
                                      raw: '"luna_a"'
                                    }
                                  ]
                                }
                              }
                            ],
                            kind: "var"
                          },
                          {
                            type: "ExpressionStatement",
                            expression: {
                              type: "CallExpression",
                              callee: {
                                type: "MemberExpression",
                                object: {
                                  type: "Identifier",
                                  name: "sprite"
                                },
                                property: {
                                  type: "Identifier",
                                  name: "setVelocityFromDegree"
                                }
                              },
                              arguments: [
                                {
                                  type: "Identifier",
                                  name: "degree"
                                },
                                {
                                  type: "Identifier",
                                  name: "force"
                                },
                                {
                                  type: "Identifier",
                                  name: "maxSpeed"
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
            api: "setVelocityFromDegree"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "조이스틱을 코딩해서\n주인공 캐릭터를 움직여보자!"
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
            code: ``,
            locked: true,
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
            code: ``,
            preview: {
              name: "luna_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 640,
              top: 360,
              scaleX: 1,
              scaleY: 1,
              width: 290,
              height: 289,
              opacity: 1,
              scale: "0100"
            }
          },
          joystick_b_black: {
            type: "component",
            assetId: "joystick_b_black",
            code: `onJoystick(function(degree,force){
    var maxSpeed = 300
    // 여기 아래에 name을 변경해보세요.
    var sprite = getSprite("name") 
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
            preview: {
              name: "joystick_b_black",
              type: "component",
              subtype: "analog",
              angle: 0,
              left: 1115.668011374909,
              top: 582.6636568848759,
              scaleX: 1,
              scaleY: 1,
              width: 250,
              height: 250,
              opacity: 1
            }
          }
        },
        spriteIds: ["adventure_m", "luna_a", "joystick_b_black"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/eb5c3857e03630f4545318a2eb8ed70a.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: [],
    timeStamp: 1599028978705
  },
  interaction: {
    selected: {
      objects: {
        scene1: { name: "joystick_b_black", type: "component" }
      },
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
