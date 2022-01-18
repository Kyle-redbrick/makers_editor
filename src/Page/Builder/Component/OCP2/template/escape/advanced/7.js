import { VCTYPE } from "../../../../../../../Common/Util/Constant";
import { OCP_IMAGES } from "../../../../../../../Common/Util/Constant";
import endImg from "../images/end.png";

export const data = {
  title: "고급 7. 스위치를 향해 가는 로봇",
  image: OCP_IMAGES.advanced.level7.cover,
  state: null,
  level: 7,
  currentStageNum: 0,
  stages: [
    {
      title: "스토리",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.advanced.level7.story,
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
      imgSrc: OCP_IMAGES.advanced.level7.mission1,
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
      imgSrc: OCP_IMAGES.advanced.level7.description1,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "robot_g",
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
                      value: "fly"
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
                    name: "onKey"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "right"
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
                                name: "setVelocityX"
                              },
                              arguments: [
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
            ],
            sourceType: "module"
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "onKey",
            sceneId: "scene2",
            spriteId: "robot_g",
            key: "right"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data:
            "실행 버튼을 누르고 오른쪽 방향키를 눌렀을 때 로봇이 오른쪽으로 움직이는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level7.hint1
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level7.answer1
        }
      ]
    },
    {
      title: "미션2",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.advanced.level7.mission2,
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
      imgSrc: OCP_IMAGES.advanced.level7.description2,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "robot_g",
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
                      value: "fly"
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
                    name: "onKey"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "right"
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
                                name: "setVelocityX"
                              },
                              arguments: [
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
              },
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "onKeyUp"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "right"
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
                                name: "setVelocityX"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: 0
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
            api: "onKeyUp",
            sceneId: "scene2",
            spriteId: "robot_g",
            key: "right"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data:
            "실행 버튼을 누르고 오른쪽 방향키를 눌렀다 떼었을 때, 로봇이 멈추는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level7.hint2
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level7.answer2
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
          door_g: {
            type: "sprite",
            assetId: "door_g",
            code:
              'onClick(function(){\n    say("아래에 무언가가 있지만 손이 닿지 않는다",1)\n})',
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
          machine_e: {
            type: "sprite",
            assetId: "machine_e",
            code:
              'onClick(function(){\n    say("배터리를 찾았다!",1)\n    sendSignal("getBattery")\n})\n\n    ',
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
          battery_c: {
            type: "sprite",
            assetId: "battery_c",
            code:
              'onSignal("getBattery",function(){\n    moveTo(824,300)\n    setDraggable(true)\n})\n\nonSignal("useBattery",function(){\n    kill()\n})\n',
            locked: true,
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
          robot_g: {
            type: "sprite",
            assetId: "robot_g_v3",
            code:
              'var isBatteryOn = false\n\nonClick(function(){\n    if(isBatteryOn==true) {\n        say("이제 움직일 수 있다!",1)\n    }else{\n        say("배터리가 없어서 움직일 수 없다.",1)\n    }\n})\n\nonOverlap("battery_c",function(){\n    sendSignal("useBattery")\n    say("배터리를 연결했다",1)\n    playAnimation("idle",true)\n    isBatteryOn = true\n    setDraggable(true)\n})\n\n',
            locked: true,
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
      },
      scene2: {
        sceneName: "scene2",
        sprites: {
          effect_beam_d: {
            type: "sprite",
            assetId: "effect_beam_d_v6",
            code:
              "setVelocityY(500)\nonOutStage(function(){\n    goTo(450,0)\n})\n",
            locked: true,
            preview: {
              name: "effect_beam_d",
              type: "sprite",
              subtype: null,
              angle: 179.7041785012613,
              left: 450,
              top: 147.74742190888017,
              scaleX: 0.7000000000000001,
              scaleY: 0.7000000000000001,
              width: 61,
              height: 163,
              opacity: 1,
              scale: "70"
            }
          },
          "effect_beam_d(2)": {
            type: "sprite",
            assetId: "effect_beam_d_v6",
            code:
              "setVelocityY(-400)\nonOutStage(function(){\n    goTo(800,720)\n})\n",
            locked: true,
            preview: {
              name: "effect_beam_d(2)",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 800,
              top: 450,
              scaleX: 0.7000000000000001,
              scaleY: 0.7000000000000001,
              width: 61,
              height: 163,
              opacity: 1,
              scale: "70"
            }
          },
          "effect_beam_d(3)": {
            type: "sprite",
            assetId: "effect_beam_d_v6",
            code:
              "setVelocityY(500)\nonOutStage(function(){\n    goTo(950,0)\n})\n",
            locked: true,
            preview: {
              name: "effect_beam_d(3)",
              type: "sprite",
              subtype: null,
              angle: 178.837889128685,
              left: 950,
              top: 92.02788765300069,
              scaleX: 0.7000000000000001,
              scaleY: 0.7000000000000001,
              width: 61,
              height: 163,
              opacity: 1,
              scale: "70"
            }
          },
          basement: {
            type: "background",
            assetId: "basement",
            code: 'playSound("gym_trap", false)',
            locked: true,
            preview: {
              name: "basement",
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
          robot_g: {
            type: "sprite",
            assetId: "robot_g_v3",
            code: `playAnimation("fly",true)\nsay("저 스위치는 뭘까?",1)\n\n// 여기부터 코드를 작성해보세요.\n`,
            preview: {
              name: "robot_g",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 133.85092026955348,
              top: 366.4707412406692,
              scaleX: 0.5,
              scaleY: 0.5,
              width: 196,
              height: 266,
              opacity: 1,
              scale: "50"
            }
          }
        },
        spriteIds: [
          "basement",
          "effect_beam_d",
          "effect_beam_d(2)",
          "effect_beam_d(3)",
          "robot_g"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/e99a5650950a39476e1e531d99129698.jpg"
      }
    },
    sceneIds: ["scene2", "scene1"],
    soundIds: ["fantasy_dream_v2", "gym_trap", "fresh_upbeat_v4", "hit_4"],
    timeStamp: 1590977183459,
    editorMode: "javascript-wiz"
  },
  interaction: {
    selected: {
      objects: {
        scene1: { name: "door_g", type: "sprite" },
        scene2: { name: "robot_g", type: "sprite" }
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
