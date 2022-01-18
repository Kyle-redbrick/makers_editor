import { VCTYPE } from "../../../../../../../../Common/Util/Constant";

export const data = {
  level: 2,
  title: "고급 2단계 <건너편을 향해서 전진>",
  image: null,
  currentStageNum: 0,
  stages: [
    {
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./2-1 story.png"),
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
      imgSrc: require("./2-1 start.png"),
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
      imgSrc: require("./2-1 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "button_ab_c",
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
                                name: "sendSignal"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  value: "run",
                                  raw: '"run"'
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
        // { type: VCTYPE.CONDITION.PLAY_ONCE },
        // {
        //   type: VCTYPE.CONDITION.GAME_EVENT,
        //   event: {
        //     api: "sendSignal"
        //   }
        // }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "방향키로 주인공을 움직이자."
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./2-1 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./2-1 answer.png")
        }
      ]
    },
    {
      title: "미션2 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./2-2 start.png"),
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
      imgSrc: require("./2-2 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "boy_d",
          code: {
            type: "Program",
            start: 0,
            end: 127,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 26,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 26,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 13,
                    name: "playAnimation"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 14,
                      end: 20,
                      value: "idle",
                      raw: '"idle"'
                    },
                    {
                      type: "Literal",
                      start: 21,
                      end: 25,
                      value: true,
                      raw: "true"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 27,
                end: 44,
                expression: {
                  type: "CallExpression",
                  start: 27,
                  end: 44,
                  callee: {
                    type: "Identifier",
                    start: 27,
                    end: 38,
                    name: "setGravityY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 39,
                      end: 43,
                      value: 2000,
                      raw: "2000"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 46,
                end: 127,
                expression: {
                  type: "CallExpression",
                  start: 46,
                  end: 127,
                  callee: {
                    type: "Identifier",
                    start: 46,
                    end: 54,
                    name: "onSignal"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 55,
                      end: 60,
                      value: "run",
                      raw: '"run"'
                    },
                    {
                      type: "FunctionExpression",
                      start: 61,
                      end: 126,
                      id: null,
                      expression: false,
                      generator: false,
                      async: false,
                      params: [],
                      body: {
                        type: "BlockStatement",
                        start: 71,
                        end: 126,
                        body: [
                          {
                            type: "ExpressionStatement",
                            start: 77,
                            end: 102,
                            expression: {
                              type: "CallExpression",
                              start: 77,
                              end: 102,
                              callee: {
                                type: "Identifier",
                                start: 77,
                                end: 90,
                                name: "playAnimation"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 91,
                                  end: 96,
                                  value: "run",
                                  raw: '"run"'
                                },
                                {
                                  type: "Literal",
                                  start: 97,
                                  end: 101,
                                  value: true,
                                  raw: "true"
                                }
                              ],
                              optional: false
                            }
                          },
                          {
                            type: "ExpressionStatement",
                            start: 107,
                            end: 124,
                            expression: {
                              type: "CallExpression",
                              start: 107,
                              end: 124,
                              callee: {
                                type: "Identifier",
                                start: 107,
                                end: 119,
                                name: "setVelocityX"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 120,
                                  end: 123,
                                  value: 400,
                                  raw: "400"
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
            ],
            sourceType: "module"
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "setVelocityX"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "화면 밖으로 나가면 처음\n위치로 돌아가는 주인공을 만들자"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./2-2 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./2-2 answer.png")
        }
      ]
    },
    // mission3
    {
      title: "미션3 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./2-3 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션3 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./2-3 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "boy_d",
          code: {
            type: "Program",
            start: 0,
            end: 172,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 26,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 26,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 13,
                    name: "playAnimation"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 14,
                      end: 20,
                      value: "idle",
                      raw: '"idle"'
                    },
                    {
                      type: "Literal",
                      start: 21,
                      end: 25,
                      value: true,
                      raw: "true"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 27,
                end: 44,
                expression: {
                  type: "CallExpression",
                  start: 27,
                  end: 44,
                  callee: {
                    type: "Identifier",
                    start: 27,
                    end: 38,
                    name: "setGravityY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 39,
                      end: 43,
                      value: 2000,
                      raw: "2000"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 46,
                end: 127,
                expression: {
                  type: "CallExpression",
                  start: 46,
                  end: 127,
                  callee: {
                    type: "Identifier",
                    start: 46,
                    end: 54,
                    name: "onSignal"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 55,
                      end: 60,
                      value: "run",
                      raw: '"run"'
                    },
                    {
                      type: "FunctionExpression",
                      start: 61,
                      end: 126,
                      id: null,
                      expression: false,
                      generator: false,
                      async: false,
                      params: [],
                      body: {
                        type: "BlockStatement",
                        start: 71,
                        end: 126,
                        body: [
                          {
                            type: "ExpressionStatement",
                            start: 77,
                            end: 102,
                            expression: {
                              type: "CallExpression",
                              start: 77,
                              end: 102,
                              callee: {
                                type: "Identifier",
                                start: 77,
                                end: 90,
                                name: "playAnimation"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 91,
                                  end: 96,
                                  value: "run",
                                  raw: '"run"'
                                },
                                {
                                  type: "Literal",
                                  start: 97,
                                  end: 101,
                                  value: true,
                                  raw: "true"
                                }
                              ],
                              optional: false
                            }
                          },
                          {
                            type: "ExpressionStatement",
                            start: 107,
                            end: 124,
                            expression: {
                              type: "CallExpression",
                              start: 107,
                              end: 124,
                              callee: {
                                type: "Identifier",
                                start: 107,
                                end: 119,
                                name: "setVelocityX"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 120,
                                  end: 123,
                                  value: 400,
                                  raw: "400"
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
                start: 129,
                end: 172,
                expression: {
                  type: "CallExpression",
                  start: 129,
                  end: 172,
                  callee: {
                    type: "Identifier",
                    start: 129,
                    end: 139,
                    name: "onOutStage"
                  },
                  arguments: [
                    {
                      type: "FunctionExpression",
                      start: 140,
                      end: 171,
                      id: null,
                      expression: false,
                      generator: false,
                      async: false,
                      params: [],
                      body: {
                        type: "BlockStatement",
                        start: 150,
                        end: 171,
                        body: [
                          {
                            type: "ExpressionStatement",
                            start: 156,
                            end: 169,
                            expression: {
                              type: "CallExpression",
                              start: 156,
                              end: 169,
                              callee: {
                                type: "Identifier",
                                start: 156,
                                end: 160,
                                name: "goTo"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 161,
                                  end: 164,
                                  value: 160,
                                  raw: "160"
                                },
                                {
                                  type: "Literal",
                                  start: 165,
                                  end: 168,
                                  value: 350,
                                  raw: "350"
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
            ],
            sourceType: "module"
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "goTo"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "방향키에서 손을 떼면\n멈추는 주인공을 만들자"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./2-3 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./2-3 answer.png")
        }
      ]
    },
    {
      title: "미션4 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./2-4 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션4 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./2-4 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "button_ab_c",
          code: {
            type: "Program",
            start: 0,
            end: 91,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 44,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 44,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 7,
                    name: "onClick"
                  },
                  arguments: [
                    {
                      type: "FunctionExpression",
                      start: 8,
                      end: 43,
                      id: null,
                      expression: false,
                      generator: false,
                      async: false,
                      params: [],
                      body: {
                        type: "BlockStatement",
                        start: 18,
                        end: 43,
                        body: [
                          {
                            type: "ExpressionStatement",
                            start: 24,
                            end: 41,
                            expression: {
                              type: "CallExpression",
                              start: 24,
                              end: 41,
                              callee: {
                                type: "Identifier",
                                start: 24,
                                end: 34,
                                name: "sendSignal"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 35,
                                  end: 40,
                                  value: "run",
                                  raw: '"run"'
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
                start: 46,
                end: 91,
                expression: {
                  type: "CallExpression",
                  start: 46,
                  end: 91,
                  callee: {
                    type: "Identifier",
                    start: 46,
                    end: 53,
                    name: "onClickUp"
                  },
                  arguments: [
                    {
                      type: "FunctionExpression",
                      start: 54,
                      end: 90,
                      id: null,
                      expression: false,
                      generator: false,
                      async: false,
                      params: [],
                      body: {
                        type: "BlockStatement",
                        start: 64,
                        end: 90,
                        body: [
                          {
                            type: "ExpressionStatement",
                            start: 70,
                            end: 88,
                            expression: {
                              type: "CallExpression",
                              start: 70,
                              end: 88,
                              callee: {
                                type: "Identifier",
                                start: 70,
                                end: 80,
                                name: "sendSignal"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 81,
                                  end: 87,
                                  value: "stop",
                                  raw: '"stop"'
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
            ],
            sourceType: "module"
          }
        }
        // { type: VCTYPE.CONDITION.PLAY_ONCE },
        // {
        //   type: VCTYPE.CONDITION.GAME_EVENT,
        //   event: {}
        // }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "방향키에서 손을 떼면\n멈추는 주인공을 만들자"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./2-4 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./2-4 answer.png")
        }
      ]
    },
    {
      title: "미션5 설명",
      type: VCTYPE.STEP.IMAGE,
      imgSrc: require("./2-5 start.png"),
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "다음 단계를 진행하려면\n우측 상단에 다음단계 버튼을 눌러줘!"
        }
      ]
    },
    {
      title: "미션5 코드",
      type: VCTYPE.STEP.CODE,
      imgSrc: require("./2-5 main.png"),
      successDelay: 3000,
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene1",
          spriteId: "boy_d",
          code: {
            type: "Program",
            start: 0,
            end: 258,
            body: [
              {
                type: "ExpressionStatement",
                start: 0,
                end: 26,
                expression: {
                  type: "CallExpression",
                  start: 0,
                  end: 26,
                  callee: {
                    type: "Identifier",
                    start: 0,
                    end: 13,
                    name: "playAnimation"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 14,
                      end: 20,
                      value: "idle",
                      raw: '"idle"'
                    },
                    {
                      type: "Literal",
                      start: 21,
                      end: 25,
                      value: true,
                      raw: "true"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 27,
                end: 44,
                expression: {
                  type: "CallExpression",
                  start: 27,
                  end: 44,
                  callee: {
                    type: "Identifier",
                    start: 27,
                    end: 38,
                    name: "setGravityY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 39,
                      end: 43,
                      value: 2000,
                      raw: "2000"
                    }
                  ],
                  optional: false
                }
              },
              {
                type: "ExpressionStatement",
                start: 46,
                end: 127,
                expression: {
                  type: "CallExpression",
                  start: 46,
                  end: 127,
                  callee: {
                    type: "Identifier",
                    start: 46,
                    end: 54,
                    name: "onSignal"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 55,
                      end: 60,
                      value: "run",
                      raw: '"run"'
                    },
                    {
                      type: "FunctionExpression",
                      start: 61,
                      end: 126,
                      id: null,
                      expression: false,
                      generator: false,
                      async: false,
                      params: [],
                      body: {
                        type: "BlockStatement",
                        start: 71,
                        end: 126,
                        body: [
                          {
                            type: "ExpressionStatement",
                            start: 77,
                            end: 102,
                            expression: {
                              type: "CallExpression",
                              start: 77,
                              end: 102,
                              callee: {
                                type: "Identifier",
                                start: 77,
                                end: 90,
                                name: "playAnimation"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 91,
                                  end: 96,
                                  value: "run",
                                  raw: '"run"'
                                },
                                {
                                  type: "Literal",
                                  start: 97,
                                  end: 101,
                                  value: true,
                                  raw: "true"
                                }
                              ],
                              optional: false
                            }
                          },
                          {
                            type: "ExpressionStatement",
                            start: 107,
                            end: 124,
                            expression: {
                              type: "CallExpression",
                              start: 107,
                              end: 124,
                              callee: {
                                type: "Identifier",
                                start: 107,
                                end: 119,
                                name: "setVelocityX"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 120,
                                  end: 123,
                                  value: 400,
                                  raw: "400"
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
                start: 129,
                end: 172,
                expression: {
                  type: "CallExpression",
                  start: 129,
                  end: 172,
                  callee: {
                    type: "Identifier",
                    start: 129,
                    end: 139,
                    name: "onOutStage"
                  },
                  arguments: [
                    {
                      type: "FunctionExpression",
                      start: 140,
                      end: 171,
                      id: null,
                      expression: false,
                      generator: false,
                      async: false,
                      params: [],
                      body: {
                        type: "BlockStatement",
                        start: 150,
                        end: 171,
                        body: [
                          {
                            type: "ExpressionStatement",
                            start: 156,
                            end: 169,
                            expression: {
                              type: "CallExpression",
                              start: 156,
                              end: 169,
                              callee: {
                                type: "Identifier",
                                start: 156,
                                end: 160,
                                name: "goTo"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 161,
                                  end: 164,
                                  value: 160,
                                  raw: "160"
                                },
                                {
                                  type: "Literal",
                                  start: 165,
                                  end: 168,
                                  value: 350,
                                  raw: "350"
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
                start: 174,
                end: 255,
                expression: {
                  type: "CallExpression",
                  start: 174,
                  end: 255,
                  callee: {
                    type: "Identifier",
                    start: 174,
                    end: 182,
                    name: "onSignal"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      start: 183,
                      end: 189,
                      value: "stop",
                      raw: '"stop"'
                    },
                    {
                      type: "FunctionExpression",
                      start: 190,
                      end: 254,
                      id: null,
                      expression: false,
                      generator: false,
                      async: false,
                      params: [],
                      body: {
                        type: "BlockStatement",
                        start: 200,
                        end: 254,
                        body: [
                          {
                            type: "ExpressionStatement",
                            start: 206,
                            end: 232,
                            expression: {
                              type: "CallExpression",
                              start: 206,
                              end: 232,
                              callee: {
                                type: "Identifier",
                                start: 206,
                                end: 219,
                                name: "playAnimation"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 220,
                                  end: 226,
                                  value: "idle",
                                  raw: '"idle"'
                                },
                                {
                                  type: "Literal",
                                  start: 227,
                                  end: 231,
                                  value: true,
                                  raw: "true"
                                }
                              ],
                              optional: false
                            }
                          },
                          {
                            type: "ExpressionStatement",
                            start: 237,
                            end: 252,
                            expression: {
                              type: "CallExpression",
                              start: 237,
                              end: 252,
                              callee: {
                                type: "Identifier",
                                start: 237,
                                end: 249,
                                name: "setVelocityX"
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  start: 250,
                                  end: 251,
                                  value: 0,
                                  raw: "0"
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
            ],
            sourceType: "module"
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "setVelocityX",
            value: 0
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "방향키에서 손을 떼면\n멈추는 주인공을 만들자"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./2-5 hint.png")
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.IMAGE,
          data: require("./2-5 answer.png")
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
          factory_f: {
            type: "background",
            assetId: "factory_f",
            code: "",
            preview: {
              name: "factory_f",
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
          undefined: { code: "" },
          boy_d: {
            type: "sprite",
            assetId: "boy_d_v3",
            code: `playAnimation("idle",true)
setGravityY(2000)
// 여기부터 코드를 작성해보세요.
`,
            preview: {
              name: "boy_d",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 169.44649446494466,
              top: 278.47682119205297,
              scaleX: 0.55,
              scaleY: 0.55,
              width: 234,
              height: 400,
              opacity: 1,
              scale: "55"
            }
          },
          plent_a: {
            type: "sprite",
            assetId: "plent_a_v2",
            code: "",
            preview: {
              name: "plent_a",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1159.4772090215383,
              top: 475.9907289746187,
              scaleX: 0.5709300403302527,
              scaleY: 0.5709300403302527,
              width: 506,
              height: 115,
              opacity: 1
            }
          },
          plent_c: {
            type: "sprite",
            assetId: "plent_c_v2",
            code: 'setCollision("boy_d")\nsetMovable(false)',
            preview: {
              name: "plent_c",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 165.31365313653134,
              top: 495.89403973509934,
              scaleX: 1,
              scaleY: 1,
              width: 256,
              height: 58,
              opacity: 1
            }
          },
          button_ab_c: {
            type: "sprite",
            assetId: "button_ab_c_v2",
            code: `// 여기부터 코드를 작성해보세요.
`,
            preview: {
              name: "button_ab_c",
              type: "sprite",
              subtype: null,
              angle: 0,
              left: 1138.3025830258302,
              top: 607.9470198675497,
              scaleX: 1,
              scaleY: 1,
              width: 121,
              height: 121,
              opacity: 1
            }
          }
        },
        spriteIds: ["factory_f", "plent_a", "plent_c", "boy_d", "button_ab_c"],
        preview:
          "https://wizschool-images.s3.ap-northeast-2.amazonaws.com/3d7a09b2a1cd02de4506d9f508c7664c.jpg"
      }
    },
    sceneIds: ["scene1"],
    soundIds: ["funky_v2", "victory_1"],
    timeStamp: 1602576051307,
    editorMode: null
  },
  interaction: {
    selected: {
      objects: { scene1: { name: "button_ab_c", type: "sprite" } },
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
