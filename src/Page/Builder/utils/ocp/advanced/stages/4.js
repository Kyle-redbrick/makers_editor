import { VCTYPE } from "../../../../../../Common/Util/Constant";
import { OCP_IMAGES } from "../../../../../../Common/Util/Constant";
import endImg from "../../images/end.png";

export const data = {
  image: OCP_IMAGES.advanced.level4.cover,
  title: "고급 4. 사라진 건전지",
  state: null,
  level: 4,
  currentStageNum: 0,
  stages: [
    {
      title: "스토리",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.advanced.level4.story,
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션1",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.advanced.level4.mission1,
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션1 - 코딩",
      type: VCTYPE.STEP.CODE,
      imgSrc: OCP_IMAGES.advanced.level4.description1,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "robot_g",
          code: {
            type: "Program",
            body: [
              {
                type: "VariableDeclaration",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: {
                      type: "Identifier",
                      name: "isBatteryOn"
                    },
                    init: {
                      type: "Literal",
                      value: false
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
                    type: "Identifier",
                    name: "onOverlap"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "battery_c"
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
                                name: "say"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  isLoose: true
                                },
                                {
                                  type: "Literal",
                                  isLoose: true
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
                                name: "playAnimation"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "idle"
                                },
                                {
                                  type: "Literal",
                                  isLoose: true
                                }
                              ]
                            }
                          },
                          {
                            type: "ExpressionStatement",
                            expression: {
                              type: "AssignmentExpression",
                              operator: "=",
                              left: {
                                type: "Identifier",
                                name: "isBatteryOn"
                              },
                              right: {
                                type: "Literal",
                                value: true
                              }
                            }
                          },
                          {
                            type: "ExpressionStatement",
                            expression: {
                              type: "CallExpression",
                              callee: {
                                type: "Identifier",
                                name: "setDraggable"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: true
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
                                name: "sendSignal"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "useBattery"
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
                            type: "IfStatement",
                            test: {
                              type: "BinaryExpression",
                              left: {
                                type: "Identifier",
                                name: "isBatteryOn"
                              },
                              operator: "==",
                              right: {
                                type: "Literal",
                                value: true
                              }
                            },
                            consequent: {
                              type: "BlockStatement",
                              body: [
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
                                        isLoose: true
                                      },
                                      {
                                        type: "Literal",
                                        isLoose: true
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            alternate: {
                              type: "BlockStatement",
                              body: [
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
                                        isLoose: true
                                      },
                                      {
                                        type: "Literal",
                                        isLoose: true
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
                  ]
                }
              }
            ],
            sourceType: "module"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "모두 입력했다면 > 버튼을 눌러 다음 미션으로 넘어가세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level4.hint1
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level4.answer1
        }
      ]
    },

    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.advanced.level4.select1,
      conditions: [
        {
          type: VCTYPE.CONDITION.SPRITE_SELECTED,
          sceneId: "scene1",
          spriteId: "battery_c"
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "코드를 작성하기 전에\n먼저 스프라이트를 선택하자!"
        }
      ]
    },
    {
      title: "미션2",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.advanced.level4.mission2,
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션2 - 코딩",
      type: VCTYPE.STEP.CODE,
      imgSrc: OCP_IMAGES.advanced.level4.description2,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "battery_c",
          code: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "onSignal"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "getBattery"
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
                                name: "moveTo"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  isLoose: true
                                },
                                {
                                  type: "Literal",
                                  isLoose: true
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
                                name: "setDraggable"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: true
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
                    name: "onSignal"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "useBattery"
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
                                name: "kill"
                              },
                              arguments: []
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
            api: "kill",
            sceneId: "scene1",
            spriteId: "battery_c"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data:
            "실행 버튼을 누르고 배터리를 로봇에 연결하면 배터리가 사라지는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level4.hint2
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level4.answer2
        }
      ]
    },
    {
      title: "엔딩",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: endImg,
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "수업을 모두 마쳤어!\n대단한걸?\n다음 수업에서 또 보자!"
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
          room_d: {
            type: "background",
            assetId: "room_d",
            code: "",
            locked: true,
            preview: {
              name: "room_d",
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
          },
          door_f: {
            type: "sprite",
            assetId: "door_f",
            code: 'onClick(function(){\n    say("문이 잠겨있다.",1)\n})\n\n\n',
            locked: true,
            preview: {
              name: "door_f",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 658.6666666666667,
              top: 335.73033707865164,
              scaleX: 1,
              scaleY: 1,
              width: 508,
              height: 374,
              opacity: 1
            }
          },
          monitor_a: {
            type: "sprite",
            assetId: "monitor_a",
            code:
              'onClick(function(){\n    playAnimation("on",true) \n    say("모니터가 켜졌다.",1)\n})\n',
            locked: true,
            preview: {
              name: "monitor_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1101.8677144728226,
              top: 436.9893940984984,
              scaleX: 1,
              scaleY: 1,
              width: 162,
              height: 190,
              opacity: 1
            }
          },
          door_g: {
            type: "sprite",
            assetId: "door_g",
            code:
              'onClick(function(){\n    say("아래에 무언가가 있지만 손이 닿지 않는다",1)\n})',
            locked: true,
            preview: {
              name: "door_g",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 638.3235101506222,
              top: 631.6822429906542,
              scaleX: 1,
              scaleY: 1,
              width: 403,
              height: 154,
              opacity: 1
            }
          },
          battery_c: {
            type: "sprite",
            assetId: "battery_c",
            code: `onSignal("getBattery",function(){\n    moveTo(824,300)\n    setDraggable(true)\n})\n\n// 여기부터 코드를 작성해보세요.\n`,
            preview: {
              name: "battery_c",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 824.2033919052078,
              top: 500,
              scaleX: 0.367557529226919,
              scaleY: 0.367557529226919,
              width: 112,
              height: 112,
              opacity: 1
            }
          },
          machine_e: {
            type: "sprite",
            assetId: "machine_e",
            code: `onClick(function(){\n    say("배터리를 찾았다!",1)\n    sendSignal("getBattery")\n})`,
            locked: true,
            preview: {
              name: "machine_e",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 827.8900410008687,
              top: 488.02526277222415,
              scaleX: 0.9018741664482807,
              scaleY: 0.9018741664482807,
              width: 100,
              height: 175,
              opacity: 1
            }
          },
          robot_g: {
            type: "sprite",
            assetId: "robot_g_v3",
            code: `var isBatteryOn = false\n\nonOverlap("battery_c",function(){\n\tsay("배터리를 연결했다",1)\n\tplayAnimation("idle",true)\n\tisBatteryOn = true\n\tsetDraggable(true)\n\t// 여기부터 코드를 작성해보세요.\n\t\n})\n\nonClick(function(){\n\tif(isBatteryOn==true) {\n\t\tsay("이제 움직일 수 있다!",1)\n\t}else{\n\t\tsay("배터리가 없어서 움직일 수 없다.",1)\n\t}\n})\n`,
            preview: {
              name: "robot_g",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 316.70713951384,
              top: 442.56615663108494,
              scaleX: 0.6,
              scaleY: 0.6,
              width: 196,
              height: 266,
              opacity: 1,
              scale: "60"
            }
          }
        },
        spriteIds: [
          "room_d",
          "door_f",
          "monitor_a",
          "door_g",
          "battery_c",
          "machine_e",
          "robot_g"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/c1dbbdcb86066fa9024637edc6c10fbd.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: [],
    timeStamp: 1590977183459,
    editorMode: "javascript-wiz"
  },
  interaction: {
    selected: {
      objects: {
        scene1: { name: "robot_g", type: "sprite" }
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
