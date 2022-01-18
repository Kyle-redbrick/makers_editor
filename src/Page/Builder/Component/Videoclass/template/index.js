import { VCTYPE } from "../../../../../Common/Util/Constant";

export default {
  currentStepNum: 1,
  customSpriteIdMap: {},
  steps: [
    {
      /** step1] 인트로동영상 */
      type: VCTYPE.STEP.VIDEO,
      title: "失控的水晶球",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_01.mp4"
    },
    {
      /** step2] 게임실행하기 - 스프라이트 클릭하기 */
      type: VCTYPE.STEP.CODE,
      title: "任务1",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_00-1.jpg",
      conditions: [
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { api: "onClick", sceneId: "scene1", spriteId: "gear_button" }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { api: "onClick", sceneId: "scene1", spriteId: "clock_star" }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: { api: "onClick", sceneId: "scene1", spriteId: "planet_star" }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "실행해보기"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "点击运行按钮，运行一下奇妙屋。"
        }
      ]
    },
    {
      /** step3] 동영상 */
      type: VCTYPE.STEP.VIDEO,
      title: "寻找失踪的Hoi",
      img: "",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_02.mp4"
    },
    {
      /** step4] 게임실행하기 - 오카 움직여서 방에 들어가보기  */
      type: VCTYPE.STEP.CODE,
      title: "任务2",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_00-2.jpg",
      conditions: [
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "onOverlap",
            sceneId: "scene1",
            spriteId: "door_star",
            targetSpriteId: "oca_2"
          }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "onOverlap",
            sceneId: "scene1",
            spriteId: "slide_blue",
            targetSpriteId: "oca_2"
          }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "onOverlap",
            sceneId: "scene1",
            spriteId: "door_cloud",
            targetSpriteId: "oca_2"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "실행해보기 // 방향키를 이용해 오카를 움직여보기"
        }
      ]
    },
    {
      /** step5] 동영상  */
      type: VCTYPE.STEP.VIDEO,
      title: "进入齿轮星空",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_03.mp4"
    },
    {
      /** step6] 실행 - 씬2 앞으로 가져오기  */
      type: VCTYPE.STEP.CODE,
      title: "任务3",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_01.png",
      conditions: [
        {
          type: VCTYPE.CONDITION.SCENE_FIRST,
          sceneId: "scene2"
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "씬 맨 앞으로 가져오기 "
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "用鼠标把scene2拖拽到scene1的左侧。"
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "用鼠标把scene2拖拽到scene1的左侧"
        }
      ]
    },
    {
      /** step7] 비디오  */
      type: VCTYPE.STEP.VIDEO,
      title: "Oca的变身",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_04.mp4"
    },
    {
      /** step8] 코드입력 - oca2에게 playanimation  */
      type: VCTYPE.STEP.CODE,
      title: "任务4",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_02.png",
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "oca_2",
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
                      value: "happy"
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
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "playAnimation",
            sceneId: "scene2",
            spriteId: "oca_2"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "playanimation(name)을입력하기"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "playAnimation指令，把括号中的name更改为happy。"
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.TEXT,
          data: `playAnimation("happy",true)`
        }
      ]
    },
    {
      /** step9] 비디오  */
      type: VCTYPE.STEP.VIDEO,
      title: "救援前的鼓励",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_05.mp4"
    },
    {
      /** step10] 코드입력 - oca2에게 say입력  */
      type: VCTYPE.STEP.CODE,
      title: "任务5",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_03.png",
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "oca_2",
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
                      value: "happy"
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
              }
            ],
            sourceType: "module"
          }
        },
        { type: VCTYPE.CONDITION.PLAY_ONCE },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "say",
            sceneId: "scene2",
            spriteId: "oca_2"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: " say코드 입력하기 "
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "say指令，引用符号中 “我来救你”，时间设置为3秒。"
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.TEXT,
          data: `say("我来救你",3)`
        }
      ]
    },
    {
      /** step11] 비디오  */
      type: VCTYPE.STEP.VIDEO,
      title: "开始救援",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_06.mp4"
    },
    {
      /** step12] oca2에게 moveY입력  */
      type: VCTYPE.STEP.CODE,
      title: "任务6",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_04.png",
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "oca_2",
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
                      value: "happy"
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 100
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
            api: "moveY",
            sceneId: "scene2",
            spriteId: "oca_2",
            steps: 100
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "moveY 코드 입력하기 "
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "moveY指令，使用默认的数字100。"
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.TEXT,
          data: `moveY(100)`
        }
      ]
    },
    {
      /** step13] 비디오  */
      type: VCTYPE.STEP.VIDEO,
      title: "未知的危险",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_07.mp4"
    },
    {
      /** step14] 코드입력 - moveX(100)  */
      type: VCTYPE.STEP.CODE,
      title: "任务7",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_05.png",
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "oca_2",
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
                      value: "happy"
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 100
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 100
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
            api: "moveY",
            sceneId: "scene2",
            spriteId: "oca_2",
            steps: 100
          }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "moveX",
            sceneId: "scene2",
            spriteId: "oca_2",
            steps: 100
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "moveX코드 입력하기 "
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "moveX指令，使用默认的数字100。"
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.TEXT,
          data: `moveX(100)`
        }
      ]
    },
    {
      type: VCTYPE.STEP.VIDEO,
      title: "坠落星空",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_08.mp4"
    },
    {
      /** step14] 코드입력 - moveX(600)  */
      type: VCTYPE.STEP.CODE,
      title: "任务8",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_06.png",
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "oca_2",
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
                      value: "happy"
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 100
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 600
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
            api: "moveY",
            sceneId: "scene2",
            spriteId: "oca_2",
            steps: 100
          }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "moveX",
            sceneId: "scene2",
            spriteId: "oca_2",
            steps: 600
          }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "kill",
            sceneId: "scene2",
            spriteId: "oca_2"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "moveX값을 600으로 수정하기"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "修改moveX指令，把数字100改为600。"
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.TEXT,
          data: `moveX(600)`
        }
      ]
    },
    {
      type: VCTYPE.STEP.VIDEO,
      title: "逃离宇宙飞船",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_09.mp4"
    },
    {
      /** step14] 코드입력 - moveX(400)  */
      type: VCTYPE.STEP.CODE,
      title: "任务9",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_07.png",
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "oca_2",
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
                      value: "happy"
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 100
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 400
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
            api: "moveY",
            sceneId: "scene2",
            spriteId: "oca_2",
            steps: 100
          }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "moveX",
            sceneId: "scene2",
            spriteId: "oca_2",
            steps: 400
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "moveX값을 600으로 수정하기"
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "修改moveX指令，把数字600改为400。"
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.TEXT,
          data: `moveX(400)`
        }
      ]
    },
    {
      type: VCTYPE.STEP.VIDEO,
      title: "向Hoi发起冲刺",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_10.mp4"
    },
    {
      /** step16] 이벤트발생체크 - 오카와 호이가 닿았을때  */
      type: VCTYPE.STEP.CODE,
      title: "任务10",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_08.png",
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "oca_2",
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
                      value: "happy"
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 100
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 400
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 150
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 300
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "UnaryExpression",
                      operator: "-",
                      prefix: true,
                      argument: {
                        type: "Literal",
                        value: 150
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 300
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
            animationName: "get",
            api: "playAnimation",
            sceneId: "scene2",
            spriteId: "bubble_hoi"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "오카와 호이가 만나도록 만들기 "
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "根据路线图，编写移动的指令。"
        }
      ]
    },
    {
      /** step17] 비디오  */
      type: VCTYPE.STEP.VIDEO,
      title: "有些奇怪的Oca",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_11.mp4"
    },
    {
      /** step18] 코드입력 - playanimation(walk)  */
      type: VCTYPE.STEP.CODE,
      title: "任务11",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_09.png",
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "oca_2",
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
                      value: "happy"
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
                    name: "playAnimation"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "walk"
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 100
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 400
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 150
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 300
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "UnaryExpression",
                      operator: "-",
                      prefix: true,
                      argument: {
                        type: "Literal",
                        value: 150
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 300
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
            animationName: "get",
            api: "playAnimation",
            sceneId: "scene2",
            spriteId: "bubble_hoi"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "playanimation(walk)코드 입력하기  "
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "编写playAnimation指令，把括号中的name更改为walk。"
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.TEXT,
          data: `playAnimation("walk",true)`
        }
      ]
    },
    {
      /** step19] 비디오  */
      type: VCTYPE.STEP.VIDEO,
      title: "水平翻转",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_12.mp4"
    },
    {
      /** step20] 코드입력 - setFlip입력, playanimation입력  */
      type: VCTYPE.STEP.CODE,
      title: "任务12",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_10.png",
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "oca_2",
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
                      value: "happy"
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
                    name: "playAnimation"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "walk"
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 100
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
                    name: "setFlipX"
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
                    name: "playAnimation"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "side_walk"
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 400
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 150
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 300
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "UnaryExpression",
                      operator: "-",
                      prefix: true,
                      argument: {
                        type: "Literal",
                        value: 150
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 300
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
            animationName: "get",
            api: "playAnimation",
            sceneId: "scene2",
            spriteId: "bubble_hoi"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: " setFlip코드 입력하기  "
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "利用setFlipX和playAnimation指令相结合，实现向右走的动画。"
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.TEXT,
          data: `setFlipX(true)\nplayAnimation("side_walk",true)`
        }
      ]
    },
    {
      /** step21] 비디오  */
      type: VCTYPE.STEP.VIDEO,
      title: "行动恢复的Oca",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_13.mp4"
    },
    {
      /** step22] 코드입력 playanimation  */
      type: VCTYPE.STEP.CODE,
      title: "任务13",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_11.png",
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_AST,
          sceneId: "scene2",
          spriteId: "oca_2",
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
                      value: "happy"
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
                    name: "playAnimation"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "walk"
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 100
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
                    name: "setFlipX"
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
                    name: "playAnimation"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "side_walk"
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 400
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
                      value: "walk"
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 150
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
                      value: "side_walk"
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 300
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
                      value: "back_walk"
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
                    name: "moveY"
                  },
                  arguments: [
                    {
                      type: "UnaryExpression",
                      operator: "-",
                      prefix: true,
                      argument: {
                        type: "Literal",
                        value: 150
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
                    name: "playAnimation"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: "side_walk"
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
                    name: "moveX"
                  },
                  arguments: [
                    {
                      type: "Literal",
                      value: 300
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
            animationName: "walk",
            api: "playAnimation",
            sceneId: "scene2",
            spriteId: "oca_2"
          }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            animationName: "get",
            api: "playAnimation",
            sceneId: "scene2",
            spriteId: "bubble_hoi"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: " playanimation코드 입력하기  "
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "根据路线图，补充Oca走路的动画。"
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.TEXT,
          data: `playAnimation("walk",true)\nmoveY(150)\nplayAnimation("side_walk",true)\nmoveX(300)\nplayAnimation("back_walk",true)\nmoveY(-150)\nplayAnimation("side_walk",true)\nmoveX(300)`
        }
      ]
    },
    {
      /** step23] 비디오  */
      type: VCTYPE.STEP.VIDEO,
      title: "马力调整",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_14.mp4"
    },
    {
      /** step24] 코드입력 - movespeed  */
      type: VCTYPE.STEP.CODE,
      title: "任务14",
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/image/1-1_12.png",
      conditions: [
        {
          type: VCTYPE.CONDITION.CODE_EXIST,
          permanent: true,
          sceneId: "scene2",
          spriteId: "oca_2",
          code: [
            {
              type: "function",
              name: "setMoveSpeed",
              children: []
            }
          ]
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            api: "setMoveSpeed",
            sceneId: "scene2",
            spriteId: "oca_2"
          }
        },
        {
          type: VCTYPE.CONDITION.GAME_EVENT,
          event: {
            animationName: "get",
            api: "playAnimation",
            sceneId: "scene2",
            spriteId: "bubble_hoi"
          }
        }
      ],
      ego: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "[자기주도] setMoveSpeed(35)코드 입력하기  "
        }
      ],
      hint: [
        {
          type: VCTYPE.EGO.TEXT,
          data: "setMoveSpeed指令，把100改成35。"
        }
      ],
      answer: [
        {
          type: VCTYPE.EGO.TEXT,
          data: `setMoveSpeed(35)`
        }
      ]
    },
    {
      /** step25] 마무리 비디오  */
      type: VCTYPE.STEP.VIDEO,
      title: "胜利的分享",
      videoSrc:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/1-1/video/lecture1_level1_15.mp4"
    },
    {
      type: VCTYPE.STEP.QUIZ,
      img:
        "https://wizschool-chn-videoclass.oss-cn-beijing.aliyuncs.com/common/image/img_final.png"
    }
  ]
};
