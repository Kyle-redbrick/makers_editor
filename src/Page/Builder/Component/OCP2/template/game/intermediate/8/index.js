import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 8,
  title: "중급 8단계. 실패조건",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./8-1 story.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./8-1 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./8-1 main.png"),
      successDelay: 2000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "witch",
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
                      value: "idle",
                      raw: '"idle"'
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
                    name: "say"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "시작!",
                      raw: '"시작!"',
                      isLoose: true
                    },
                    {
                      type: "Literal",
                      value: 1,
                      raw: "1"
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
                    name: "setGravityY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 1000,
                      raw: "1000"
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
                    name: "onScreenClick"
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
                                name: "setVelocityY"
                              },
                              arguments: [
                                {
                                  type: "UnaryExpression",
                                  operator: "-",
                                  prefix: true,
                                  argument: {
                                    type: "Literal",
                                    value: 400,
                                    raw: "400"
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
                      value: "pumpkin",
                      raw: '"pumpkin"'
                    },
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
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene2",
                                  raw: '"scene2"'
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
            api: "changeScene",
            name: "scene2"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "꼬마 마녀가 호박에 부딪히면\n실패 화면으로 바꾸자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./8-1 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./8-1 answer.png")
        }
      ]
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./8-2 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./8-2 main.png"),
      successDelay: 2000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "witch",
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
                      value: "idle",
                      raw: '"idle"'
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
                    name: "say"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "시작!",
                      raw: '"시작!"',
                      isLoose: true
                    },
                    {
                      type: "Literal",
                      value: 1,
                      raw: "1"
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
                    name: "setGravityY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 1000,
                      raw: "1000"
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
                    name: "onScreenClick"
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
                                name: "setVelocityY"
                              },
                              arguments: [
                                {
                                  type: "UnaryExpression",
                                  operator: "-",
                                  prefix: true,
                                  argument: {
                                    type: "Literal",
                                    value: 400,
                                    raw: "400"
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
                      value: "pumpkin",
                      raw: '"pumpkin"'
                    },
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
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene2",
                                  raw: '"scene2"'
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
                      value: "pumpkin_three",
                      raw: '"pumpkin_three"'
                    },
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
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene2",
                                  raw: '"scene2"'
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
            api: "changeScene",
            name: "scene2"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "꼬마 마녀가 호박벽에 부딪히면\n실패 화면으로 바꾸자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./8-2 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./8-2 answer.png")
        }
      ]
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./8-3 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./8-3 main.png"),
      successDelay: 2000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "witch",
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
                      value: "idle",
                      raw: '"idle"'
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
                    name: "say"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "시작!",
                      raw: '"시작!"',
                      isLoose: true
                    },
                    {
                      type: "Literal",
                      value: 1,
                      raw: "1"
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
                    name: "setGravityY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 1000,
                      raw: "1000"
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
                    name: "onScreenClick"
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
                                name: "setVelocityY"
                              },
                              arguments: [
                                {
                                  type: "UnaryExpression",
                                  operator: "-",
                                  prefix: true,
                                  argument: {
                                    type: "Literal",
                                    value: 400,
                                    raw: "400"
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
                      value: "pumpkin",
                      raw: '"pumpkin"'
                    },
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
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene2",
                                  raw: '"scene2"'
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
                      value: "pumpkin_three",
                      raw: '"pumpkin_three"'
                    },
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
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene2",
                                  raw: '"scene2"'
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
                      value: "little_ghost_a",
                      raw: '"little_ghost_a"'
                    },
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
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene2",
                                  raw: '"scene2"'
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
            api: "changeScene",
            name: "scene2"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "꼬마 마녀가 유령에 부딪히면\n실패 화면으로 바꾸자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./8-3 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./8-3 answer.png")
        }
      ]
    },
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./8-4 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./8-4 main.png"),
      successDelay: 2000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "witch",
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
                      value: "idle",
                      raw: '"idle"'
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
                    name: "say"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "시작!",
                      raw: '"시작!"'
                    },
                    {
                      type: "Literal",
                      value: 1,
                      raw: "1"
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
                    name: "setGravityY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 1000,
                      raw: "1000"
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
                    name: "onScreenClick"
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
                                name: "setVelocityY"
                              },
                              arguments: [
                                {
                                  type: "UnaryExpression",
                                  operator: "-",
                                  prefix: true,
                                  argument: {
                                    type: "Literal",
                                    value: 400,
                                    raw: "400"
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
                      value: "pumpkin",
                      raw: '"pumpkin"'
                    },
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
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene2",
                                  raw: '"scene2"'
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
                      value: "pumpkin_three",
                      raw: '"pumpkin_three"'
                    },
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
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene2",
                                  raw: '"scene2"'
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
                      value: "little_ghost_a",
                      raw: '"little_ghost_a"'
                    },
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
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene2",
                                  raw: '"scene2"'
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
                                name: "changeScene"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "scene2",
                                  raw: '"scene2"'
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
            api: "changeScene",
            name: "scene2"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "꼬마 마녀가 화면 밖으로\n나가면 실패 화면으로 바꾸자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./8-4 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./8-4 answer.png")
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
    sceneIds: ["scene1", "scene2"],
    soundIds: ["documentary_v3"],
    timeStamp: 1602491723796,
    scenes: {
      scene1: {
        sceneName: "scene1",
        spriteIds: [
          "halloween_red",
          "witch",
          "pumpkin",
          "pumpkin_three",
          "little_ghost_a"
        ],
        sprites: {
          witch: {
            type: "sprite",
            assetId: "witch_v18",
            code: `playAnimation("idle",true)
say("시작!",1)
setGravityY(1000)
onScreenClick(function(){
    setVelocityY(-400)
})
// 여기부터 코드를 작성해보세요.
`,
            preview: {
              name: "witch",
              type: "sprite",
              subtype: null,
              angle: 0,
              scaleX: 0.6,
              scaleY: 0.6,
              width: 390,
              height: 346,
              opacity: 1,
              left: 301.0226467665299,
              top: 329.5523129034166,
              scale: "060"
            }
          },
          pumpkin: {
            type: "sprite",
            assetId: "pumpkin_v14",
            code: `playAnimation("idle_a",true)
setVelocityX(-400)
onOutStage(function(){
    goTo(1280,150)
})`,
            preview: {
              name: "pumpkin",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 527,
              top: 150,
              scaleX: 1,
              scaleY: 1,
              width: 164,
              height: 146,
              opacity: 1
            }
          },
          pumpkin_three: {
            type: "sprite",
            assetId: "pumpkin_three_v8",
            code: `playAnimation("idle",true)
setVelocityX(-400)
onOutStage(function(){
    goTo(1280,570)
})`,
            preview: {
              name: "pumpkin_three",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 162,
              top: 570,
              scaleX: 1,
              scaleY: 1,
              width: 163,
              height: 300,
              opacity: 1
            }
          },
          little_ghost_a: {
            type: "sprite",
            assetId: "little_ghost_a",
            code: `playAnimation("attack",true)
setVelocityX(-400)
onOutStage(function(){
    goTo(1280,430)
})`,
            preview: {
              name: "little_ghost_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1015,
              top: 430,
              scaleX: 0.6620776651838008,
              scaleY: 0.6620776651838008,
              width: 288,
              height: 296,
              opacity: 1
            }
          },
          halloween_red: {
            type: "background",
            assetId: "halloween_red",
            code: `onFrame(function(){
    goX(-2)
})`,
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
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/93ad44ba46c1dc30b9e4664bb22c7ee0.jpg"
      },
      scene2: {
        sceneName: "scene2",
        sprites: {
          halloween_red: {
            type: "background",
            assetId: "halloween_red",
            code: ``,
            preview: {
              name: "halloween_red",
              type: "background",
              angle: 0,
              left: 0,
              top: -479,
              scaleX: 1,
              scaleY: 1,
              width: 1280,
              height: 1678,
              opacity: 1
            }
          },
          retry_c: {
            type: "sprite",
            assetId: "retry_c_v2",
            code: ``,
            preview: {
              name: "retry_c",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 638.3946391684408,
              top: 375.95520565451073,
              scaleX: 1.5992047805168355,
              scaleY: 1.5992047805168355,
              width: 239,
              height: 101,
              opacity: 1
            }
          }
        },
        spriteIds: ["halloween_red", "retry_c"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/39b858039425d256544fa67628b4a755.jpg"
      }
    }
  },
  interaction: {
    selected: {
      api: "ID_PHYSICS",
      method: null,
      scene: "scene1",
      objects: {
        scene1: { name: "witch", type: "sprite" },
        scene2: { name: "retry_c", type: "sprite" }
      }
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
