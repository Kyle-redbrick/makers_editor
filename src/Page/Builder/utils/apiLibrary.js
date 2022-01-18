// import motionImage from "../../../Image/motion-icon.svg";
// import looksImage from "../../../Image/looks-icon.svg";
// import eventImage from "../../../Image/event-icon.svg";
// import controlImage from "../../../Image/control-icon.svg";
// import sensingImage from "../../../Image/sensing-icon.svg";
// import operatorImage from "../../../Image/operator-icon.svg";
// import physicsImage from "../../../Image/physics-icon.svg";
// import soundImage from "../../../Image/sound-icon.svg";
// import timeImage from "../../../Image/time-icon.svg";
// import parameterImage from "../../../Image/data-icon.svg";
// import penImage from "../../../Image/pen-icon.svg";
// import mobileImage from "../../../Image/phone-icon.svg";
import { EDITORMODE } from "../../../Common/Util/Constant";

// todo: name legacy
// parameter >> data

class ApiLibrary {
  apiList = [{
    name: "ID_MOTION",
    api: [{
      name: "moveForward(steps)",
      snippet: "moveForward(100)",
      selection: "100",
      tip: {
        description: {
          ko: "steps만큼 움직이며 바라보는 방향으로 이동하기",
          // "en": "Moves the sprite forward a specified number of steps in the direction", // temp to Translate
          // "zh": "zh" // temp to Translate
        },
        "params": [{
          name: "steps",
          description: {
            ko: "숫자 steps만큼 바라보는 방향으로 이동한다",
            // "en": "Moves the sprite a specified number of steps", // temp to Translate
            // "zh": "zh" // temp to Translate
          }
        }],
        "description2": {
          ko: "움직임이 멈출 때까지 다음 코드는 실행되지 않는다"
        }
      },
      id: "moveForward",
      chatbotDescription: "moveForward(steps)는 스프라이트가 바라보고 있는 방향으로 steps만큼 움직이며 이동하는 API야. steps에 원하는 숫자 값을 입력해볼래? 참고로, 움직임이 멈출 때까지 다음 코드는 실행되지 않아!",
      // chatbotDescription_en: "en",  // temp to Translate
      // chatbotDescription_zh: "zh" // temp to Translate
    }, {
      name: "moveX(steps)",
      snippet: "moveX(100)",
      selection: "100",
      tip: {
        description: {
          ko: "x좌표를 steps만큼 움직이며 이동하기"
        },
        "params": [{
          name: "steps",
          description: {
            ko: "숫자"
          }
        }],
        "description2": {
          ko: "steps만큼 x좌표를 이동한다"
        }
      },
      id: "moveX",
      chatbotDescription: "moveX(steps)는 steps만큼 x좌표를 움직이며 이동하는 API야. 0보다 큰 숫자를 넣으면 오른쪽으로, 0보다 작은 숫자를 넣으면 왼쪽으로 이동해. steps에 원하는 숫자를 입력해볼래?"
    }, {
      name: "moveY(steps)",
      snippet: "moveY(100)",
      selection: "100",
      tip: {
        description: {
          ko: "y좌표를 steps만큼 움직이며 이동하기"
        },
        "params": [{
          name: "steps",
          description: {
            ko: "숫자"
          }
        }],
        "description2": {
          ko: "steps만큼 y좌표를 이동한다"
        }
      },
      id: "moveY",
      chatbotDescription: "moveY(steps)는 steps만큼 y좌표를 움직이며 이동하는 API야. 0보다 큰 숫자를 넣으면 아래로, 0보다 작은 숫자를 넣으면 위로 이동해. steps에 원하는 숫자를 입력해볼래?"
    }, {
      name: "moveTo(x,y)",
      snippet: "moveTo(100,100)",
      selection: "100",
      tip: {
        description: {
          ko: "x,y 좌표로 움직이며 이동하기"
        },
        "params": [{
          name: "x",
          description: {
            ko: "숫자"
          }
        }, {
          name: "y",
          description: {
            ko: "숫자"
          }
        }],
        "description2": {
          ko: "x만큼 x좌표로 y만큼 y좌표로 이동한다"
        }
      },
      id: "moveTo",
      chatbotDescription: "moveTo(x, y)는 스프라이트를 x, y 좌표로 움직이며 이동시키는 API야. x, y에 원하는 숫자 값을 입력해봐."
    }, {
      name: "moveToSprite(name)",
      snippet: "moveToSprite(\"name\")",
      selection: "name",
      "selectionType": "sprite",
      tip: {
        description: {
          ko: "특정 스프라이트로 움직이며 이동하기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "문자열"
          }
        }],
        "description2": {
          ko: "특정 스프라이트를 name 스프라이트의 좌표로 이동한다"
        }
      },
      id: "moveToSprite",
      chatbotDescription: "moveToSprite(name)는 스프라이트를 특정 스프라이트의 위치로 움직이며 이동시키는 API야. name에 원하는 스프라이트의 이름을 적어봐."
    }, {
      name: "moveToMousePointer()",
      snippet: "moveToMousePointer()",
      tip: {
        description: {
          ko: "마우스포인터로 움직이며 이동하기"
        },
        "description2": {
          ko: "scene안에 마우스 포인터를 따라 스프라이트가 이동한다"
        }
      },
      id: "moveToMousePointer",
      chatbotDescription: "moveToMousePointer()는 스프라이트를 마우스 포인터의 위치로 움직이며 이동시키는 API야."
    }, {
      name: "moveToRandom()",
      snippet: "moveToRandom()",
      tip: {
        description: {
          ko: "임의의 좌표로 위치를 움직이며 이동하기"
        },
        "description2": {
          ko: "스프라이트의 위치를 임의의 좌표로 움직이며 이동한다"
        }
      },
      id: "moveToRandom",
      chatbotDescription: "moveToRandom()은 스프라이트를 임의의 위치로 움직이며 이동시키는 API야. 스프라이트가 어디로 이동할지 모른다 이거지~"
    }, {
      name: "setMoveSpeed(speed)",
      snippet: "setMoveSpeed(100)",
      selection: "100",
      tip: {
        description: {
          ko: "움직이는 속도를 speed만큼 정하기"
        },
        "params": [{
          name: "speed",
          description: {
            ko: "숫자"
          }
        }],
        "description2": {
          ko: "move..() 관련 함수들의 이동속도를 설정한다\n"
        }
      },
      id: "setMoveSpeed",
      chatbotDescription: "setMoveSpeed(speed)는 움직이는 속도를 설정하는 API야. speed에 원하는 숫자 값을 입력하면 move와 관련된 API들을 사용할 때 이동 속도를 설정할 수 있어."
    }, {
      name: "goForward(steps)",
      snippet: "goForward(100)",
      selection: "100",
      tip: {
        description: {
          ko: "steps만큼 바라보는 방향으로 위치를 설정하기"
        },
        "params": [{
          name: "steps",
          description: {
            ko: "숫자"
          }
        }],
        "description2": {
          ko: "steps만큼 바라보는 방향으로 좌표를 변경한다"
        }
      },
      id: "goForward",
      chatbotDescription: "goForward(steps)는 스프라이트가 바라보고 있는 방향으로 steps만큼 이동시키는 API야. steps에 원하는 숫자 값을 입력해볼래? 아, 참고로 스프라이트들은 기본적으로 오른쪽을 바라보고 있어!"
    }, {
      name: "goX(steps)",
      snippet: "goX(100)",
      selection: "100",
      tip: {
        description: {
          ko: "x좌표를 steps만큼 바꾸기"
        },
        "params": [{
          name: "steps",
          description: {
            ko: "숫자"
          }
        }],
        "description2": {
          ko: "steps만큼 x좌표를 변경한다"
        }
      },
      id: "goX",
      chatbotDescription: "goX(steps)는 steps만큼 x좌표를 변경하는 API야. 0보다 큰 숫자를 넣으면 오른쪽으로, 0보다 작은 숫자를 넣으면 왼쪽으로 이동해. steps에 원하는 숫자를 입력해볼래?"
    }, {
      name: "goY(steps)",
      snippet: "goY(100)",
      selection: "100",
      tip: {
        description: {
          ko: "y좌표를 steps만큼 바꾸기"
        },
        "params": [{
          name: "steps",
          description: {
            ko: "숫자"
          }
        }],
        "description2": {
          ko: "steps만큼 y좌표를 변경한다"
        }
      },
      id: "goY",
      chatbotDescription: "goY(steps)는 steps만큼 y좌표를 변경하는 API야. 0보다 큰 숫자를 넣으면 아래로, 0보다 작은 숫자를 넣으면 위로 이동해. steps에 원하는 숫자를 입력해볼래?"
    }, {
      name: "goTo(x,y)",
      snippet: "goTo(100,100)",
      selection: "100",
      tip: {
        description: {
          ko: "위치 변경하기"
        },
        "params": [{
          name: "x",
          description: {
            ko: "숫자"
          }
        }, {
          name: "y",
          description: {
            ko: "숫자"
          }
        }],
        "description2": {
          ko: "스프라이트의 x, y 좌표를 변경한다"
        }
      },
      id: "goTo",
      chatbotDescription: "goTo(x, y)는 스프라이트를 x, y 좌표로 이동시키는 API야. x, y에 원하는 숫자 값을 입력해봐."
    }, {
      name: "goToSprite(name)",
      snippet: "goToSprite(\"name\")",
      selection: "name",
      "selectionType": "sprite",
      tip: {
        description: {
          ko: "특정 스프라이트로 위치를 변경하기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "문자열"
          }
        }],
        "description2": {
          ko: "스프라이트의 좌표를 name 스프라이트로 변경한다"
        }
      },
      id: "goToSprite",
      chatbotDescription: "goToSprite(name)는 스프라이트를 특정 스프라이트의 위치로 이동시키는 API야. name에 원하는 스프라이트의 이름을 적어봐."
    }, {
      name: "goToMousePointer()",
      snippet: "goToMousePointer()",
      tip: {
        description: {
          ko: "마우스포인터로 위치를 변경하기"
        },
        "description2": {
          ko: "스프라이트의 좌표를 마우스 포인터의 좌표로 변경한다"
        }
      },
      id: "goToMousePointer",
      chatbotDescription: "goToMousePointer()는 스프라이트를 마우스 포인터의 위치로 이동시키는 API야."
    }, {
      name: "goToRandom()",
      snippet: "goToRandom()",
      tip: {
        description: {
          ko: "임의의 좌표로 위치를 변경하기"
        },
        "description2": {
          ko: "스프라이트의 위치를 임의의 좌표로 변경한다"
        }
      },
      id: "goToRandom",
      chatbotDescription: "goToRandom()은 스프라이트를 임의의 위치로 이동시키는 API야. 스프라이트가 어디로 이동할지 모른다 이거지~"
    }, {
      name: "setDegree(degree)",
      snippet: "setDegree(90)",
      selection: "90",
      tip: {
        description: {
          ko: "스프라이트의 각도 설정하기"
        },
        "params": [{
          name: "degree",
          description: {
            ko: "숫자"
          }
        }],
        "description2": {
          ko: "스프라이트의 각도를 degree로 설정한다"
        }
      },
      id: "setDegree",
      chatbotDescription: "setDegree(degree)는 스프라이트의 각도를 설정하는 API야. 각도는 시계방향으로 변경되니까 참고해!"
    }, {
      name: "turn(degree)",
      snippet: "turn(90)",
      selection: "90",
      tip: {
        description: {
          ko: "시계방향으로 돌기"
        },
        "params": [{
          name: "degree",
          description: {
            ko: "숫자"
          }
        }],
        "description2": {
          ko: "degree만큼 시계방향으로 스프라이트의 각도를 회전한다"
        }
      },
      id: "turn",
      chatbotDescription: "turn(degree)는 스프라이트를 시계방향으로 원하는 각도만큼 돌리는 API야. degree에 숫자 값을 입력해볼래?"
    }, {
      name: "turnToSprite(name)",
      snippet: "turnToSprite(\"name\")",
      selection: "name",
      "selectionType": "sprite",
      tip: {
        description: {
          ko: "특정 스프라이트로 방향 보기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "문자열"
          }
        }],
        "description2": {
          ko: "특정 스프라이트를 바라보도록 각도를 회전한다"
        }
      },
      id: "turnToSprite",
      chatbotDescription: "turnToSprite(name)는 스프라이트가 특정 스프라이트가 있는 방향을 바라보도록 하는 API야. 원하는 스프라이트의 이름을 name에 입력해봐!"
    }, {
      name: "turnToMousePointer()",
      snippet: "turnToMousePointer()",
      tip: {
        description: {
          ko: "마우스 방향 보기"
        },
        "description2": {
          ko: "마우스 포인터를 따라 스프라이트가 이동한다"
        }
      },
      id: "turnToMousePointer",
      chatbotDescription: "turnToMousePointer()는 스프라이트가 마우스 포인터가 있는 방향을 바라보도록 하는 API야. "
    }, {
      name: "setFlipX(isFlipped)",
      snippet: "setFlipX(true)",
      selection: "true",
      tip: {
        description: {
          ko: "좌우를 반전"
        },
        "params": [{
          name: "isFlipped",
          description: {
            ko: "true 또는 false"
          }
        }],
        "description2": {
          ko: "스프라이트의 좌우를 반전한다"
        }
      },
      id: "setFlipX",
      chatbotDescription: "setFlipX(isFlipped)는 스프라이트를 좌우 반전시키는 API야. isFlipped에 true를 입력하면 좌우 반전할 수 있어."
    }, {
      name: "setFlipY(isFlipped)",
      snippet: "setFlipY(true)",
      selection: "true",
      tip: {
        description: {
          ko: "위아래로 뒤집기"
        },
        "params": [{
          name: "isFlipped",
          description: {
            ko: "true or false"
          }
        }],
        "description2": {
          ko: "스프라이트의 상하를 뒤집는다"
        }
      },
      id: "setFlipY",
      chatbotDescription: "setFlipY(isFlipped)는 스프라이트를 상하 반전시키는 API야. isFlipped에 true를 입력하면 상하 반전할 수 있어."
    }, {
      name: "getX()",
      snippet: "getX()",
      tip: {
        description: {
          ko: "x좌표"
        },
        "description2": {
          ko: "스프라이트의 x좌표 값을 반환한다"
        }
      },
      id: "getX",
      chatbotDescription: "getX()는 스프라이트의 X좌표 값을 반환하는 API야. X좌표는 왼쪽에서 시작해서 오른쪽으로 갈수록 숫자가 커져!"
    }, {
      name: "getY()",
      snippet: "getY()",
      tip: {
        description: {
          ko: "y좌표"
        },
        "description2": {
          ko: "스프라이트의 y좌표 값을 반환한다"
        }
      },
      id: "getY",
      chatbotDescription: "getY()는 스프라이트의 Y좌표 값을 반환하는 API야. Y좌표는 위에서 시작해서 아래로 갈수록 숫자가 커져!"
    }, {
      name: "getMousePointerX()",
      snippet: "getMousePointerX()",
      tip: {
        description: {
          ko: "마우스 x좌표"
        },
        "description2": {
          ko: "마우스 포인터의 x좌표 값을 반환한다"
        }
      },
      id: "getMousePointerX",
      chatbotDescription: "getMousePointerX()는 마우스의 x값을 반환하는 API야."
    }, {
      name: "getMousePointerY()",
      snippet: "getMousePointerY()",
      tip: {
        description: {
          ko: "마우스 y좌표"
        },
        "description2": {
          ko: "마우스 포인터의 y좌표 값을 반환한다"
        }
      },
      id: "getMousePointerY",
      chatbotDescription: "getMousePointerY()는 마우스의 y값을 반환하는 API야."
    }, {
      name: "getDegree()",
      snippet: "getDegree()",
      tip: {
        description: {
          ko: "각도값"
        },
        "description2": {
          ko: "스프라이트의 각도값을 숫자로 반환한다"
        }
      },
      id: "getDegree",
      chatbotDescription: "getDegree()는 스프라이트의 각도를 반환하는 API야."
    }]
  }, {
    name: "ID_LOOKS",
    api: [{
      name: "say(message,sec)",
      snippet: "say(\"Hello, WizLab\",1)",
      selection: "Hello, WizLab",
      "requiredParamCount": 1,
      tip: {
        description: {
          ko: "sec초간 말하기"
        },
        "params": [{
          name: "message",
          description: {
            ko: "문자열"
          }
        }, {
          name: "sec",
          description: {
            ko: "숫자"
          }
        }],
        "description2": {
          ko: "스프라이트에 message를 sec초 만큼 출력한다\n만약 sec가 없다면 말풍선이 사라지지 않는다"
        }
      },
      id: "say",
      chatbotDescription: "say(message, sec)는 말풍선에 원하는 말을 출력하는 API야. message에 원하는 문장을 입력하고, sec에 말하는 시간을 초 단위로 입력해봐!"
    }, {
      name: "stopSay()",
      snippet: "stopSay()",
      tip: {
        description: {
          ko: "말하기를 멈춘다"
        },
        "description2": {
          ko: "say를 통해 하던 말을 멈추고 말풍선을 없앤다"
        }
      },
      id: "stopSay",
      chatbotDescription: "stopSay()는 말하기를 멈추는 API야. say를 통해서 하던 말을 멈출 수 있어. say에서 설정한 시간이 남았더라도 말하는 걸 멈출 수 있지."
    }, {
      name: "playAnimation(name,isLoop)",
      snippet: "playAnimation(\"name\",true)",
      selection: "name",
      "selectionType": "animation",
      tip: {
        description: {
          ko: "애니메이션 실행하기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "문자열"
          }
        }, {
          name: "isLoop",
          description: {
            ko: "true 또는 false"
          }
        }],
        "description2": {
          ko: "name 애니메이션을 isLoop에 따라 무한 혹은 1회 동작한다"
        }
      },
      id: "playAnimation",
      chatbotDescription: "playAnimation(name, isLoop)은 애니메이션을 실행하는 API야. name에 스프라이트 속성창에 있는 애니메이션 중에서 원하는 것을 입력해봐! 아, isLoop 자리에 false를 넣으면 애니메이션을 1번만 실행할 수 있어."
    }, {
      name: "stopAnimation()",
      snippet: "stopAnimation()",
      tip: {
        description: {
          ko: "애니메이션 멈추기"
        },
        "description2": {
          ko: "동작중인 애니메이션을 멈춘다"
        }
      },
      id: "stopAnimation",
      chatbotDescription: "stopAnimation()은 애니메이션을 멈추는 API야. 동작 중인 애니메이션을 멈출 수 있지."
    }, {
      name: "getCurrentAnimation()",
      snippet: "getCurrentAnimation()",
      tip: {
        description: {
          ko: "현재 동작중인 애니메이션 이름 가져오기"
        },
        "description2": {
          ko: "스프라이트에 동작중인 애니메이션이 있다면 그 이름을 가져온다"
        }
      },
      id: "getCurrentAnimation",
      chatbotDescription: "getCurrentAnimation()은 현재 재생되고 있는 애니메이션의 이름을 반환하는 API야."
    }, {
      name: "show()",
      snippet: "show()",
      tip: {
        description: {
          ko: "보이기"
        },
        "description2": {
          ko: "scene에 스프라이트가 보이며, 초기값이 show이기\n때문에 hide()와 함께 사용해야 동작을 확인할 수 있다"
        }
      },
      id: "show",
      chatbotDescription: "show()는 숨겨놨던 스프라이트를 다시 보이게 할 수 있는 API야."
    }, {
      name: "hide()",
      snippet: "hide()",
      tip: {
        description: {
          ko: "숨기기"
        },
        "description2": {
          ko: "scene에서 스프라이트가 사라지며, show()와 함께 사용한다"
        }
      },
      id: "hide",
      chatbotDescription: "hide()는 스프라이트를 눈에 보이지 않게 숨기는 API야. 한 가지 더 알려주자면, 스프라이트 속성창의 눈 모양 아이콘을 클릭해도 스프라이트를 숨길 수 있지."
    }, {
      name: "bringToTop()",
      snippet: "bringToTop()",
      tip: {
        description: {
          ko: "맨 앞으로 가져오기"
        },
        "description2": {
          ko: "scene안에 여러 스프라이트가 중첩되었을 때\n이 함수를 호출한 스프라이트가 맨앞에 보이게 된다"
        }
      },
      id: "bringToTop",
      chatbotDescription: "bringToTop()은 스프라이트를 맨 앞으로 가져오는 API야. 여러 스프라이트가 겹쳐있을 때 이 API를 사용하면 맨 앞으로 가져올 수 있어."
    }, {
      name: "setSize(percent)",
      snippet: "setSize(100)",
      selection: "100",
      tip: {
        description: {
          ko: "크기를 value비율로 정하기"
        },
        "params": [{
          name: "value",
          description: {
            ko: "문자열"
          }
        }],
        "description2": {
          ko: "비율로 스프라이트의 사이즈가 변경한다"
        }
      },
      id: "setSize",
      chatbotDescription: "setSize(percent)는 스프라이트의 크기를 비율로 변경할 수 있는 API야. percent에 200을 입력하면 스프라이트의 크기가 두 배가 되지. percent에 원하는 숫자 값을 입력해봐!"
    }, {
      name: "addSize(percent)",
      snippet: "addSize(10)",
      selection: "10",
      tip: {
        description: {
          ko: "크기를 value비율로 정하기"
        },
        "params": [{
          name: "value",
          description: {
            ko: "문자열"
          }
        }],
        "description2": {
          ko: "비율로 스프라이트의 사이즈가 변경한다"
        }
      },
      id: "addSize",
      chatbotDescription: "addSize(percent)는 스프라이트 크기를 비율로 설정하는 API야. percent에 원하는 비율을 넣어서 사용해봐."
    }, {
      name: "getSize()",
      snippet: "getSize()",
      tip: {
        description: {
          ko: "크기값"
        },
        "description2": {
          ko: "스프라이트의 크기를 반환한다"
        }
      },
      id: "getSize",
      chatbotDescription: "getSize()는 스프라이트의 크기를 비율로 반환하는 API야. 스프라이트의 크기를 변경하지 않았다면 100%니깐 100이 반환되지."
    }, {
      name: "getWidth()",
      snippet: "getWidth()",
      tip: {
        description: {
          ko: "너비값"
        },
        "description2": {
          ko: "스프라이트의 너비값을 반환한다"
        }
      },
      id: "getWidth",
      chatbotDescription: "getWidth()는 스프라이트의 너비를 반환하는 API야."
    }, {
      name: "getHeight()",
      snippet: "getHeight()",
      tip: {
        description: {
          ko: "높이값"
        },
        "description2": {
          ko: "스프라이트의 높이값을 반환한다"
        }
      },
      id: "getHeight",
      chatbotDescription: "getHeight()는 스프라이트의 높이를 반환하는 API야."
    }, {
      name: "setText(text)",
      snippet: "setText(\"text\")",
      selection: "text",
      tip: {
        description: {
          ko: "문구 설정하기"
        },
        "params": [{
          name: "text",
          description: {
            ko: "문자열"
          }
        }],
        "description2": {
          ko: "텍스트상자 스프라이트의 메시지를 수정한다"
        }
      },
      id: "setText",
      chatbotDescription: "setText(text)는 텍스트 상자 스프라이트의 메시지를 수정할 수 있는 API야. text에 수정하고 싶은 문구를 입력해봐!"
    }, {
      name: "appendText(text)",
      snippet: "appendText(\"text\")",
      selection: "text",
      tip: {
        description: {
          ko: "문구 추가하기"
        },
        "params": [{
          name: "text",
          description: {
            ko: "문자열"
          }
        }],
        "description2": {
          ko: "텍스트상자 스프라이트의 기존 메시지에\ntext를 추가한다"
        }
      },
      id: "appendText",
      chatbotDescription: "appendText(text)는 텍스트 상자 스프라이트의 기존 메시지의 뒤에 새로운 메시지를 추가할 때 사용하는 API야.  text에 원하는 메시지를 넣고 사용해봐."
    }, {
      name: "clearText()",
      snippet: "clearText()",
      tip: {
        description: {
          ko: "문구 모두 지우기"
        },
        "description2": {
          ko: "텍스트상자 스프라이트의 메시지를\n모두 지운다"
        }
      },
      id: "clearText",
      chatbotDescription: "clearText()는 텍스트 상자 스프라이트의 메시지를 모두 지우는 API야."
    }, {
      name: "getText()",
      snippet: "getText()",
      tip: {
        description: {
          ko: "문구값"
        },
        "description2": {
          ko: "텍스트상자 스프라이트의 메시지를 반환한다"
        }
      },
      id: "getText",
      chatbotDescription: "getText()는 텍스트 상자의 메시지를 반환하는 API야."
    }, {
      name: "setTextColor(color)",
      snippet: "setTextColor(\"black\")",
      selection: "black",
      "selectionType": "color",
      tip: {
        description: {
          ko: "문구값"
        },
        "params": [{
          name: "color",
          description: {
            ko: "문자열"
          }
        }],
        "description2": {
          ko: "텍스트상자 스프라이트의 문구 색상을 변경한다"
        }
      },
      id: "setTextColor",
      chatbotDescription: "setTextColor(color)는 텍스트 상자에 적은 메시지의 색깔을 설정하는 API야. 원하는 색을 color에 입력하고 사용해봐!"
    }, {
      name: "setRandomTextColor()",
      snippet: "setRandomTextColor()",
      tip: {
        description: {
          ko: "문구 색상 무작위로 변경하기"
        },
        "description2": {
          ko: "텍스트상자 스프라이트의 문구 색상을 무작위로 변경한다"
        }
      },
      id: "setRandomTextColor",
      chatbotDescription: "setRandomTextColor()는 텍스트 상자에 적은 메시지의 색깔을 랜덤으로 설정하는 API야. 어떤 색이 나올지 모르니까 기대할 만해."
    }, {
      name: "getTextColor()",
      snippet: "getTextColor()",
      tip: {
        description: {
          ko: "문구 색상 가져오기"
        },
        "description2": {
          ko: "텍스트상자 스프라이트의 문구 색상값을 반환하다"
        }
      },
      id: "getTextColor",
      chatbotDescription: "getTextColor()는 텍스트 상자에 적은 메시지가 어떤 색인지 알려주는 API야."
    }, {
      name: "shake()",
      snippet: "shake()",
      tip: {
        description: {
          ko: "흔들기"
        },
        "description2": {
          ko: "scene에 흔들리는 효과를 적용한다"
        }
      },
      id: "shake",
      chatbotDescription: "shake()는 화면을 흔들리게 하는 API야."
    }, {
      name: "flash()",
      snippet: "flash()",
      tip: {
        description: {
          ko: "반짝임"
        },
        "description2": {
          ko: "scene에 반짝이는 효과를 적용한다"
        }
      },
      id: "flash",
      chatbotDescription: "flash()는 scene에 반짝이는 효과를 적용할 때 사용하는 API야."
    }, {
      name: "getWorldWidth()",
      snippet: "getWorldWidth()",
      tip: {
        description: {
          ko: "배경의 너비값"
        },
        "description2": {
          ko: "scene의 너비값을 반환한다"
        }
      },
      id: "getWorldWidth",
      chatbotDescription: "getWorldWidth()는 배경의 너비를 반환하는 API야. "
    }, {
      name: "getWorldHeight()",
      snippet: "getWorldHeight()",
      tip: {
        description: {
          ko: "배경의 높이값"
        },
        "description2": {
          ko: "scene의 높이값을 반환한다"
        }
      },
      id: "getWorldHeight",
      chatbotDescription: "getWorldHeight()는 배경의 높이를 반환하는 API야. "
    }]
  }, {
    name: "ID_EVENT",
    api: [{
      name: "onFrame(function())",
      snippet: "onFrame(function(){})",
      tip: {
        description: {
          ko: "매 프레임마다 입력된 함수를 반복하여 호출하기"
        },
        "params": [{
          name: "function",
          description: {
            ko: "호출되는 함수"
          }
        }],
        "description2": {
          ko: "보통 1초에 60번 호출된다."
        }
      },
      newLine: "onFrame(function(){",
      id: "onFrame",
      chatbotDescription: "onFrame(function())은 프레임마다 {}괄호 안에 입력된 코드를 실행하는 API야. 참고로 알려주자면, 1 프레임은 0.1초 정도니까 보통 1초에 60번 호출한다고 생각하면 돼."
    }, {
      name: "onSignal(name,function())",
      snippet: "onSignal(\"name\",function(){})",
      tip: {
        description: {
          ko: "특정한 신호를 받았을 때 입력된 함수 호출하기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "신호의 이름"
          }
        }, {
          name: "function",
          description: {
            ko: "호출되는 함수"
          }
        }]
      },
      newLine: "onSignal(\"name\",function(){",
      selection: "name",
      "selectionType": "signal",
      id: "onSignal",
      chatbotDescription: "onSignal(name, function())은 특정 신호를 받았을 때 {} 괄호 안에 입력된 코드를 실행하는 API야. name에 sendSignal에서 만든 신호의 이름을 입력해봐!"
    }, {
      name: "sendSignal(name)",
      snippet: "sendSignal(\"name\")",
      tip: {
        description: {
          ko: "입력된 이름의 신호 보내기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "신호의 이름"
          }
        }]
      },
      selection: "name",
      "selectionType": "signal",
      id: "sendSignal",
      chatbotDescription: "sendSignal(name)은 신호를 보내는 API야. name에 원하는 신호의 이름을 입력해볼래? 참, 보낸 신호는 onSignal로 받을 수 있어."
    }, {
      name: "changeScene(name)",
      snippet: "changeScene(\"name\")",
      tip: {
        description: {
          ko: "입력된 이름의 scene으로 변경하기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "scene의 이름"
          }
        }]
      },
      selection: "name",
      "selectionType": "scene",
      id: "changeScene",
      chatbotDescription: "changeScene(name)은 현재 scene을 변경하는 API야. name에 변경하고 싶은 scene의 이름을 넣고 사용해봐."
    }, {
      name: "onClick(function())",
      snippet: "onClick(function(){})",
      tip: {
        description: {
          ko: "스프라이트를 클릭했을 때 입력된 함수 호출하기"
        },
        "params": [{
          name: "function",
          description: {
            ko: "호출되는 함수"
          }
        }]
      },
      newLine: "onClick(function(){",
      id: "onClick",
      chatbotDescription: "onClick(function())은 스프라이트를 클릭했을 때 {} 괄호 안의 코드를 실행하는 API야. 클릭했을 때 입력된 함수를 호출하는 거지."
    }, {
      name: "onClickUp(function())",
      snippet: "onClickUp(function(){})",
      tip: {
        description: {
          ko: "스프라이트를 클릭했다가 뗐을 때 입력된 함수 호출하기"
        },
        "params": [{
          name: "function",
          description: {
            ko: "호출되는 함수"
          }
        }]
      },
      newLine: "onClickUp(function(){",
      id: "onClickUp",
      chatbotDescription: "onClickUp(function())은 스프라이트를 클릭했다가 땠을 때 {} 괄호 안의 코드를 실행하는 API야. 클릭을 멈췄을 때 입력된 함수를 호출하는 거지."
    }, {
      name: "onScreenClick(function())",
      snippet: "onScreenClick(function(){})",
      tip: {
        description: {
          ko: "화면을 클릭했을 때 입력된 함수 호출하기"
        },
        "params": [{
          name: "function",
          description: {
            ko: "호출되는 함수"
          }
        }]
      },
      newLine: "onScreenClick(function(){",
      id: "onScreenClick",
      chatbotDescription: "onScreenClickfunction())은 화면을 클릭했을 때 {} 괄호 안에 입력된 코드를 실행하는 API야.  화면을 클릭하면 함수를 호출하는 거지."
    }, {
      name: "onScreenClickUp(function())",
      snippet: "onScreenClickUp(function(){})",
      tip: {
        description: {
          ko: "화면을 클릭했다가 뗐을 때 입력된 함수 호출하기"
        },
        "params": [{
          name: "function",
          description: {
            ko: "호출되는 함수"
          }
        }]
      },
      newLine: "onScreenClickUp(function(){",
      id: "onScreenClickUp",
      chatbotDescription: "onScreenClickfunction())은 화면을 클릭하다가 땠을 때 {} 괄호 안에 입력된 코드를 실행하는 API야. 화면 클릭을 멈추면 함수를 호출하는 거지."
    }, {
      name: "onKey(key,function())",
      snippet: "onKey(\"key\",function(){})",
      tip: {
        description: {
          ko: "특정 키를 눌렀을 때 호출되는 함수"
        },
        "params": [{
          name: "key",
          description: {
            ko: "키보드의 값"
          }
        }, {
          name: "function",
          description: {
            ko: "호출되는 함수"
          }
        }]
      },
      newLine: "onKey(\"key\",function(){",
      selection: "key",
      "selectionType": "key",
      id: "onKey",
      chatbotDescription: "onKey(key, function())는 특정 키를 눌렀을 때 {} 괄호 안에 입력된 코드를 실행하는 API야. key에 키의 종류를 입력해볼래? 입력한 key를 눌렀을 때 [}괄호로 묶인 함수를 실행할 거야."
    }, {
      name: "onKeyUp(key,function())",
      snippet: "onKeyUp(\"key\",function(){})",
      tip: {
        description: {
          ko: "특정 키를 눌렀다가 뗐을 때 호출되는 함수"
        },
        "params": [{
          name: "key",
          description: {
            ko: "키보드의 값"
          }
        }, {
          name: "function",
          description: {
            ko: "호출되는 함수"
          }
        }]
      },
      newLine: "onKeyUp(\"key\",function(){",
      selection: "key",
      "selectionType": "key",
      id: "onKeyUp",
      chatbotDescription: "onKeyUp(key, function())은 특정 키를 눌렀다가 땠을 때 {} 괄호 안에 입력된 코드를 실행하는 API야. key에 키의 종류를 입력해볼래? 입력한 key를 눌렀을 때 [}괄호로 묶인 함수를 실행할 거야."
    }, {
      name: "onOverlap(name,function())",
      snippet: "onOverlap(\"name\",function(){})",
      tip: {
        description: {
          ko: "특정 스프라이트와 만났을 때 입력된 함수 호출하기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "스프라이트의 이름"
          }
        }, {
          name: "function",
          description: {
            ko: "호출되는 함수"
          }
        }]
      },
      newLine: "onOverlap(\"name\",function(){",
      selection: "name",
      "selectionType": "sprite",
      id: "onOverlap",
      chatbotDescription: "onOverlap(name, function())은 특정 스프라이트와 만났을 때 {} 괄호 안에 입력된 코드를 실행하는 API야. name에 원하는 스프라이트의 이름을 입력해봐!"
    }, {
      name: "onOverlap([names...],function())",
      snippet: "onOverlap([\"name1\",\"name2\"],function(){})",
      tip: {
        description: {
          ko: "배열 속 스프라이트들과 만났을 때 입력된 함수 호출하기"
        },
        "params": [{
          name: "Array",
          description: {
            ko: "스프라이트 이름들의 배열"
          }
        }, {
          name: "function",
          description: {
            ko: "호출되는 함수"
          }
        }]
      },
      newLine: "onOverlap([\"name1\",\"name2\"],function(){",
      selection: "name1",
      "selectionType": "sprite",
      id: "onOverlap",
      chatbotDescription: "onOverlap(name, function())은 특정 스프라이트와 만났을 때 {} 괄호 안에 입력된 코드를 실행하는 API야. name에 원하는 스프라이트의 이름을 입력해봐!"
    }, {
      name: "onOverlapOnce(name,function())",
      snippet: "onOverlapOnce(\"name\",function(){})",
      tip: {
        description: {
          ko: "특정 스프라이트와 만났을 때 입력된 함수를 한번만 호출하기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "스프라이트의 이름"
          }
        }, {
          name: "function",
          description: {
            ko: "호출되는 함수"
          }
        }]
      },
      newLine: "onOverlapOnce(\"name\",function(){",
      selection: "name",
      "selectionType": "sprite",
      id: "onOverlapOnce",
      chatbotDescription: "onOverlapOnce(name,function())는 특정 스프라이트와 만났을 때 {} 괄호 안에 입력된 코드를 한 번만 실행하는 API야. name에 원하는 스프라이트의 이름을 입력해봐!"
    }, {
      name: "onOutStage(function())",
      snippet: "onOutStage(function(){})",
      tip: {
        description: {
          ko: "화면 밖으로 나갔을 때 입력된 함수 호출하기"
        },
        "params": [{
          name: "function",
          description: {
            ko: "호출되는 함수"
          }
        }]
      },
      newLine: "onOutStage(function(){",
      id: "onOutStage",
      chatbotDescription: "onOutStage(function())는 스프라이트가 화면 밖으로 나갔을 때 {} 괄호 안에 입력된 코드를 실행하는 API야.  화면 밖으로 나가면 함수를 호출하는 거지."
    }, {
      name: "onSwipe(direction,function())",
      snippet: "onSwipe(\"left\",function(){})",
      tip: {
        description: {
          ko: "화면을 특정한 방향으로 스와이프했을 때 입력된 함수 호출하기"
        },
        "params": [{
          name: "direction",
          description: {
            ko: "방향"
          }
        }, {
          name: "function",
          description: {
            ko: "호출되는 함수"
          }
        }],
        "description2": {
          ko: "방향 값으로는 left, right, top, down 이 있다."
        }
      },
      newLine: "onSwipe(\"left\",function(){",
      selection: "left",
      "selectionType": "direction",
      id: "onSwipe",
      chatbotDescription: "onSwipe(direction, function())는 화면을 특정 방향으로 밀었을 때 {} 괄호 안에 입력된 코드를 실행하는 API야. direction에 left, right, top, down 중 한 가지를 입력해볼래?"
    }]
  }, {
    name: "ID_CONTROL",
    api: [{
      name: "if / else / else if",
      snippet: "if(true){}",
      id: "if",
      chatbotDescription: "if / else / else if는 조건문을 만드는 API야.  if의 ()괄호 안에 원하는 조건을 입력하면, 그 조건을 만족했을 때 {} 괄호 안의 코드가 실행되지!"
    }, {
      name: "switch~case",
      snippet: "switch(value){case \"\" :break;default :break;}",
      newLine: "switch(value){",
      selection: "value",
      id: "switch",
      chatbotDescription: "switch~case는 조건문이랑 비슷한데, value 값에 따라 코드를 실행하고 멈추지."
    }, {
      name: "while()",
      snippet: "while(true){}",
      newLine: "while(true){",
      selection: "true",
      id: "while",
      chatbotDescription: "while()은 반복문을 만드는 API야. () 괄호 안에 조건을 입력하면 해당 조건을 만족하는 동안 {} 괄호 안의 코드를 실행하지."
    }, {
      name: "for()",
      snippet: "for(var i=0;i<10;i++){}",
      newLine: "for(var i=0;i<10;i++){",
      selection: "10",
      id: "for",
      chatbotDescription: "for()는 반복문이고, 일정 횟수만큼 특정 명령어들을 반복하고 싶을 때 사용할 수 있어."
    }, {
      name: "wait(secs)",
      snippet: "wait(1)",
      selection: "1",
      tip: {
        description: {
          ko: "특정 시간 기다리기"
        },
        "params": [{
          name: "secs",
          description: {
            ko: "숫자, 기다릴 초"
          }
        }],
        "description2": {
          ko: "secs초만큼 다음코드를 실행하지 않고 기다린다"
        }
      },
      id: "wait",
      chatbotDescription: "wait(secs)는 특정 시간을 기다릴 수 있게 하는 API야. secs에 입력된 초만큼 다음 코드를 실행하지 않고 기다리게 할 수 있어."
    }, {
      name: "setDraggable(enabled)",
      snippet: "setDraggable(true)",
      selection: "true",
      tip: {
        description: {
          ko: "드래그 가능여부 설정하기"
        },
        "params": [{
          name: "enabled",
          description: {
            ko: "true 또는 false"
          }
        }],
        "description2": {
          ko: "enabled가 true이면 스프라이트를 마우스나 터치로 드래그할 수 있다"
        }
      },
      id: "setDraggable",
      chatbotDescription: "setDraggable(enabled)은 스프라이트를 드래그하여 움직일 수 있는지를 설정하는 API야. enabled에 true를 입력하면 드래그할 수 있어!"
    }, {
      name: "kill()",
      snippet: "kill()",
      tip: {
        description: {
          ko: "없애기"
        },
        "description2": {
          ko: "scene에서 스프라이트가 제거된다"
        }
      },
      id: "kill",
      chatbotDescription: "kill()은 스프라이트를 없애는 API야. 스프라이트를 숨기는 hide와 달리 kill은 스프라이트를 사라지게 하지. 하지만 걱정하지 마. revive가 있다면 스프라이트를 다시 살릴 수 있어!"
    }, {
      name: "revive()",
      snippet: "revive()",
      tip: {
        description: {
          ko: "되살리기"
        },
        "description2": {
          ko: "secen에서 제거된(kill) 스프라이트를 되살린다"
        }
      },
      id: "revive",
      chatbotDescription: "revive()는 kill로 제거된 스프라이트를 되살릴 수 있는 API야."
    }, {
      name: "clone()",
      snippet: "clone()",
      tip: {
        description: {
          ko: "복제하기"
        },
        "description2": {
          ko: "해당 스프라이트가 복제되고 복제된 스프라이트를 반환한다"
        }
      },
      id: "clone",
      chatbotDescription: "clone()은 해당 스프라이트가 복제되고 복제된 스프라이트를 반환하는 API야."
    }, {
      name: "print(message)",
      snippet: "print(\"message\")",
      selection: "message",
      tip: {
        description: {
          ko: "디버그 메시지 출력"
        },
        "params": [{
          name: "message",
          description: {
            ko: "출력할 문자열"
          }
        }],
        "description2": {
          ko: "chatbot의 대화창에 message를 출력할 수 있다"
        }
      },
      id: "print",
      chatbotDescription: "print(message)는 챗봇 대화창에 메시지를 출력할 수 있는 API야. message에 원하는 메시지를 입력해봐! 에러가 난 부분을 찾을 때 사용하면 좋을 거야."
    }, {
      name: "input(message)",
      snippet: "input(\"message\")",
      selection: "message",
      tip: {
        description: {
          ko: "텍스트 입력받기"
        },
        "params": [{
          name: "message",
          description: {
            ko: "입력받을 때 힌트"
          }
        }],
        "description2": {
          ko: "입력박스가 나타나고 문자열 또는 숫자를 입력할 수 있다.\n[확인]을 누르면 입력된 값을 반환한다"
        }
      },
      id: "input",
      chatbotDescription: "input(message)는 텍스트를 입력받는 API야. 사용자가 입력한 값을 가져올 수 있지. message에 원하는 문구를 입력하면 입력을 받을 때 힌트처럼 나타나."
    }, {
      name: "showRanking()",
      snippet: "showRanking()",
      tip: {
        description: {
          ko: "랭킹 보여주기(내림차순)"
        }
      },
      id: "showRanking",
      chatbotDescription: "showRanking()은 저장된 랭킹을 내림차순으로 보여주는 API야. 그러니까, 점수가 높은 사람부터 보여준다 이 말이지."
    }, {
      name: "showRankingAscending()",
      snippet: "showRankingAscending()",
      tip: {
        description: {
          ko: "랭킹 보여주기(오름차순)"
        }
      },
      id: "showRankingAscending",
      chatbotDescription: "showRankingAscending()은 저장된 랭킹을 내림차순으로 보여주는 API야. 그러니까, 점수가 낮은 사람부터 보여준다 이 말이지."
    }, {
      name: "hideRanking()",
      snippet: "hideRanking()",
      tip: {
        description: {
          ko: "랭킹 숨기기"
        }
      },
      id: "hideRanking",
      chatbotDescription: "hideRanking() 랭킹을 숨기는 API야."
    }, {
      name: "saveScore(score)",
      snippet: "saveScore(100)",
      selection: "100",
      tip: {
        description: {
          ko: "랭킹에 점수 저장하기"
        },
        "params": [{
          name: "score",
          description: {
            ko: "저장할 점수"
          }
        }],
        "description2": {
          ko: "유저별로 가장 높은 점수 하나가 저장된다."
        }
      },
      id: "saveScore",
      chatbotDescription: "saveScore(score)는 랭킹에 점수를 저장하는 API야. score에 저장할 점수를 입력해봐!"
    }]
  }, {
    name: "ID_SENSING",
    api: [{
      name: "isClickedSprite()",
      snippet: "isClickedSprite()",
      tip: {
        description: {
          ko: "스프라이트를 클릭하고 있는지 여부"
        },
        "description2": {
          ko: "스프라이트를 클릭하고 있는 중이면 true, 그렇지 않으면 false를 반환한다"
        }
      },
      id: "isClickedSprite",
      chatbotDescription: "isClickedSprite는 스프라이트를 클릭하고 있는지를 알려주는 API야. 클릭하고 있다면 true를, 그렇지 않다면 false를 반환하지."
    }, {
      name: "isPressedKey(key)",
      snippet: "isPressedKey(\"key\")",
      selection: "key",
      "selectionType": "key",
      tip: {
        description: {
          ko: "특정키를 누르고 있는지 여부"
        },
        "params": [{
          name: "key",
          description: "판단할 키보드의 키"
        }],
        "description2": {
          ko: "key를 누르고 있는 중이면 true, 그렇지 않으면 false를 반환한다"
        }
      },
      id: "isPressedKey",
      chatbotDescription: "isPressedKey(key)는 특정키를 누르고 있는지를 알려주는 API야. 특정 키를 누르고 있다면 true를, 그렇지 않다면 false를 반환하지."
    }, {
      name: "isClickedMouse()",
      snippet: "isClickedMouse()",
      tip: {
        description: {
          ko: "마우스를 클릭하고 있는지 여부"
        },
        "description2": {
          ko: "마우스를 클릭하고 있는 중이면 true, 그렇지 않으면 false를 반환한다"
        }
      },
      id: "isClickedMouse",
      chatbotDescription: "isClickedMouse는 마우스를 클릭하고 있는지를 알려주는 API야. 클릭하고 있다면 true를, 그렇지 않다면 false를 반환하지."
    }, {
      name: "isOverlapped(name)",
      snippet: "isOverlapped(\"name\")",
      tip: {
        description: {
          ko: "특정 스프라이트와 닿아있는지 여부"
        },
        "params": [{
          name: "name",
          description: {
            ko: "스프라이트의 이름"
          }
        }]
      },
      selection: "name",
      "selectionType": "sprite",
      id: "isOverlapped",
      chatbotDescription: "isOverlapped(name)은 특정 스프라이트와 닿아있는지를 알려주는 API야. 닿아있다면 true를, 그렇지 않다면 false를 반환하지."
    }]
  }, {
    name: "ID_OPERATOR",
    api: [{
      name: "+,-,*,/,%",
      tip: {
        description: {
          ko: "사칙연산"
        },
        "params": [{
          name: "+",
          description: {
            ko: "더하기"
          }
        }, {
          name: "-",
          description: {
            ko: "빼기"
          }
        }, {
          name: "*",
          description: {
            ko: "곱하기"
          }
        }, {
          name: "/",
          description: {
            ko: "나누기"
          }
        }, {
          name: "%",
          description: {
            ko: "나머지"
          }
        }]
      },
      id: "+,-,*,/,%"
    }, {
      name: "<, >, ==, !=",
      tip: {
        description: {
          ko: "비교연산자"
        },
        "params": [{
          name: "<",
          description: {
            ko: "~보다 작음\n좌변보다 우변이 작으면 참을 반환한다"
          }
        }, {
          name: ">",
          description: {
            ko: "~보다 큰\n좌변보다 우변이 크면 참을 반환한다"
          }
        }, {
          name: "==",
          description: {
            ko: "일치\n좌변과 우변이 서로 같으면 참을 반환한다"
          }
        }, {
          name: "!=",
          description: {
            ko: "불일치\n좌변과 우변이 서로 다르면 참을 반환한다"
          }
        }]
      },
      id: "<, >, ==, !="
    }, {
      name: "!, ||, &&",
      tip: {
        description: {
          ko: "논리연산자"
        },
        "params": [{
          name: "!expr",
          description: {
            ko: "단일 피연산자를 true로 변환할 수 있으면 false를 반환하고, 그렇지 않으면 true를 반환한다"
          }
        }, {
          name: "expr1 || expr2",
          description: {
            ko: "expr1을 true로 변환할 수 있으면 expr1을 반환하고, 그렇지 않으면 expr2를 반환한다"
          }
        }, {
          name: "expr1 && expr2",
          description: {
            ko: "expr1을 true로 변환할 수 있는 경우 expr2을 반환하고, 그렇지 않으면 expr1을 반환한다"
          }
        }]
      },
      id: "!, ||, &&"
    }, {
      name: "abs(num)",
      snippet: "abs(number)",
      selection: "number",
      tip: {
        description: {
          ko: "절대값"
        },
        "params": [{
          name: "num",
          description: {
            ko: "절대값을 구할 숫자"
          }
        }],
        "description2": {
          ko: "num의 절대값을 반환한다"
        }
      },
      id: "abs",
      chatbotDescription: "abs(num)은 API는 절댓값을 구하는 API야. num에 원하는 수를 넣으면 num의 절댓값이 반환되지."
    }, {
      name: "round(num)",
      snippet: "round(number)",
      selection: "number",
      tip: {
        description: {
          ko: "반올림"
        },
        "params": [{
          name: "num",
          description: {
            ko: "반올림할 숫자"
          }
        }],
        "description2": {
          ko: "num의 소수점 이하 첫째자리에서 반올림한 값을 반환한다"
        }
      },
      id: "round",
      chatbotDescription: "round(num)는 소수점 첫째 자리에서 반올림한 값을 반환하는 API야. name에 소수점이 있는 숫자를 넣어볼래? 소수점이 사라지고 정수 숫자만 남을걸!"
    }, {
      name: "ceil(num)",
      snippet: "ceil(number)",
      selection: "number",
      tip: {
        description: {
          ko: "올림"
        },
        "params": [{
          name: "num",
          description: {
            ko: "올림할 숫자"
          }
        }],
        "description2": {
          ko: "num의 소수점 이하 첫째자리에서 올림한 값을 반환한다"
        }
      },
      id: "ceil",
      chatbotDescription: "ceil(num)은 특정 숫자의 소수점을 올림하는 API야. num의 소수점 이하 첫째 자리에서 올림한 값을 반환하지."
    }, {
      name: "floor(num)",
      snippet: "floor(number)",
      selection: "number",
      tip: {
        description: {
          ko: "버림"
        },
        "params": [{
          name: "num",
          description: {
            ko: "버림할 숫자"
          }
        }],
        "description2": {
          ko: "num의 소수점 이하 첫째자리에서 버림한 값을 반환한다"
        }
      },
      id: "floor",
      chatbotDescription: "floor(num)은 특정 숫자의 소수점 이하 첫째 자리에서 버림을 할 때 사용하는 API야."
    }, {
      name: "getRandom(min,max)",
      snippet: "getRandom(1,10)",
      selection: "1",
      tip: {
        description: {
          ko: "난수 생성하기"
        },
        "params": [{
          name: "min",
          description: {
            ko: "난수를 생성할 최소 숫자"
          }
        }, {
          name: "max",
          description: {
            ko: "난수를 생성할 최대 숫자"
          }
        }],
        "description2": {
          ko: "min과 max 사이의 값중에 하나를 무작위로 반환한다"
        }
      },
      id: "getRandom",
      chatbotDescription: "getRandom(min, max)는 min~max사이의 난수를 반환하는 API야."
    }, {
      name: "pow(num,exponent)",
      snippet: "pow(number,exponent)",
      selection: "number",
      tip: {
        description: {
          ko: "숫자의 제곱 구하기"
        },
        "params": [{
          name: "num",
          description: {
            ko: "밑, 여러 번 곱할 수"
          }
        }, {
          name: "exponent",
          description: {
            ko: "지수, 곱하는 횟수"
          }
        }],
        "description2": {
          ko: "base를 exponent번 곱한 결과, 즉 baseexponent를 반환한다"
        }
      },
      id: "pow",
      chatbotDescription: "pow(num, exponent)는 숫자의 제곱을 구하는 API야. num에 여러번 곱할 수를 입력하고 exponent에 곱하는 횟수를 입력하면 사용할 수 있지."
    }, {
      name: "sqrt(num)",
      snippet: "sqrt(number)",
      selection: "number",
      tip: {
        description: {
          ko: "숫자의 제곱근 구하기"
        },
        "params": [{
          name: "num",
          description: {
            ko: "제곱근을 구할 숫자"
          }
        }],
        "description2": {
          ko: "주어진 숫자에 루트(√ )를 씌운다. 만약 숫자가 음수이면 NaN를 반환한다"
        }
      },
      id: "sqrt",
      chatbotDescription: "sqrt(num)는 숫자의 제곱근을 구하는 API야. 제곱근을 구할 숫자를 num에 입력해볼래? 참, 만약 숫자 값이 음수이면 NaN을 반환하니 조심해!"
    }, {
      name: "log(num)",
      snippet: "log(number)",
      selection: "number",
      tip: {
        description: {
          ko: "숫자의 자연로그 구하기"
        },
        "params": [{
          name: "num",
          description: {
            ko: "자연로그를 구할 숫자"
          }
        }]
      },
      id: "log",
      chatbotDescription: "log(num)은 숫자의 자연로그를 구하는 API야. num에 자연로그를 구할 숫자를 넣어봐."
    }]
  }, {
    name: "ID_PHYSICS",
    api: [{
      name: "setCollideScene(enabled)",
      snippet: "setCollideScene(true)",
      selection: "true",
      tip: {
        description: {
          ko: "벽과 충돌하게 설정하기"
        },
        "params": [{
          name: "enabled",
          description: {
            ko: "true 또는 false"
          }
        }],
        "description2": {
          ko: "enabled가 true이고 물리효과가 적용된 스프라이트가 움직이는 중에\n스크린의 끝에 닿으면 충돌하게 된다"
        }
      },
      id: "setCollideScene",
      chatbotDescription: "setCollideScene(enabled)는 스프라이트가 벽과 충돌할 수 있게 설정하는 API야. enabled에 true를 입력하면 스프라이트가 화면 밖으로 나가지 않고 충돌하지."
    }, {
      name: "setCollision(targetName)",
      snippet: "setCollision(\"targetName\")",
      selection: "targetName",
      "selectionType": "sprite",
      tip: {
        description: {
          ko: "특정 스프라이트와 충돌하게 설정하기"
        },
        "params": [{
          name: "targetName",
          description: {
            ko: "충돌을 설정할 스프라이트 이름"
          }
        }],
        "description2": {
          ko: "targetName의 스프라이트와 닿았을 때 충돌하게 된다"
        }
      },
      id: "setCollision",
      chatbotDescription: "setCollision(targetName)은 특정 스프라이트와 충돌할 수 있게 설정하는 API야. targetName에 원하는 스프라이트의 이름을 넣으면 해당 스프라이트와 충돌하게 되지."
    }, {
      name: "setCollision([targetNames...])",
      snippet: "setCollision([\"targetName1\",\"targetName2\"])",
      selection: "targetName1",
      "selectionType": "sprite",
      tip: {
        description: {
          ko: "특정 스프라이트와 충돌하게 설정하기"
        },
        "params": [{
          name: "[targetName]",
          description: {
            ko: "충돌을 설정할 스프라이트 이름 배열"
          }
        }],
        "description2": {
          ko: "targetNames의 스프라이트들과 닿았을 때 충돌하게 된다"
        }
      },
      id: "setCollision",
      chatbotDescription: "setCollision(targetName)은 특정 스프라이트와 충돌할 수 있게 설정하는 API야. targetName에 원하는 스프라이트의 이름을 넣으면 해당 스프라이트와 충돌하게 되지."
    }, {
      name: "setCollideSide(direction, enabled)",
      snippet: "setCollideSide(\"down\",false)",
      selection: "down",
      "selectionType": "direction",
      tip: {
        description: {
          ko: "충돌 방향값 설정하기"
        },
        "params": [{
          name: "direction",
          description: {
            ko: "up, down, left, right 중 하나"
          }
        }, {
          name: "enabled",
          description: "true 또는 false"
        }],
        "description2": {
          ko: "direction방향에 대한 충돌설정을 적용한다.\n예를 들어 특정 스프라이트에 down, false로 설정되면 \n그 스프라이트는 다른스프라이트와 충돌을 할 때 아래방향에 대한\n충돌은 하지 않게 된다"
        }
      },
      id: "setCollideSide",
      chatbotDescription: "setCollideSide(direction, enabled)는 충돌 방향을 설정하는 API야. direction에 up, down, left, right 중 한 가지의 방향을 넣고 enabled에 true나 false를 넣어서 해당 방향으로 충돌할 수 있는지를 결정할 수 있어."
    }, {
      name: "setMovable(enabled)",
      snippet: "setMovable(false)",
      selection: "false",
      tip: {
        description: {
          ko: "충돌했을 때의 움직임 설정"
        },
        "params": [{
          name: "enabled",
          description: {
            ko: "true 또는 false"
          }
        }],
        "description2": {
          ko: "false일 경우 setCollision을 통해 충돌설정이 되었을 때\n충돌은 하지만 충돌 후 튕겨나가지 않게 된다"
        }
      },
      id: "setMovable",
      chatbotDescription: "setMovable(enabled)은 충돌한 스프라이트가 튕겨 나가는지를 설정하는 API야. enabled에 false를 입력하면 스프라이트가 충돌하더라도 그 힘으로 튕겨 나가는 일은 없을 거야."
    }, {
      name: "setMass(value)",
      snippet: "setMass(10)",
      selection: "10",
      tip: {
        description: {
          ko: "질량 설정하기"
        },
        "params": [{
          name: "value",
          description: {
            ko: "숫자(설정할 질량값)"
          }
        }],
        "description2": {
          ko: "질량을 설정한다.\n다른 물리효과와 상호작용한다"
        }
      },
      id: "setMass",
      chatbotDescription: "setMass(value)는 스프라이트의 질량을 설정하는 API야. value에 원하는 숫자 값을 입력해봐! "
    }, {
      name: "setGravityX(value)",
      snippet: "setGravityX(100)",
      selection: "100",
      tip: {
        description: {
          ko: "x축 중력 설정하기"
        },
        "params": [{
          name: "value",
          description: {
            ko: "숫자(설정할 중력값)"
          }
        }],
        "description2": {
          ko: "x축에 대한 중력을 설정한다.\n다른 물리효과와 상호작용한다"
        }
      },
      id: "setGravityX",
      chatbotDescription: "setGravityX(value)는 x축 중력을 설정하는 API야. value에 원하는 숫자 값을 입력해봐! value가 0보다 크면 오른쪽으로 중력이 작용해. 참, 물리 명령어들은 상호 작용하는 걸 잊지 마~ "
    }, {
      name: "setGravityY(value)",
      snippet: "setGravityY(100)",
      selection: "100",
      tip: {
        description: {
          ko: "y축 중력 설정하기"
        },
        "params": [{
          name: "value",
          description: {
            ko: "숫자(설정할 중력값)"
          }
        }],
        "description2": {
          ko: "y축에 대한 중력을 설정한다.\n다른 물리효과와 상호작용한다"
        }
      },
      id: "setGravityY",
      chatbotDescription: "setGravityX(value)는 y축 중력을 설정하는 API야. value에 원하는 숫자 값을 입력해봐! value가 0보다 크면 아래로 중력이 작용해. 참, 물리 명령어들은 상호 작용하는 걸 잊지 마~ "
    }, {
      name: "setVelocityX(value)",
      snippet: "setVelocityX(100)",
      selection: "100",
      tip: {
        description: {
          ko: "x축 속도 설정하기"
        },
        "params": [{
          name: "value",
          description: {
            ko: "숫자(설정할 속도값)"
          }
        }],
        "description2": {
          ko: "x축에 대한 속도를 설정한다.\n다른 물리효과와 상호작용한다"
        }
      },
      id: "setVelocityX",
      chatbotDescription: "setVelocityX(value)는 스프라이트의 x축 속도를 설정하는 API야. value가 0보다 크면 오른쪽 속도가 생겨."
    }, {
      name: "setVelocityY(value)",
      snippet: "setVelocityY(100)",
      selection: "100",
      tip: {
        description: {
          ko: "y축 속도 설정하기"
        },
        "params": [{
          name: "value",
          description: {
            ko: "숫자(설정할 속도값)"
          }
        }],
        "description2": {
          ko: "y축에 대한 속도를 설정한다.\n다른 물리효과와 상호작용한다"
        }
      },
      id: "setVelocityY",
      chatbotDescription: "setVelocityY(value)는 스프라이트의 y축 속도를 설정하는 API야. value가 0보다 크면 아래로 속도가 생겨."
    }, {
      name: "getVelocityX()",
      snippet: "getVelocityX()",
      tip: {
        description: {
          ko: "x축 속도 가져오기"
        }
      },
      id: "getVelocityX",
      chatbotDescription: "getVelocityX()는 스프라이트의 X축 속도를 반환하는 API야. X축은 가로를 의미해! 오른쪽으로 가고 있다면 X축 속도는 0보다 큰 숫자가 되지."
    }, {
      name: "getVelocityY()",
      snippet: "getVelocityY()",
      tip: {
        description: {
          ko: "y축 속도 가져오기"
        }
      },
      id: "getVelocityY",
      chatbotDescription: "getVelocityY()는 스프라이트의 Y축 속도를 반환하는 API야. Y축은 세로를 의미해! 아래로 가고 있다면 Y축 속도는 0보다 큰 숫자가 되지."
    }, {
      name: "setBounceX(value)",
      snippet: "setBounceX(1)",
      selection: "1",
      tip: {
        description: {
          ko: "충돌했을 때 x축 튕기는 정도 설정하기"
        },
        "params": [{
          name: "value",
          description: {
            ko: "숫자(설정할 튕기는 정도의 값)"
          }
        }],
        "description2": {
          ko: "다른 스프라이트와 충돌했을 때, 설정한 값만큼 반작용이 일어난다.\n값이 1일 경우 작용하는 힘을 그대로 전달받게 된다"
        }
      },
      id: "setBounceX",
      chatbotDescription: "setBounceX(value)는 스프라이트가 충돌했을 때 X축, 그러니까 가로 방향으로 튕기는 정도를 설정하는 API야. value에 원하는 숫자 값을 입력해봐! 참고로 1을 입력하면 충돌할 때의 힘 그대로 튕겨."
    }, {
      name: "setBounceY(value)",
      snippet: "setBounceY(1)",
      selection: "1",
      tip: {
        description: {
          ko: "충돌했을 때 y축 튕기는 정도 설정하기"
        },
        "params": [{
          name: "value",
          description: {
            ko: "숫자(설정할 튕기는 정도의 값)"
          }
        }],
        "description2": {
          ko: "다른 스프라이트와 충돌했을 때, 설정한 값만큼 반작용이 일어난다.\n값이 1일 경우 작용하는 힘을 그대로 전달받게 된다"
        }
      },
      id: "setBounceY",
      chatbotDescription: "setBounceY(value)는 스프라이트가 충돌했을 때 Y축, 그러니까 세로 방향으로 튕기는 정도를 설정하는 API야. value에 원하는 숫자 값을 입력해봐! 참고로 1을 입력하면 충돌할 때의 힘 그대로 튕겨."
    }, {
      name: "setAccelerationX(value)",
      snippet: "setAccelerationX(100)",
      selection: "100",
      tip: {
        description: {
          ko: "x축 가속도 설정하기"
        },
        "params": [{
          name: "value",
          description: {
            ko: "숫자(설정할 가속도값)"
          }
        }],
        "description2": {
          ko: "x축에 대한 가속도를 설정한다.\n다른 물리효과와 상호작용한다"
        }
      },
      id: "setAccelerationX",
      chatbotDescription: "setAccelerationX(value)는 x축 가속도를 설정하는 API야. value에 가속도 값을 입력해봐! 다른 물리효과와 상호작용해서 가속도가 적용될 거야."
    }, {
      name: "setAccelerationY(value)",
      snippet: "setAccelerationY(1)",
      selection: "1",
      tip: {
        description: {
          ko: "y축 가속도 설정하기"
        },
        "params": [{
          name: "value",
          description: {
            ko: "숫자(설정할 가속도값)"
          }
        }],
        "description2": {
          ko: "y축에 대한 가속도를 설정한다.\n다른 물리효과와 상호작용한다"
        }
      },
      id: "setAccelerationY",
      chatbotDescription: "setAccelerationY(value)는 y축 가속도를 설정하는 API야. value에 가속도 값을 입력해봐! 다른 물리효과와 상호작용해서 가속도가 적용될 거야."
    }, {
      name: "setVelocityFromDegree(degree,force,maxSpeed)",
      snippet: "setVelocityFromDegree(90,1,300)",
      tip: {
        description: {
          ko: "방향으로 속도 설정하기"
        },
        "params": [{
          name: "degree",
          description: {
            ko: "숫자(설정할 방향값)"
          }
        }, {
          name: "force",
          description: {
            ko: "숫자(0~1), maxSpeed의 비율"
          }
        }, {
          name: "maxSpeed",
          description: {
            ko: "숫자(최고 속도)"
          }
        }],
        "description2": {
          ko: "velocity x,y값을 방향에따라 설정한다.\nforce가 0.5이고 maxSpeed가 100이면 적용되는 속도는 50이 된다."
        }
      },
      id: "setVelocityFromDegree",
      chatbotDescription: "setVelocityFromDegree(degree, force, maxSpeed)는 방향으로 속도를 설정하는 API야. degree에 설정할 방향 값, force에 최고 가속도의 비율, maxSpeed에 최고 가속도를 입력해봐. 참, force는 비율이니까 0~1 사이의 값을 입력해야 돼!"
    }, {
      name: "setAccelerationFromDegree(degree,force,maxSpeed)",
      snippet: "setAccelerationFromDegree(90,1,300)",
      tip: {
        description: {
          ko: "방향으로 가속도 설정하기"
        },
        "params": [{
          name: "degree",
          description: {
            ko: "숫자(설정할 방향값)"
          }
        }, {
          name: "force",
          description: {
            ko: "숫자(0~1), maxSpeed의 비율"
          }
        }, {
          name: "maxSpeed",
          description: {
            ko: "숫자(최고 가속도)"
          }
        }],
        "description2": {
          ko: "velocity x,y값을 방향에따라 설정한다.\nforce가 0.5이고 maxSpeed가 100이면 적용되는 가속도는 50이 된다."
        }
      },
      id: "setAccelerationFromDegree",
      chatbotDescription: "setAccelerationFromDegree(degree, force, maxSpeed)는 방향으로 가속도를 설정하는 API야. degree에 설정할 방향 값, force에 최고 가속도의 비율, maxSpeed에 최고 가속도를 입력해봐. 참, force는 비율이니까 0~1 사이의 값을 입력해야돼!"
    }]
  }, {
    name: "ID_SOUND",
    api: [{
      name: "playSound(name, isLoop)",
      snippet: "playSound(\"name\", false)",
      tip: {
        description: {
          ko: "사운드 스프라이트 재생하기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "사운드 스프라이트의 이름"
          }
        }, {
          name: "isLoop",
          description: {
            ko: "반복 재생 여부"
          }
        }],
        "description2": {
          ko: "입력된 사운드 스프라이트를\n1회 혹은 반복하여 재생한다."
        }
      },
      selection: "name",
      "selectionType": "sound",
      id: "playSound",
      chatbotDescription: "playSound(name, isLoop)는 사운드 스프라이트를 재생하는 API야. name에 재생하고 싶은 사운드 스프라이트의 이름을 입력해볼래?"
    }, {
      name: "restartSound(name)",
      snippet: "restartSound(\"name\")",
      tip: {
        description: {
          ko: "사운드 스프라이트 처음부터 다시 재생하기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "사운드 스프라이트의 이름"
          }
        }],
        "description2": {
          ko: "입력된 사운드 스프라이트를 처음부터 다시 재생한다.\n(반복 여부는 playSound 함수에서 설정된 값을 따른다.)"
        }
      },
      selection: "name",
      "selectionType": "sound",
      id: "restartSound",
      chatbotDescription: "restartTimer(name)는 사운드 스프라이트를 처음부터 다시 재생하는 API야. name에 처음부터 다시 재생하고 싶은 사운드 스프라이트의 이름을 입력해봐!"
    }, {
      name: "resumeSound(name)",
      snippet: "resumeSound(\"name\")",
      tip: {
        description: {
          ko: "사운드 스프라이트 이어서 재생하기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "사운드 스프라이트의 이름"
          }
        }],
        "description2": {
          ko: "입력된 사운드 스프라이트를 일시정지된 위치부터 다시 재생한다.\n(반복 여부는 playSound 함수에서 설정된 값을 따른다.)"
        }
      },
      selection: "name",
      "selectionType": "sound",
      id: "resumeSound",
      chatbotDescription: "resumeSound(name)는 멈췄던 사운드 스프라이트를 이어서 재생하는 API야. name에 이어서 재생하고 싶은 사운드 스프라이트의 이름을 입력해봐!"
    }, {
      name: "stopAllSounds()",
      snippet: "stopAllSounds()",
      tip: {
        description: {
          ko: "재생중인 모든 사운드 스프라이트 정지하기"
        }
      },
      id: "stopAllSounds",
      chatbotDescription: "stopAllSounds()는 재생 중인 모든 사운드 스프라이트를 정지하는 API야. 모든 소리를 끄고 싶으면 사용해봐!"
    }, {
      name: "stopSound(name)",
      snippet: "stopSound(\"name\")",
      tip: {
        description: {
          ko: "사운드 스프라이트 정지하기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "사운드 스프라이트의 이름"
          }
        }]
      },
      selection: "name",
      "selectionType": "sound",
      id: "stopSound",
      chatbotDescription: "stopSound(name)은 사운드 스프라이트를 정지하는 API야. 일시 정지가 아니라 완전히 정지해서 이어서 재생하기가 불가능하니까 참고해!"
    }, {
      name: "pauseSound(name)",
      snippet: "pauseSound(\"name\")",
      tip: {
        description: {
          ko: "사운드 스프라이트 일시정지하기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "사운드 스프라이트의 이름"
          }
        }]
      },
      selection: "name",
      "selectionType": "sound",
      id: "pauseSound",
      chatbotDescription: "pauseSound(name)은 사운드 스프라이트를 일시정지하는 API야. name에 재생되고 있는 사운드 스프라이트의 이름을 입력해볼래?"
    }, {
      name: "setSoundVolume(value)",
      snippet: "setSoundVolume(1)",
      tip: {
        description: {
          ko: "앱의 음량 설정하기"
        },
        "params": [{
          name: "value",
          description: {
            ko: "음량(0~1 사이의 값)"
          }
        }]
      },
      selection: "1",
      id: "setSoundVolume",
      chatbotDescription: "setSoundVolume(value)은 앱의 음량을 설정하는 API야. value에 0~1 사이의 값을 입력해볼래?"
    }, {
      name: "addSoundVolume(value)",
      snippet: "addSoundVolume(0.1)",
      tip: {
        description: {
          ko: "앱의 음량을 value만큼 키우기"
        },
        "params": [{
          name: "value",
          description: {
            ko: "음량의 변화 크기(0~1 사이의 값)"
          }
        }]
      },
      selection: "0.1",
      id: "addSoundVolume",
      chatbotDescription: "addSoundVolume(value)은 앱의 음량을 value만큼 추가하는 API야. 음량은 0~1 사이니까 원하는 만큼 value에 값을 적고 사용해봐."
    }, {
      name: "getSoundVolume()",
      snippet: "getSoundVolume()",
      tip: {
        description: {
          ko: "현재 앱의 음량 가져오기"
        }
      },
      id: "getSoundVolume",
      chatbotDescription: "getSoundVolume()은 앱의 음량을 반환하는 API야. 음량은 0~1사이니깐 참고해."
    }]
  }, {
    name: "ID_TIME",
    api: [{
      name: "startTimer()",
      snippet: "startTimer()",
      tip: {
        description: {
          ko: "타이머 시작하기"
        }
      },
      id: "startTimer",
      chatbotDescription: "startTimer()는 타이머를 시작하는 API야."
    }, {
      name: "pauseTimer()",
      snippet: "pauseTimer()",
      tip: {
        description: {
          ko: "타이머 멈추기"
        }
      },
      id: "pauseTimer",
      chatbotDescription: "pauseTimer()는 타이머를 멈추는 API야. 타이머가 일시정지 상태가 되는 거지."
    }, {
      name: "resumeTimer()",
      snippet: "resumeTimer()",
      tip: {
        description: {
          ko: "타이머 이어서 시작하기"
        }
      },
      id: "resumeTimer",
      chatbotDescription: "resumeTimer()는 멈췄던 타이머를 이어서 재생하는 API야."
    }, {
      name: "resetTimer()",
      snippet: "resetTimer()",
      tip: {
        description: {
          ko: "타이머 0초로 되돌리기"
        }
      },
      id: "resetTimer",
      chatbotDescription: "resetTimer()는 타이머를 0초로 되돌리는 API야."
    }, {
      name: "getTimer()",
      snippet: "getTimer()",
      tip: {
        description: {
          ko: "현재 타이머의 값 가져오기"
        }
      },
      id: "getTimer",
      chatbotDescription: "getTimer()는 현재 타이머의 값을 가져올 수 있는 API야. starTimer()와 함께 사용하면 시간을 잴 수 있어!"
    }, {
      name: "getYear()",
      snippet: "getYear()",
      tip: {
        description: {
          ko: "현재 연도를 가져오기"
        }
      },
      id: "getYear",
      chatbotDescription: "getDay()는 현재 년도를 반환하는 API야."
    }, {
      name: "getMonth()",
      snippet: "getMonth()",
      tip: {
        description: {
          ko: "현재 월을 가져오기"
        }
      },
      id: "getMonth",
      chatbotDescription: "getMonth()는 현재 몇 월인지를 반환하는 API야."
    }, {
      name: "getDay()",
      snippet: "getDay()",
      tip: {
        description: {
          ko: "현재 일을 가져오기"
        }
      },
      id: "getDay",
      chatbotDescription: "getDay()는 현재 며칠인지를 반환하는 API야."
    }, {
      name: "getHour()",
      snippet: "getHour()",
      tip: {
        description: {
          ko: "현재 시간을 가져오기"
        }
      },
      id: "getHour",
      chatbotDescription: "getHour()는 현재 몇 시인지를 반환하는 API야."
    }, {
      name: "getMin()",
      snippet: "getMin()",
      tip: {
        description: {
          ko: "현재 분을 가져오기"
        }
      },
      id: "getMin",
      chatbotDescription: "getMin()은 현재 몇 분인지를 반환하는 API야."
    }, {
      name: "getSec()",
      snippet: "getSec()",
      tip: {
        description: {
          ko: "현재 초를 가져오기"
        }
      },
      id: "getSec",
      chatbotDescription: "getSec()는 현재 몇 초인지를 반환하는 API야."
    }]
  }, {
    name: "ID_PEN",
    api: [{
      name: "startPen()",
      snippet: "startPen()",
      tip: {
        description: {
          ko: "펜 사용 시작하기"
        }
      },
      id: "startPen",
      chatbotDescription: "startPen()은 펜 사용을 시작하는 API야."
    }, {
      name: "endPen()",
      snippet: "endPen()",
      tip: {
        description: {
          ko: "펜 사용 끝내기"
        }
      },
      id: "endPen",
      chatbotDescription: "endPen()은 스프라이트에서 펜 사용을 끝낼 때 사용하는 API야."
    }, {
      name: "setPenColor(color)",
      snippet: "setPenColor(\"red\")",
      tip: {
        description: {
          ko: "펜 색깔 설정하기"
        },
        "params": [{
          name: "color",
          description: {
            ko: "색깔"
          }
        }]
      },
      selection: "red",
      "selectionType": "color",
      id: "setPenColor",
      chatbotDescription: "setPenColor(color)는 펜의 색깔을 설정하는 API야. 원하는 색을 color에 입력하고 사용해봐!"
    }, {
      name: "setRandomPenColor()",
      snippet: "setRandomPenColor()",
      tip: {
        description: {
          ko: "펜의 색깔을 랜덤으로 설정하기"
        }
      },
      id: "setRandomPenColor",
      chatbotDescription: "setRandomPenColor()는 펜의 색깔을 랜덤으로 설정하는 API야. 어떤 색이 나올지 모르니까 기대할 만해."
    }, {
      name: "getPenColor()",
      snippet: "getPenColor()",
      tip: {
        description: {
          ko: "사용중인 펜의 색깔 가져오기"
        }
      },
      id: "getPenColor",
      chatbotDescription: "getPenColor()는 스프라이트의 펜 색상을 반환하는 API야."
    }, {
      name: "setPenSize(size)",
      snippet: "setPenSize(1)",
      tip: {
        description: {
          ko: "펜 두께를 size로 설정하기"
        },
        "params": [{
          name: "size",
          description: {
            ko: "펜의 두께"
          }
        }]
      },
      selection: "1",
      id: "setPenSize",
      chatbotDescription: "setPenSize(size)는 펜의 두께를 설정하는 API야. 원하는 두께를 size에 입력하고 사용해봐!"
    }, {
      name: "addPenSize(size)",
      snippet: "addPenSize(1)",
      tip: {
        description: {
          ko: "펜 두께를 size만큼 두껍게 만들기"
        },
        "params": [{
          name: "size",
          description: {
            ko: "펜 두께의 변화 크기"
          }
        }]
      },
      selection: "1",
      id: "addPenSize",
      chatbotDescription: "addPenSize(size)는 펜의 두께를 변경하는 API야. size에 원하는 숫자를 넣어서 사용해봐."
    }, {
      name: "getPenSize()",
      snippet: "getPenSize()",
      tip: {
        description: {
          ko: "사용중인 펜의 두께 가져오기"
        }
      },
      id: "getPenSize",
      chatbotDescription: "getPenSize()는 스프라이트의 펜 두께를 반환하는 API야."
    }, {
      name: "erasePen()",
      snippet: "erasePen()",
      tip: {
        description: {
          ko: "사용했던 펜 내용 지우기"
        }
      },
      id: "erasePen",
      chatbotDescription: "erasePen()은 스프라이트로 그려진 펜을 지울 때 사용하는 API야."
    }]
  }, {
    name: "ID_MOBILE",
    api: [{
      name: "vibrate()",
      snippet: "vibrate()",
      tip: {
        description: {
          ko: "진동 설정하기"
        },
        "description2": {
          ko: "(모바일 전용)\n모바일 기기에서 진동이 울린다."
        }
      },
      id: "vibrate",
      chatbotDescription: "vibrate()는 모바일 전용이고 진동을 설정하는 API야."
    }, {
      name: "onShake(function())",
      snippet: "onShake(function(){})",
      newLine: "onShake(function(){",
      tip: {
        description: {
          ko: "기기를 흔들었을 때"
        },
        "description2": {
          ko: "(모바일 전용)\n모바일 기기를 빠르게 흔들었을 때 호출된다."
        }
      },
      id: "onShake",
      chatbotDescription: "onShake(function())는 모바일 전용이고 기기를 흔들었을 때 {} 괄호 안에 입력된 코드를 실행하는 API야."
    }, {
      name: "onGyro(function(x,y))",
      snippet: "onGyro(function(x,y){})",
      newLine: "onGyro(function(x,y){",
      tip: {
        description: {
          ko: "기기를 기울일 때"
        },
        "params": [{
          name: "x",
          description: {
            ko: "기기가 기울어진 x축의 값"
          }
        }, {
          name: "y",
          description: {
            ko: "기기가 기울어진 y축의 값"
          }
        }],
        "description2": {
          ko: "(모바일 전용)\n모바일 기기를 기울였을 때 호출된다."
        }
      },
      id: "onGyro",
      chatbotDescription: "onGyro(function(x, y))는 모바일 전용이고 기기를 기울일 때 {} 괄호 안에 입력된 코드를 실행하는 API야."
    }, {
      name: "startListening()",
      snippet: "startListening()",
      tip: {
        description: {
          ko: "음성 입력을 받는다"
        },
        "description2": {
          ko: "(모바일 전용)\n모바일 기기를 통해 음성 입력을 대기한다.\n입력이 되면 onListening을 통해 입력된 음성값을 받는다."
        }
      },
      id: "startListening",
      chatbotDescription: "startListening()은 모바일 전용이고 음성 입력을 받을 준비를 하는 API야. onListening과 함께 사용해서 음성 입력을 받을 수 있어."
    }, {
      name: "onListening(function(msg))",
      snippet: "onListening(function(msg){})",
      newLine: "onListening(function(msg){",
      tip: {
        description: {
          ko: "음성을 입력받았을 때"
        },
        "params": [{
          name: "msg",
          description: {
            ko: "모바일 기기를 통해 입력되어진 음성 값"
          }
        }],
        "description2": {
          ko: "(모바일 전용)\nstartListening을 통해 입력된 음성 값을 받는다."
        }
      },
      id: "onListening",
      chatbotDescription: "onListening(function(msg))는 모바일 기기를 통해 음성을 입력받았을 때 {} 괄호 안에 입력된 코드를 실행하는 API야. startListening과 함께 사용하지."
    }, {
      name: "speak(msg)",
      snippet: "speak(\"Hello, WizLab\")",
      tip: {
        description: {
          ko: "음성을 출력한다."
        },
        "params": [{
          name: "msg",
          description: {
            ko: "음성으로 출력 할 내용"
          }
        }],
        "description2": {
          ko: "(모바일 전용)\nmsg값을 모바일 기기를 통해 음성으로 출력한다."
        }
      },
      id: "speak",
      chatbotDescription: "speak(msg)는 모바일 전용이고 메시지를 음성으로 출력해주는 API야. msg에 음성으로 출력되길 원하는 메시지를 입력해봐!"
    }, {
      name: "openCamera(facing)",
      snippet: "openCamera(\"front\")",
      tip: {
        description: {
          ko: "모바일에서 카메라를 연다"
        },
        "params": [{
          name: "facing",
          description: {
            ko: "오픈할 카메라 방향을 선택"
          }
        }],
        "description2": {
          ko: "(모바일 전용)\nfacing값을 통해 카메라 방향을 선택한 후 모바일 기기에서 카메라를 연다."
        }
      },
      id: "openCamera",
      chatbotDescription: "openCamera(facing)는 모바일 전용 API고 모바일 기기에서 카메라를 여는 API야."
    }, {
      name: "closeCamera()",
      snippet: "closeCamera()",
      tip: {
        description: {
          ko: "모바일에서 카메라를 닫는다"
        },
        "description2": {
          ko: "(모바일 전용)\n모바일 기기에서 카메라를 닫는다."
        }
      },
      id: "closeCamera",
      chatbotDescription: "closeCamera()는 모바일 전용 API고 모바일 기기에서 카메라를 닫는 API야."
    }, {
      name: "switchCamera()",
      snippet: "switchCamera()",
      tip: {
        description: {
          ko: "카메라 방향을 전환한다"
        },
        "description2": {
          ko: "(모바일 전용)모바일 기기에서 카메라 방향을 전환한다."
        }
      },
      id: "switchCamera",
      chatbotDescription: "switchCamera()는 모바일 전용이고 카메라의 방향을 전환하는 API야. "
    }, {
      name: "onFaceDetect(function(face))",
      snippet: "onFaceDetect(function(face){})",
      newLine: "{",
      tip: {
        description: {
          ko: "카메라를 통해 얼굴을 인식한다."
        },
        "params": [{
          name: "face",
          description: {
            ko: "모바일 기기를 통해 인식된 얼굴 정보"
          }
        }],
        "description2": {
          ko: "(모바일 전용)\n모바일 기기에서 카메라로 얼굴을 인식한후 인식한 얼굴에 대한 정보를 가져온다."
        }
      },
      id: "onFaceDetect",
      chatbotDescription: "onFaceDetect(function(face))는 모바일 전용이고 카메라로 얼굴 인식을 하는 API야."
    }]
  }, {
    name: "ID_PARAMETER",
    api: [{
      name: "function",
      snippet: "function name(){}",
      newLine: "{",
      selection: "name",
      tip: {
        description: {
          ko: "함수를 선언한다."
        },
        "description2": {
          ko: "name이라는 이름의 함수를 선언한다.\n"
        }
      },
      id: "function",
      chatbotDescription: "function()은 함수를 선언할 때 사용할 수 있어. 만들고 싶은 함수의 이름과 함께 입력해볼래?"
    }, {
      name: "var",
      snippet: "var name",
      selection: "name",
      tip: {
        description: {
          ko: "변수를 선언한다."
        },
        "description2": {
          ko: "name이라는 이름의 변수를 선언한다.\n"
        }
      },
      id: "var",
      chatbotDescription: "var은 변수를 선언할 때 사용할 수 있어. var을 입력하고 오른쪽에 원하는 변수 이름을 입력한 다음 = 기호를 사용해서 값을 저장하지. 값을 저장하는 상자라고 생각하면 돼!"
    }, {
      name: "let",
      snippet: "let name",
      selection: "name",
      tip: {
        description: {
          ko: "변수를 선언한다."
        },
        "description2": {
          ko: "name이라는 이름의 변수를 선언한다.\n"
        }
      },
      id: "let",
      chatbotDescription: "let은 변수를 선언할 때 사용해. 하지만 var보다는 접근할 수 있는 범위가 작아!"
    }, {
      name: "const",
      snippet: "const name",
      selection: "name",
      tip: {
        description: {
          ko: "상수를 선언한다."
        },
        "description2": {
          ko: "name이라는 이름의 상수를 선언한다.\n"
        }
      },
      id: "const",
      chatbotDescription: "const는 상수를 선언할 때 사용해."
    }, {
      name: "global",
      snippet: "global.name",
      selection: "name",
      "selectionType": "global",
      tip: {
        description: {
          ko: "전역 오브젝트"
        },
        "description2": {
          ko: "앱 전체에서 사용 가능한 전역 오브젝트이다.\nscene이 달라도 같이 사용된다"
        }
      },
      id: "global",
      chatbotDescription: "global은 전역 오브젝트라고 하는데 변수 앞에 global.을 붙이면 다른 스프라이트와 장면에서도 사용할 수 있는 변수가 되지!"
    }, {
      name: "server.data",
      snippet: "server.data.value",
      selection: "value",
      tip: {
        description: {
          ko: "서버에 저장할 수 있는 오브젝트"
        },
        "description2": {
          ko: "(퍼블리싱 앱 전용 기능)"
        }
      },
      id: "server.data",
      chatbotDescription: "sever.data는 서버에 저장할 수 있는 오브젝트야. 오브젝트는 서버에 저장할 수 있게 만든 상자라고 생각하면 돼. 상자에 데이터를 넣은 다음, 상자를 서버에 보관하거나 꺼낼 수 있어!"
    }, {
      name: "server.save(function())",
      snippet: "server.save(function(){})",
      newLine: "server.save(function(){",
      tip: {
        description: {
          ko: "server.data 오브젝트를 서버에 저장한다"
        },
        "description2": {
          ko: "(퍼블리싱 앱 전용 기능)"
        }
      },
      id: "server.save",
      chatbotDescription: "server.save(function())는 server.data 오브젝트를 서버에 저장하는 API야. 상자를 서버에 보관하는 거지."
    }, {
      name: "server.load(function())",
      snippet: "server.load(function(){})",
      newLine: "server.load(function(){",
      tip: {
        description: {
          ko: "서버에 저장된 데이터를 불러와서 server.data에 저장한다"
        },
        "description2": {
          ko: "(퍼블리싱 앱 전용 기능)"
        }
      },
      id: "server.load",
      chatbotDescription: "server.load(function())는 서버에 저장된 데이터를 불러와서 server.data에 저장하는 API야. 서버에 저장된 상자를 꺼내는 거지."
    }, {
      name: "server.reset(function())",
      snippet: "server.reset(function(){})",
      newLine: "server.reset(function(){",
      tip: {
        description: {
          ko: "server.data 오브젝트를 서버에서 초기화한다"
        },
        "description2": {
          ko: "(퍼블리싱 앱 전용 기능)"
        }
      },
      id: "server.reset",
      chatbotDescription: "sever.reset(function())은 server.data 오브젝트를 서버에서 초기화하는 API야. 상자를 비우는 거지."
    }, {
      name: "socket.connect(function())",
      snippet: "socket.connect(function(){})",
      newLine: "socket.connect(function(){",
      tip: {
        description: {
          ko: "소켓 서버에 접속한다."
        }
      },
      id: "socket.connect",
      chatbotDescription: "socket.connect(function())는 소켓 서버에 접속하는 API야. 소켓을 사용하면 실시간으로 정보를 주고받을 수 있지."
    }, {
      name: "socket.disconnect()",
      snippet: "socket.disconnect()",
      tip: {
        description: {
          ko: "소켓 서버 연결을 해제한다."
        }
      },
      id: "socket.disconnect",
      chatbotDescription: "socket.disconnect()는 소켓 서버와의 연결을 해제하는 API야."
    }, {
      name: "socket.isConnected()",
      snippet: "socket.isConnected()",
      tip: {
        description: {
          ko: "소켓 서버와 연결 상태를 확인한다."
        }
      },
      id: "socket.isConnected",
      chatbotDescription: "socket.isConnected()는 소켓 서버와 연결이 잘 됐는지를 확인하는 API야. 잘 연결됐다면 true가 반환될 거야."
    }, {
      name: "socket.emit(data)",
      snippet: "socket.emit(data)",
      tip: {
        description: {
          ko: "소켓서버에 데이터를 전송한다."
        }
      },
      id: "socket.emit",
      chatbotDescription: "socket.emit(data)는 소켓 서버에 데이터를 전송하는 API야. data에 전송을 원하는 데이터를 입력해봐!"
    }, {
      name: "socket.onReceive(function())",
      snippet: "socket.onReceive(function(data){})",
      newLine: "socket.onReceive(function(data){",
      tip: {
        description: {
          ko: "소켓 서버로부터 메세지를 받는다."
        }
      },
      id: "socket.onReceive",
      chatbotDescription: "socket.onReceive(function())는 소켓 서버로부터 메시지를 받는 API야."
    }, {
      name: "socket.joinRoom(roomId)",
      snippet: "socket.joinRoom(roomId)",
      tip: {
        description: {
          ko: "소켓 서버의 특정한 룸에 입장한다."
        }
      },
      id: "socket.joinRoom",
      chatbotDescription: "socket.joinRoom(roomId)는 소켓 서버의 특정한 룸에 입장하는 API야. roomId에 입장을 원하는 룸의 ID를 입력해봐!"
    }, {
      name: "socket.leaveRoom(roomId)",
      snippet: "socket.leaveRoom(roomId)",
      tip: {
        description: {
          ko: "소켓 서버의 룸에서 퇴장한다."
        }
      },
      id: "socket.leaveRoom",
      chatbotDescription: "socket.joinRoom(roomId)는 소켓 서버의 특정한 룸에서 퇴장하는 API야. roomId에 퇴장을 원하는 룸의 ID를 입력해봐!"
    }, {
      name: "socket.emitRoom(roomId,data)",
      snippet: "socket.emitRoom(roomId,data)",
      tip: {
        description: {
          ko: "소켓 서버의 룸에 메세지를 전송한다."
        }
      },
      id: "socket.emitRoom",
      chatbotDescription: "socket.emitRoom(roomId, data)는 소켓 서버의 룸에 메시지를 전송하는 API야. roomId에 전송을 원하는 룸의 ID를 입력하고, data에 전송을 원하는 데이터를 입력해봐!"
    }, {
      name: "translate(text,lang,fn)",
      snippet: "translate(\"안녕하세요!\",\"en\",function(text){})",
      selection: "안녕하세요!",
      newLine: "translate(\"안녕하세요!\",\"en\",function(text){",
      tip: {
        description: {
          ko: "입력된 텍스트를 특정 언어로 번역한다."
        },
        "params": [{
          name: "text",
          description: {
            ko: "번역할 텍스트"
          }
        }, {
          name: "lang",
          description: {
            ko: "번역할 언어"
          }
        }, {
          name: "fn",
          description: {
            ko: "번역이 완료된 후 실행되는 함수"
          }
        }]
      },
      id: "translate",
      chatbotDescription: "translate(text, lang, fn)는 입력된 텍스트를 특정 언어로 번역하는 API야. text에 번역할 텍스트를 입력하고, lang에 번역하고 싶은 언어를, fn에 번역이 완료되면 실행할 함수를 입력해봐!"
    }, {
      name: "getName()",
      snippet: "getName()",
      tip: {
        description: {
          ko: "스프라이트의 이름 가져오기"
        }
      },
      id: "getName",
      chatbotDescription: "getName()은 스프라이트의 이름을 반환하는 API야."
    }, {
      name: "getSprite(name)",
      snippet: "getSprite(\"name\")",
      selection: "name",
      "selectionType": "sprite",
      tip: {
        description: {
          ko: "스프라이트 가져오기"
        },
        "params": [{
          name: "name",
          description: {
            ko: "가져올 스프라이트의 이름 문자열"
          }
        }],
        "description2": {
          ko: "name이 이름인 스프라이트를 반환한다"
        }
      },
      id: "getSprite",
      chatbotDescription: "getSprite(name)은 특정 스프라이트를 가져오는 함수야. name에 원하는 스프라이트의 이름을 적어봐."
    }, {
      name: "getX()",
      snippet: "getX()",
      tip: {
        description: {
          ko: "x좌표"
        },
        "description2": {
          ko: "스프라이트의 x좌표 값을 반환한다"
        }
      },
      id: "getX",
      chatbotDescription: "getX()는 스프라이트의 X좌표 값을 반환하는 API야. X좌표는 왼쪽에서 시작해서 오른쪽으로 갈수록 숫자가 커져!"
    }, {
      name: "getY()",
      snippet: "getY()",
      tip: {
        description: {
          ko: "y좌표"
        },
        "description2": {
          ko: "스프라이트의 y좌표 값을 반환한다"
        }
      },
      id: "getY",
      chatbotDescription: "getY()는 스프라이트의 Y좌표 값을 반환하는 API야. Y좌표는 위에서 시작해서 아래로 갈수록 숫자가 커져!"
    }, {
      name: "getDegree()",
      snippet: "getDegree()",
      tip: {
        description: {
          ko: "각도값"
        },
        "description2": {
          ko: "스프라이트의 각도값을 숫자로 반환한다"
        }
      },
      id: "getDegree",
      chatbotDescription: "getDegree()는 스프라이트의 각도를 반환하는 API야."
    }, {
      name: "getSize()",
      snippet: "getSize()",
      tip: {
        description: {
          ko: "크기값"
        },
        "description2": {
          ko: "스프라이트의 크기를 반환한다"
        }
      },
      id: "getSize",
      chatbotDescription: "getSize()는 스프라이트의 크기를 비율로 반환하는 API야. 스프라이트의 크기를 변경하지 않았다면 100%니깐 100이 반환되지."
    }, {
      name: "getWidth()",
      snippet: "getWidth()",
      tip: {
        description: {
          ko: "너비값"
        },
        "description2": {
          ko: "스프라이트의 너비값을 반환한다"
        }
      },
      id: "getWidth",
      chatbotDescription: "getWidth()는 스프라이트의 너비를 반환하는 API야."
    }, {
      name: "getHeight()",
      snippet: "getHeight()",
      tip: {
        description: {
          ko: "높이값"
        },
        "description2": {
          ko: "스프라이트의 높이값을 반환한다"
        }
      },
      id: "getHeight",
      chatbotDescription: "getHeight()는 스프라이트의 높이를 반환하는 API야."
    }, {
      name: "getWorldWidth()",
      snippet: "getWorldWidth()",
      tip: {
        description: {
          ko: "배경의 너비값"
        },
        "description2": {
          ko: "scene의 너비값을 반환한다"
        }
      },
      id: "getWorldWidth",
      chatbotDescription: "getWorldWidth()는 배경의 너비를 반환하는 API야. "
    }, {
      name: "getWorldHeight()",
      snippet: "getWorldHeight()",
      tip: {
        description: {
          ko: "배경의 높이값"
        },
        "description2": {
          ko: "scene의 높이값을 반환한다"
        }
      },
      id: "getWorldHeight",
      chatbotDescription: "getWorldHeight()는 배경의 높이를 반환하는 API야. "
    }, {
      name: "getCurrentAnimation()",
      snippet: "getCurrentAnimation()",
      tip: {
        description: {
          ko: "현재 동작중인 애니메이션 이름 가져오기"
        },
        "description2": {
          ko: "스프라이트에 동작중인 애니메이션이 있다면 그 이름을 가져온다"
        }
      },
      id: "getCurrentAnimation",
      chatbotDescription: "getCurrentAnimation()은 현재 재생되고 있는 애니메이션의 이름을 반환하는 API야."
    }, {
      name: "getMousePointerX()",
      snippet: "getMousePointerX()",
      tip: {
        description: {
          ko: "마우스 x좌표"
        },
        "description2": {
          ko: "마우스 포인터의 x좌표 값을 반환한다"
        }
      },
      id: "getMousePointerX",
      chatbotDescription: "getMousePointerX()는 마우스의 x값을 반환하는 API야."
    }, {
      name: "getMousePointerY()",
      snippet: "getMousePointerY()",
      tip: {
        description: {
          ko: "마우스 y좌표"
        },
        "description2": {
          ko: "마우스 포인터의 y좌표 값을 반환한다"
        }
      },
      id: "getMousePointerY",
      chatbotDescription: "getMousePointerY()는 마우스의 y값을 반환하는 API야."
    }, {
      name: "getText()",
      snippet: "getText()",
      tip: {
        description: {
          ko: "문구값"
        },
        "description2": {
          ko: "텍스트상자 스프라이트의 메시지를 반환한다"
        }
      },
      id: "getText",
      chatbotDescription: "getText()는 텍스트 상자의 메시지를 반환하는 API야."
    }, {
      name: "getTextColor()",
      snippet: "getTextColor()",
      tip: {
        description: {
          ko: "문구 색상 가져오기"
        },
        "description2": {
          ko: "텍스트상자 스프라이트의 문구 색상값을 반환하다"
        }
      },
      id: "getTextColor",
      chatbotDescription: "getTextColor()는 텍스트 상자에 적은 메시지가 어떤 색인지 알려주는 API야."
    }, {
      name: "getVelocityX()",
      snippet: "getVelocityX()",
      tip: {
        description: {
          ko: "x축 속도 가져오기"
        }
      },
      id: "getVelocityX",
      chatbotDescription: "getVelocityX()는 스프라이트의 X축 속도를 반환하는 API야. X축은 가로를 의미해! 오른쪽으로 가고 있다면 X축 속도는 0보다 큰 숫자가 되지."
    }, {
      name: "getVelocityY()",
      snippet: "getVelocityY()",
      tip: {
        description: {
          ko: "y축 속도 가져오기"
        }
      },
      id: "getVelocityY",
      chatbotDescription: "getVelocityY()는 스프라이트의 Y축 속도를 반환하는 API야. Y축은 세로를 의미해! 아래로 가고 있다면 Y축 속도는 0보다 큰 숫자가 되지."
    }, {
      name: "getSoundVolume()",
      snippet: "getSoundVolume()",
      tip: {
        description: {
          ko: "현재 앱의 음량 가져오기"
        }
      },
      id: "getSoundVolume",
      chatbotDescription: "getSoundVolume()은 앱의 음량을 반환하는 API야. 음량은 0~1사이니깐 참고해."
    }, {
      name: "getTimer()",
      snippet: "getTimer()",
      tip: {
        description: {
          ko: "현재 타이머의 값 가져오기"
        }
      },
      id: "getTimer",
      chatbotDescription: "getTimer()는 현재 타이머의 값을 가져올 수 있는 API야. starTimer()와 함께 사용하면 시간을 잴 수 있어!"
    }, {
      name: "getYear()",
      snippet: "getYear()",
      tip: {
        description: {
          ko: "현재 연도를 가져오기"
        }
      },
      id: "getYear",
      chatbotDescription: "getDay()는 현재 년도를 반환하는 API야."
    }, {
      name: "getMonth()",
      snippet: "getMonth()",
      tip: {
        description: {
          ko: "현재 월을 가져오기"
        }
      },
      id: "getMonth",
      chatbotDescription: "getMonth()는 현재 몇 월인지를 반환하는 API야."
    }, {
      name: "getDay()",
      snippet: "getDay()",
      tip: {
        description: {
          ko: "현재 일을 가져오기"
        }
      },
      id: "getDay",
      chatbotDescription: "getDay()는 현재 며칠인지를 반환하는 API야."
    }, {
      name: "getHour()",
      snippet: "getHour()",
      tip: {
        description: {
          ko: "현재 시간을 가져오기"
        }
      },
      id: "getHour",
      chatbotDescription: "getHour()는 현재 몇 시인지를 반환하는 API야."
    }, {
      name: "getMin()",
      snippet: "getMin()",
      tip: {
        description: {
          ko: "현재 분을 가져오기"
        }
      },
      id: "getMin",
      chatbotDescription: "getMin()은 현재 몇 분인지를 반환하는 API야."
    }, {
      name: "getSec()",
      snippet: "getSec()",
      tip: {
        description: {
          ko: "현재 초를 가져오기"
        }
      },
      id: "getSec",
      chatbotDescription: "getSec()는 현재 몇 초인지를 반환하는 API야."
    }, {
      name: "getPenColor()",
      snippet: "getPenColor()",
      tip: {
        description: {
          ko: "사용중인 펜의 색깔 가져오기"
        }
      },
      id: "getPenColor",
      chatbotDescription: "getPenColor()는 스프라이트의 펜 색상을 반환하는 API야."
    }, {
      name: "getPenSize()",
      snippet: "getPenSize()",
      tip: {
        description: {
          ko: "사용중인 펜의 두께 가져오기"
        }
      },
      id: "getPenSize",
      chatbotDescription: "getPenSize()는 스프라이트의 펜 두께를 반환하는 API야."
    }]
  }]
  //for auto completer
  getAllFunctions(editorMode) {
    let functions = [];

    switch (editorMode) {
      case EDITORMODE.PYTHON:
        // this.pythonApiList.forEach(category => {
        //   const categoryName = category.name;
        //   category.api.forEach(api => {
        //     if (api.snippet) {
        //       if (api.name === "if / else / else if") {
        //         return;
        //       }
        //       const meta = categoryName;
        //       const caption = api.name;
        //       const value = api.snippet;
        //       const newLine = api.newLine;
        //       const selection = api.selection;
        //       const selectionType = api.selectionType;
        //       const requiredParamCount = api.requiredParamCount;
        //       const tip = api.tip;
        //       const funcRegex = /([a-zA-Z_{1}][a-zA-Z0-9_]+)(?=\()/gim;
        //       const funcMatch = funcRegex.exec(api.name);
        //       let name;
        //       if (funcMatch) name = funcMatch[0];
        //       functions.push({
        //         name,
        //         tip,
        //         caption,
        //         value,
        //         meta,
        //         newLine,
        //         selection,
        //         selectionType,
        //         requiredParamCount
        //       });
        //     }
        //   });
        // });
        break;
      default:
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
        break;
    }

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
    functions.push({
      name: "setCollideWorldBounds",
      equal: "setCollideScene",
      caption: "setCollideWorldBounds(enabled)",
      value: "setCollideWorldBounds(true)",
      meta: "function"
    });
    functions.push({
      name: "setCheckCollision",
      equal: "setCollideSide",
      caption: "setCheckCollision(direction, enabled)",
      value: `setCheckCollision("down",false)`,
      meta: "function"
    });
    functions.push({
      name: "setHorizontalFlip",
      equal: "setFlipX",
      caption: "setHorizontalFlip(isFlipped)",
      value: "setHorizontalFlip(true)",
      meta: "function"
    });
    functions.push({
      name: "setVerticalFlip",
      equal: "setFlipY",
      caption: "setVerticalFlip(isFlipped)",
      value: "setVerticalFlip(true)",
      meta: "function"
    });
    functions.push({
      name: "setImmovable",
      equal: "setMovable",
      caption: "setImmovable(enabled)",
      value: "setImmovable(true)",
      meta: "function"
    });

    //insert at 0
    // functions = [
    //   {
    //     caption: "function",
    //     value: `function name(){}`,
    //     meta: "declaration",
    //     newLine: `function name(){`,
    //     selection: "name"
    //   }
    // ].concat(functions);
    // functions = [
    //   {
    //     caption: "var",
    //     value: `var name`,
    //     meta: "declaration",
    //     selection: "name"
    //   }
    // ].concat(functions);
    // functions = [
    //   {
    //     caption: "let",
    //     value: `let name`,
    //     meta: "declaration",
    //     selection: "name"
    //   }
    // ].concat(functions);
    // functions = [
    //   {
    //     caption: "const",
    //     value: `const name`,
    //     meta: "declaration",
    //     selection: "name"
    //   }
    // ].concat(functions);

    return functions;
  }

  getAPIbyId(_id) {
    for (let i in this.apiList) {
      for (let j in this.apiList[i].api) {
        const id = this.apiList[i].api[j].id;
        if (id.toLowerCase() === _id.toLowerCase()) {
          return this.apiList[i].api[j];
        }
      }
    }
    return null;
  }

  getAPI(name, editorMode) {
    switch (editorMode) {
      // case EDITORMODE.PYTHON:
      //   for (let i in this.pythonApiList) {
      //     for (let j in this.pythonApiList[i].api) {
      //       if (this.pythonApiList[i].api[j].name === name) {
      //         return this.pythonApiList[i].api[j];
      //       }
      //     }
      //   }
      //   break;
      default:
        for (let i in this.apiList) {
          for (let j in this.apiList[i].api) {
            if (this.apiList[i].api[j].name === name) {
              return this.apiList[i].api[j];
            }
          }
        }
        break;
    }
  }

  // programmingDict = {
  //   "변수":"",
  //   "함수":"",
  //   "반복문":"",
  //   "조건문":"",
  //   "제어문":"",
  //   "파라미터":"",
  //   "재귀":"",
  //   "무한루프":"",
  //   "상수":"",
  //   "알고리즘":"",
  //   "자료구조":"",
  //   "버그":"",
  //   "리스트":"",
  //   "오브젝트":"",
  //   "소켓":""
  // }
}

export default new ApiLibrary();
