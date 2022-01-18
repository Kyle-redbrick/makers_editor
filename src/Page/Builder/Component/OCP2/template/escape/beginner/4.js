import {
  VideoClassStageType as StageType,
  VideoClassConditionType as ConditionType,
  VideoClassEgoType as EgoType,
  VCTYPE
} from "../../../../../../../Common/Util/Constant";

import { OCP_IMAGES } from "../../../../../../../Common/Util/Constant";

import endImg from "../images/end.png";

export const data = {
  title: "초급 4. 숨겨진 열쇠는 어디에?",
  state: null,
  image: OCP_IMAGES.beginner.level4.cover,
  level: 4,
  currentStageNum: 0,
  stages: [
    {
      type: StageType.START,
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ],
      imgSrc: OCP_IMAGES.beginner.level4.story
    },
    {
      type: StageType.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level4.mission1,
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: StageType.CODE,
      conditions: [
        { type: ConditionType.PLAY_ONCE },
        {
          type: ConditionType.CODE_EXIST,
          sceneId: "scene1",
          spriteId: "key_d",
          code: [
            {
              type: "function",
              name: "hide",
              children: []
            }
          ]
        }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "게임 실행시 열쇠가 보이지 않게 만들자!"
        }
      ],
      hint: [
        {
          type: EgoType.IMAGE,
          data: OCP_IMAGES.beginner.level4.hint1
        }
      ],
      answer: [
        { type: EgoType.IMAGE, data: OCP_IMAGES.beginner.level4.answer1 }
      ],
      imgSrc: OCP_IMAGES.beginner.level4.description1
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level4.select1,
      conditions: [
        {
          type: VCTYPE.CONDITION.SPRITE_SELECTED,
          sceneId: "scene1",
          spriteId: "frame_a"
        }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "코드를 작성하기 전에\n먼저 스프라이트를 선택하자!"
        }
      ]
    },
    {
      type: StageType.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level4.mission2,
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },

    {
      type: StageType.CODE,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "frame_a",
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
                                name: "playAnimation"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "hide"
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
        { type: ConditionType.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "playAnimation",
            sceneId: "scene1",
            spriteId: "frame_a",
            name: "hide"
          }
        }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "코드를 작성해서\n액자를 클릭했을 때 그림이 사라지도록 해보자!"
        }
      ],
      hint: [
        {
          type: EgoType.IMAGE,
          data: OCP_IMAGES.beginner.level4.hint2
        }
      ],
      answer: [
        { type: EgoType.IMAGE, data: OCP_IMAGES.beginner.level4.answer2 }
      ],
      imgSrc: OCP_IMAGES.beginner.level4.description2
    },
    {
      type: StageType.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level4.mission3,
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: StageType.CODE,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "frame_a",
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
                                name: "playAnimation"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "hide"
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
                                  value: "key"
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
          type: EgoType.TEXT,
          data: "sendSignal 명령어를 활용해서\n열쇠 스프라이트에 신호를 보내봐!"
        }
      ],
      hint: [
        {
          type: EgoType.IMAGE,
          data: OCP_IMAGES.beginner.level4.hint3
        }
      ],
      answer: [
        { type: EgoType.IMAGE, data: OCP_IMAGES.beginner.level4.answer3 }
      ],
      imgSrc: OCP_IMAGES.beginner.level4.description3
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level4.select2,
      conditions: [
        {
          type: VCTYPE.CONDITION.SPRITE_SELECTED,
          sceneId: "scene1",
          spriteId: "key_d"
        }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "코드를 작성하기 전에\n먼저 스프라이트를 선택하자!"
        }
      ]
    },
    {
      type: StageType.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level4.mission4,
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: StageType.CODE,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "key_d",
          code: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "hide"
                  },
                  arguments: []
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
                      value: "key",
                      raw: '"key"'
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
                                name: "show"
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
        { type: ConditionType.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "show",
            sceneId: "scene1",
            spriteId: "key_d"
          }
        }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data:
            "코드를 작성해서\n액자로부터 신호를 받았을 때 열쇠가 나타나도록 해보자!"
        }
      ],
      hint: [
        {
          type: EgoType.IMAGE,
          data: OCP_IMAGES.beginner.level4.hint4
        }
      ],
      answer: [
        { type: EgoType.IMAGE, data: OCP_IMAGES.beginner.level4.answer4 }
      ],
      imgSrc: OCP_IMAGES.beginner.level4.description4
    },
    {
      type: StageType.END,
      ego: [
        {
          type: EgoType.TEXT,
          data: "수업을 모두 마쳤어!\n대단한걸?\n다음 수업에서 또 보자!"
        }
      ],
      imgSrc: endImg
    }
  ]
};

