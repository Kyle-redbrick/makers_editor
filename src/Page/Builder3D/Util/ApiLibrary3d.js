class ApiLibrary3d {
  apiList = [
    {
      name: "ID_3D",
      api: [
        {
          name: "setTarget(name)",
          snippet: `setTarget("name")`,
          selection: "name",
          tip: {
            description: { ko: "카메라의 타겟을 설정하기" },
            params: [
              {
                name: "name",
                description: { ko: "카메라 타겟이 될 오브젝트의 이름" }
              }
            ],
            description2: {
              ko: "카메라가 따라다니며 촬영할 오브젝트를 설정한다."
            }
          }
        },
        {
          name: "setBillboard(enable, axis)",
          snippet: `setBillboard(true)`,
          selection: "true",
          tip: {
            description: { ko: "빌보드 모드 설정" },
            params: [
              { name: "enable", description: { ko: "빌보드 모드 설정 여부" } },
              {
                name: "axis",
                description: {
                  ko: '모드를 적용하려는 특정 축 이름 ("x"/"y"/"z")'
                }
              }
            ],
            description2: {
              ko:
                "Mesh나 텍스쳐GUI의 빌보드 모드를 설정한다.\n해당 축에 대해 어느 방향에서 봐도 정면으로 보이도록 한다.\n축 이름을 입력하지 않으면 모든 축에 적용된다."
            }
          }
        }
      ]
    },
    {
      name: "ID_MOTION",
      api: [
        {
          name: "enableDefaultControl(rotationSpeed, maxJump)",
          snippet: `enableDefaultControl(1, 1)`,
          selection: "1",
          tip: {
            description: { ko: "기본 움직임 컨트롤 활성화하기" },
            params: [
              { name: "rotationSpeed", description: { ko: "회전 속도" } },
              { name: "maxJump", description: { ko: "최대 점프 정도" } }
            ],
            description2: {
              ko:
                "방향키와 스페이스바를 사용한 Mesh 컨트롤을 활성화한다.\nenablePhysics()를 하지 않았어도 물리적 움직임을 위해 물리 영향을 받도록 설정된다."
            }
          }
        },
        {
          name: "disableDefaultControl()",
          snippet: `disableDefaultControl()`,
          tip: {
            description: { ko: "기본 움직임 컨트롤 비활성화하기" },
            description2: {
              ko: "방향키와 스페이스바를 사용한 Mesh 컨트롤을 비활성화한다."
            }
          }
        },
        {
          name: "getVirtualJoystick(isLeft)",
          snippet: `getVirtualJoystick(true)`,
          tip: {
            description: { ko: "왼쪽 또는 오른쪽 가상 조이스틱 가져오기" },
            params: [
              {
                name: "isLeft",
                description: { ko: "true 또는 false" }
              }
            ],
            description2: {
              ko:
                "화면 왼쪽 또는 오른쪽을 컨트롤로 사용하는 가상 조이스틱을 가져온다.\n플레이 시 확인할 수 있다."
            }
          }
        },
        {
          name: "setSpeedX(value)",
          snippet: `setSpeedX(100)`,
          selection: "100",
          tip: {
            description: { ko: "x축 속력 설정하기" },
            params: [
              {
                name: "value",
                description: { ko: "숫자(설정할 속력값)" }
              }
            ],
            description2: {
              ko: "x축에 대한 속력을 설정한다."
            }
          }
        },
        {
          name: "setSpeedY(value)",
          snippet: `setSpeedY(100)`,
          selection: "100",
          tip: {
            description: { ko: "y축 속력 설정하기" },
            params: [
              {
                name: "value",
                description: { ko: "숫자(설정할 속력값)" }
              }
            ],
            description2: {
              ko: "y축에 대한 속력을 설정한다."
            }
          }
        },
        {
          name: "setSpeedZ(value)",
          snippet: `setSpeedZ(100)`,
          selection: "100",
          tip: {
            description: { ko: "z축 속력 설정하기" },
            params: [
              {
                name: "value",
                description: { ko: "숫자(설정할 속력값)" }
              }
            ],
            description2: {
              ko: "z축에 대한 속력을 설정한다."
            }
          }
        },
        {
          name: "getSpeedX()",
          snippet: `getSpeedX()`,
          tip: {
            description: { ko: "x축 속력 가져오기" }
          }
        },
        {
          name: "getSpeedY()",
          snippet: `getSpeedY()`,
          tip: {
            description: { ko: "y축 속력 가져오기" }
          }
        },
        {
          name: "getSpeedZ()",
          snippet: `getSpeedZ()`,
          tip: {
            description: { ko: "z축 속력 가져오기" }
          }
        },
        {
          name: "rotateX(amount)",
          snippet: `rotateX(1)`,
          selection: "1",
          tip: {
            description: { ko: "오브젝트를 X축을 기준으로 회전시키기" },
            params: [
              { name: "amount", description: { ko: "회전할 정도의 radian 값" } }
            ],
            description2: {
              ko: "오브젝트를 X축을 기준으로 특정 radian 값 만큼 회전시킨다."
            }
          }
        },
        {
          name: "rotateY(amount)",
          snippet: `rotateY(1)`,
          selection: "1",
          tip: {
            description: { ko: "오브젝트를 Y축을 기준으로 회전시키기" },
            params: [
              { name: "amount", description: { ko: "회전할 정도의 radian 값" } }
            ],
            description2: {
              ko: "오브젝트를 Y축을 기준으로 특정 radian 값 만큼 회전시킨다."
            }
          }
        },
        {
          name: "rotateZ(amount)",
          snippet: `rotateZ(1)`,
          selection: "1",
          tip: {
            description: { ko: "오브젝트를 Z축을 기준으로 회전시키기" },
            params: [
              { name: "amount", description: { ko: "회전할 정도의 radian 값" } }
            ],
            description2: {
              ko: "오브젝트를 Z축을 기준으로 특정 radian 값 만큼 회전시킨다."
            }
          }
        },
        {
          name: "goX(amount)",
          snippet: `goX(1)`,
          selection: "1",
          tip: {
            description: { ko: "X좌표를 amount만큼 변경하기" },
            params: [{ name: "amount", description: { ko: "숫자" } }],
            description2: {
              ko: "오브젝트의 X좌표를 amount만큼 변경한다."
            }
          }
        },
        {
          name: "goY(amount)",
          snippet: `goY(1)`,
          selection: "1",
          tip: {
            description: { ko: "y좌표를 amount만큼 변경하기" },
            params: [{ name: "amount", description: { ko: "숫자" } }],
            description2: {
              ko: "오브젝트의 y좌표를 amount만큼 변경한다."
            }
          }
        },
        {
          name: "goZ(amount)",
          snippet: `goZ(1)`,
          selection: "1",
          tip: {
            description: { ko: "z좌표를 amount만큼 변경하기" },
            params: [{ name: "amount", description: { ko: "숫자" } }],
            description2: {
              ko: "오브젝트의 z좌표를 amount만큼 변경한다."
            }
          }
        }
      ]
    },
    {
      name: "ID_EVENT",
      api: [
        {
          name: "onFrame(function())",
          snippet: `onFrame(function(){})`,
          tip: {
            description: {
              ko: `매 프레임마다 입력된 함수를 반복하여 호출하기`
            },
            params: [
              {
                name: "function",
                description: { ko: "호출되는 함수" }
              }
            ],
            description2: { ko: `보통 1초에 60번 호출된다.` }
          },
          newLine: `onFrame(function(){`
        },
        {
          name: "onSignal(name,function())",
          snippet: `onSignal("name",function(){})`,
          tip: {
            description: { ko: `특정한 신호를 받았을 때 입력된 함수 호출하기` },
            params: [
              {
                name: "name",
                description: { ko: "신호의 이름" }
              },
              {
                name: "function",
                description: { ko: "호출되는 함수" }
              }
            ]
          },
          newLine: `onSignal("name",function(){`,
          selection: "name",
          selectionType: "signal"
        },
        {
          name: "sendSignal(name)",
          snippet: `sendSignal("name")`,
          tip: {
            description: { ko: `입력된 이름의 신호 보내기` },
            params: [
              {
                name: "name",
                description: { ko: "신호의 이름" }
              }
            ]
          },
          selection: "name",
          selectionType: "signal"
        },
        {
          name: "onKey(key,function())",
          snippet: `onKey("key",function(){})`,
          tip: {
            description: { ko: `특정 키를 눌렀을 때 호출되는 함수` },
            params: [
              {
                name: "key",
                description: { ko: "키보드의 값" }
              },
              {
                name: "function",
                description: { ko: "호출되는 함수" }
              }
            ]
          },
          newLine: `onKey("key",function(){`,
          selection: "key",
          selectionType: "key"
        },
        {
          name: "onKeyUp(key,function())",
          snippet: `onKeyUp("key",function(){})`,
          tip: {
            description: { ko: `특정 키를 눌렀다가 뗐을 때 호출되는 함수` },
            params: [
              {
                name: "key",
                description: { ko: "키보드의 값" }
              },
              {
                name: "function",
                description: { ko: "호출되는 함수" }
              }
            ]
          },
          newLine: `onKeyUp("key",function(){`,
          selection: "key",
          selectionType: "key"
        },
        {
          name: "onCollide(name,function())",
          snippet: `onCollide("name",function(){})`,
          tip: {
            description: {
              ko: `특정 오브젝트와 물리적으로 충돌했을 때 입력된 함수 호출하기`
            },
            params: [
              {
                name: "name",
                description: { ko: "상대 오브젝트의 이름" }
              },
              {
                name: "function",
                description: { ko: "호출되는 함수" }
              }
            ],
            description2: {
              ko: `오브젝트나 상대 오브젝트의 물리 설정이 안 되어 있으면 false를 반환한다.`
            }
          },
          newLine: `onCollide("name",function(){`,
          selection: "name",
          selectionType: "object"
        },
        {
          name: "onCollideOnce(name,function())",
          snippet: `onCollideOnce("name",function(){})`,
          tip: {
            description: {
              ko: `특정 오브젝트와 물리적으로 충돌했을 때 입력된 함수 한 번만 호출하기`
            },
            params: [
              {
                name: "name",
                description: { ko: "상대 오브젝트의 이름" }
              },
              {
                name: "function",
                description: { ko: "호출되는 함수" }
              }
            ],
            description2: {
              ko: `오브젝트나 상대 오브젝트의 물리 설정이 안 되어 있으면 false를 반환한다.`
            }
          },
          newLine: `onCollideOnce("name",function(){`,
          selection: "name",
          selectionType: "object"
        },
        {
          name: "onOverlap(name,function())",
          snippet: `onOverlap("name",function(){})`,
          tip: {
            description: {
              ko: `특정 오브젝트와 만났을 때 입력된 함수 호출하기`
            },
            params: [
              {
                name: "name",
                description: { ko: "오브젝트의 이름" }
              },
              {
                name: "function",
                description: { ko: "호출되는 함수" }
              }
            ]
          },
          newLine: `onOverlap("name",function(){`,
          selection: "name",
          selectionType: "object"
        },
        {
          name: "onOverlapOnce(name,function())",
          snippet: `onOverlapOnce("name",function(){})`,
          tip: {
            description: {
              ko: `특정 오브젝트와 만났을 때 입력된 함수를 한 번만 호출하기`
            },
            params: [
              {
                name: "name",
                description: { ko: "오브젝트의 이름" }
              },
              {
                name: "function",
                description: { ko: "호출되는 함수" }
              }
            ]
          },
          newLine: `onOverlapOnce("name",function(){`,
          selection: "name",
          selectionType: "object"
        },
        {
          name: "changeScene(name)",
          snippet: `changeScene("name")`,
          tip: {
            description: { ko: `입력된 이름의 scene으로 변경하기` },
            params: [
              {
                name: "name",
                description: { ko: "scene의 이름" }
              }
            ]
          },
          selection: "name",
          selectionType: "scene"
        },
        {
          name: "onClick(function())",
          snippet: `onClick(function(){})`,
          tip: {
            description: {
              ko: `오브젝트를 클릭했을 때 입력된 함수 호출하기`
            },
            params: [
              {
                name: "function",
                description: { ko: "호출되는 함수" }
              }
            ],
            description2: {
              ko: "GUI 또는 Mesh 오브젝트를 클릭했을 때 입력된 함수를 호출한다"
            }
          },
          newLine: `onClick(function(){`
        }
      ]
    },
    {
      name: "ID_CONTROL",
      api: [
        {
          name: "if / else / else if",
          snippet: `if(true){}`
        },
        {
          name: "switch~case",
          snippet: `switch(value){case "" :break;default :break;}`,
          newLine: `switch(value){`,
          selection: "value"
        },
        {
          name: "while()",
          snippet: `while(true){}`,
          newLine: `while(true){`,
          selection: "true"
        },
        {
          name: "for()",
          snippet: `for(var i=0;i<10;i++){}`,
          newLine: `for(var i=0;i<10;i++){`,
          selection: "10"
        },
        {
          name: "wait(secs)",
          snippet: `wait(1)`,
          selection: "1",
          tip: {
            description: { ko: "특정 시간 기다리기" },
            params: [{ name: "secs", description: { ko: "숫자, 기다릴 초" } }],
            description2: { ko: "secs초만큼 다음코드를 실행하지 않고 기다린다" }
          }
        },
        {
          name: "kill()",
          snippet: `kill()`,
          tip: {
            description: { ko: "없애기" },
            description2: { ko: "scene에서 오브젝트가 제거된다" }
          }
        },
        {
          name: "revive()",
          snippet: `revive()`,
          tip: {
            description: { ko: "되살리기" },
            description2: { ko: "secen에서 제거된(kill) 오브젝트를 되살린다" }
          }
        },
        {
          name: "clone()",
          snippet: `clone()`,
          tip: {
            description: { ko: "복제하기" },
            description2: {
              ko: "해당 오브젝트가 복제되고 복제된 오브젝트를 반환한다"
            }
          }
        },
        // {
        //   name: "print(message)",
        //   snippet: `print("message")`,
        //   selection: "message",
        //   tip: {
        //     description: { ko: "디버그 메시지 출력" },
        //     params: [{ name: "message", description: { ko: "출력할 문자열" } }],
        //     description2: { ko: "chatbot의 대화창에 message를 출력할 수 있다" }
        //   }
        // },
        {
          name: "input(message)",
          snippet: `input("message")`,
          selection: "message",
          tip: {
            description: { ko: "텍스트 입력받기" },
            params: [
              { name: "message", description: { ko: "입력받을 때 힌트" } }
            ],
            description2: {
              ko:
                "입력박스가 나타나고 문자열 또는 숫자를 입력할 수 있다.\n[확인]을 누르면 입력된 값을 반환한다"
            }
          }
        }
      ]
    },
    {
      name: "ID_LOOKS",
      api: [
        {
          name: "setScale(x, y, z)",
          snippet: `setScale(1, 1, 1)`,
          selection: "1",
          tip: {
            description: { ko: "크기 값 설정하기" },
            params: [
              {
                name: "x",
                description: { ko: "x축 크기 값 (숫자)" }
              },
              {
                name: "y",
                description: { ko: "y축 크기 값 (숫자)" }
              },
              {
                name: "z",
                description: { ko: "z축 크기 값 (숫자)" }
              }
            ],
            description2: { ko: "오브젝트의 x,y,z축 크기 값을 설정한다." }
          }
        },
        {
          name: "getScale()",
          snippet: "getScale()",
          tip: {
            description: { ko: "x,y,z축 크기 값 가져오기" },
            description2: {
              ko: "getScale().x 와 같이 각 축의 크기 값을 확인할 수 있다."
            }
          }
        },
        {
          name: "setUiText(text)",
          snippet: `setUiText("text")`,
          selection: "text",
          tip: {
            description: { ko: "문구 설정하기" },
            params: [
              {
                name: "text",
                description: { ko: "문자열" }
              }
            ],
            description2: { ko: "텍스트 오브젝트의 문구를 수정한다" }
          }
        },
        {
          name: "setTextColor(color)",
          snippet: `setTextColor("black")`,
          selection: "black",
          selectionType: "color",
          tip: {
            description: { ko: "문구 색상 설정하기" },
            params: [
              {
                name: "color",
                description: { ko: "문자열" }
              }
            ],
            description2: { ko: "텍스트 오브젝트의 문구 색상을 변경한다" }
          }
        },
        {
          name: "getTextColor()",
          snippet: `getTextColor()`,
          tip: {
            description: { ko: "문구 색상 가져오기" },

            description2: {
              ko: "텍스트 오브젝트의 문구 색상값을 반환하다"
            }
          }
        },
        {
          name: "setVisibility(visibility)",
          snippet: `setVisibility(1)`,
          selection: "1",
          tip: {
            description: { ko: "보이는 정도 설정하기" },
            params: [
              {
                name: "visibility",
                description: { ko: "숫자(0~1), 보이는 정도의 비율" }
              }
            ],
            description2: {
              ko:
                "오브젝트가 보이는 정도를 설정한다.\n0이면 안 보이고, 완전히 보이는 1이 기본 값이다."
            }
          }
        },
        {
          name: "show()",
          snippet: `show()`,
          tip: {
            description: { ko: "GUI 보이기" },

            description2: {
              ko:
                "scene에 GUI가 보이며, 초기값이 show이기\n때문에 hide()와 함께 사용해야 동작을 확인할 수 있다"
            }
          }
        },
        {
          name: "hide()",
          snippet: `hide()`,
          tip: {
            description: { ko: "GUI 숨기기" },

            description2: {
              ko: "scene에서 GUI가 사라지며, show()와 함께 사용한다"
            }
          }
        }
      ]
    },
    {
      name: "ID_PHYSICS",
      api: [
        {
          name: "enablePhysics(mass, bounce, friction)",
          snippet: `enablePhysics(1, 0, 0)`,
          selection: "1",
          tip: {
            description: { ko: "물리 법칙 영향을 받도록 설정하기" },
            params: [
              {
                name: "mass",
                description: { ko: "숫자(설정할 질량값)" }
              },
              {
                name: "bounce",
                description: { ko: "숫자(설정할 튕기는 정도의 값)" }
              },
              {
                name: "friction",
                description: { ko: "숫자(설정할 마찰값)" }
              }
            ],
            description2: {
              ko:
                "물리 법칙 영향을 받는 오브젝트로 설정한다. 옵션을 설정하지 않으면 질량은 1로 설정된다."
            }
          }
        },
        {
          name: "enablePhysicsParams(enabled)",
          snippet: `enablePhysicsParams(true)`,
          selection: "true",
          tip: {
            description: { ko: "물리 값 설정을 활성화하거나 비활성화하기" },
            params: [
              { name: "enabled", description: { ko: "true 또는 false" } }
            ],
            description2: {
              ko:
                "오브젝트의 질량, 튕기는 정도, 마찰 설정을 활성화하거나 비활성화한다"
            }
          }
        },
        {
          name: "setMass(value)",
          snippet: `setMass(1)`,
          selection: "1",
          tip: {
            description: { ko: "질량 설정하기" },
            params: [
              {
                name: "value",
                description: { ko: "숫자(설정할 질량값)" }
              }
            ],
            description2: {
              ko: "질량을 설정한다.\n다른 물리효과와 상호작용한다"
            }
          }
        },
        {
          name: "setBounce(value)",
          snippet: `setBounce(1)`,
          selection: "1",
          tip: {
            description: { ko: "튕기는 정도 설정하기" },
            params: [
              {
                name: "value",
                description: { ko: "숫자(설정할 튕기는 정도의 값)" }
              }
            ],
            description2: {
              ko:
                "다른 스프라이트와 충돌했을 때, 설정한 값만큼 반작용이 일어난다.\n값이 1일 경우 작용하는 힘을 그대로 전달받게 된다"
            }
          }
        },
        {
          name: "setFriction(value)",
          snippet: `setFriction(1)`,
          selection: "1",
          tip: {
            description: { ko: "마찰 설정하기" },
            params: [
              {
                name: "value",
                description: { ko: "숫자(설정할 마찰값)" }
              }
            ],
            description2: {
              ko: "마찰을 설정한다.\n다른 물리효과와 상호작용한다"
            }
          }
        },
        {
          name: "getMass()",
          snippet: `getMass()`,
          tip: {
            description: { ko: "질량 가져오기" }
          }
        },
        {
          name: "getBounce()",
          snippet: `getBounce()`,
          tip: {
            description: { ko: "튕기는 정도 가져오기" }
          }
        },
        {
          name: "getFriction()",
          snippet: `getFriction()`,
          tip: {
            description: { ko: "마찰 가져오기" }
          }
        },
        {
          name: "setVelocityX(value)",
          snippet: `setVelocityX(100)`,
          selection: "100",
          tip: {
            description: { ko: "x축 속도 설정하기" },
            params: [
              {
                name: "value",
                description: { ko: "숫자(설정할 속도값)" }
              }
            ],
            description2: {
              ko: "x축에 대한 속도를 설정한다.\n질량이 0보다 커야 동작한다."
            }
          }
        },
        {
          name: "setVelocityY(value)",
          snippet: `setVelocityY(100)`,
          selection: "100",
          tip: {
            description: { ko: "y축 속도 설정하기" },
            params: [
              {
                name: "value",
                description: { ko: "숫자(설정할 속도값)" }
              }
            ],
            description2: {
              ko: "y축에 대한 속도를 설정한다.\n질량이 0보다 커야 동작한다."
            }
          }
        },
        {
          name: "setVelocityZ(value)",
          snippet: `setVelocityZ(100)`,
          selection: "100",
          tip: {
            description: { ko: "z축 속도 설정하기" },
            params: [
              {
                name: "value",
                description: { ko: "숫자(설정할 속도값)" }
              }
            ],
            description2: {
              ko: "z축에 대한 속도를 설정한다.\n질량이 0보다 커야 동작한다."
            }
          }
        },
        {
          name: "getVelocityX()",
          snippet: `getVelocityX()`,
          tip: {
            description: { ko: "x축 속도 가져오기" }
          }
        },
        {
          name: "getVelocityY()",
          snippet: `getVelocityY()`,
          tip: {
            description: { ko: "y축 속도 가져오기" }
          }
        },
        {
          name: "getVelocityZ()",
          snippet: `getVelocityZ()`,
          tip: {
            description: { ko: "z축 속도 가져오기" }
          }
        },
        {
          name: "setAngularVelocityX(value)",
          snippet: `setAngularVelocityX(5)`,
          selection: "100",
          tip: {
            description: { ko: "x축 각속도 설정하기" },
            params: [
              {
                name: "value",
                description: { ko: "숫자(설정할 속도값)" }
              }
            ],
            description2: {
              ko: "x축에 대한 각속도를 설정한다.\n질량이 0보다 커야 동작한다."
            }
          }
        },
        {
          name: "setAngularVelocityY(value)",
          snippet: `setAngularVelocityY(5)`,
          selection: "100",
          tip: {
            description: { ko: "y축 각속도 설정하기" },
            params: [
              {
                name: "value",
                description: { ko: "숫자(설정할 속도값)" }
              }
            ],
            description2: {
              ko: "y축에 대한 각속도를 설정한다.\n질량이 0보다 커야 동작한다."
            }
          }
        },
        {
          name: "setAngularVelocityZ(value)",
          snippet: `setAngularVelocityZ(5)`,
          selection: "100",
          tip: {
            description: { ko: "z축 각속도 설정하기" },
            params: [
              {
                name: "value",
                description: { ko: "숫자(설정할 속도값)" }
              }
            ],
            description2: {
              ko: "z축에 대한 각속도를 설정한다.\n질량이 0보다 커야 동작한다."
            }
          }
        },
        {
          name: "getAngularVelocityX()",
          snippet: `getVelocityX()`,
          tip: {
            description: { ko: "x축 각속도 가져오기" }
          }
        },
        {
          name: "getAngularVelocityY()",
          snippet: `getVelocityY()`,
          tip: {
            description: { ko: "y축 각속도 가져오기" }
          }
        },
        {
          name: "getAngularVelocityZ()",
          snippet: `getVelocityZ()`,
          tip: {
            description: { ko: "z축 각속도 가져오기" }
          }
        }
      ]
    },
    {
      name: "ID_SOUND",
      api: [
        {
          name: "playSound(name, isLoop)",
          snippet: `playSound("name", false)`,
          tip: {
            description: { ko: `사운드 재생하기` },
            params: [
              {
                name: "name",
                description: { ko: "사운드 이름" }
              },
              {
                name: "isLoop",
                description: { ko: "반복 재생 여부" }
              }
            ],
            description2: {
              ko: `입력된 사운드를\n1회 혹은 반복하여 재생한다.`
            }
          },
          selection: "name",
          selectionType: "sound"
        },
        {
          name: "restartSound(name)",
          snippet: `restartSound("name")`,
          tip: {
            description: { ko: `사운드 처음부터 다시 재생하기` },
            params: [
              {
                name: "name",
                description: { ko: "사운드 이름" }
              }
            ],
            description2: {
              ko:
                "입력된 사운드를 처음부터 다시 재생한다.\n(반복 여부는 playSound 함수에서 설정된 값을 따른다.)"
            }
          },
          selection: "name",
          selectionType: "sound"
        },
        {
          name: "resumeSound(name)",
          snippet: `resumeSound("name")`,
          tip: {
            description: { ko: `사운드 이어서 재생하기` },
            params: [
              {
                name: "name",
                description: { ko: "사운드 이름" }
              }
            ],
            description2: {
              ko:
                "입력된 사운드를 일시정지된 위치부터 다시 재생한다.\n(반복 여부는 playSound 함수에서 설정된 값을 따른다.)"
            }
          },
          selection: "name",
          selectionType: "sound"
        },
        {
          name: "stopAllSounds()",
          snippet: `stopAllSounds()`,
          tip: {
            description: { ko: `재생중인 모든 사운드 정지하기` }
          }
        },
        {
          name: "stopSound(name)",
          snippet: `stopSound("name")`,
          tip: {
            description: { ko: `사운드 정지하기` },
            params: [
              {
                name: "name",
                description: { ko: "사운드 이름" }
              }
            ]
          },
          selection: "name",
          selectionType: "sound"
        },
        {
          name: "pauseSound(name)",
          snippet: `pauseSound("name")`,
          tip: {
            description: { ko: `사운드 일시정지하기` },
            params: [
              {
                name: "name",
                description: { ko: "사운드 이름" }
              }
            ]
          },
          selection: "name",
          selectionType: "sound"
        },
        {
          name: "setGlobalSoundVolume(value)",
          snippet: `setGlobalSoundVolume(1)`,
          tip: {
            description: { ko: `앱의 음량 설정하기` },
            params: [
              {
                name: "value",
                description: { ko: "음량(0~1 사이의 값)" }
              }
            ]
          },
          selection: "1"
        },
        {
          name: "addGlobalSoundVolume(value)",
          snippet: `addGlobalSoundVolume(0.1)`,
          tip: {
            description: { ko: `앱의 음량을 value만큼 키우기` },
            params: [
              {
                name: "value",
                description: { ko: "음량의 변화 크기(0~1 사이의 값)" }
              }
            ]
          },
          selection: "0.1"
        },
        {
          name: "getGlobalSoundVolume()",
          snippet: `getGlobalSoundVolume()`,
          tip: {
            description: { ko: `현재 앱의 음량 가져오기` }
          }
        },
        {
          name: "setSoundVolume(name, value)",
          snippet: `setSoundVolume("name", 1)`,
          tip: {
            description: { ko: `사운드 음량 설정하기` },
            params: [
              {
                name: "name",
                description: { ko: "사운드 이름" }
              },
              {
                name: "value",
                description: { ko: "음량(0~1 사이의 값)" }
              }
            ]
          },
          selection: "name"
        },
        {
          name: "addSoundVolume(name, value)",
          snippet: `addSoundVolume("name", 0.1)`,
          tip: {
            description: { ko: `사운드의 음량을 value만큼 키우기` },
            params: [
              {
                name: "value",
                description: { ko: "음량의 변화 크기(0~1 사이의 값)" }
              }
            ]
          },
          selection: "name"
        },
        {
          name: "getSoundVolume(name)",
          snippet: `getSoundVolume("name")`,
          tip: {
            description: { ko: `사운드의 음량 가져오기` }
          },
          selection: "name"
        }
      ]
    },
    {
      name: "ID_TIME",
      api: [
        {
          name: "getDeltaTime()",
          snippet: `getDeltaTime()`,
          tip: {
            description: {
              ko: "바로 전 프레임을 완료하는 데 걸린 시간(초 단위) 가져오기"
            }
          }
        },
        {
          name: "startTimer()",
          snippet: `startTimer()`,
          tip: {
            description: { ko: "타이머 시작하기" }
          }
        },
        {
          name: "pauseTimer()",
          snippet: `pauseTimer()`,
          tip: {
            description: { ko: "타이머 멈추기" }
          }
        },
        {
          name: "resumeTimer()",
          snippet: `resumeTimer()`,
          tip: {
            description: { ko: "타이머 이어서 시작하기" }
          }
        },
        {
          name: "resetTimer()",
          snippet: `resetTimer()`,
          tip: {
            description: { ko: "타이머 0초로 되돌리기" }
          }
        },
        {
          name: "getTimer()",
          snippet: `getTimer()`,
          tip: {
            description: { ko: "현재 타이머의 값 가져오기" }
          }
        }
      ]
    },
    {
      name: "ID_PARAMETER",
      api: [
        {
          name: "function",
          snippet: "function name(){}",
          newLine: "{",
          selection: "name",
          tip: {
            description: { ko: "함수를 선언한다." },
            description2: {
              ko: "name이라는 이름의 함수를 선언한다.\n"
            }
          }
        },
        {
          name: "let",
          snippet: "let name",
          selection: "name",
          tip: {
            description: { ko: "변수를 선언한다." },
            description2: {
              ko: "name이라는 이름의 변수를 선언한다.\n"
            }
          }
        },
        {
          name: "const",
          snippet: "const name",
          selection: "name",
          tip: {
            description: { ko: "상수를 선언한다." },
            description2: {
              ko: "name이라는 이름의 상수를 선언한다.\n"
            }
          }
        },
        {
          name: "global",
          snippet: `global.name`,
          selection: "name",
          selectionType: "global",
          tip: {
            description: { ko: "전역 변수" },
            description2: {
              ko:
                "앱 전체에서 사용 가능한 전역 변수이다.\nscene이 달라도 같이 사용된다"
            }
          }
        },
        {
          name: "getObject(name)",
          snippet: `getObject("name")`,
          selection: "name",
          selectionType: "object",
          tip: {
            description: { ko: "지정한 이름을 가진 첫번째 오브젝트 가져오기" },
            params: [
              {
                name: "name",
                description: { ko: "가져올 오브젝트의 이름 문자열" }
              }
            ],
            description2: { ko: "name이 이름인 첫번째 오브젝트를 반환한다" }
          }
        },
        {
          name: "getObjects(name)",
          snippet: `getObjects("name")`,
          selection: "name",
          selectionType: "object",
          tip: {
            description: { ko: "지정한 이름을 가진 모든 오브젝트 가져오기" },
            params: [
              {
                name: "name",
                description: { ko: "가져올 오브젝트들의 이름 문자열" }
              }
            ],
            description2: { ko: "name이 이름인 모든 오브젝트를 반환한다" }
          }
        }
      ]
    }
  ];

  getAllFunctions() {
    let functions = [];

    this.apiList.forEach(category => {
      const categoryName = category.name;
      category.api.forEach(api => {
        if (api.snippet) {
          if (api.name === "if / else / else if") {
            return;
          }
          const meta = categoryName;
          const caption = api.name;
          const value = api.snippet;
          const newLine = api.newLine;
          const selection = api.selection;
          const selectionType = api.selectionType;
          const requiredParamCount = api.requiredParamCount;
          const tip = api.tip;
          const funcRegex = /([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/gim;
          const funcMatch = funcRegex.exec(api.name);
          let name;
          if (funcMatch) name = funcMatch[0];
          functions.push({
            name,
            tip,
            caption,
            value,
            meta,
            newLine,
            selection,
            selectionType,
            requiredParamCount
          });
        }
      });
    });

    functions.push({
      caption: "if",
      value: `if(true){}`,
      meta: "meta",
      newLine: `if(true){`,
      selection: "true"
    });
    functions.push({
      caption: "else if",
      value: `else if(true){}`,
      meta: "meta",
      newLine: `else if(true){`,
      selection: "true"
    });
    functions.push({
      caption: "else",
      value: `else{}`,
      meta: "meta",
      newLine: `else{`
    });
    functions.push({
      caption: "true",
      value: `true`,
      meta: "boolean"
    });
    functions.push({
      caption: "false",
      value: `false`,
      meta: "boolean"
    });

    return functions;
  }

  getAPI(name) {
    for (let i in this.apiList) {
      for (let j in this.apiList[i].api) {
        if (this.apiList[i].api[j].name === name) {
          return this.apiList[i].api[j];
        }
      }
    }
  }
}

export default new ApiLibrary3d();
