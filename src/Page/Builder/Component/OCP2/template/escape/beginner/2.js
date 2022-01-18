import {
  VideoClassStageType as StageType,
  VideoClassConditionType as ConditionType,
  VideoClassEgoType as EgoType,
  VCTYPE
} from "../../../../../../../Common/Util/Constant";

import { OCP_IMAGES } from "../../../../../../../Common/Util/Constant";
import endImg from "../images/end.png";

export const data = {
  title: "초급 2. 수상한 가구들",
  state: null,
  image: OCP_IMAGES.beginner.level2.cover,
  level: 2,
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
      imgSrc: OCP_IMAGES.beginner.level2.story
    },
    {
      type: StageType.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level2.mission1,
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: StageType.IMAGE,
      ego: [
        {
          type: EgoType.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ],
      imgSrc: OCP_IMAGES.beginner.level2.tutorial
    },
    {
      type: StageType.CODE,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "clock_a",
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
                      value: "idle"
                    },
                    {
                      type: "Literal",
                      isLoose: true
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
            spriteId: "clock_a",
            name: "idle"
          }
        }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "코드를 작성해서\n시계가 애니메이션을 재생하게 만들자!"
        }
      ],
      hint: [
        {
          type: EgoType.IMAGE,
          data: OCP_IMAGES.beginner.level2.hint1
        }
      ],
      answer: [
        { type: EgoType.IMAGE, data: OCP_IMAGES.beginner.level2.answer1 }
      ],
      imgSrc: OCP_IMAGES.beginner.level2.description1
    },
    {
      type: StageType.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level2.mission2,
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
          spriteId: "clock_a",
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
            api: "onClick",
            sceneId: "scene1",
            spriteId: "clock_a"
          }
        }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "코드를 작성해서\n시계를 클릭했을 때 메세지를 띄우자!"
        }
      ],
      hint: [
        {
          type: EgoType.IMAGE,
          data: OCP_IMAGES.beginner.level2.hint2
        }
      ],
      answer: [
        { type: EgoType.IMAGE, data: OCP_IMAGES.beginner.level2.answer2 }
      ],
      imgSrc: OCP_IMAGES.beginner.level2.description2
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: OCP_IMAGES.beginner.level2.select1,
      conditions: [
        {
          type: VCTYPE.CONDITION.SPRITE_SELECTED,
          sceneId: "scene1",
          spriteId: "desk"
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
      imgSrc: OCP_IMAGES.beginner.level2.mission3,
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
          permanent: true,
          sceneId: "scene1",
          spriteId: "desk",
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
            api: "onClick",
            sceneId: "scene1",
            spriteId: "desk"
          }
        }
      ],
      ego: [
        {
          type: EgoType.TEXT,
          data: "코드를 작성해서\n책상를 클릭했을 때 메세지를 띄우자!"
        }
      ],
      hint: [
        {
          type: EgoType.IMAGE,
          data: OCP_IMAGES.beginner.level2.hint3
        }
      ],
      answer: [
        { type: EgoType.IMAGE, data: OCP_IMAGES.beginner.level2.answer3 }
      ],
      imgSrc: OCP_IMAGES.beginner.level2.description3
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
            assetId: "desk_v2",
            code:  "",
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
            code:  "",
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
          }
        },
        spriteIds: ["room_b", "door_e", "desk", "clock_a"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/a211b7706fa5a37f1840d003517f6aec.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: [],
    timeStamp: 1583416025470
  },
  interaction: {
    selected: {
      objects: { scene1: { name: "clock_a", type: "sprite" } },
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
