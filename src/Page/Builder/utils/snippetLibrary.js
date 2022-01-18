/**
 * snippet = [ { title , description, image, steps:[{title, javascriptCode, image, description },...] },...]
 *
 * @author kate
 */
 export default [
  {
    title: {
      ko: "점프하는 캐릭터 만들기",
      zh: "让角色跳起来",
      default: "점프하는 캐릭터 만들기"
    },
    video: "Video/snippet01.mp4",
    steps: [
      {
        title: {
          ko: "캐릭터가 아래로 내려가도록 중력을 설정합니다.",
          zh: "给角色设置重力，让角色向下移动。",
          default: "캐릭터가 아래로 내려가도록 중력을 설정합니다."
        },
        javascriptCode: {
          ko: `setGravityY(1000)`,
          zh: `setGravityY(1000)`,
          default: `setGravityY(1000)`
        }
      },
      {
        title: {
          ko: "스페이스키를 누르면 위로 올라가도록 만들어볼까요?",
          zh: "通过点击空格键，让角色向上移动吧！",
          default: "스페이스키를 누르면 위로 올라가도록 만들어볼까요?"
        },
        javascriptCode: {
          ko: `onKey("space",function(){
    setVelocityY(-500)
})`,
          default: `onKey("space",function(){
    setVelocityY(-500)
})`,
          zh: `onKey("space",function(){
    setVelocityY(-500)
})`
        },
        description: {
          ko: "자유롭게 원하는 숫자를 입력해보세요.",
          zh: "请自由输入任意数字。",
          default: "자유롭게 원하는 숫자를 입력해보세요."
        }
      },
      {
        title: {
          ko:
            "캐릭터가 장면아래로 떨어지나요? 다음 코드를 입력해서 화면밖으로 못나가게 만들어보세요.",
          zh:
            "角色是不是总掉到场景外面去呢？请输入以下代码，让角色无法脱离界面吧。",
          default:
            "캐릭터가 장면아래로 떨어지나요? 다음 코드를 입력해서 화면밖으로 못나가게 만들어보세요."
        },
        javascriptCode: {
          ko: `setCollideScene(true)`,
          zh: `setCollideScene(true)`,
          default: `setCollideScene(true)`
        }
      },
      {
        title: {
          ko: "만약 이단점프를 막고싶다면 코드를 다음과 같이 수정해보세요.",
          zh: "如果不想出现双重跳跃，请如下修改代码。",
          default: "만약 이단점프를 막고싶다면 코드를 다음과 같이 수정해보세요."
        },
        javascriptCode: {
          ko: `onKey("space",function(){
    if(getVelocityY()==0){
        setVelocityY(-500)
      }
})`,
          zh: `onKey("space",function(){
    if(getVelocityY()==0){
        setVelocityY(-500)
    }
})`,
          default: `onKey("space",function(){
    if(getVelocityY()==0){
        setVelocityY(-500)
    }
})`
        }
      },
      {
        title: {
          ko: "완성!",
          zh: "完成！",
          default: "완성!"
        },
        javascriptCode: {
          ko: `setGravityY(1000)
onKey("space",function(){
    if(getVelocityY()==0){
      setVelocityY(-500)
    }
})
setCollideScene(true)`,
          zh: `setGravityY(1000)
onKey("space",function(){
    if(getVelocityY()==0){
      setVelocityY(-500)
    }
})
setCollideScene(true)`,
          default: `setGravityY(1000)
onKey("space",function(){
    if(getVelocityY()==0){
      setVelocityY(-500)
    }
})
setCollideScene(true)`
        }
      }
    ]
  },
  {
    title: {
      ko: "흐르는 배경 만들기",
      zh: "让背景滚动",
      default: "흐르는 배경 만들기"
    },
    video: "Video/snippet02.mp4",
    steps: [
      {
        title: {
          ko:
            "배경 스프라이트가 매 프레임마다 옆으로 이동하게 코드를 작성해보세요.",
          zh:
            "请写出背景角色每帧都会横向移动的程序代码吧。",
          default:
            "배경 스프라이트가 매 프레임마다 옆으로 이동하게 코드를 작성해보세요."
        },
        javascriptCode: {
          ko: `onFrame(function(){
    goX(3)
})`,
          zh: `onFrame(function(){
    goX(3)
})`,
          default: `onFrame(function(){
    goX(3)
})`
        },
        description: {
          ko:
            "반대방향으로 움직이게 하고싶다면 goX의 값을 -3으로 변경해보세요. ",
          zh:
            "如果想让背景反方向移动，请将goX值修改为 -3。",
          default:
            "반대방향으로 움직이게 하고싶다면 goX의 값을 -3으로 변경해보세요. "
        }
      },
      {
        title: {
          ko: "완성!",
          zh: "完成！",
          default: "완성!"
        }
      }
    ]
  },

  {
    title: {
      ko: "미사일 발사하기",
      zh: "发射导弹",
      default: "미사일 발사하기"
    },
    video: "Video/snippet03.mp4",
    steps: [
      {
        title: {
          ko: "미사일 스프라이트가 숨어있게 만들어주세요.",
          zh: "请让导弹角色隐藏起来吧。",
          default: "미사일 스프라이트가 숨어있게 만들어주세요."
        },
        javascriptCode: {
          ko: `hide()`,
          zh: `hide()`,
          default: `hide()`
        }
      },
      {
        title: {
          ko:
            "스페이스키를 누를 때 미사일 스프라이트가 복제되면서 발사되도록 아래의 코드를 작성해주세요.",
          zh:
            "请编写程序，当点击空格键时，复制导弹角色且发射。",
          default:
            "스페이스키를 누를 때 미사일 스프라이트가 복제되면서 발사되도록 아래의 코드를 작성해주세요."
        },
        javascriptCode: {
          ko: `onKey("space",function(){
    goToSprite("주인공 스프라이트")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`,
          zh: `onKey("space",function(){
    goToSprite("主人公角色")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`,
          default: `onKey("space",function(){
    goToSprite("주인공 스프라이트")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`
        },
        description: {
          ko: "goToSprite에 주인공 스프라이트의 이름을 적어주세요.",
          zh: "请在goToSprite中输入主人公角色名称。",
          default: "goToSprite에 주인공 스프라이트의 이름을 적어주세요."
        }
      },
      {
        title: {
          ko: "완성!",
          zh: "完成！",
          default: "완성!"
        },
        javascriptCode: {
          ko: `hide()
onKey("space",function(){
    goToSprite("주인공 스프라이트")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`,
          zh: `hide()
onKey("space",function(){
    goToSprite("主人公角色")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`,
          default: `hide()
onKey("space",function(){
    goToSprite("주인공 스프라이트")
    var missile = clone()
    missile.setVelocityX(2000)
    missile.show()
    missile.onOutStage(function(){
        missile.kill()
    })
})`
        }
      }
    ]
  },
  {
    title: {
      ko: "타이머 만들기",
      zh: "制作计时器",
      default: "타이머 만들기"
    },
    video: "Video/snippet04.mp4",
    steps: [
      {
        title: {
          ko:
            "스프라이트 박스에서 텍스트 스프라이트를 가져오고, 타이머를 시작해주세요.",
          zh:
            "请从角色栏中取出角色，开始计时。",
          default:
            "스프라이트 박스에서 텍스트 스프라이트를 가져오고, 타이머를 시작해주세요."
        },
        javascriptCode: {
          ko: `startTimer()`,
          zh: `startTimer()`,
          default: `startTimer()`
        }
      },
      {
        title: {
          ko:
            "매 프레임마다 타이머의 값을 가져와서 텍스트 스프라이트의 내용을 변경해주세요.",
          zh:
            "每帧都将计时器的值取出来，以变更文本角色里的内容。",
          default:
            "매 프레임마다 타이머의 값을 가져와서 텍스트 스프라이트의 내용을 변경해주세요."
        },
        javascriptCode: {
          ko: `onFrame(function(){
    var time = getTimer()
    setText(time)
})`,
          zh: `onFrame(function(){
    var time = getTimer()
    setText(time)
})`,
          default: `onFrame(function(){
    var time = getTimer()
    setText(time)
})`
        }
      },
      {
        title: {
          ko:
            "타이머의 소수점을 제거하고 싶다면 다음과 같이 코드를 변경해보세요.",
          zh:
            "想要去掉计时器的小数点，请如下修改代码。",
          default:
            "타이머의 소수점을 제거하고 싶다면 다음과 같이 코드를 변경해보세요."
        },
        javascriptCode: {
          ko: `onFrame(function(){
    var time = parseInt(getTimer())
    setText(time)
})`,
          zh: `onFrame(function(){
    var time = parseInt(getTimer())
    setText(time)
})`,
          default: `onFrame(function(){
    var time = parseInt(getTimer())
    setText(time)
})`
        }
      },
      {
        title: {
          ko: "완성!",
          zh: "完成！",
          default: "완성!"
        },
        javascriptCode: {
          ko: `startTimer()
onFrame(function(){
    var time = getTimer()
    setText(time)
})`,
          zh: `startTimer()
onFrame(function(){
    var time = getTimer()
    setText(time)
})`,
          default: `startTimer()
onFrame(function(){
    var time = getTimer()
    setText(time)
})`
        }
      }
    ]
  },

  {
    title: {
      ko: "조이스틱 사용하기(1)",
      zh: "使用游戏杆（1）",
      default: "조이스틱 사용하기(1)"
    },
    video: "Video/snippet05.mp4",
    steps: [
      {
        title: {
          ko:
            "스프라이트 박스에서 조이스틱을 가져오고 3번째 줄 getSprite의 name부분을 움직이고자 하는 스프라이트의 이름으로 바꿔주세요.",
          zh:
            "请从角色栏中取出游戏杆，将第三行getSprite的name部分改为想要操控的角色名称。",
          default:
            "스프라이트 박스에서 조이스틱을 가져오고 3번째 줄 getSprite의 name부분을 움직이고자 하는 스프라이트의 이름으로 바꿔주세요."
        },
        javascriptCode: {
          ko: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("주인공 스프라이트")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
          zh: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("主人公角色")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
          default: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("주인공 스프라이트")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`
        },
        description: {
          ko:
            "움직이는 속도를 변경하고 싶다면 maxSpeed의 값을 자유롭게 변경해보세요.",
          zh:
            "如果想要改变移动速度，可自由修改maxSpeed的值。",
          default:
            "움직이는 속도를 변경하고 싶다면 maxSpeed의 값을 자유롭게 변경해보세요."
        }
      }
    ]
  },

  {
    title: {
      ko: "조이스틱 사용하기(2)",
      zh: "使用游戏杆（2）",
      default: "조이스틱 사용하기(2)"
    },
    video: "Video/snippet12.mp4",
    steps: [
      {
        title: {
          ko:
            "스프라이트 박스에서 조이스틱을 가져오고 3번째 줄 getSprite의 name부분을 움직이고자 하는 스프라이트의 이름으로 바꿔주세요.",
          zh:
            "请从角色栏中取出游戏杆，将第三行getSprite的name部分改为想要操控的角色名称。",
          default:
            "스프라이트 박스에서 조이스틱을 가져오고 3번째 줄 getSprite의 name부분을 움직이고자 하는 스프라이트의 이름으로 바꿔주세요."
        },
        javascriptCode: {
          ko: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("주인공 스프라이트")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
          zh: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("主人公角色")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`,
          default: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("주인공 스프라이트")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
})`
        },
        description: {
          ko:
            "움직이는 속도를 변경하고 싶다면 maxSpeed의 값을 자유롭게 변경해보세요.",
          zh:
            "如果想要改变移动速度，可自由修改maxSpeed的值。",
          default:
            "움직이는 속도를 변경하고 싶다면 maxSpeed의 값을 자유롭게 변경해보세요."
        }
      },
      {
        title: {
          ko:
            "스프라이트의 각도를 조이스틱의 각도만큼 변경해줍니다. 이 예제에서는 위를 보고있는 스프라이트이기 때문에 조이스틱의 각도에 90을 더합니다.",
          zh:
            "请将角色角度按照游戏杆角度修改。该例子中的角色是面向上方的，因此要在角色角度加上90。",
          default:
            "스프라이트의 각도를 조이스틱의 각도만큼 변경해줍니다. 이 예제에서는 위를 보고있는 스프라이트이기 때문에 조이스틱의 각도에 90을 더합니다."
        },
        javascriptCode: {
          ko: `sprite.setDegree(degree + 90)`,
          zh: `sprite.setDegree(degree + 90)`,
          default: `sprite.setDegree(degree + 90)`
        },
        description: {
          ko:
            "스프라이트가 기본적으로 보고있는 방향에 따라서 더하는 값이 변경되어야 합니다.",
          zh:
            "要按照角色基本面向的方向，修改要加的值。",
          default:
            "스프라이트가 기본적으로 보고있는 방향에 따라서 더하는 값이 변경되어야 합니다."
        }
      },
      {
        title: { ko: "완성!", zh: "完成！", default: "완성!" },
        javascriptCode: {
          ko: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("주인공 스프라이트")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
    sprite.setDegree(degree + 90)
})`,
          zh: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("主人公角色")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
    sprite.setDegree(degree + 90)
})`,
          default: `onJoystick(function(degree,force){
    var maxSpeed = 300
    var sprite = getSprite("주인공 스프라이트")
    sprite.setVelocityFromDegree(degree,force,maxSpeed)
    sprite.setDegree(degree + 90)
})`
        }
      }
    ]
  },

  {
    title: {
      ko: "튕기는 공 만들기",
      zh: "让球来回反弹",
      default: "튕기는 공 만들기"
    },
    video: "Video/snippet06.mp4",
    steps: [
      {
        title: {
          ko: "X, Y축으로 모두 움직이게 속도를 설정합니다.",
          zh: "请设置速度，让球往X轴跟Y轴方向移动。",
          default: "X, Y축으로 모두 움직이게 속도를 설정합니다."
        },
        javascriptCode: {
          ko: `setVelocityX(500)
setVelocityY(500)`,
          zh: `setVelocityX(500)
setVelocityY(500)`,
          default: `setVelocityX(500)
setVelocityY(500)`
        },
        description: {
          ko: "숫자를 변경해가며 원하는 속도를 설정해보세요.",
          zh: "请自由修改数字，设置成自己所要的速度。",
          default: "숫자를 변경해가며 원하는 속도를 설정해보세요."
        }
      },
      {
        title: {
          ko: "X, Y축 모두 부딪혔을 때 튕기게 설정합니다.",
          zh: "请设置成碰到X轴跟Y轴时都能弹回。",
          default: "X, Y축 모두 부딪혔을 때 튕기게 설정합니다."
        },
        javascriptCode: {
          ko: `setBounceX(1)
setBounceY(1)`,
          zh: `setBounceX(1)
setBounceY(1)`,
          default: `setBounceX(1)
setBounceY(1)`
        }
      },
      {
        title: {
          ko: "화면에 부딪히게 설정합니다.",
          zh: "请设置成与界面相互碰撞的情况。",
          default: "화면에 부딪히게 설정합니다."
        },
        javascriptCode: {
          ko: `setCollideScene(true)`,
          zh: `setCollideScene(true)`,
          default: `setCollideScene(true)`
        }
      },
      {
        title: {
          ko: "완성!",
          zh: "完成！",
          default: "완성!"
        },
        javascriptCode: {
          ko: `setVelocityX(500)
setVelocityY(500)
setBounceX(1)
setBounceY(1)
setCollideScene(true)`,
          zh: `setVelocityX(500)
setVelocityY(500)
setBounceX(1)
setBounceY(1)
setCollideScene(true)`,
          default: `setVelocityX(500)
setVelocityY(500)
setBounceX(1)
setBounceY(1)
setCollideScene(true)`
        }
      }
    ]
  },

  {
    title: {
      ko: "버튼으로 신호 주고받기",
      zh: "通过按钮发送和接收信号。",
      default: "버튼으로 신호 주고받기"
    },
    video: "Video/snippet07.mp4",
    steps: [
      {
        title: {
          ko: "버튼을 클릭했을 때 신호를 보내게 만들어 줍니다.",
          zh: "点击按钮时，发送信号。",
          default: "버튼을 클릭했을 때 신호를 보내게 만들어 줍니다."
        },
        javascriptCode: {
          ko: `onClick(function(){
   sendSignal("signal name")
})`,
          zh: `onClick(function(){
    sendSignal("signal name")
})`,
          default: `onClick(function(){
   sendSignal("signal name")
})`
        },
        description: {
          ko: "신호의 이름은 자유롭게 설정할 수 있습니다.",
          zh: "信号名称可以自由设置。",
          default: "신호의 이름은 자유롭게 설정할 수 있습니다."
        }
      },
      {
        title: {
          ko: "움직이고 싶은 스프라이트에서 신호를 받는 코드를 작성합니다.",
          zh: "请写出想要操控的角色能够收到信号的程序代码。",
          default: "움직이고 싶은 스프라이트에서 신호를 받는 코드를 작성합니다."
        },
        javascriptCode: {
          ko: `onSignal("singal name",function(){
    //여기에 원하는 코드를 입력하세요.    
})`,
          zh: `onSignal("singal name",function(){
    //请在这里输入代码。   
})`,
          default: `onSignal("singal name",function(){
    //여기에 원하는 코드를 입력하세요.    
})`
        },
        description: {
          ko: "신호를 받을 스프라이트에 작성하세요!",
          zh: "请在要收到信号的角色中编写代码！",
          default: "신호를 받을 스프라이트에 작성하세요!"
        }
      },
      {
        title: {
          ko: "완성!",
          zh: "完成！",
          default: "완성!"
        }
      }
    ]
  },

  {
    title: {
      ko: "반짝이는 글자 만들기",
      zh: "让文字闪烁",
      default: "반짝이는 글자 만들기"
    },
    video: "Video/snippet08.mp4",
    steps: [
      {
        title: {
          ko:
            "텍스트 스프라이트에 다음과 같은 코드를 입력해서, 매 프레임마다 랜덤 색상으로 변하게 해줍니다.",
          zh:
            "请在文本角色中输入以下代码，让文字每帧都能随机变色。",
          default:
            "텍스트 스프라이트에 다음과 같은 코드를 입력해서, 매 프레임마다 랜덤 색상으로 변하게 해줍니다."
        },
        javascriptCode: {
          ko: `onFrame(function(){
    setRandomTextColor()
})`,
          zh: `onFrame(function(){
    setRandomTextColor()
})`,
          default: `onFrame(function(){
    setRandomTextColor()
})`
        }
      },
      {
        title: {
          ko: "완성!",
          zh: "完成！",
          default: "완성!"
        }
      }
    ]
  },

  {
    title: {
      ko: "초간단 그림판 만들기",
      zh: "做一个超级简单的绘画板",
      default: "초간단 그림판 만들기"
    },
    video: "Video/snippet09.mp4",
    steps: [
      {
        title: {
          ko:
            "스프라이트가 매 프레임마다 마우스를 따라다니게 코드를 작성합니다.",
          zh:
            "请写出角色每帧都能跟着鼠标移动的代码。",
          default:
            "스프라이트가 매 프레임마다 마우스를 따라다니게 코드를 작성합니다."
        },
        javascriptCode: {
          ko: `onFrame(function(){
    goToMousePointer()
})`,
          zh: `onFrame(function(){
    goToMousePointer()
})`,
          default: `onFrame(function(){
    goToMousePointer()
})`
        }
      },
      {
        title: {
          ko: "마우스를 클릭하면 펜이 시작하게 설정합니다.",
          zh: "请设置为点击鼠标时，笔就开始移动。",
          default: "마우스를 클릭하면 펜이 시작하게 설정합니다."
        },
        javascriptCode: {
          ko: `onClick(function(){
    startPen()
})`,
          zh: `onClick(function(){
    startPen()
})`,
          default: `onClick(function(){
    startPen()
})`
        }
      },
      {
        title: {
          ko: "마우스 클릭이 끝나면 펜도 멈추게 설정합니다.",
          zh: "请设置为停止点击鼠标时，笔也跟着停止。",
          default: "마우스 클릭이 끝나면 펜도 멈추게 설정합니다."
        },
        javascriptCode: {
          ko: `onClickUp(function(){
    endPen()
})`,
          zh: `onClickUp(function(){
    endPen()
})`,
          default: `onClickUp(function(){
    endPen()
})`
        }
      },
      {
        title: {
          ko: "완성!",
          zh: "完成！",
          default: "완성!"
        },
        javascriptCode: {
          ko: `onFrame(function(){
    goToMousePointer()
})
onClick(function(){
    startPen()
})
onClickUp(function(){
    endPen()
})`,
          zh: `onFrame(function(){
    goToMousePointer()
})
onClick(function(){
    startPen()
})
onClickUp(function(){
    endPen()
})`,
          default: `onFrame(function(){
    goToMousePointer()
})
onClick(function(){
    startPen()
})
onClickUp(function(){
    endPen()
})`
        }
      }
    ]
  },

  {
    title: {
      ko: "클릭하면 커지게 만들기",
      zh: "点击时，让角色变大",
      default: "클릭하면 커지게 만들기"
    },
    video: "Video/snippet10.mp4",
    steps: [
      {
        title: {
          ko: "클릭할 때마다 사이즈가 커지도록 코드를 작성합니다.",
          zh: "请写出每当点击时，角色大小都会变大的程序代码。",
          default: "클릭할 때마다 사이즈가 커지도록 코드를 작성합니다."
        },
        javascriptCode: {
          ko: `onClick(function(){
    addSize(10)
})`,
          zh: `onClick(function(){
    addSize(10)
})`,
          default: `onClick(function(){
    addSize(10)
})`
        },
        description: {
          ko: "사이즈를 작아지게 하고싶다면 addSize의 값을 -로 변경해보세요. ",
          zh: "如果想让大小变小，请将addSize的值修改为-值。",
          default:
            "사이즈를 작아지게 하고싶다면 addSize의 값을 -로 변경해보세요. "
        }
      },
      {
        title: {
          ko: "완성!",
          zh: "完成！",
          default: "완성!"
        }
      }
    ]
  },
  {
    title: {
      ko: "숫자 카운터 만들기",
      zh: "做一个数字计数器",
      default: "숫자 카운터 만들기"
    },
    video: "Video/snippet11.mp4",
    steps: [
      {
        title: {
          ko: "왼쪽 버튼을 클릭할 때 minus 신호를 보냅니다.",
          zh: "点击向左按钮时，发送minus信号。",
          default: "왼쪽 버튼을 클릭할 때 minus 신호를 보냅니다."
        },
        javascriptCode: {
          ko: `onClick(function(){
    sendSignal("minus")
})`,
          zh: `onClick(function(){
    sendSignal("minus")
})`,
          default: `onClick(function(){
    sendSignal("minus")
})`
        }
      },
      {
        title: {
          ko: "오른쪽 버튼을 클릭할 때 plus 신호를 보냅니다.",
          zh: "点击向右按钮时，发送plus信号。",
          default: "오른쪽 버튼을 클릭할 때 plus 신호를 보냅니다."
        },
        javascriptCode: {
          ko: `onClick(function(){
    sendSignal("plus")
})`,
          zh: `onClick(function(){
    sendSignal("plus")
})`,
          default: `onClick(function(){
    sendSignal("plus")
})`
        }
      },
      {
        title: {
          ko:
            "현재 숫자를 저장하는 변수를 만들어주고 plus, minus 신호를 받을 때마다 변수의 값을 변경해줍니다.",
          zh:
            "创建一个能够存储目前数字的变量，且每当收到 plus, minus信号时变更变量的值。",
          default:
            "현재 숫자를 저장하는 변수를 만들어주고 plus, minus 신호를 받을 때마다 변수의 값을 변경해줍니다."
        },
        javascriptCode: {
          ko: `var number = 0

onSignal("plus",function(){
    number = number + 1
    setText(number)
})

onSignal("minus",function(){
    number = number - 1
    setText(number)
})`,
          zh: `var number = 0

onSignal("plus",function(){
    number = number + 1
    setText(number)
})

onSignal("minus",function(){
    number = number - 1
    setText(number)
})`,
          default: `var number = 0

onSignal("plus",function(){
    number = number + 1
    setText(number)
})

onSignal("minus",function(){
    number = number - 1
    setText(number)
})`
        }
      },
      {
        title: {
          ko: "완성!",
          zh: "完成！",
          default: "완성!"
        }
      }
    ]
  }
];