export const state = {
  scene: {
    scenes: {
      scene1: {
        sceneName: "scene1",
        sprites: {
          room_b: {
            type: "background",
            assetId: "room_b",
            code: "",
            locked: true,
            preview: {
              name: "room_b",
              type: "background",
              angle: 0,
              left: 0,
              top: 0,
              scaleX: 1,
              scaleY: 1,
              width: 1280,
              height: 720,
              opacity: 1
            }
          },
          door_e: {
            type: "sprite",
            assetId: "door_e_v2",
            code: "onClick(function(){\n    shake()\n})",
            locked: true,
            preview: {
              name: "door_e",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1180.115606936416,
              top: 355.0430292598967,
              scaleX: 1,
              scaleY: 1,
              width: 163,
              height: 644,
              opacity: 1
            }
          },
          desk: {
            type: "sprite",
            assetId: "desk",
            code: 'onClick(function(){\n    say("아무 것도 없다.",1)\n})',
            locked: true,
            preview: {
              name: "desk",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 636.300578034682,
              top: 410.80895008605853,
              scaleX: 1,
              scaleY: 1,
              width: 616,
              height: 275,
              opacity: 1
            }
          },
          clock_a: {
            type: "sprite",
            assetId: "clock_a",
            code:
              'playAnimation("idle",true)\nonClick(function(){\n    say("딱히 특별한 것이 없다.",1)\n})',
            locked: true,
            preview: {
              name: "clock_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 423.5193979276554,
              top: 164.6195078191965,
              scaleX: 0.7273521388124453,
              scaleY: 0.7273521388124453,
              width: 204,
              height: 206,
              opacity: 1
            }
          },
          suitcase: {
            type: "sprite",
            assetId: "suitcase",
            locked: true,
            code: 'onClick(function(){\n    say("잠겨 있다.",1)\n})',
            preview: {
              name: "suitcase",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 357.61078998073225,
              top: 611.566265060241,
              scaleX: 1,
              scaleY: 1,
              width: 286,
              height: 257,
              opacity: 1
            }
          },
          light_i: {
            type: "sprite",
            assetId: "light_i",
            locked: true,
            code:
              'onClick(function(){\n    playAnimation("on",true)\n    say("불이 켜졌다.",1)\n})',
            preview: {
              name: "light_i",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 997.6107899807322,
              top: 337.6936316695353,
              scaleX: 1,
              scaleY: 1,
              width: 270,
              height: 374,
              opacity: 1
            }
          },
          frame_a: {
            type: "sprite",
            assetId: "frame_a",
            code: "",
            preview: {
              name: "frame_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 129.47976878612718,
              top: 195.18072289156626,
              scaleX: 1,
              scaleY: 1,
              width: 152,
              height: 297,
              opacity: 1
            }
          },
          key_d: {
            type: "sprite",
            assetId: "key_d_v5",
            code: "",
            preview: {
              name: "key_d",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 141.33333333333331,
              top: 200.8988764044944,
              scaleX: 0.2,
              scaleY: 0.2,
              width: 160,
              height: 377,
              opacity: 1,
              scale: "20"
            }
          }
        },
        spriteIds: [
          "room_b",
          "door_e",
          "desk",
          "clock_a",
          "light_i",
          "suitcase",
          "frame_a",
          "key_d"
        ],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/a211b7706fa5a37f1840d003517f6aec.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: [],
    timeStamp: 1583459004652
  },
  interaction: {
    selected: {
      objects: { scene1: { name: "key_d", type: "sprite" } },
      api: "ID_MOTION",
      method: null,
      scene: "scene1"
    },
    jukebox: {
      isPlaying: false,
      path: null,
      type: null,
      id: null,
      listName: null
    }
  },
  preview: {
    isPlaying: false,
    isFullScreen: false,
    screenMode: "HORIZONTAL",
    volume: 100
  }
};
