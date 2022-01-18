import { VCTYPE } from "../../../../../../../Common/Util/Constant";
import { OCP_IMAGES } from "../../../../../../../Common/Util/Constant";
import endImg from "../images/end.png";

export const data = {
  image: OCP_IMAGES.advanced.level2.cover,
  title: "고급 2. 충전 기계에서 배터리 찾기",
  state: null,
  level: 2,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ],
      imgSrc: OCP_IMAGES.advanced.level2.story
    },
    // mission 1
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.advanced.level2.mission1,
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
      imgSrc: OCP_IMAGES.advanced.level2.description1,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "machine_e",
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
                                name: "sendSignal"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "getBattery"
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
            sceneId: "scene1",
            spriteId: "machine_e"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data:
            "실행 버튼을 누르고 충전 기계를 클릭하면 말풍선이 뜨는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level2.hint1
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level2.answer1
        }
      ]
    },

    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.advanced.level2.select1,
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
      imgSrc: OCP_IMAGES.advanced.level2.mission2,
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
      imgSrc: OCP_IMAGES.advanced.level2.description2,
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
            api: "moveTo",
            sceneId: "scene1",
            spriteId: "battery_c"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data:
            "실행 버튼을 누르고 충전 기계를 클릭하면 배터리가 나오는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level2.hint2
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level2.answer2
        }
      ]
    },
    {
      title: "미션3",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.advanced.level2.mission3,
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션3 - 코딩",
      type: VCTYPE.STEP.CODE,
      imgSrc: OCP_IMAGES.advanced.level2.description3,
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
              }
            ],
            sourceType: "module"
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "setDraggable",
            sceneId: "scene1",
            spriteId: "battery_c",
            enabled: true
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data:
            "실행 버튼을 누르고 충전 기계를 클릭해서 나오는 배터리를 마우스로 드래그하면 움직이는지 확인해 보세요"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level2.hint3
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: OCP_IMAGES.advanced.level2.answer3
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
            code: "",
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
            code: "",
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
          }
        },
        spriteIds: [
          "room_d",
          "door_f",
          "monitor_a",
          "door_g",
          "battery_c",
          "machine_e"
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
        scene1: { name: "machine_e", type: "sprite" }
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
